'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { blocks, totalQuestions, Question, jobTitlesByIndustry } from '@/lib/assessmentData'
import { getMicroFeedback } from '@/lib/microFeedback'
import { getRewardContent } from '@/lib/rewardContent'
import { useLang } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/LanguageToggle'

type Answers = Record<string, string | string[]>

// ─── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar({ answered, total, blockId, t }: {
  answered: number; total: number; blockId: number; t: (k: string) => string
}) {
  const pct = Math.round((answered / total) * 100)
  return (
    <div className="w-full px-6 pt-5 pb-3 max-w-xl mx-auto">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>{t('Block')} {blockId} / {blocks.length}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div className="h-full bg-orange-500 rounded-full" animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
      </div>
    </div>
  )
}

// ─── Question Card Content ────────────────────────────────────────────────────

function QuestionCardContent({
  question, isCurrent, currentAnswer,
  onSingle, onRating, onMultiToggle, onNext, onBack, canNext, t,
}: {
  question: Question
  isCurrent: boolean
  currentAnswer: string | string[]
  onSingle: (v: string) => void
  onRating: (v: number) => void
  onMultiToggle: (v: string) => void
  onNext: () => void
  onBack: () => void
  canNext: boolean
  t: (k: string) => string
}) {
  const selected = currentAnswer

  return (
    <div className="flex flex-col h-full">
      {/* Question text — translated for display */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-light text-white leading-snug">{t(question.text)}</h2>
        {question.subtitle && <p className="text-sm text-gray-400 mt-2">{t(question.subtitle)}</p>}
      </div>

      {/* Answers */}
      <div className={`space-y-2 flex-1 overflow-y-auto ${!isCurrent ? 'pointer-events-none' : ''}`}>
        {question.type === 'text' && (
          <input
            type="text" placeholder={t('Type your answer...')}
            value={selected as string}
            onChange={(e) => onSingle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && canNext && onNext()}
            autoFocus={isCurrent}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        )}

        {question.type === 'dropdown' && (
          <select
            value={selected as string}
            onChange={(e) => onSingle(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
          >
            <option value="" disabled>{t('Select an option...')}</option>
            {/* value = English (for scoring), display = translated */}
            {question.options?.map((opt) => (
              <option key={opt} value={opt}>{t(opt)}</option>
            ))}
          </select>
        )}

        {question.type === 'single' && question.options?.map((opt) => (
          <button
            key={opt} onClick={() => onSingle(opt)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 ${
              selected === opt
                ? 'border-orange-500 bg-orange-500/10 text-orange-300'
                : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-500'
            }`}
          >{t(opt)}</button>
        ))}

        {question.type === 'multi' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {question.options?.map((opt) => (
              <button
                key={opt} onClick={() => onMultiToggle(opt)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 ${
                  ((selected as string[]) || []).includes(opt)
                    ? 'border-orange-500 bg-orange-500/10 text-orange-300'
                    : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-500'
                }`}
              >{t(opt)}</button>
            ))}
          </div>
        )}
      </div>

      {/* Continue button — only for text/multi/dropdown */}
      {isCurrent && (question.type === 'text' || question.type === 'multi' || question.type === 'dropdown') && (
        <div className="flex items-center justify-between mt-6">
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{t('← Back')}</button>
          <button
            onClick={onNext} disabled={!canNext}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-400 disabled:bg-gray-800 disabled:text-gray-600 text-white font-medium rounded-full transition-all hover:scale-105 disabled:hover:scale-100"
          >{t('Continue →')}</button>
        </div>
      )}

      {isCurrent && (question.type === 'single' || question.type === 'rating5') && (
        <div className="mt-6">
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{t('← Back')}</button>
        </div>
      )}
    </div>
  )
}

// ─── Reward Bottom Sheet ──────────────────────────────────────────────────────

function RewardBottomSheet({ blockId, answers, onContinue, t }: {
  blockId: number; answers: Answers; onContinue: () => void; t: (k: string) => string
}) {
  const c = getRewardContent(blockId, answers)
  const isFinal = blockId === 5

  return (
    <div className="flex flex-col items-center h-full px-6 pt-5 pb-6 text-center">
      {/* Handle bar */}
      <div className="w-10 h-1 bg-gray-700 rounded-full mb-5" />

      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-3xl">{c.emoji}</span>
        <h3 className="text-lg font-medium text-white leading-snug">{c.headline}</h3>
      </div>

      {/* Stats pills */}
      <div className="flex gap-2 flex-wrap justify-center mb-4">
        {c.stats.map((s, i) => (
          <div key={i} className="px-3 py-2 bg-gray-800 rounded-xl text-center min-w-[80px]">
            <div className="text-sm font-semibold text-orange-400">{s.value}</div>
            <div className="text-xs text-gray-400 leading-snug">{s.label}</div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-300 leading-relaxed mt-1">{c.message}</p>
      {c.teaser && <p className="text-xs text-gray-500 italic mt-2">{c.teaser}</p>}

      <button
        onClick={onContinue}
        className="w-full mt-5 py-4 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-full transition-all hover:scale-[1.02]"
      >
        {isFinal ? t('🎯 See My Career Matches →') : t('Keep Going →')}
      </button>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const router = useRouter()
  const { t } = useLang()
  const [blockIdx, setBlockIdx] = useState(0)
  const [questionIdx, setQuestionIdx] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({})
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Lock back button (popstate) while answering — swipe gesture blocked via layout CSS
  useEffect(() => {
    history.pushState(null, '', window.location.href)
    const onPopState = () => history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const block = blocks[blockIdx]
  const question = block?.questions[questionIdx]
  const answeredCount = Object.keys(answers).length

  const setAnswer = (field: string, value: string | string[]) =>
    setAnswers((prev) => ({ ...prev, [field]: value }))

  const toggleMulti = (field: string, value: string) => {
    const current = (answers[field] as string[]) || []
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    setAnswer(field, updated)
  }

  const canProceed = (q: Question) => {
    const ans = answers[q?.field]
    if (!ans) return false
    if (Array.isArray(ans)) return ans.length > 0
    return String(ans).trim().length > 0
  }

  const setFeedback = (field: string, value: string | null) => {
    if (value) setFeedbacks((prev) => ({ ...prev, [field]: value }))
  }

  // Reward screen after every block (1-indexed)
  const REWARD_BLOCKS = new Set([1, 2, 3, 4, 5])

  const advanceBlock = (currentAnswers: Answers) => {
    const isLastBlock = blockIdx >= blocks.length - 1
    if (isLastBlock) {
      sessionStorage.setItem('grh_answers', JSON.stringify(currentAnswers))
      router.push('/summary')
    } else {
      setBlockIdx((i) => i + 1)
      setQuestionIdx(0)
      setFeedbacks({})
    }
  }

  const advance = () => {
    const isLast = questionIdx >= block.questions.length - 1
    if (isLast) {
      if (REWARD_BLOCKS.has(blockIdx + 1)) setShowReward(true)
      else advanceBlock(answers)
    } else {
      setQuestionIdx((i) => i + 1)
    }
  }

  const handleSingle = (q: Question, value: string) => {
    setAnswer(q.field, value)
    if (q.type !== 'text') setFeedback(q.field, getMicroFeedback(value))
    if (q.type === 'single') setTimeout(advance, 320)
  }

  const handleRating = (q: Question, value: number) => {
    setAnswer(q.field, String(value))
    setFeedback(q.field, getMicroFeedback(String(value)))
    setTimeout(advance, 320)
  }

  const handleNext = (q: Question) => {
    advance()
  }

  const handleBack = () => {
    if (questionIdx > 0) setQuestionIdx((i) => i - 1)
    else if (blockIdx > 0) { setBlockIdx((i) => i - 1); setQuestionIdx(blocks[blockIdx - 1].questions.length - 1) }
    else router.push('/')
  }

  const handleRewardContinue = () => {
    setShowReward(false)
    advanceBlock(answers)
  }

  const skipBlock = () => {
    const dummy: Record<string, string | string[]> = {}
    block.questions.forEach((q) => {
      if (!answers[q.field]) {
        if (q.type === 'multi') dummy[q.field] = [q.options?.[0] || 'Other']
        else if (q.type === 'rating5') dummy[q.field] = '3'
        else dummy[q.field] = q.options?.[0] || 'N/A'
      }
    })
    const merged = { ...answers, ...dummy }
    setAnswers(merged)
    setShowReward(false)
    advanceBlock(merged)
  }

  const skipToResults = () => {
    const dummy: Answers = {
      firstName: 'Bat',
      age: '26–30',
      country: 'Mongolia',
      industry: 'Manufacturing / Factory',
      jobTitle: 'Production Supervisor',
      experience: '3–5 years',
      dailyTasks: [
        'Managed people or a team',
        'Planned & coordinated projects',
        'Inspected & quality-checked work',
        'Paperwork & data entry',
        'Trained or taught others',
      ],
      skills: [
        'Managing people',
        'Problem-solving',
        'Logistics & scheduling',
        'Data entry & records',
        'Operating machinery',
      ],
      tools: [
        'Microsoft Office',
        'Warehouse / inventory systems',
        'Industrial machinery',
      ],
      jobType: 'Stable office job',
      salaryExpect: '$50k–$70k / year',
      remoteOpen: 'Yes, open to it',
      urgency: '🟡 Within 3 months',
      superpower: 'Organize & get things on track',
      education: "Bachelor's Degree",
      retraining: '👍 Yes, if it leads to a real job',
    }
    sessionStorage.setItem('grh_answers', JSON.stringify(dummy))
    router.push('/summary')
  }

  if (!question) return null

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col overflow-hidden">
      <ProgressBar answered={answeredCount} total={totalQuestions} blockId={blockIdx + 1} t={t} />

      {/* Language toggle */}
      <div className="fixed top-4 left-4 z-[60]">
        <LanguageToggle />
      </div>

      {/* Dev buttons */}
      {mounted && process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 flex gap-2 z-[60]">
          <button onClick={skipBlock} className="text-xs text-gray-600 hover:text-gray-400 border border-gray-800 px-3 py-1 rounded-full">skip block →</button>
          <button onClick={skipToResults} className="text-xs text-gray-600 hover:text-gray-400 border border-gray-800 px-3 py-1 rounded-full">→ results</button>
        </div>
      )}

      {/* Card Carousel */}
      <div className="relative flex-1 overflow-x-hidden flex items-start justify-center pt-12">
        {block.questions.map((q, idx) => {
          const offset = idx - questionIdx
          if (Math.abs(offset) > 1) return null

          const isCurrent = offset === 0

          // Inject industry-specific job title options dynamically
          const resolvedQ: Question = q.id === 'jobTitle'
            ? {
                ...q,
                options: jobTitlesByIndustry[answers.industry as string] ?? ['Other'],
              }
            : q

          return (
            <motion.div
              key={`${blockIdx}-${q.id}`}
              className="absolute w-[82%] max-w-lg"
              initial={{ x: `${offset * 200}%`, scale: isCurrent ? 1 : 0.78, y: 0, opacity: 0 }}
              animate={{
                x: `${offset * 92.5}%`,
                scale: isCurrent ? 1 : 0.78,
                y: 0,
                opacity: 1,
              }}
              transition={{ type: 'spring', stiffness: 160, damping: 28 }}
              style={{ pointerEvents: 'auto', zIndex: isCurrent ? 10 : 1, transformOrigin: 'top center', cursor: isCurrent ? 'default' : (offset < 0 || answers[q.field] ? 'pointer' : 'default') }}
              onClick={!isCurrent ? (offset < 0 ? handleBack : answers[q.field] ? () => setQuestionIdx(idx) : undefined) : undefined}
            >
              {/* Card box */}
              <div className={`relative bg-[#161b25] border rounded-3xl p-6 flex flex-col ${
                isCurrent ? 'border-gray-700' : 'border-gray-800'
              }`}>
                <div className={!isCurrent ? 'opacity-40' : ''}>
                  <p className="text-xs text-orange-400/60 mb-4 uppercase tracking-widest">
                    {t('Question')} {idx + 1} / {block.questions.length}
                  </p>
                  <QuestionCardContent
                    question={resolvedQ}
                    isCurrent={isCurrent}
                    currentAnswer={answers[q.field] ?? ''}
                    onSingle={(v) => handleSingle(q, v)}
                    onRating={(v) => handleRating(q, v)}
                    onMultiToggle={(v) => toggleMulti(q.field, v)}
                    onNext={() => handleNext(q)}
                    onBack={handleBack}
                    canNext={canProceed(q)}
                    t={t}
                  />
                </div>
              </div>

              {/* Feedback — outside card, below it */}
              {feedbacks[q.field] && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-semibold text-orange-300 mt-3 text-center"
                >
                  {t(feedbacks[q.field])}
                </motion.p>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Reward Bottom Sheet */}
      <AnimatePresence>
        {showReward && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40"
              onClick={handleRewardContinue}
            />
            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 38 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => { if (info.offset.y > 80) handleRewardContinue() }}
              className="fixed bottom-0 inset-x-0 bg-[#161b25] border-t border-gray-800 rounded-t-3xl z-50 overflow-y-auto cursor-grab active:cursor-grabbing"
            >
              <RewardBottomSheet blockId={blockIdx + 1} answers={answers} onContinue={handleRewardContinue} t={t} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
