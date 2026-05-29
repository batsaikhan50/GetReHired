'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Coffee } from 'lucide-react'
import { MarketingShell } from '@/components/site/MarketingShell'
import { Star, Sparkle, DoodleUnderline, Arrow } from '@/components/doodle/Doodles'

const FREE = [
  'Full career assessment',
  'Your automation-risk read',
  'Top 3 career matches',
  'Why each one fits you',
  'Results emailed to you',
]

const PAID = [
  'Everything in Free, plus:',
  'All 30 ranked career matches',
  'Salary range for every match',
  'Time-to-hire estimates',
  'Personalized skills roadmap',
  'Live job listings for each path',
  'Interview questions per role',
]

const FAQ = [
  {
    q: 'Is it really one payment?',
    a: 'Yes. One-time, no subscription, no auto-renewal. You pay once and your full results stay unlocked.',
  },
  {
    q: 'What if the matches aren’t useful?',
    a: 'The assessment and your top 3 matches are free, so you can judge the quality before paying anything. If something went wrong after you paid, contact us and we’ll make it right.',
  },
  {
    q: 'Do I need an account?',
    a: 'Not to take the assessment. You can have results emailed to you. An account lets you come back and revisit your full report later.',
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
      <section className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-8 text-center doodle-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
        <Sparkle className="hidden sm:block absolute top-12 left-8 w-5 h-5 text-orange-300/50" />
        <Star className="hidden sm:block absolute bottom-2 right-10 w-6 h-6 text-orange-400/60 doodle-wobble" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-orange-500/40 bg-orange-500/10 relative">
          <Coffee className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-orange-300 font-medium tracking-wide">Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light text-white mb-4 relative leading-snug">
          Start free. Unlock everything for{' '}
          <DoodleUnderline className="text-orange-400 font-normal">the price of a coffee.</DoodleUnderline>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto relative mt-6">
          No subscription. No hidden fees. Try the whole assessment before you decide.
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Free */}
          <div className="bg-[#161b25] border-gray-700 rough-border p-7 flex flex-col">
            <h2 className="text-lg font-medium text-white">Free</h2>
            <p className="text-sm text-gray-500 mt-1">See where you stand.</p>
            <p className="mt-5 mb-6">
              <span className="text-5xl font-doodle text-white">$0</span>
            </p>
            <ul className="space-y-3 flex-1">
              {FREE.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/assessment"
              className="mt-7 py-3 border-gray-600 hover:border-gray-400 text-gray-200 text-sm font-medium rough-border-2 text-center transition-colors"
            >
              Start the assessment
            </Link>
          </div>

          {/* Paid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-b from-orange-500/10 to-[#161b25] border-orange-500/50 rough-border-3 p-7 flex flex-col"
          >
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" /> Most popular
            </span>
            <h2 className="text-lg font-medium text-white">Full Results</h2>
            <p className="text-sm text-gray-500 mt-1">The complete escape plan.</p>
            <p className="mt-5 mb-6 flex items-baseline gap-2">
              <span className="text-5xl font-doodle text-orange-300">$5</span>
              <span className="text-sm text-gray-500">one-time</span>
            </p>
            <ul className="space-y-3 flex-1">
              {PAID.map((f, i) => (
                <li
                  key={f}
                  className={`flex items-start gap-2.5 text-sm ${i === 0 ? 'text-gray-500' : 'text-gray-200'}`}
                >
                  {i !== 0 && <Check className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />}
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/assessment"
              className="mt-7 py-3 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rough-border border-orange-300 text-center transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              Start free, unlock at the end
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-600 mt-3 text-center">You only pay after you see your top matches.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative max-w-2xl mx-auto px-4 sm:px-6 py-14">
        <Arrow className="hidden sm:block absolute -left-4 top-10 w-10 h-10 text-orange-400/40" />
        <h2 className="text-2xl font-light text-white mb-8 text-center">
          Common <span className="font-doodle text-orange-300 text-3xl">questions</span>
        </h2>
        <div className="space-y-5">
          {FAQ.map((item, i) => (
            <div key={item.q} className={`bg-[#161b25] border-gray-700 p-5 ${i % 2 === 0 ? 'rough-border' : 'rough-border-2'}`}>
              <h3 className="text-white font-medium mb-2">{item.q}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  )
}
