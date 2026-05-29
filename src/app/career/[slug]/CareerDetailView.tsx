'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MarketingShell } from '@/components/site/MarketingShell'
import { calculateMatches, type CareerDetail } from '@/lib/scoringEngine'
import { useLang } from '@/contexts/LanguageContext'

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

  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-8 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[280px] rounded-full bg-orange-500/6 blur-[120px] pointer-events-none" />
        <div className="text-5xl mb-4 relative">{detail.emoji}</div>
        <p className="text-xs text-orange-500 uppercase tracking-widest font-medium mb-2 relative">{detail.field}</p>
        <h1 className="text-3xl sm:text-4xl font-light text-white mb-4 relative">{detail.title}</h1>

        {personalScore !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full relative"
          >
            <span className="text-orange-400 font-medium">{personalScore}% match</span>
            <span className="text-xs text-gray-400">for your background</span>
          </motion.div>
        )}

        {/* Key facts */}
        <div className="mt-6 flex justify-center gap-8 relative">
          <div className="text-center">
            <div className="text-xl font-light text-white">{detail.salaryRange}</div>
            <div className="text-xs text-gray-500 mt-0.5">typical salary</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-light text-white">{detail.timeToHire}</div>
            <div className="text-xs text-gray-500 mt-0.5">time to hire</div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 space-y-10">
        {/* What you'd do */}
        <Card title="What you'd actually do">
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
          <Card title="Why this path is worth it">
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
        <Card title="Skills to build (free resources)">
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
          <Card title="Questions you might be asked">
            <ol className="space-y-2.5 list-decimal pl-5">
              {detail.interviewQuestions.map((q) => (
                <li key={q} className="text-sm text-gray-300 pl-1">{q}</li>
              ))}
            </ol>
          </Card>
        )}

        {/* Live jobs */}
        <Card title="Live openings right now">
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
            className="inline-block px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-full transition-all hover:scale-[1.03] shadow-lg shadow-orange-500/25"
          >
            {personalScore !== null ? 'Back to my results →' : 'Take the free assessment →'}
          </Link>
        </div>
      </div>
    </MarketingShell>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#161b25] border border-gray-800 rounded-2xl p-6"
    >
      <h2 className="text-lg font-medium text-white mb-4">{title}</h2>
      {children}
    </motion.section>
  )
}
