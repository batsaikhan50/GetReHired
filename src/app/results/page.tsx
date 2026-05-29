'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { calculateMatches, careerSlug, CareerMatch } from '@/lib/scoringEngine'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLang } from '@/contexts/LanguageContext'
import {
  jobTitleAutomationRisk, taskAutomationRisk, skillSafety,
  careerAiResistance, getRiskLevel, riskColors, riskBg, riskBarColor,
  getDisplacementStory,
} from '@/lib/automationData'

type Answers = Record<string, string | string[]>

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
      className="flex-shrink-0 w-44 h-44 flex flex-col bg-gray-900/70 border border-gray-800 rounded-2xl p-3.5 hover:border-orange-500/40 transition-colors"
    >
      {/* Logo + company */}
      <div className="flex items-center gap-2 mb-2">
        <CompanyLogo company={job.company} logo={job.logo} />
        <p className="text-xs text-gray-500 truncate flex-1">{job.company}</p>
      </div>

      {/* Title */}
      <p className="text-sm text-white font-medium leading-snug line-clamp-2 flex-1">{job.title}</p>

      {/* Location pill */}
      {job.location && (
        <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full truncate mt-1.5 self-start max-w-full">
          📍 {job.location}
        </span>
      )}

      {/* Source + apply — pinned to bottom */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-1">
          <img src={src.favicon} alt={src.label} className="w-3 h-3 rounded-sm" />
          <span className="text-xs text-gray-600">{src.label}</span>
        </div>
        <p className="text-xs text-orange-400 font-medium">Apply →</p>
      </div>
    </a>
  )
}

// ─── Locked jobs row (static placeholders, no API call) ──────────────────────


