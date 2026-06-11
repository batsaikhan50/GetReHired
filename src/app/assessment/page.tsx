'use client'

import { useState, useEffect, useRef } from 'react'
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
      <div className="flex justify-between text-xs text-stone-400 mb-2">
        <span>{t('Block')} {blockId} / {blocks.length}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
        <motion.div className="h-full bg-[var(--accent)] rounded-full" animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
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
        <h2 className="font-display text-xl md:text-2xl text-stone-900 leading-snug">{t(question.text)}</h2>
        {question.subtitle && <p className="text-sm text-stone-500 mt-2">{t(question.subtitle)}</p>}
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
            className="w-full px-4 py-3 bg-white border border-[var(--border)] rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        )}

        {question.type === 'dropdown' && (
          <select
            value={selected as string}
            onChange={(e) => onSingle(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[var(--border)] rounded-lg text-stone-900 focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none"
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
            className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ${
              selected === opt
                ? 'border-[var(--accent)] bg-orange-50 text-stone-900'
                : 'border-[var(--border)] bg-white text-stone-700 hover:border-stone-400'
            }`}
          >{t(opt)}</button>
        ))}

        {question.type === 'multi' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {question.options?.map((opt) => (
              <button
                key={opt} onClick={() => onMultiToggle(opt)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ${
                  ((selected as string[]) || []).includes(opt)
                    ? 'border-[var(--accent)] bg-orange-50 text-stone-900'
                    : 'border-[var(--border)] bg-white text-stone-700 hover:border-stone-400'
                }`}
              >{t(opt)}</button>
            ))}
          </div>
        )}
      </div>

      {/* Continue button — only for text/multi/dropdown */}
      {isCurrent && (question.type === 'text' || question.type === 'multi' || question.type === 'dropdown') && (
        <div className="flex items-center justify-between mt-6">
          <button onClick={onBack} className="text-sm text-stone-400 hover:text-stone-600 transition-colors">{t('← Back')}</button>
          <button
            onClick={onNext} disabled={!canNext}
            className="px-8 py-3 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-400 text-[#faf8f4] rounded-md transition-colors"
          >{t('Continue →')}</button>
        </div>
      )}

      {isCurrent && (question.type === 'single' || question.type === 'rating5') && (
        <div className="mt-6">
          <button onClick={onBack} className="text-sm text-stone-400 hover:text-stone-600 transition-colors">{t('← Back')}</button>
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
      <div className="w-10 h-1 bg-stone-300 rounded-full mb-5" />

      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-3xl">{c.emoji}</span>
        <h3 className="font-display text-lg text-stone-900 leading-snug">{c.headline}</h3>
      </div>

      {/* Stats pills */}
      <div className="flex gap-2 flex-wrap justify-center mb-4">
        {c.stats.map((s, i) => (
          <div key={i} className="px-3 py-2 bg-stone-50 border border-[var(--border)] rounded-lg text-center min-w-[80px]">
            <div className="font-display text-xl text-[var(--accent)] leading-none tabular-nums">{s.value}</div>
            <div className="text-xs text-stone-500 leading-snug mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mt-1">{c.message}</p>
      {c.teaser && <p className="text-xs text-stone-400 italic mt-2">{c.teaser}</p>}

      <button
        onClick={onContinue}
        className="w-full mt-5 py-4 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] rounded-md transition-colors"
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
  const carouselRef = useRef<HTMLDivElement>(null)
  const [blockIdx, setBlockIdx] = useState(0)
  const [questionIdx, setQuestionIdx] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({})
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // ── Resume in-progress assessment ──────────────────────────────────────────
  // Snapshot of saved progress, shown as a "Continue?" prompt on return.
  type Progress = { answers: Answers; blockIdx: number; questionIdx: number }
  const [resume, setResume] = useState<Progress | null>(null)
  const [resumeChecked, setResumeChecked] = useState(false)

  // On mount, detect meaningful saved progress and offer to resume.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('grh_progress')
      if (raw) {
        const saved = JSON.parse(raw) as Progress
        const hasProgress =
          saved && saved.answers && Object.keys(saved.answers).length > 0 &&
          (saved.blockIdx > 0 || saved.questionIdx > 0)
        if (hasProgress) setResume(saved)
      }
    } catch {
      /* ignore corrupt progress */
    }
    setResumeChecked(true)
  }, [])

  // Persist progress as the user moves through — but not while the resume
  // prompt is open (that would clobber the saved snapshot with empty state).
  useEffect(() => {
    if (!mounted || !resumeChecked || resume) return
    if (Object.keys(answers).length === 0 && blockIdx === 0 && questionIdx === 0) return
    try {
      sessionStorage.setItem(
        'grh_progress',
        JSON.stringify({ answers, blockIdx, questionIdx }),
      )
    } catch {
      /* ignore quota errors */
    }
  }, [answers, blockIdx, questionIdx, mounted, resumeChecked, resume])

  const continueResume = () => {
    if (!resume) return
    setAnswers(resume.answers)
    setBlockIdx(resume.blockIdx)
    setQuestionIdx(resume.questionIdx)
    setResume(null)
  }

  const startOver = () => {
    try {
      sessionStorage.removeItem('grh_progress')
      sessionStorage.removeItem('grh_unlocked') // a fresh report starts locked
    } catch { /* ignore */ }
    setAnswers({})
    setBlockIdx(0)
    setQuestionIdx(0)
    setFeedbacks({})
    setResume(null)
  }

  // Long option lists leave the card carousel scrolled down; show each
  // question from the top. The carousel div is the scroller, not the window.
  useEffect(() => {
    window.scrollTo(0, 0)
    carouselRef.current?.scrollTo(0, 0)
  }, [blockIdx, questionIdx])

  // Swipe between questions on touch devices: left advances (same gate as the
  // buttons — current question must be answered), right goes back. Positions
  // are tracked on touchmove because the browser fires touchcancel (not
  // touchend) once it takes over the gesture for scrolling; the dominance
  // check keeps vertical scrolling through long option lists from triggering it.
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const touchLast = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    touchLast.current = touchStart.current
  }
  const onTouchMove = (e: React.TouchEvent) => {
    touchLast.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = () => {
    if (!touchStart.current || !touchLast.current) return
    const dx = touchLast.current.x - touchStart.current.x
    const dy = touchLast.current.y - touchStart.current.y
    touchStart.current = null
    touchLast.current = null
    if (showReward || Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return
    if (dx < 0) {
      if (canProceed(block.questions[questionIdx])) advance()
    } else {
      handleBack()
    }
  }

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
      try {
      sessionStorage.removeItem('grh_progress')
      sessionStorage.removeItem('grh_unlocked') // a fresh report starts locked
    } catch { /* ignore */ }
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
    try {
      sessionStorage.removeItem('grh_progress')
      sessionStorage.removeItem('grh_unlocked') // a fresh report starts locked
    } catch { /* ignore */ }
    router.push('/summary')
  }

  if (!question) return null

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col overflow-hidden">
      {/* Resume prompt — shown when returning with saved progress */}
      <AnimatePresence>
        {resume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center px-6 bg-stone-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              className="w-full max-w-sm bg-white border border-[var(--border)] rounded-xl shadow-xl p-7 text-center"
            >
              <div className="text-4xl mb-4">👋</div>
              <h2 className="font-display text-xl text-stone-900 mb-2">{t('Welcome back')}</h2>
              <p className="text-sm text-stone-500 mb-6">
                {t('You were on block')} {resume.blockIdx + 1} / {blocks.length}. {t('Pick up where you left off?')}
              </p>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={continueResume}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] rounded-md transition-colors"
                >
                  {t('Continue')}
                </button>
                <button
                  onClick={startOver}
                  className="w-full py-3 border border-stone-300 hover:border-stone-500 text-stone-700 text-sm rounded-md transition-colors"
                >
                  {t('Start over')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProgressBar answered={answeredCount} total={totalQuestions} blockId={blockIdx + 1} t={t} />

      {/* Language toggle */}
      <div className="fixed left-4 top-[calc(1rem+var(--safe-top))] z-[60]">
        <LanguageToggle variant="light" />
      </div>

      {/* Dev buttons */}
      {mounted && process.env.NODE_ENV === 'development' && (
        <div className="fixed right-4 top-[calc(1rem+var(--safe-top))] flex gap-2 z-[60]">
          <button onClick={skipBlock} className="text-xs text-stone-400 hover:text-stone-600 border border-stone-300 px-3 py-1 rounded-full">skip block →</button>
          <button onClick={skipToResults} className="text-xs text-stone-400 hover:text-stone-600 border border-stone-300 px-3 py-1 rounded-full">→ results</button>
        </div>
      )}

      {/* Card Carousel */}
      <div ref={carouselRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd} style={{ touchAction: 'pan-y' }} className="relative flex-1 overflow-x-hidden flex items-start justify-center pt-12">
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

          // Right card is clickable if:
          //  a) it was already answered (user is navigating back through answered questions), OR
          //  b) the current center card is answered (user went back and wants to move forward again)
          const centerAnswered = canProceed(block.questions[questionIdx])
          const rightClickable = offset > 0 && (!!answers[q.field] || centerAnswered)

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
              style={{ pointerEvents: 'auto', zIndex: isCurrent ? 10 : 1, transformOrigin: 'top center', cursor: isCurrent ? 'default' : (offset < 0 || rightClickable ? 'pointer' : 'default') }}
              onClick={!isCurrent ? (offset < 0 ? handleBack : rightClickable ? () => setQuestionIdx(idx) : undefined) : undefined}
            >
              {/* Card box */}
              <div className={`relative bg-white border rounded-xl p-6 flex flex-col ${
                isCurrent ? 'border-[var(--border)] shadow-[0_2px_10px_rgba(28,25,23,0.07)]' : 'border-stone-200'
              }`}>
                <div className={!isCurrent ? 'opacity-40' : ''}>
                  <p className="text-[11px] text-stone-400 mb-4 uppercase tracking-[0.15em]">
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
                  className="font-display italic text-xl text-[var(--accent)] mt-3 text-center"
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
              className="fixed inset-0 bg-stone-900/40 z-40"
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
              className="fixed bottom-0 inset-x-0 bg-white border-t border-[var(--border)] shadow-[0_-4px_20px_rgba(28,25,23,0.1)] rounded-t-3xl z-50 overflow-y-auto cursor-grab active:cursor-grabbing pb-[var(--safe-bottom)]"
            >
              <RewardBottomSheet blockId={blockIdx + 1} answers={answers} onContinue={handleRewardContinue} t={t} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
