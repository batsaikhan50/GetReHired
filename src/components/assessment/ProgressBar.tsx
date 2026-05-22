'use client'

import { motion } from 'framer-motion'

const modules = [
  { id: 1, label: 'About You' },
  { id: 2, label: 'Personality' },
  { id: 3, label: 'Skills' },
  { id: 4, label: 'Values' },
  { id: 5, label: 'Situation' },
]

interface Props {
  currentModule: number
  currentQuestion: number
  totalQuestions: number
}

export default function ProgressBar({ currentModule, currentQuestion, totalQuestions }: Props) {
  const moduleProgress = ((currentModule - 1) / modules.length) * 100
  const questionProgress = (currentQuestion / totalQuestions) * (100 / modules.length)
  const totalProgress = moduleProgress + questionProgress

  return (
    <div className="w-full px-6 pt-6 pb-4 max-w-2xl mx-auto">
      {/* Module steps */}
      <div className="flex items-center justify-between mb-3">
        {modules.map((m) => (
          <div key={m.id} className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
              m.id < currentModule
                ? 'bg-orange-500 text-white'
                : m.id === currentModule
                ? 'bg-orange-500/20 border border-orange-500 text-orange-400'
                : 'bg-gray-800 text-gray-600'
            }`}>
              {m.id < currentModule ? '✓' : m.id}
            </div>
            <span className={`text-xs hidden sm:block ${
              m.id === currentModule ? 'text-orange-400' : m.id < currentModule ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-600">Question {currentQuestion} of {totalQuestions}</span>
        <span className="text-xs text-gray-600">{Math.round(totalProgress)}% complete</span>
      </div>
    </div>
  )
}