function LockedJobsRow({ t }: { t: (k: string) => string }) {
  return (
    <div className="px-5 pb-5">
      <p className="text-xs text-gray-600 uppercase tracking-widest mt-2.5 mb-3">{t('Job Offers')}</p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative flex-shrink-0 w-44 h-44">
            <div className="blur-sm pointer-events-none select-none w-44 h-44 bg-gray-900/70 border border-gray-800 rounded-2xl p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gray-700" />
                <div className="h-3 w-20 bg-gray-700 rounded" />
              </div>
              <div className="h-4 w-32 bg-gray-700 rounded mb-1.5" />
              <div className="h-3 w-24 bg-gray-800 rounded mb-3" />
              <div className="h-5 w-20 bg-gray-800 rounded-full" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0f14]/75 rounded-2xl px-3 text-center">
              <span className="text-lg mb-1">🔒</span>
              <button className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-medium rounded-full transition-all leading-snug">
                $5 — unlocks all
              </button>
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
    fetch(`/api/jobs?career=${encodeURIComponent(career)}&country=${encodeURIComponent(country)}`)
      .then((r) => r.json())
      .then((data) => { setJobs(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [career, country])

  if (loading) {
    return (
      <div className="px-5 pb-5">
        <p className="text-xs text-gray-600 uppercase tracking-widest mt-2.5 mb-3">{t('Job Offers')}</p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-52 h-28 bg-gray-900/50 rounded-2xl animate-pulse" />
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
      <p className="text-xs text-gray-600 uppercase tracking-widest mt-2.5 mb-3">{t('Job Offers')}</p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {free.map((job) => <JobCard key={job.id} job={job} />)}

        {locked.map((job) => (
          <div key={job.id} className="relative flex-shrink-0 w-44 h-44">
            <div className="blur-sm pointer-events-none select-none">
              <JobCard job={job} />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0f14]/75 rounded-2xl px-3 text-center">
              <span className="text-lg mb-1">🔒</span>
              <button className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-medium rounded-full transition-all leading-snug">
                $5 — unlocks all
              </button>
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
      className="bg-[#161b25] border-gray-700 rough-border overflow-hidden flex flex-col h-full"
    >
      {/* Header — fixed height so salary row always aligns across cards */}
      <div className="p-5 cursor-pointer" onClick={() => setExpanded((e) => !e)}>
        {/* Title area: fixed height regardless of name length */}
        <div className="flex items-start justify-between gap-3 h-[80px]">
          <div className="flex items-start gap-3 overflow-hidden">
            <span className="text-3xl flex-shrink-0 mt-1">{match.emoji}</span>
            <div className="overflow-hidden">
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-0.5">#{rank} {t('Match')}</p>
              <h3 className="text-lg font-medium text-white leading-snug line-clamp-2">{match.title}</h3>
              <p className="text-sm text-gray-500">{match.field}</p>
            </div>
          </div>
          {/* Score ring */}
          <div className="flex-shrink-0">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#1f2937" strokeWidth="4" />
                <motion.circle
                  cx="28" cy="28" r="22"
                  fill="none" stroke="#f97316" strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - match.score / 100) }}
                  transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-doodle text-xl text-orange-400 leading-none">{match.score}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary + time — always at same Y position */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-gray-800/50 rounded-xl px-3 py-2">
            <p className="text-xs text-gray-600">{t('Salary')}</p>
            <p className="text-sm text-white font-medium">{match.salaryRange}</p>
          </div>
          <div className="flex-1 bg-gray-800/50 rounded-xl px-3 py-2">
            <p className="text-xs text-gray-600">{t('Time to hire')}</p>
            <p className="text-sm text-white font-medium">{match.timeToHire}</p>
          </div>
        </div>

        {/* AI-resistance badge */}
        {(() => {
          const resistance = careerAiResistance[match.title]
          if (!resistance) return null
          const lvl = getRiskLevel(100 - resistance) // invert: low automation = safe career
          const shieldColor = resistance >= 70 ? 'text-green-400' : resistance >= 55 ? 'text-yellow-400' : 'text-orange-400'
          const shieldBg    = resistance >= 70 ? 'bg-green-500/10 border-green-500/20' : resistance >= 55 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-orange-500/10 border-orange-500/20'
          return (
            <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full border text-xs ${shieldBg} ${shieldColor}`}>
              <span>🛡️</span>
              <span>{resistance}% {t('AI-resistant')}</span>
            </div>
          )
        })()}

        <p className="text-xs text-gray-600 text-center mt-3">
          {expanded ? t('▲ Less') : t('▼ Why this fits you')}
        </p>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pb-4 border-t border-gray-800"
        >
          <p className="text-xs text-gray-600 uppercase tracking-widest mt-4 mb-2">{t('Why it fits')}</p>
          <ul className="space-y-1.5 mb-4">
            {match.reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-orange-500 mt-0.5">→</span>{r}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">{t('Skills to build')}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {match.skills.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300">{s}</span>
            ))}
          </div>

          {/* Interview prep — unlocked only */}
          {unlocked && (
            <>
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">{t('Interview Questions')}</p>
              <ul className="space-y-2 mb-5">
                {match.interviewQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-orange-500/60 mt-0.5 flex-shrink-0">{i + 1}.</span>{q}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">{t('Learning Roadmap')}</p>
              <div className="flex flex-col gap-2">
                {match.retrainingRoadmap.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 bg-gray-800/60 border border-gray-700 rounded-xl hover:border-orange-500/40 transition-colors group"
                  >
                    <div>
                      <p className="text-sm text-white">{r.skill}</p>
                      <p className="text-xs text-gray-500">{r.platform} · Free</p>
                    </div>
                    <span className="text-orange-400 text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Job offers — pinned to bottom */}
      {showJobs && (
        <div className="border-t border-gray-800/60 mt-auto">
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
  return <p className="text-xs text-gray-500">{t('Unlock to reveal')}</p>
}

// ─── Locked card ──────────────────────────────────────────────────────────────

function LockedCard({ rank, delay }: { rank: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative bg-[#161b25] border border-gray-800 rounded-3xl overflow-hidden"
    >
      <div className="p-5 blur-sm select-none pointer-events-none">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700" />
            <div>
              <p className="text-xs text-gray-600 mb-0.5">#{rank} Match</p>
              <div className="h-4 w-32 bg-gray-700 rounded mb-1" />
              <div className="h-3 w-20 bg-gray-800 rounded" />
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-gray-800" />
        </div>
        <div className="flex gap-3 mt-4">
          <div className="flex-1 h-12 bg-gray-800/50 rounded-xl" />
          <div className="flex-1 h-12 bg-gray-800/50 rounded-xl" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0f14]/60">
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
      className="mt-8 bg-[#161b25] border-gray-700 rough-border-2 p-5 text-center"
    >
      <p className="text-white font-medium mb-1">🔗 {t('Share your results')}</p>
      <p className="text-gray-500 text-sm mb-4">{t('Know someone whose job changed? Send them their own path.')}</p>
      <button
        onClick={share}
        className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rough-border-2 border-gray-600 transition-colors"
      >
        {copied ? `✓ ${t('Link copied')}` : t('Share')}
      </button>
    </motion.div>
  )
}

// ─── Email results section ────────────────────────────────────────────────────

function EmailSection({ matches, name, t }: { matches: CareerMatch[]; name: string; t: (k: string) => string }) {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const send = async () => {
    if (!email.includes('@')) return
    setStatus('sending')
    try {
      const res = await fetch('/api/send-results', {
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
      className="mt-8 bg-[#161b25] border-gray-700 rough-border p-5 text-center"
    >
      <p className="text-white font-medium mb-1">📩 {t('Email my results')}</p>
      <p className="text-gray-500 text-sm mb-4">{t('Get your matches, interview prep and learning roadmap in your inbox.')}</p>

      {status === 'sent' ? (
        <p className="text-orange-400 font-medium">✓ {t('Sent! Check your inbox.')}</p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('your@email.com')}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button
            onClick={send}
            disabled={status === 'sending' || !email.includes('@')}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 disabled:bg-gray-800 disabled:text-gray-600 text-white text-sm font-medium rough-border-2 border-orange-300 transition-all"
          >
            {status === 'sending' ? '...' : t('Send')}
          </button>
        </div>
      )}
      {status === 'error' && <p className="text-red-400 text-xs mt-2">{t('Something went wrong. Try again.')}</p>}
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
      className={`rough-border p-5 mb-8 ${riskBg[riskLevel]}`}
    >
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{t('The honest picture')}</p>

      {/* Risk bar */}
      <div className="mb-5">
        <div className="flex items-end justify-between mb-1.5">
          <p className="text-white font-semibold text-lg">{t(jobTitle)}</p>
          <span className={`text-3xl font-bold ${riskColors[riskLevel]}`}>{jobRisk}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden mb-1.5">
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
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">{t("Why it's happening")}</p>
        <p className="text-sm text-gray-300 leading-relaxed">{story.why}</p>
      </div>

      {/* At-risk tasks from user's answers */}
      {atRiskTasks.length > 0 && (
        <div className="mb-5">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">{t('Your tasks being replaced')}</p>
          <div className="flex flex-col gap-1.5">
            {atRiskTasks.map((tk) => (
              <div key={tk.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{t(tk.label)}</span>
                <span className={`text-xs font-semibold ${riskColors[getRiskLevel(tk.risk)]}`}>{tk.risk}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-700/40 my-4" />

      {/* What survives */}
      <div className="mb-5">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">{t("What machines still can't take from you")}</p>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">{story.survives}</p>
        {safeUserSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {safeUserSkills.map((s) => (
              <span key={s.label} className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400">
                {t(s.label)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* The one thing to add */}
      <div className="mb-5 bg-[#0d0f14]/60 rounded-2xl p-4">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-1.5">{t('The one thing to add')}</p>
        <p className="text-sm text-white leading-relaxed">{story.add}</p>
      </div>

      {/* Transition story — collapsed by default */}
      <button onClick={() => setExpanded((e) => !e)} className="w-full text-left">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
          {t('Someone who made this jump')}
          <span className="text-gray-600">{expanded ? '▲' : '▼'}</span>
        </p>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d0f14]/60 rounded-2xl p-4"
        >
          <p className="text-sm font-medium text-white mb-0.5">{story.story.person}</p>
          <p className="text-xs text-orange-400 mb-3">{story.story.path}</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-2">{story.story.how}</p>
          <p className="text-sm text-green-400 font-medium">{story.story.win}</p>
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
  const { lang, t } = useLang()

  useEffect(() => {
    const raw = sessionStorage.getItem('grh_answers')
    if (!raw) { router.push('/'); return }
    const parsed: Answers = JSON.parse(raw)
    setAnswers(parsed)
    setName((parsed.firstName as string) || 'You')
    setCountry((parsed.country as string) || '')
    setMatches(calculateMatches(parsed, lang))
  }, [lang])

  if (matches.length === 0) return null

  const free   = unlocked ? matches : matches.slice(0, 3)
  const locked = unlocked ? [] : matches.slice(3)

  return (
    <div className="min-h-screen bg-[#0d0f14] px-4 py-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed top-5 right-5 z-50">
        <LanguageToggle />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-xs text-orange-500 uppercase tracking-widest font-medium mb-2">{t('Results')}</p>
          <h1 className="text-3xl font-light text-white mb-2">
            <span className="font-doodle text-orange-400 text-5xl">{name}</span>{t("'s Escape Plan")}
          </h1>
          <p className="text-sm text-gray-500">{t("Here's where you stand — and where you can go")}</p>

        </motion.div>

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
            className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/40 rough-border p-5 mb-4 text-center"
          >
            <p className="text-orange-400 font-semibold text-lg mb-1">🔓 {locked.length} {t('more matches waiting')}</p>
            <p className="text-gray-400 text-sm mb-4">
              {t('See every career path ranked for you — plus skills roadmap, salary insights, and live job listings for each.')}
            </p>
            <button
              onClick={() => setUnlocked(true)}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-medium rough-border border-orange-300 text-base transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/25"
            >
              {t('Unlock All Matches — $5')}
            </button>
            <p className="text-xs text-gray-600 mt-2">{t('One-time payment. No subscription.')}</p>
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
        <EmailSection matches={matches} name={name} t={t} />

      </div>
    </div>
  )
}
