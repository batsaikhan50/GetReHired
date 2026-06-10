'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CircleDollarSign, Clock, GraduationCap, MessagesSquare, Briefcase, ListChecks } from 'lucide-react'
import { MarketingShell } from '@/components/site/MarketingShell'
import { calculateMatches, type CareerDetail } from '@/lib/scoringEngine'
import { fieldIcon } from '@/lib/careerIcons'
import { apiUrl } from '@/lib/api'
import { useLang } from '@/contexts/LanguageContext'
import { Star } from '@/components/doodle/Doodles'

type Job = { title: string; company: string; location: string; url: string }

// Assessment options carry an emoji prefix (e.g. "👥 Managed people"). Strip it
// for clean display on the standalone career page.
const clean = (s: string) => s.replace(/^[^\p{L}\p{N}]+/u, '').trim()

export function CareerDetailView({ detail }: { detail: CareerDetail }) {
  const { lang } = useLang()
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [jobsLoading, setJobsLoading] = useState(true)
  const [personalScore, setPersonalScore] = useState<number | null>(null)
  const [country, setCountry] = useState('')

  // Personalize: if the visitor has taken the assessment, surface their match %.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('grh_answers')
      if (!raw) return
      const answers = JSON.parse(raw)
      setCountry((answers.country as string) || '')
      const match = calculateMatches(answers, lang).find((m) => m.title === detail.title)
      if (match) setPersonalScore(match.score)
    } catch {
      /* ignore */
    }
  }, [lang, detail.title])

  // Live job openings for this career.
  useEffect(() => {
    let cancelled = false
    setJobsLoading(true)
    fetch(apiUrl(`/api/jobs?career=${encodeURIComponent(detail.title)}&country=${encodeURIComponent(country)}`))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!cancelled) setJobs(Array.isArray(data) ? data.slice(0, 5) : [])
      })
      .catch(() => !cancelled && setJobs([]))
      .finally(() => !cancelled && setJobsLoading(false))
    return () => {
      cancelled = true
    }
  }, [detail.title, country])

  const FieldIcon = fieldIcon(detail.field)

  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-8 text-center">
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-white border border-[var(--border)] shadow-[0_1px_3px_rgba(28,25,23,0.06)]">
          <FieldIcon className="w-9 h-9 text-[var(--accent)]" />
        </div>
        <p className="text-xs text-stone-500 uppercase tracking-[0.18em] mb-2 relative">{detail.field}</p>
        <h1 className="font-display text-3xl sm:text-5xl text-stone-900 mb-4 relative">{detail.title}</h1>

        {personalScore !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full relative"
          >
            <span className="text-[var(--accent)] font-display text-xl leading-none tabular-nums">{personalScore}%</span>
            <span className="text-xs text-stone-500">match for your background</span>
          </motion.div>
        )}

        {/* Key facts */}
        <div className="mt-6 flex justify-center gap-8 relative">
          <div className="flex flex-col items-center">
            <CircleDollarSign className="w-5 h-5 text-[var(--accent)] mb-1" />
            <div className="font-display text-lg text-stone-900">{detail.salaryRange}</div>
            <div className="text-xs text-gray-500">typical salary</div>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-5 h-5 text-[var(--accent)] mb-1" />
            <div className="font-display text-lg text-stone-900">{detail.timeToHire}</div>
            <div className="text-xs text-gray-500">time to hire</div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 space-y-10">
        {/* What you'd do */}
        <Card title="What you'd actually do" icon={ListChecks} variant="rough-border">
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {detail.tasks.slice(0, 8).map((tk) => (
              <li key={tk} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-[var(--accent)] mt-0.5">•</span>
                {clean(tk)}
              </li>
            ))}
          </ul>
        </Card>

        {/* Why this path */}
        {detail.whyItFits.length > 0 && (
          <Card title="Why this path is worth it" icon={Star} variant="rough-border-2">
            <ul className="space-y-2.5">
              {detail.whyItFits.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-stone-600">
                  <span className="text-[var(--accent)] mt-0.5">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Skills to build */}
        <Card title="Skills to build (free resources)" icon={GraduationCap} variant="rough-border-3">
          <div className="space-y-2.5">
            {detail.retrainingRoadmap.map((step) => (
              <a
                key={step.skill}
                href={step.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 bg-stone-50 border border-[var(--border)] hover:border-[var(--accent)] rounded-lg px-4 py-3 transition-colors group"
              >
                <span className="text-sm text-stone-800">{step.skill}</span>
                <span className="text-xs text-stone-400 group-hover:text-[var(--accent)] whitespace-nowrap">
                  {step.platform} →
                </span>
              </a>
            ))}
          </div>
        </Card>

        {/* Interview questions */}
        {detail.interviewQuestions.length > 0 && (
          <Card title="Questions you might be asked" icon={MessagesSquare} variant="rough-border">
            <ol className="space-y-2.5 list-decimal pl-5">
              {detail.interviewQuestions.map((q) => (
                <li key={q} className="text-sm text-stone-600 pl-1">{q}</li>
              ))}
            </ol>
          </Card>
        )}

        {/* Live jobs */}
        <Card title="Live openings right now" icon={Briefcase} variant="rough-border-2">
          {jobsLoading ? (
            <p className="text-sm text-stone-400">Loading live roles…</p>
          ) : jobs && jobs.length > 0 ? (
            <div className="space-y-2.5">
              {jobs.map((job, i) => (
                <a
                  key={`${job.url}-${i}`}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-stone-50 border border-[var(--border)] hover:border-[var(--accent)] rounded-lg px-4 py-3 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-stone-900 truncate">{job.title}</div>
                    <div className="text-xs text-stone-400 truncate">
                      {job.company}{job.location ? ` · ${job.location}` : ''}
                    </div>
                  </div>
                  <span className="text-xs text-[var(--accent)] whitespace-nowrap">Apply →</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-400">
              No live roles to show right now — try the assessment for matches tuned to your location.
            </p>
          )}
        </Card>

        {/* CTA */}
        <div className="text-center pt-2">
          <p className="text-stone-500 mb-5">
            {personalScore !== null
              ? 'Want the full roadmap and every other match?'
              : 'Curious how well this fits your experience?'}
          </p>
          <Link
            href={personalScore !== null ? '/results' : '/assessment'}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] rounded-md transition-colors"
          >
            {personalScore !== null ? 'Back to my results' : 'Take the free assessment'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </MarketingShell>
  )
}

function Card({
  title,
  icon: Icon,
  variant = 'rough-border',
  children,
}: {
  title: string
  icon?: React.ComponentType<{ className?: string }>
  variant?: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-[var(--border)] rounded-xl shadow-[0_1px_3px_rgba(28,25,23,0.06)] p-6"
    >
      <h2 className="flex items-center gap-2.5 font-display text-lg text-stone-900 mb-4">
        {Icon && (
          <span className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-[var(--accent)]" />
          </span>
        )}
        {title}
      </h2>
      {children}
    </motion.section>
  )
}
