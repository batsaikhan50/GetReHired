'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLang } from '@/contexts/LanguageContext'

const stepKeys = [
  { key: 'Reading your work history',       duration: 1000 },
  { key: 'Mapping your tasks and skills',   duration: 1200 },
  { key: 'Scoring 30 career paths',         duration: 1400 },
  { key: 'Calculating task overlap',        duration: 1200 },
  { key: 'Ranking your matches',            duration: 1000 },
  { key: 'Your results are ready',          duration: 800  },
]

export default function CalculatingPage() {
  const router = useRouter()
  const { t } = useLang()
  const [stepIdx, setStepIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let elapsed = 0
    const total = stepKeys.reduce((s, x) => s + x.duration, 0)
    let currentStep = 0
    let stepElapsed = 0

    const tick = setInterval(() => {
      elapsed += 40
      stepElapsed += 40
      setProgress(Math.min((elapsed / total) * 100, 100))

      if (stepElapsed >= stepKeys[currentStep].duration) {
        stepElapsed = 0
        if (currentStep < stepKeys.length - 1) {
          currentStep++
          setStepIdx(currentStep)
        } else {
          clearInterval(tick)
          setDone(true)
          setTimeout(() => router.push('/results'), 900)
        }
      }
    }, 40)

    return () => clearInterval(tick)
  }, [])

  const currentStep = stepKeys[stepIdx]
  const isLast = stepIdx === stepKeys.length - 1

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-500/5 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">

        {/* Icon */}
        <motion.div
          animate={{ rotate: done ? 0 : 360 }}
          transition={{ duration: 3, repeat: done ? 0 : Infinity, ease: 'linear' }}
          className="text-5xl text-center mb-10"
        >
          {done ? '✅' : '⚙️'}
        </motion.div>

        {/* Step label */}
        <div className="h-8 mb-6 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className={`text-center text-lg font-light absolute inset-x-0 ${
                isLast ? 'text-orange-400 font-medium' : 'text-white'
              }`}
            >
              {t(currentStep.key)}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>

        {/* Percentage */}
        <p className="text-center text-sm text-gray-600 mb-12">
          {Math.round(progress)}%
        </p>

        {/* Completed steps */}
        <div className="space-y-2">
          {stepKeys.slice(0, stepIdx).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="text-orange-500 text-sm">✓</span>
              <span className="text-sm text-gray-600">{t(s.key)}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
