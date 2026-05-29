'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MarketingShell } from '@/components/site/MarketingShell'

const WEIGHTS = [
  { label: 'What you did day-to-day', pct: 40, note: 'Your real tasks vs. what each role actually requires' },
  { label: 'Skills you already have', pct: 30, note: 'Confident-from-day-one skills, matched to the role' },
  { label: 'Tools you’ve used', pct: 10, note: 'Software and equipment overlap' },
  { label: 'Industry experience', pct: 8, note: 'Where your background transfers directly' },
  { label: 'Your strongest edge', pct: 7, note: 'The thing people come to you for' },
  { label: 'Salary & timing fit', pct: 5, note: 'Matches your target pay and how soon you need to start' },
]

const STEPS = [
  { n: 1, title: 'You answer ~25 quick questions', body: 'No résumé, no jargon. Just what you actually did, what you’re good at, and what you want next.' },
  { n: 2, title: 'We score 30 career paths against you', body: 'Every path is matched on overlap with your real tasks, skills, and tools — not personality guesswork.' },
  { n: 3, title: 'You get ranked matches + a plan', body: 'Each match shows why it fits, the salary range, time-to-hire, the exact skills to build, and live job openings.' },
]

export default function AboutPage() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
        <p className="text-xs text-orange-500 uppercase tracking-widest font-medium mb-3 relative">How it works</p>
        <h1 className="text-3xl sm:text-4xl font-light text-white mb-4 relative">
          Your experience already points somewhere.
          <br className="hidden sm:block" /> We just do the math.
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto relative">
          GetReHired isn&apos;t a personality quiz. It compares what you&apos;ve actually done against
          what real roles need — and shows you where the overlap is strongest.
        </p>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#161b25] border border-gray-800 rounded-2xl p-5"
            >
              <div className="w-9 h-9 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center font-medium mb-4">
                {s.n}
              </div>
              <h3 className="text-white font-medium mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Scoring breakdown */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-light text-white mb-2 text-center">How we calculate your match %</h2>
        <p className="text-sm text-gray-500 mb-8 text-center max-w-xl mx-auto">
          Each career path earns points across these factors. The more your real background overlaps
          with what the role needs, the higher the match. Here&apos;s the exact weighting:
        </p>

        <div className="space-y-4">
          {WEIGHTS.map((w, i) => (
            <motion.div
              key={w.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm text-gray-200">{w.label}</span>
                <span className="text-sm text-orange-400 font-medium tabular-nums">{w.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${w.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6 }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">{w.note}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-gray-600 mt-8 text-center">
          Scores are normalized to a 0–95% range. We never show a fake 100% — there&apos;s always
          something to learn.
        </p>
      </section>

      {/* Honesty note */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-[#161b25] border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-medium text-white mb-3">What we won&apos;t pretend</h2>
          <ul className="space-y-2.5 text-sm text-gray-400 list-disc pl-5">
            <li>We can&apos;t guarantee you a job — no honest tool can.</li>
            <li>Match % is a starting signal, not a verdict on your worth.</li>
            <li>Job listings come from live third-party sources and change constantly.</li>
            <li>The best path is sometimes the second or third match — read the reasons, not just the number.</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h2 className="text-2xl font-light text-white mb-5">See your matches in about 15 minutes.</h2>
        <Link
          href="/assessment"
          className="inline-block px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-full transition-all hover:scale-[1.03] shadow-lg shadow-orange-500/25"
        >
          Start free →
        </Link>
      </section>
    </MarketingShell>
  )
}
