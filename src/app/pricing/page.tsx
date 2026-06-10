'use client'

import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { MarketingShell } from '@/components/site/MarketingShell'

const FREE = [
  'Full career assessment',
  'Your automation-risk read',
  'Top 3 career matches',
  'Why each one fits you',
]

const PAID = [
  'All 30 ranked career matches',
  'Salary range for every match',
  'Time-to-hire estimates',
  'Personalized skills roadmap',
  'Live job listings for each path',
  'Full report emailed to you',
]

const FAQ = [
  {
    q: 'Is it really one payment?',
    a: 'Yes. One-time, no subscription, no auto-renewal. You pay once and your full results stay unlocked for the session — and you can email yourself the complete report to keep.',
  },
  {
    q: 'What if the matches aren’t useful?',
    a: 'The assessment and your top 3 matches are free, so you can judge the quality before paying anything. If something went wrong after you paid, contact us and we’ll make it right.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. There are no accounts at all — you take the assessment anonymously, and after unlocking you can email the full report to yourself.',
  },
  {
    q: 'Where do the job listings come from?',
    a: 'Live third-party job boards, matched to your country and each career path. They refresh as new roles are posted.',
  },
]

export default function PricingPage() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-5">Pricing</p>
          <h1 className="font-display text-3xl sm:text-4xl text-stone-900 leading-[1.15] mb-5">
            Start free. The full report costs{' '}
            <span className="italic text-[var(--accent)]">$5, once.</span>
          </h1>
          <p className="text-stone-600 leading-relaxed">
            No subscription, no hidden fees, no account. Take the whole assessment and see
            your top matches before you decide.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
            {/* Free */}
            <div className="bg-white border border-[var(--border)] rounded-lg p-7 flex flex-col">
              <h2 className="text-stone-900 font-medium">Free</h2>
              <p className="text-sm text-stone-500 mt-1">See where you stand.</p>
              <p className="mt-5 mb-6">
                <span className="font-display text-4xl text-stone-900">$0</span>
              </p>
              <ul className="space-y-3 flex-1">
                {FREE.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <Check className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/assessment"
                className="mt-7 py-2.5 border border-stone-300 hover:border-stone-500 text-stone-800 text-sm rounded-md text-center transition-colors"
              >
                Start the assessment
              </Link>
            </div>

            {/* Paid */}
            <div className="bg-white border border-stone-900 rounded-lg p-7 flex flex-col">
              <h2 className="text-stone-900 font-medium">Full report</h2>
              <p className="text-sm text-stone-500 mt-1">Everything in Free, plus the whole plan.</p>
              <p className="mt-5 mb-6 flex items-baseline gap-2">
                <span className="font-display text-4xl text-[var(--accent)]">$5</span>
                <span className="text-sm text-stone-500">one-time</span>
              </p>
              <ul className="space-y-3 flex-1">
                {PAID.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <Check className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/assessment"
                className="mt-7 py-2.5 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] text-sm rounded-md text-center transition-colors flex items-center justify-center gap-2"
              >
                Start free, unlock at the end
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-stone-400 mt-3 text-center">You only pay after you see your top matches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl text-stone-900 mb-2">Common questions</h2>
            <div>
              {FAQ.map((item, i) => (
                <div key={item.q} className={`py-5 ${i > 0 ? 'border-t border-[var(--rule)]' : ''}`}>
                  <h3 className="text-stone-900 font-medium mb-1.5">{item.q}</h3>
                  <p className="text-[15px] text-stone-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}
