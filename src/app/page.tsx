'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Bot, PencilLine, Target, Rocket, ArrowRight, TrendingUp, ShieldCheck,
  BarChart3, Users, Sparkles as SparklesIcon,
} from 'lucide-react'
import { MarketingShell } from '@/components/site/MarketingShell'
import { Star, Sparkle, Squiggle, Arrow, DoodleUnderline } from '@/components/doodle/Doodles'

const STATS = [
  { value: '30', label: 'career paths scored' },
  { value: '~15 min', label: 'to your results' },
  { value: '$0', label: 'to start' },
]

const STEPS = [
  { icon: PencilLine, title: 'Tell us what you did', body: 'A few quick questions about your work, skills, and what you want next. No résumé needed.' },
  { icon: Target, title: 'Get ranked matches', body: 'We score 30 real career paths against your actual experience — and show why each one fits.' },
  { icon: Rocket, title: 'Follow the plan', body: 'Each match comes with a skills roadmap, salary range, and live job openings to apply to.' },
]

const SAMPLE = [
  { rank: 1, icon: BarChart3, title: 'Operations Coordinator', score: 88, field: 'Operations', resist: 'High' },
  { rank: 2, icon: TrendingUp, title: 'Data Analyst', score: 81, field: 'Analytics', resist: 'High' },
  { rank: 3, icon: Users, title: 'Customer Success Manager', score: 76, field: 'Customer', resist: 'Med' },
]

export default function LandingPage() {
  return (
    <MarketingShell>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center doodle-grid">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full bg-orange-500/8 blur-[130px] pointer-events-none" />

        {/* Scattered doodles */}
        <Star className="hidden sm:block absolute top-16 left-8 w-7 h-7 text-orange-400/70 doodle-wobble" />
        <Sparkle className="hidden sm:block absolute top-40 right-10 w-5 h-5 text-orange-300/60" />
        <Star className="hidden sm:block absolute bottom-24 right-24 w-4 h-4 text-orange-400/50" />
        <Sparkle className="hidden sm:block absolute bottom-32 left-16 w-6 h-6 text-orange-300/50 doodle-wobble" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-orange-500/40 bg-orange-500/10 relative"
        >
          <Bot className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-orange-300 font-medium tracking-wide">For people whose jobs changed</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.15] mb-7 relative"
        >
          Your job changed.
          <br />
          <DoodleUnderline className="text-orange-400 font-normal" underlineClassName="text-orange-400">
            Your worth didn&apos;t.
          </DoodleUnderline>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-400 max-w-xl mx-auto mb-9 relative leading-relaxed"
        >
          Find the careers that fit the skills you already have — with a real plan to get there.
          <span className="font-doodle text-orange-300/90 text-xl"> Free to start, ~15 minutes.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center relative"
        >
          <Link
            href="/intro"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-medium rough-border border-orange-300 transition-all hover:scale-[1.03] shadow-lg shadow-orange-500/25"
          >
            Find my next career
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 border-gray-600 text-gray-300 font-medium rough-border-2 hover:border-gray-400 transition-colors"
          >
            How it works
          </Link>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex justify-center items-center gap-6 sm:gap-12 relative"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6 sm:gap-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-doodle text-orange-300">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
              {i < STATS.length - 1 && <span className="text-gray-700 text-2xl">·</span>}
            </div>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-3">
          Three steps. <span className="font-doodle text-orange-300 text-3xl sm:text-4xl">no guesswork.</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-3 mt-10 relative">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-[#161b25] border-gray-700 p-6 ${i % 2 === 0 ? 'rough-border' : 'rough-border-2'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-11 h-11 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </span>
                  <span className="font-doodle text-3xl text-gray-700">{i + 1}</span>
                </div>
                <h3 className="text-white font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.body}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <Divider />

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
          {SAMPLE.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-4 bg-[#161b25] border-gray-700 p-4 ${i % 2 === 0 ? 'rough-border' : 'rough-border-3'}`}
              >
                <span className="font-doodle text-2xl text-gray-600 w-5">{m.rank}</span>
                <span className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-orange-400" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{m.title}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1.5">
                    {m.field}
                    <span className="text-gray-700">·</span>
                    <ShieldCheck className="w-3 h-3 text-green-500/70" />
                    {m.resist} AI-resist
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-doodle text-2xl leading-none">{m.score}%</div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-wide">match</div>
                </div>
              </motion.div>
            )
          })}
          <p className="text-center text-sm text-gray-500 pt-3 font-doodle text-base">
            + 27 more paths, full roadmap & live jobs when you unlock ✨
          </p>
        </div>
      </section>

      <Divider />

      {/* ── Reassurance / empathy ────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="relative bg-gradient-to-b from-orange-500/8 to-transparent border-gray-700 rough-border p-8 sm:p-10">
          <SparklesIcon className="absolute -top-4 -left-3 w-8 h-8 text-orange-400/70 doodle-wobble" />
          <p className="text-2xl sm:text-3xl font-doodle text-white leading-snug">
            &ldquo;You didn&apos;t fail. The world changed faster than anyone expected.
            Your skills still matter — <span className="marker text-white">more than you think.</span>&rdquo;
          </p>
          <p className="text-sm text-gray-500 mt-5">That&apos;s the whole reason this exists.</p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
          Ready to see <span className="font-doodle text-orange-300 text-4xl sm:text-5xl">where you belong next?</span>
        </h2>
        <div className="relative inline-block">
          <Arrow className="hidden sm:block absolute -left-16 -top-6 w-12 h-12 text-orange-400/60 -scale-x-100" />
          <Link
            href="/intro"
            className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 hover:bg-orange-400 text-white font-medium rough-border border-orange-300 transition-all hover:scale-[1.03] shadow-lg shadow-orange-500/25"
          >
            Start free — no card needed
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingShell>
  )
}

function Divider() {
  return (
    <div className="max-w-xs mx-auto text-gray-800 py-2" aria-hidden="true">
      <Squiggle className="w-full h-4" />
    </div>
  )
}
