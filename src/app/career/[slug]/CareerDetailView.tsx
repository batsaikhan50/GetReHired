'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CircleDollarSign, Clock, GraduationCap, MessagesSquare, Briefcase, ListChecks } from 'lucide-react'
import { MarketingShell } from '@/components/site/MarketingShell'
import { calculateMatches, type CareerDetail } from '@/lib/scoringEngine'
import { fieldIcon } from '@/lib/careerIcons'
import { useLang } from '@/contexts/LanguageContext'
import { Star, Sparkle } from '@/components/doodle/Doodles'

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
    fetch(`/api/jobs?career=${encodeURIComponent(detail.title)}&country=${encodeURIComponent(country)}`)
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
      <section className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-8 text-center doodle-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[280px] rounded-full bg-orange-500/6 blur-[120px] pointer-events-none" />
        <Star className="hidden sm:block absolute top-10 right-10 w-6 h-6 text-orange-400/50 doodle-wobble" />
        <Sparkle className="hidden sm:block absolute top-24 left-12 w-5 h-5 text-orange-300/50" />

        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-orange-500/15 border-2 border-orange-500/40">
          <FieldIcon className="w-9 h-9 text-orange-400" />
          <Sparkle className="absolute -top-1 -right-1 w-4 h-4 text-orange-300" />
        </div>
        <p className="text-xs text-orange-500 uppercase tracking-widest font-medium mb-2 relative">{detail.field}</p>
        <h1 className="text-3xl sm:text-5xl font-doodle text-white mb-4 relative">{detail.title}</h1>

        {personalScore !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/15 border-orange-500/40 rough-border relative"
          >
            <span className="text-orange-400 font-doodle text-2xl leading-none">{personalScore}%</span>
            <span className="text-xs text-gray-400">match for your background</span>
          </motion.div>
        )}

        {/* Key facts */}
        <div className="mt-6 flex justify-center gap-8 relative">
          <div className="flex flex-col items-center">
            <CircleDollarSign className="w-5 h-5 text-orange-400/80 mb-1" />
            <div className="text-lg text-white">{detail.salaryRange}</div>
            <div className="text-xs text-gray-500">typical salary</div>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-5 h-5 text-orange-400/80 mb-1" />
            <div className="text-lg text-white">{detail.timeToHire}</div>
            <div className="text-xs text-gray-500">time to hire</div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 space-y-10">
        {/* What you'd do */}
        <Card title="What you'd actually do" icon={ListChecks} variant="rough-border">
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {detail.tasks.slice(0, 8).map((tk) => (
              <li key={tk} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-orange-400 mt-0.5">•</span>
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
                <li key={r} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="text-orange-400 mt-0.5">✓</span>
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
                className="flex items-center justify-between gap-3 bg-[#0d0f14] border border-gray-800 hover:border-orange-500/40 rounded-xl px-4 py-3 transition-colors group"
              >
                <span className="text-sm text-gray-200">{step.skill}</span>
                <span className="text-xs text-gray-500 group-hover:text-orange-400 whitespace-nowrap">
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
                <li key={q} className="text-sm text-gray-300 pl-1">{q}</li>
              ))}
            </ol>
          </Card>
        )}

        {/* Live jobs */}
        <Card title="Live openings right now" icon={Briefcase} variant="rough-border-2">
          {jobsLoading ? (
            <p className="text-sm text-gray-500">Loading live roles…</p>
          ) : jobs && jobs.length > 0 ? (
            <div className="space-y-2.5">
              {jobs.map((job, i) => (
                <a
                  key={`${job.url}-${i}`}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-[#0d0f14] border border-gray-800 hover:border-orange-500/40 rounded-xl px-4 py-3 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-white truncate">{job.title}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {job.company}{job.location ? ` · ${job.location}` : ''}
                    </div>
                  </div>
                  <span className="text-xs text-orange-400 whitespace-nowrap">Apply →</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No live roles to show right now — try the assessment for matches tuned to your location.
            </p>
          )}
        </Card>

        {/* CTA */}
        <div className="text-center pt-2">
          <p className="text-gray-400 mb-5">
            {personalScore !== null
              ? 'Want the full roadmap and every other match?'
              : 'Curious how well this fits your experience?'}
          </p>
          <Link
            href={personalScore !== null ? '/results' : '/assessment'}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-medium rough-border border-orange-300 transition-all hover:scale-[1.03] shadow-lg shadow-orange-500/25"
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
      className={`bg-[#161b25] border-gray-700 ${variant} p-6`}
    >
      <h2 className="flex items-center gap-2.5 text-lg font-medium text-white mb-4">
        {Icon && (
          <span className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-orange-400" />
          </span>
        )}
        {title}
      </h2>
      {children}
    </motion.section>
  )
}
