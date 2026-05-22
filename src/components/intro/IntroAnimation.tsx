'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLang } from '@/contexts/LanguageContext'

const slideKeys = [
  { text: "In the last few years, millions of jobs were replaced by AI.", sub: null, highlight: false },
  { text: "Maybe yours was one of them.", sub: null, highlight: false },
  { text: "You didn't fail.", sub: "The world changed faster than anyone expected.", highlight: true },
  { text: "Your skills. Your experience. Your years of hard work.", sub: "They still matter. More than you think.", highlight: false },
  { text: "You're not alone.", sub: "And you're not done.", highlight: true },
  { text: "Let's find out where you belong next.", sub: null, highlight: false, cta: true },
]

export default function IntroAnimation() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  const { t } = useLang()

  const handleNext = () => {
    if (current < slideKeys.length - 1) setCurrent((c) => c + 1)
  }

  const handlePrev = () => {
    if (current > 0) setCurrent((c) => c - 1)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Space', 'Enter', 'ArrowRight'].includes(e.code)) { e.preventDefault(); handleNext() }
      if (['ArrowLeft', 'Backspace'].includes(e.code)) { e.preventDefault(); handlePrev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current])

  const handleStart = () => {
    router.push('/assessment')
  }

  const handleSkip = () => {
    router.push('/assessment')
  }

  const slideKey = slideKeys[current]
  const slide = { ...slideKey, text: t(slideKey.text), sub: slideKey.sub ? t(slideKey.sub) : null }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0f14] px-6 relative overflow-hidden select-none" onClick={handleNext}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      {/* Skip button */}
      {current < slideKeys.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); handleSkip() }}
          className="absolute top-6 right-6 text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          {t('Skip intro →')}
        </button>
      )}

      {/* Slide content */}
      <div className="max-w-2xl w-full text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-4"
          >
            <p
              className={`text-2xl md:text-4xl font-light leading-tight tracking-tight ${
                slide.highlight ? 'text-orange-400' : 'text-white'
              }`}
            >
              {slide.text}
            </p>
            {slide.sub && (
              <p className="text-lg md:text-xl text-gray-400 font-light">
                {slide.sub}
              </p>
            )}
            {slide.cta && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-8 flex flex-col items-center gap-4"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); handleStart() }}
                  className="px-10 py-4 bg-orange-500 hover:bg-orange-400 text-white text-lg font-medium rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-orange-500/20"
                >
                  {t('Start Your Journey →')}
                </button>
                <p className="text-sm text-gray-500">{t('Free to start. Takes about 15–30 minutes.')}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Language toggle */}
      <div className="absolute top-5 left-5">
        <LanguageToggle />
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-10 flex gap-2">
        {slideKeys.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-orange-500 w-6' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Click hint */}
      {current < slideKeys.length - 1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="absolute bottom-20 text-sm text-gray-500 animate-pulse"
        >
          {t('Tap anywhere to continue')}
        </motion.p>
      )}
    </div>
  )
}
