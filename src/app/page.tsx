'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MarketingShell } from '@/components/site/MarketingShell'

const STATS = [
  { value: '30', label: 'career paths scored' },
  { value: '~15 min', label: 'to your results' },
  { value: '$0', label: 'to start' },
]

const STEPS = [
  { icon: '📝', title: 'Tell us what you did', body: 'A few quick questions about your work, skills, and what you want next. No résumé needed.' },
  { icon: '🎯', title: 'Get ranked matches', body: 'We score real career paths against your actual experience — and show why each one fits.' },
  { icon: '🚀', title: 'Follow the plan', body: 'Each match comes with a skills roadmap, salary range, and live job openings to apply to.' },
]

const SAMPLE = [
  { rank: 1, emoji: '📋', title: 'Operations Coordinator', score: 88, field: 'Operations' },
  { rank: 2, emoji: '📊', title: 'Data Analyst', score: 81, field: 'Analytics' },
  { rank: 3, emoji: '🤝', title: 'Customer Success Manager', score: 76, field: 'Customer' },
]

export default function LandingPage() {
  return (
    <MarketingShell>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full bg-orange-500/8 blur-[130px] pointer-events-none" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-orange-500 uppercase tracking-widest font-medium mb-5 relative"
        >
          For people whose jobs changed
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] mb-6 relative"
        >
          Your job changed.
          <br />
          <span className="text-orange-400 font-normal">Your worth didn&apos;t.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-400 max-w-xl mx-auto mb-9 relative leading-relaxed"
        >
          Find the careers that fit the skills you already have — with a real plan to get there.
          Free to start, results in about 15 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center relative"
        >
          <Link
            href="/intro"
            className="px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-full transition-all hover:scale-[1.03] shadow-lg shadow-orange-500/25"
          >
            Find my next career →
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 border border-gray-700 hover:border-gray-500 text-gray-300 font-medium rounded-full transition-colors"
          >
            How it works
          </Link>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex justify-center gap-8 sm:gap-14 relative"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-12">
          Three steps. No guesswork.
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#161b25] border border-gray-800 rounded-2xl p-6"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-medium mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Sample results preview ───────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">
            A glimpse of what you&apos;ll get
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Ranked matches with a real percentage — based on your actual experience, not a quiz vibe.
          </p>
        </div>

        <div className="space-y-3 max-w-xl mx-auto">
          {SAMPLE.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 bg-[#161b25] border border-gray-800 rounded-2xl p-4"
            >
              <span className="text-xs text-gray-600 w-4">{m.rank}</span>
              <span className="text-2xl">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{m.title}</div>
                <div className="text-xs text-gray-500">{m.field}</div>
              </div>
              <div className="text-right">
                <div className="text-orange-400 font-medium tabular-nums">{m.score}%</div>
                <div className="text-[10px] text-gray-600 uppercase tracking-wide">match</div>
              </div>
            </motion.div>
          ))}
          <p className="text-center text-xs text-gray-600 pt-2">+ 10 more paths, full roadmap, and live jobs when you unlock</p>
        </div>
      </section>

      {/* ── Reassurance / empathy ────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-gradient-to-b from-orange-500/8 to-transparent border border-gray-800 rounded-3xl p-8 sm:p-10">
          <p className="text-xl sm:text-2xl font-light text-white leading-relaxed">
            &ldquo;You didn&apos;t fail. The world changed faster than anyone expected.
            <br className="hidden sm:block" />
            Your skills still matter — more than you think.&rdquo;
          </p>
          <p className="text-sm text-gray-500 mt-5">That&apos;s the whole reason this exists.</p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-3xl font-light text-white mb-6">Ready to see where you belong next?</h2>
        <Link
          href="/intro"
          className="inline-block px-10 py-4 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-full transition-all hover:scale-[1.03] shadow-lg shadow-orange-500/25"
        >
          Start free — no card needed
        </Link>
      </section>
    </MarketingShell>
  )
}
