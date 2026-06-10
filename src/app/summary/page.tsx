'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLang } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/LanguageToggle'

type Answers = Record<string, string | string[]>

export default function SummaryPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Answers | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('grh_answers')
    if (!raw) { router.push('/'); return }
    setAnswers(JSON.parse(raw))
  }, [])

  const { t } = useLang()

  if (!answers) return null

  const name        = (answers.firstName  as string)   || 'You'
  const jobTitle    = (answers.jobTitle   as string)   || '—'
  const industry    = (answers.industry   as string)   || '—'
  const experience  = (answers.experience as string)   || '—'
  const education   = (answers.education  as string)   || '—'
  const country     = (answers.country    as string)   || '—'
  const superpower  = (answers.superpower as string)   || '—'
  const jobType     = (answers.jobType    as string)   || '—'
  const salary      = (answers.salaryExpect as string) || '—'
  const dailyTasks  = (answers.dailyTasks as string[]) || []
  const skills      = (answers.skills     as string[]) || []
  const tools       = (answers.tools      as string[]) || []

  // Strip emoji prefixes for display
  const cleanSuperpower = superpower.replace(/^To /, '')

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="fixed right-5 top-[calc(1.25rem+var(--safe-top))] z-50"><LanguageToggle variant="light" /></div>

      <div className="w-full max-w-md relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-xs text-stone-500 uppercase tracking-[0.18em] mb-2">{t('Profile Complete')}</p>
          <h1 className="font-display text-3xl text-stone-900 mb-2">
            {t('This is')} <span className="font-display italic text-[var(--accent)] text-4xl">{name}.</span>
          </h1>
          <p className="text-stone-500 text-sm">{t('Built from your actual work history — not a personality quiz.')}</p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-2 mb-4"
        >
          {[
            { value: String((dailyTasks.length + skills.length + tools.length) || '—'), label: t('Answers') },
            { value: String(dailyTasks.length || '—'), label: t('Tasks Mapped') },
            { value: String(skills.length || '—'),     label: t('Skills Found') },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-[var(--border)] rounded-lg py-3 text-center">
              <div className="font-display text-2xl text-[var(--accent)] leading-none tabular-nums">{s.value}</div>
              <div className="text-xs text-stone-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white border border-[var(--border)] rounded-lg shadow-[0_1px_3px_rgba(28,25,23,0.06)] overflow-hidden mb-4"
        >
          {/* Background */}
          <div className="px-5 pt-5 pb-4 border-b border-[var(--border)]">
            <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-3">{t('Background')}</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {[
                { label: t('Last Role'),  value: jobTitle },
                { label: t('Industry'),   value: t(industry) },
                { label: t('Experience'), value: t(experience) },
                { label: t('Education'),  value: t(education) },
                { label: t('Country'),    value: t(country) },
              ].map((row, i) => (
                <div key={i}>
                  <p className="text-xs text-stone-400">{row.label}</p>
                  <p className="text-sm text-stone-900 font-medium truncate">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What they actually did */}
          {dailyTasks.length > 0 && (
            <div className="px-5 pt-4 pb-4 border-b border-[var(--border)]">
              <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-3">{t('What You Did')}</p>
              <div className="flex flex-wrap gap-1.5">
                {dailyTasks.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    className="px-2.5 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs text-stone-700"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Confirmed skills */}
          {skills.length > 0 && (
            <div className="px-5 pt-4 pb-4 border-b border-[var(--border)]">
              <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-3">{t('Confirmed Skills')}</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    className="px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs text-orange-800"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Superpower + what they want */}
          <div className="px-5 pt-4 pb-5">
            <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em] mb-3">{t('Your Edge & Goals')}</p>
            <div className="space-y-2">
              {superpower !== '—' && (
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-xs">⚡</span>
                  <p className="text-sm text-stone-600">
                    <span className="text-stone-900 font-medium">{t('Superpower:')}</span>{' '}
                    {t(cleanSuperpower)}
                  </p>
                </div>
              )}
              {jobType !== '—' && (
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-xs">🎯</span>
                  <p className="text-sm text-stone-600">
                    <span className="text-stone-900 font-medium">{t('Looking for:')}</span>{' '}
                    {t(jobType)}
                  </p>
                </div>
              )}
              {salary !== '—' && (
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-xs">💰</span>
                  <p className="text-sm text-stone-600">
                    <span className="text-stone-900 font-medium">{t('Target salary:')}</span>{' '}
                    {t(salary)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="text-center"
        >
          <button
            onClick={() => router.push('/calculating')}
            className="w-full py-4 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] text-lg rounded-md transition-colors"
          >
            {t('Find My Career Matches →')}
          </button>
          <p className="text-xs text-stone-400 mt-3">{t('Free · No account needed · Takes 3 seconds')}</p>
        </motion.div>

      </div>
    </div>
  )
}
