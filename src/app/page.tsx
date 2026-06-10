'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { SiteNav } from '@/components/site/SiteNav'
import { Footer } from '@/components/site/Footer'

// A concrete, believable sample — specificity is what makes it feel real.
const SAMPLE_PERSON = 'Retail store manager · 9 years'
const SAMPLE_ROWS = [
  { title: 'Operations Coordinator', score: 88, salary: '$48–72k', note: 'scheduling, vendors, inventory' },
  { title: 'Customer Success Manager', score: 82, salary: '$55–80k', note: 'retention, difficult conversations' },
  { title: 'Project Coordinator', score: 76, salary: '$50–75k', note: 'deadlines, many moving parts' },
]

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Tell us what you did',
    body: 'Not your résumé — the actual work. Who you managed, what you fixed when it broke, which tools you used every day, and what you’d rather never do again.',
  },
  {
    n: '02',
    title: 'We score 30 career paths',
    body: 'Each path gets a 0–100 fit score built from your answers, weighted toward skills that transfer and roles AI is least likely to swallow next.',
  },
  {
    n: '03',
    title: 'Leave with a plan',
    body: 'Salary range, time to hire, the skills you’re missing, and current openings you can apply to. A list you can act on this week.',
  },
]

// ─── Section content (shared by desktop scroll and mobile pager) ─────────────

function HeroText() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-5">
        For people whose jobs changed
      </p>
      <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-stone-900 mb-6">
        The work you did
        <br />
        still <span className="italic text-[var(--accent)]">counts.</span>
      </h1>
      <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
        AI changed your job — not the years you spent learning it. Tell us what
        you actually did at work, and we&apos;ll score 30 realistic career paths
        against your experience: salary ranges, skill gaps, live openings.
        Your top three matches are free.
      </p>
      <div className="flex flex-wrap items-center gap-5">
        <Link
          href="/intro"
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] rounded-md transition-colors"
        >
          Start the assessment
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/about" className="text-sm text-stone-600 underline underline-offset-4 decoration-stone-300 hover:text-stone-900">
          How the scoring works
        </Link>
      </div>
      <p className="mt-6 text-sm text-stone-400">
        Takes about 15 minutes. No account, no subscription — the full report is $5, once.
      </p>
    </div>
  )
}

