'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  question: string
  subtitle?: string
  children: ReactNode
  onBack?: () => void
  onNext?: () => void
  nextDisabled?: boolean
  nextLabel?: string
}

export default function QuestionCard({
  question, subtitle, children, onBack, onNext, nextDisabled, nextLabel = 'Continue'
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto px-6 py-8"
    >
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-light text-white leading-snug">{question}</h2>
        {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
      </div>

      <div className="mb-10">{children}</div>

      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Back
          </button>
        ) : <div />}
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-400 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-full transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            {nextLabel} →
          </button>
        )}
      </div>
    </motion.div>
  )
}
