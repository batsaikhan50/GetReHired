'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { calculateMatches, careerSlug, CareerMatch } from '@/lib/scoringEngine'
import { apiUrl, checkoutUrl, PAYMENT_MOCK } from '@/lib/api'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLang } from '@/contexts/LanguageContext'
import {
  jobTitleAutomationRisk, taskAutomationRisk, skillSafety,
  careerAiResistance, getRiskLevel, riskColors, riskBg, riskBarColor,
  getDisplacementStory,
} from '@/lib/automationData'

type Answers = Record<string, string | string[]>

// Unlock CTA. The real checkout is a server redirect (full page load), but the
// dev mock page is bundled, so it must be a client-side <Link> — the Capacitor
// webview's local server can't resolve full loads of nested routes.
function UnlockLink({ className, children }: { className: string; children: React.ReactNode }) {
  if (PAYMENT_MOCK) return <Link href="/payment/mock" className={className}>{children}</Link>
  return <a href={checkoutUrl()} className={className}>{children}</a>
}

interface Job {
  id: string
  url: string
  title: string
  company: string
  logo: string | null
  location: string
  type: string
  source: 'remotive' | 'muse' | 'adzuna'
}

// ─── Company logo with Clearbit fallback ─────────────────────────────────────

function CompanyLogo({ company, logo }: { company: string; logo: string | null }) {
  const [src, setSrc] = useState<string>(
    logo || `https://logo.clearbit.com/${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
  )
  const [failed, setFailed] = useState(false)

  if (failed) {
    const colors = ['#e74c3c','#e67e22','#f1c40f','#2ecc71','#1abc9c','#3498db','#9b59b6','#e91e63']
    const bg = colors[company.charCodeAt(0) % colors.length]
    return (
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-white font-semibold flex-shrink-0"
        style={{ backgroundColor: bg }}
      >
        {company[0].toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={company}
      className="w-7 h-7 rounded-lg object-contain bg-white p-0.5 flex-shrink-0"
      onError={() => {
        if (logo && src === logo) {
          // try clearbit as second attempt
          setSrc(`https://logo.clearbit.com/${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

// ─── Source meta ─────────────────────────────────────────────────────────────

const SOURCE_META: Record<string, { label: string; favicon: string }> = {
  adzuna:   { label: 'Adzuna',    favicon: 'https://www.google.com/s2/favicons?domain=adzuna.com&sz=16' },
  remotive: { label: 'Remotive',  favicon: 'https://www.google.com/s2/favicons?domain=remotive.com&sz=16' },
  muse:     { label: 'The Muse',  favicon: 'https://www.google.com/s2/favicons?domain=themuse.com&sz=16' },
}

// ─── Job card (horizontal scroll item) ───────────────────────────────────────

function JobCard({ job }: { job: Job }) {
  const src = SOURCE_META[job.source]

  return (
    <a
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-44 h-44 flex flex-col bg-white border border-[var(--border)] rounded-xl p-3.5 hover:border-[var(--accent)] transition-colors"
    >
      {/* Logo + company */}
      <div className="flex items-center gap-2 mb-2">
        <CompanyLogo company={job.company} logo={job.logo} />
        <p className="text-xs text-stone-500 truncate flex-1">{job.company}</p>
      </div>

      {/* Title */}
      <p className="text-sm text-stone-900 font-medium leading-snug line-clamp-2 flex-1">{job.title}</p>

      {/* Location pill */}
      {job.location && (
        <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full truncate mt-1.5 self-start max-w-full">
          📍 {job.location}
        </span>
      )}

      {/* Source + apply — pinned to bottom */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-1">
          <img src={src.favicon} alt={src.label} className="w-3 h-3 rounded-sm" />
          <span className="text-xs text-stone-400">{src.label}</span>
        </div>
        <p className="text-xs text-[var(--accent)] font-medium">Apply →</p>
      </div>
    </a>
  )
}

// ─── Locked jobs row (static placeholders, no API call) ──────────────────────


function LockedJobsRow({ t }: { t: (k: string) => string }) {
  return (
    <div className="px-5 pb-5">
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mt-2.5 mb-3">{t('Job Offers')}</p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative flex-shrink-0 w-44 h-44">
            <div className="blur-sm pointer-events-none select-none w-44 h-44 bg-white border border-[var(--border)] rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-stone-200" />
                <div className="h-3 w-20 bg-stone-200 rounded" />
              </div>
              <div className="h-4 w-32 bg-stone-200 rounded mb-1.5" />
              <div className="h-3 w-24 bg-stone-100 rounded mb-3" />
              <div className="h-5 w-20 bg-stone-100 rounded-full" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf8f4]/75 backdrop-blur-[1px] rounded-xl px-3 text-center">
              <span className="text-lg mb-1">🔒</span>
              <UnlockLink className="px-3 py-1.5 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] text-xs rounded-full transition-colors leading-snug">
                $5 — unlocks all
              </UnlockLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Jobs row under career card ───────────────────────────────────────────────

function JobsRow({ career, country, unlocked }: { career: string; country: string; unlocked?: boolean }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLang()

  useEffect(() => {
    fetch(apiUrl(`/api/jobs?career=${encodeURIComponent(career)}&country=${encodeURIComponent(country)}`))
      .then((r) => r.json())
      .then((data) => { setJobs(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [career, country])

  if (loading) {
    return (
      <div className="px-5 pb-5">
        <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mt-2.5 mb-3">{t('Job Offers')}</p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-52 h-28 bg-stone-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (jobs.length === 0) return null

  const free   = unlocked ? jobs : jobs.slice(0, 1)
  const locked = unlocked ? []   : jobs.slice(1, 4)

  return (
    <div className="px-5 pb-5">
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mt-2.5 mb-3">{t('Job Offers')}</p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {free.map((job) => <JobCard key={job.id} job={job} />)}

        {locked.map((job) => (
          <div key={job.id} className="relative flex-shrink-0 w-44 h-44">
            <div className="blur-sm pointer-events-none select-none">
              <JobCard job={job} />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf8f4]/75 backdrop-blur-[1px] rounded-xl px-3 text-center">
              <span className="text-lg mb-1">🔒</span>
              <UnlockLink className="px-3 py-1.5 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] text-xs rounded-full transition-colors leading-snug">
                $5 — unlocks all
              </UnlockLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Career match card ────────────────────────────────────────────────────────

function MatchCard({ match, rank, delay, country, showJobs, unlocked }: { match: CareerMatch; rank: number; delay: number; country: string; showJobs: boolean; unlocked: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useLang()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white border border-[var(--border)] rounded-xl shadow-[0_1px_3px_rgba(28,25,23,0.06)] overflow-hidden flex flex-col h-full"
    >
      {/* Header — fixed height so salary row always aligns across cards */}
      <div className="p-5 cursor-pointer" onClick={() => setExpanded((e) => !e)}>
        {/* Title area: fixed height regardless of name length */}
        <div className="flex items-start justify-between gap-3 h-[80px]">
          <div className="flex items-start gap-3 overflow-hidden">
            <span className="text-3xl flex-shrink-0 mt-1">{match.emoji}</span>
            <div className="overflow-hidden">
              <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-0.5">#{rank} {t('Match')}</p>
              <h3 className="font-display text-lg text-stone-900 leading-snug line-clamp-2">{match.title}</h3>
              <p className="text-sm text-stone-500">{match.field}</p>
            </div>
          </div>
          {/* Score ring */}
          <div className="flex-shrink-0">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#e8e3da" strokeWidth="4" />
                <motion.circle
                  cx="28" cy="28" r="22"
                  fill="none" stroke="#c2410c" strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - match.score / 100) }}
                  transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-base text-[var(--accent)] leading-none tabular-nums">{match.score}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary + time — always at same Y position */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-stone-50 border border-[var(--border)] rounded-lg px-3 py-2">
            <p className="text-xs text-stone-400">{t('Salary')}</p>
            <p className="text-sm text-stone-900 font-medium">{match.salaryRange}</p>
          </div>
          <div className="flex-1 bg-stone-50 border border-[var(--border)] rounded-lg px-3 py-2">
            <p className="text-xs text-stone-400">{t('Time to hire')}</p>
            <p className="text-sm text-stone-900 font-medium">{match.timeToHire}</p>
          </div>
        </div>

        {/* AI-resistance badge */}
        {(() => {
          const resistance = careerAiResistance[match.title]
          if (!resistance) return null
          const lvl = getRiskLevel(100 - resistance) // invert: low automation = safe career
          const shieldColor = resistance >= 70 ? 'text-green-700' : resistance >= 55 ? 'text-yellow-700' : 'text-orange-700'
          const shieldBg    = resistance >= 70 ? 'bg-green-50 border-green-200' : resistance >= 55 ? 'bg-yellow-50 border-yellow-200' : 'bg-orange-50 border-orange-200'
          return (
            <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full border text-xs ${shieldBg} ${shieldColor}`}>
              <span>🛡️</span>
              <span>{resistance}% {t('AI-resistant')}</span>
            </div>
          )
        })()}

        <p className="text-xs text-stone-400 text-center mt-3">
          {expanded ? t('▲ Less') : t('▼ Why this fits you')}
        </p>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pb-4 border-t border-[var(--border)]"
        >
          <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mt-4 mb-2">{t('Why it fits')}</p>
          <ul className="space-y-1.5 mb-4">
            {match.reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-[var(--accent)] mt-0.5">→</span>{r}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-2">{t('Skills to build')}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {match.skills.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs text-stone-700">{s}</span>
            ))}
          </div>

          {/* Interview prep — unlocked only */}
          {unlocked && (
            <>
              <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-2">{t('Interview Questions')}</p>
              <ul className="space-y-2 mb-5">
                {match.interviewQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-[var(--accent)]/60 mt-0.5 flex-shrink-0">{i + 1}.</span>{q}
                  </li>
                ))}
              </ul>

              <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-2">{t('Learning Roadmap')}</p>
              <div className="flex flex-col gap-2">
                {match.retrainingRoadmap.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 bg-stone-50 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors group"
                  >
                    <div>
                      <p className="text-sm text-stone-900">{r.skill}</p>
                      <p className="text-xs text-stone-400">{r.platform} · Free</p>
                    </div>
                    <span className="text-[var(--accent)] text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Job offers — pinned to bottom */}
      {showJobs && (
        <div className="border-t border-[var(--border)] mt-auto">
          {rank === 1 || unlocked
            ? <JobsRow career={match.title} country={country} unlocked={unlocked} />
            : <LockedJobsRow t={t} />
          }
        </div>
      )}
    </motion.div>
  )
}

function LockedLabel() {
  const { t } = useLang()
  return <p className="text-xs text-stone-500">{t('Unlock to reveal')}</p>
}

// ─── Locked card ──────────────────────────────────────────────────────────────

function LockedCard({ rank, delay }: { rank: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative bg-white border border-[var(--border)] rounded-xl overflow-hidden"
    >
      <div className="p-5 blur-sm select-none pointer-events-none">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-200" />
            <div>
              <p className="text-xs text-stone-400 mb-0.5">#{rank} Match</p>
              <div className="h-4 w-32 bg-stone-200 rounded mb-1" />
              <div className="h-3 w-20 bg-stone-100 rounded" />
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-stone-100" />
        </div>
        <div className="flex gap-3 mt-4">
          <div className="flex-1 h-12 bg-stone-100 rounded-lg" />
          <div className="flex-1 h-12 bg-stone-100 rounded-lg" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf8f4]/70 backdrop-blur-[1px]">
        <span className="text-2xl mb-1">🔒</span>
        <LockedLabel />
      </div>
    </motion.div>
  )
}

// ─── Share section ────────────────────────────────────────────────────────────

function ShareSection({ matches, t }: { matches: CareerMatch[]; t: (k: string) => string }) {
  const [copied, setCopied] = useState(false)
  const top = matches[0]
  if (!top) return null

  const buildShare = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const url = `${origin}/career/${careerSlug(top.title)}`
    const text = `I'm a ${top.score}% match for ${top.title} on GetReHired. Find the career that fits your skills:`
    return { url, text }
  }

  const share = async () => {
    const { url, text } = buildShare()
    // Prefer the native share sheet on supported devices.
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My GetReHired matches', text, url })
        return
      } catch {
        /* user cancelled or unsupported — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75 }}
      className="mt-8 bg-white border border-[var(--border)] rounded-xl p-5 text-center"
    >
      <p className="text-stone-900 font-medium mb-1">🔗 {t('Share your results')}</p>
      <p className="text-stone-500 text-sm mb-4">{t('Know someone whose job changed? Send them their own path.')}</p>
      <button
        onClick={share}
        className="w-full py-3 border border-stone-300 hover:border-stone-500 text-stone-800 rounded-md transition-colors"
      >
        {copied ? `✓ ${t('Link copied')}` : t('Share')}
      </button>
    </motion.div>
  )
}

// ─── Email results section ────────────────────────────────────────────────────

function EmailSection({ matches, name, t, unlocked }: { matches: CareerMatch[]; name: string; t: (k: string) => string; unlocked: boolean }) {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const router = useRouter()

  const send = async () => {
    if (!unlocked) {
      if (PAYMENT_MOCK) router.push('/payment/mock')
      else window.location.href = checkoutUrl()
      return
    }
    if (!email.includes('@')) return
    setStatus('sending')
    try {
      const res = await fetch(apiUrl('/api/send-results'), {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, name, matches }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-8 bg-white border border-[var(--border)] rounded-xl p-5 text-center"
    >
      <p className="text-stone-900 font-medium mb-1">📩 {t('Email my results')}</p>
      <p className="text-stone-500 text-sm mb-4">{t('Get your matches, interview prep and learning roadmap in your inbox.')}</p>

      {status === 'sent' ? (
        <p className="text-green-700 font-medium">✓ {t('Sent! Check your inbox.')}</p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('your@email.com')}
            className="flex-1 bg-white border border-[var(--border)] rounded-md px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <div className="relative group">
            {!unlocked && (
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-900 px-2.5 py-1 text-xs text-[#faf8f4] opacity-0 group-hover:opacity-100 transition-opacity">
                🔒 {t('need to pay')}
              </span>
            )}
            <button
              onClick={send}
              disabled={unlocked && (status === 'sending' || !email.includes('@'))}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-400 text-[#faf8f4] text-sm rounded-md transition-colors"
            >
              {status === 'sending' ? '...' : t('Send')}
            </button>
          </div>
        </div>
      )}
      {status === 'error' && <p className="text-red-600 text-xs mt-2">{t('Something went wrong. Try again.')}</p>}
    </motion.div>
  )
}

// ─── Threat assessment ────────────────────────────────────────────────────────

function ThreatAssessment({ answers }: { answers: Answers }) {
  const [expanded, setExpanded] = useState(false)
  const { lang, t } = useLang()

  const jobTitle  = (answers.jobTitle  as string) || 'Other'
  const tasks     = (answers.dailyTasks as string[]) || []
  const skills    = (answers.skills    as string[]) || []

  const jobRisk    = jobTitleAutomationRisk[jobTitle] ?? 59
  const riskLevel  = getRiskLevel(jobRisk)
  const story      = getDisplacementStory(jobTitle, lang)

  // Tasks sorted worst-first
  const rankedTasks = tasks
    .map((tk) => ({ label: tk, risk: taskAutomationRisk[tk] ?? 50 }))
    .sort((a, b) => b.risk - a.risk)
  const atRiskTasks = rankedTasks.filter((tk) => tk.risk >= 60).slice(0, 4)

  // User's safest skills
  const safeUserSkills = skills
    .map((s) => ({ label: s, safety: skillSafety[s] ?? 50 }))
    .filter((s) => s.safety >= 60)
    .sort((a, b) => b.safety - a.safety)
    .slice(0, 4)

  const riskLabelMap: Record<string, string> = {
    critical: t('Critical automation risk'),
    high:     t('High automation risk'),
    moderate: t('Moderate automation risk'),
    low:      t('Lower automation risk'),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`border rounded-xl p-5 mb-8 ${riskBg[riskLevel]}`}
    >
      <p className="text-[11px] text-stone-500 uppercase tracking-[0.15em] mb-3">{t('The honest picture')}</p>

      {/* Risk bar */}
      <div className="mb-5">
        <div className="flex items-end justify-between mb-1.5">
          <p className="font-display text-stone-900 text-lg">{t(jobTitle)}</p>
          <span className={`text-3xl font-bold ${riskColors[riskLevel]}`}>{jobRisk}%</span>
        </div>
        <div className="w-full h-2.5 bg-stone-200/80 rounded-full overflow-hidden mb-1.5">
          <motion.div
            className={`h-full rounded-full ${riskBarColor[riskLevel]}`}
            initial={{ width: 0 }}
            animate={{ width: `${jobRisk}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <p className={`text-xs font-medium ${riskColors[riskLevel]}`}>
          {riskLabelMap[riskLevel]} — {jobRisk}% {t('of tasks in this role are being automated')}
        </p>
      </div>

      {/* Why — specific technology */}
      <div className="mb-5">
        <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-2">{t("Why it's happening")}</p>
        <p className="text-sm text-stone-600 leading-relaxed">{story.why}</p>
      </div>

      {/* At-risk tasks from user's answers */}
      {atRiskTasks.length > 0 && (
        <div className="mb-5">
          <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-2">{t('Your tasks being replaced')}</p>
          <div className="flex flex-col gap-1.5">
            {atRiskTasks.map((tk) => (
              <div key={tk.label} className="flex items-center justify-between">
                <span className="text-sm text-stone-600">{t(tk.label)}</span>
                <span className={`text-xs font-semibold ${riskColors[getRiskLevel(tk.risk)]}`}>{tk.risk}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-[var(--rule)] my-4" />

      {/* What survives */}
      <div className="mb-5">
        <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-2">{t("What machines still can't take from you")}</p>
        <p className="text-sm text-stone-600 leading-relaxed mb-3">{story.survives}</p>
        {safeUserSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {safeUserSkills.map((s) => (
              <span key={s.label} className="px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs text-green-800">
                {t(s.label)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* The one thing to add */}
      <div className="mb-5 bg-white/70 border border-[var(--border)] rounded-lg p-4">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-1.5">{t('The one thing to add')}</p>
        <p className="text-sm text-stone-900 leading-relaxed">{story.add}</p>
      </div>

      {/* Transition story — collapsed by default */}
      <button onClick={() => setExpanded((e) => !e)} className="w-full text-left">
        <p className="text-[11px] text-stone-500 uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
          {t('Someone who made this jump')}
          <span className="text-stone-400">{expanded ? '▲' : '▼'}</span>
        </p>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 border border-[var(--border)] rounded-lg p-4"
        >
          <p className="text-sm font-medium text-stone-900 mb-0.5">{story.story.person}</p>
          <p className="text-xs text-[var(--accent)] mb-3">{story.story.path}</p>
          <p className="text-sm text-stone-600 leading-relaxed mb-2">{story.story.how}</p>
          <p className="text-sm text-green-700 font-medium">{story.story.win}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Horizontal scroll cards ──────────────────────────────────────────────────

function CarouselCards({ matches, country, unlocked }: { matches: CareerMatch[]; country: string; unlocked: boolean }) {
  if (unlocked) {
    return (
      <div className="flex flex-col gap-6 mb-6">
        {matches.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <MatchCard match={m} rank={i + 1} delay={0} country={country} showJobs={true} unlocked={unlocked} />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-stretch gap-4 overflow-x-auto pb-2 scrollbar-hide mb-6">
      {matches.map((m, i) => (
        <div key={m.title} className="flex-shrink-0 w-[300px] md:flex-1 flex flex-col">
          <MatchCard match={m} rank={i + 1} delay={0.1 + i * 0.1} country={country} showJobs={true} unlocked={unlocked} />
        </div>
      ))}
    </div>
  )
}

// ─── Results page ─────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const router = useRouter()
  const [matches, setMatches]   = useState<CareerMatch[]>([])
  const [answers, setAnswers]   = useState<Answers>({})
  const [name, setName]         = useState('You')
  const [country, setCountry]   = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [payNotice, setPayNotice] = useState<string | null>(null)
  const { lang, t } = useLang()

  useEffect(() => {
    const raw = sessionStorage.getItem('grh_answers')
    if (!raw) { router.push('/'); return }
    const parsed: Answers = JSON.parse(raw)
    setAnswers(parsed)
    setName((parsed.firstName as string) || 'You')
    setCountry((parsed.country as string) || '')
    setMatches(calculateMatches(parsed, lang))
    // Reveal everything if the user has already paid (set on /payment/success).
    if (sessionStorage.getItem('grh_unlocked') === '1') setUnlocked(true)
    // Surface checkout fallbacks instead of a silent reload.
    const pay = new URLSearchParams(window.location.search).get('payment')
    if (pay === 'unavailable') setPayNotice("Payments aren't set up yet — check back soon.")
    else if (pay === 'error') setPayNotice('Something went wrong starting checkout. Please try again.')
  }, [lang])

  if (matches.length === 0) return null

  const free   = unlocked ? matches : matches.slice(0, 3)
  const locked = unlocked ? [] : matches.slice(3)

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-10 relative overflow-hidden">
      <div className="fixed right-5 top-[calc(1.25rem+var(--safe-top))] z-50">
        <LanguageToggle variant="light" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-xs text-stone-500 uppercase tracking-[0.18em] mb-2">{t('Results')}</p>
          <h1 className="font-display text-3xl text-stone-900 mb-2">
            <span className="font-display italic text-[var(--accent)] text-4xl">{name}</span>{t("'s Escape Plan")}
          </h1>
          <p className="text-sm text-stone-500">{t("Here's where you stand — and where you can go")}</p>

        </motion.div>

        {/* Checkout fallback notice */}
        {payNotice && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm text-center">
            {payNotice}
          </div>
        )}

        {/* Threat assessment — shown when we have enough data */}
        {answers.jobTitle && (
          <ThreatAssessment answers={answers} />
        )}

        {/* Free matches — cover flow carousel */}
        <CarouselCards matches={free} country={country} unlocked={unlocked} />


        {/* Paywall — hidden once unlocked */}
        {!unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white border border-stone-900 rounded-xl p-6 mb-4 text-center"
          >
            <p className="font-display text-stone-900 text-xl mb-1">{locked.length} {t('more matches waiting')}</p>
            <p className="text-stone-500 text-sm mb-5">
              {t('See every career path ranked for you — plus skills roadmap, salary insights, and live job listings for each.')}
            </p>
            <UnlockLink className="block w-full py-3.5 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] rounded-md text-base transition-colors">
              {t('Unlock All Matches — $5')}
            </UnlockLink>
            <p className="text-xs text-stone-400 mt-3">{t('One-time payment. No subscription.')}</p>
          </motion.div>
        )}

        {/* Locked cards */}
        {!unlocked && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {locked.map((_, i) => (
              <LockedCard key={i} rank={i + 4} delay={0.7 + i * 0.05} />
            ))}
          </div>
        )}

        {/* Share + email results */}
        <ShareSection matches={matches} t={t} />
        <EmailSection matches={matches} name={name} t={t} unlocked={unlocked} />

      </div>
    </div>
  )
}
