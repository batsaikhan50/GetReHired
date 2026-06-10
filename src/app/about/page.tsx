'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
  { n: '01', title: 'You answer ~25 quick questions', body: 'No résumé, no jargon. Just what you actually did, what you’re good at, and what you want next.' },
  { n: '02', title: 'We score 30 career paths against you', body: 'Every path is matched on overlap with your real tasks, skills, and tools — not personality guesswork.' },
  { n: '03', title: 'You get ranked matches and a plan', body: 'Each match shows why it fits, the salary range, time-to-hire, the exact skills to build, and live job openings.' },
]

export default function AboutPage() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-5">How it works</p>
          <h1 className="font-display text-3xl sm:text-4xl text-stone-900 leading-[1.15] mb-5">
            Your experience already points somewhere.
            We just do <span className="italic text-[var(--accent)]">the math.</span>
          </h1>
          <p className="text-stone-600 leading-relaxed">
            GetReHired isn&apos;t a personality quiz. It compares what you&apos;ve actually done against
            what real roles need — and shows you where the overlap is strongest.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <ol className="max-w-2xl">
            {STEPS.map((s, i) => (
              <li key={s.n} className={`py-6 ${i > 0 ? 'border-t border-[var(--rule)]' : ''}`}>
                <div className="flex gap-5">
                  <span className="font-display text-lg text-stone-300 tabular-nums pt-0.5">{s.n}</span>
                  <div>
                    <h3 className="text-stone-900 font-medium mb-1.5">{s.title}</h3>
                    <p className="text-[15px] text-stone-600 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scoring breakdown */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl text-stone-900 mb-3">
              How the match score is weighted
            </h2>
            <p className="text-[15px] text-stone-600 mb-10 leading-relaxed">
              Each career path earns points across six factors. The more your real background
              overlaps with what the role needs, the higher the match. The exact weighting:
            </p>

            <div className="space-y-6">
              {WEIGHTS.map((w) => (
                <div key={w.label}>
                  <div className="flex items-baseline justify-between mb-1.5 gap-4">
                    <span className="text-[15px] text-stone-800">{w.label}</span>
                    <span className="font-display text-lg text-[var(--accent)] tabular-nums shrink-0">{w.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-200/70 overflow-hidden">
                    <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${w.pct}%` }} />
                  </div>
                  <p className="text-xs text-stone-500 mt-1.5">{w.note}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-stone-500 mt-10">
              Scores are normalized to a 0–95 range. We never show a fake 100 — there&apos;s always
              something to learn.
            </p>
          </div>
        </div>
      </section>

      {/* Honesty note */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl text-stone-900 mb-4">What we won&apos;t pretend</h2>
            <ul className="space-y-2.5 text-[15px] text-stone-600 list-disc pl-5 leading-relaxed">
              <li>We can&apos;t guarantee you a job — no honest tool can.</li>
              <li>A match score is a starting signal, not a verdict on your worth.</li>
              <li>Job listings come from live third-party sources and change constantly.</li>
              <li>Sometimes the best path is the second or third match — read the reasons, not just the number.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <h2 className="font-display text-2xl sm:text-3xl text-stone-900 mb-6">
            See your matches in about 15 minutes.
          </h2>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] rounded-md transition-colors"
          >
            Start the assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingShell>
  )
}
