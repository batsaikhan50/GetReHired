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
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="fixed top-5 right-5 z-50"><LanguageToggle /></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/6 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-xs text-orange-500 uppercase tracking-widest font-medium mb-2">{t('Profile Complete')}</p>
          <h1 className="text-3xl font-light text-white mb-2">
            {t('This is')} <span className="text-orange-400 font-medium">{name}.</span>
          </h1>
          <p className="text-gray-500 text-sm">{t('Built from your actual work history — not a personality quiz.')}</p>
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
            <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-2xl py-3 text-center">
              <div className="text-lg font-semibold text-orange-400">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-[#161b25] border border-gray-800 rounded-3xl overflow-hidden mb-4"
        >
          {/* Background */}
          <div className="px-5 pt-5 pb-4 border-b border-gray-800/60">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">{t('Background')}</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {[
                { label: t('Last Role'),  value: jobTitle },
                { label: t('Industry'),   value: t(industry) },
                { label: t('Experience'), value: t(experience) },
                { label: t('Education'),  value: t(education) },
                { label: t('Country'),    value: t(country) },
              ].map((row, i) => (
                <div key={i}>
                  <p className="text-xs text-gray-600">{row.label}</p>
                  <p className="text-sm text-white font-medium truncate">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What they actually did */}
          {dailyTasks.length > 0 && (
            <div className="px-5 pt-4 pb-4 border-b border-gray-800/60">
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">{t('What You Did')}</p>
              <div className="flex flex-wrap gap-1.5">
                {dailyTasks.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    className="px-2.5 py-1 bg-gray-800/60 border border-gray-700/60 rounded-full text-xs text-gray-300"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Confirmed skills */}
          {skills.length > 0 && (
            <div className="px-5 pt-4 pb-4 border-b border-gray-800/60">
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">{t('Confirmed Skills')}</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/25 rounded-full text-xs text-orange-300"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Superpower + what they want */}
          <div className="px-5 pt-4 pb-5">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">{t('Your Edge & Goals')}</p>
            <div className="space-y-2">
              {superpower !== '—' && (
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 text-xs">⚡</span>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">{t('Superpower:')}</span>{' '}
                    {t(cleanSuperpower)}
                  </p>
                </div>
              )}
              {jobType !== '—' && (
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 text-xs">🎯</span>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">{t('Looking for:')}</span>{' '}
                    {t(jobType)}
                  </p>
                </div>
              )}
              {salary !== '—' && (
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 text-xs">💰</span>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">{t('Target salary:')}</span>{' '}
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
            className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-full text-lg transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/20"
          >
            {t('Find My Career Matches →')}
          </button>
          <p className="text-xs text-gray-600 mt-3">{t('Free · No account needed · Takes 3 seconds')}</p>
        </motion.div>

      </div>
    </div>
  )
}