function SampleReport({ standalone = false }: { standalone?: boolean }) {
  return (
    <div className="w-full max-w-md mx-auto">
      {standalone && (
        <h2 className="font-display text-2xl sm:text-3xl text-stone-900 mb-6 text-center">
          What a report looks like
        </h2>
      )}
      <div className="bg-white border border-[var(--border)] rounded-lg shadow-[0_1px_3px_rgba(28,25,23,0.06)] overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-[var(--border)] flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-[0.15em] text-stone-400">Sample report</span>
          <span className="text-xs text-stone-500">{SAMPLE_PERSON}</span>
        </div>
        <ul>
          {SAMPLE_ROWS.map((r, i) => (
            <li key={r.title} className={`px-5 py-4 ${i > 0 ? 'border-t border-[var(--border)]' : ''}`}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[15px] text-stone-900">{r.title}</span>
                <span className="font-display text-xl text-[var(--accent)] tabular-nums shrink-0">{r.score}</span>
              </div>
              <div className="mt-0.5 flex items-baseline justify-between gap-3 text-xs text-stone-500">
                <span>{r.note}</span>
                <span className="tabular-nums shrink-0">{r.salary}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-5 py-3 bg-stone-50 border-t border-[var(--border)]">
          <p className="text-xs text-stone-400">+ 27 more paths in the full report</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-stone-400 leading-relaxed text-center">
        Scores come from 40+ answers about tasks, tools and people — not a personality quiz.
      </p>
    </div>
  )
}

function HowItWorks() {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl sm:text-3xl text-stone-900 mb-8">How it works</h2>
      <ol>
        {HOW_IT_WORKS.map((s, i) => (
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
  )
}

function WhyThisExists() {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl sm:text-3xl text-stone-900 mb-5">Why this exists</h2>
      <div className="space-y-4 text-[15px] sm:text-base text-stone-600 leading-relaxed">
        <p>
          Millions of people are being told their experience is obsolete. Mostly,
          it&apos;s labeled wrong. A dispatcher is most of a logistics coordinator.
          A bank teller is halfway to customer success. A store manager has run
          more difficult projects than many project managers.
        </p>
        <p>
          This tool relabels what you already know — and is honest about the
          gaps. The assessment is free. If you want all 30 matches with the
          full plan, it&apos;s <span className="text-stone-900">$5, once</span>. No
          subscription, no account, no recruiter emails.
        </p>
      </div>
    </div>
  )
}

function FinalCta({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'text-center' : ''}>
      <h2 className="font-display text-3xl sm:text-4xl text-stone-900 mb-6">
        Ready when <span className="italic text-[var(--accent)]">you</span> are.
      </h2>
      <Link
        href="/intro"
        className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] rounded-md transition-colors"
      >
        Start the assessment
        <ArrowRight className="w-4 h-4" />
      </Link>
      <p className="mt-4 text-sm text-stone-400">Free · about 15 minutes · no account needed</p>
    </div>
  )
}

// ─── Mobile pager ─────────────────────────────────────────────────────────────
// One swipe = one page (controlled state + spring), which feels native and
// deterministic — scroll-snap lets a fast fling skip pages.

function MobilePager({ pages }: { pages: ReactNode[] }) {
  const [page, setPage] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const measure = () => setHeight(window.innerHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const clamp = (n: number) => Math.max(0, Math.min(pages.length - 1, n))

  return (
    <div className="fixed inset-0 overflow-hidden bg-[var(--background)]">
      <motion.div
        animate={{ y: -page * height }}
        transition={{ type: 'spring', stiffness: 250, damping: 32 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.14}
        onDragEnd={(_, info) => {
          if (info.offset.y < -60 || info.velocity.y < -450) setPage((p) => clamp(p + 1))
          else if (info.offset.y > 60 || info.velocity.y > 450) setPage((p) => clamp(p - 1))
        }}
      >
        {pages.map((content, i) => (
          <div
            key={i}
            style={{ height: height || '100dvh' }}
            className="flex flex-col justify-center overflow-hidden px-6 pt-[calc(4rem+var(--safe-top))] pb-[calc(1.25rem+var(--safe-bottom))]"
          >
            {content}
          </div>
        ))}
      </motion.div>

      {/* Pager dots */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            aria-label={`Page ${i + 1}`}
            onClick={() => setPage(i)}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              i === page ? 'h-5 bg-[var(--accent)]' : 'h-1.5 bg-stone-300'
            }`}
          />
        ))}
      </div>

      {/* Swipe hint until the user moves off the first page */}
      {page === 0 && (
        <div className="fixed bottom-[calc(0.75rem+var(--safe-bottom))] left-1/2 -translate-x-1/2 z-40 text-stone-400 animate-bounce pointer-events-none">
          <ChevronDown className="w-5 h-5" />
        </div>
      )}
    </div>
  )
}

// Compact footer links for the last mobile page (the full Footer would
// overflow a single screen).
function MobileFooterLinks() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-stone-400">
      <Link href="/about" className="hover:text-stone-600">How it works</Link>
      <Link href="/pricing" className="hover:text-stone-600">Pricing</Link>
      <Link href="/privacy" className="hover:text-stone-600">Privacy</Link>
      <Link href="/terms" className="hover:text-stone-600">Terms</Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  // null until mounted → the prerendered HTML is the full desktop layout (good
  // for SEO); phones switch to the pager right after hydration.
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <SiteNav />
        <MobilePager
          pages={[
            <HeroText key="hero" />,
            <SampleReport key="sample" standalone />,
            <HowItWorks key="how" />,
            <div key="cta">
              <WhyThisExists />
              <div className="mt-10">
                <FinalCta />
              </div>
              <MobileFooterLinks />
            </div>,
          ]}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <SiteNav />
      <main className="flex-1 pt-[calc(4rem+var(--safe-top))]">
        {/* Hero: text left, proof artifact right */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-20 pb-20 grid lg:grid-cols-[7fr_5fr] gap-14 items-center">
          <HeroText />
          <SampleReport />
        </section>

        <section className="border-t border-[var(--rule)]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
            <HowItWorks />
          </div>
        </section>

        <section className="border-t border-[var(--rule)]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
            <WhyThisExists />
          </div>
        </section>

        <section className="border-t border-[var(--rule)]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
            <FinalCta />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
