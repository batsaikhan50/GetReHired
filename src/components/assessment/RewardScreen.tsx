'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Stat {
  value: string
  label: string
}

interface Props {
  blockId: number
  answers: Record<string, string | string[]>
  onContinue: () => void
}

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const steps = 40
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, interval)
    return () => clearInterval(timer)
  }, [target, duration])
  return <>{count}</>
}

function getRewardContent(blockId: number, answers: Record<string, string | string[]>) {
  const name = (answers.firstName as string) || 'you'
  const industry = (answers.industry as string) || 'your field'
  const experience = answers.experience as string
  const languages = (answers.languages as string[]) || []
  const remoteOpen = answers.remoteOpen as string
  const retraining = answers.retraining as string

  const industryRates: Record<string, number> = {
    'Manufacturing / Factory': 71, 'Customer Service': 78, 'Retail / Sales': 74,
    'Information Technology': 89, 'Healthcare / Medical': 83, 'Finance / Accounting': 81,
    'Education / Teaching': 76, 'Transportation / Delivery': 68, 'Construction / Trades': 72,
    'Food Service / Hospitality': 65, 'Administrative / Office': 77, 'Marketing / Media': 80,
    'Engineering': 87, 'Other': 70,
  }
  const successRate = industryRates[industry] || 72

  const expBonus: Record<string, number> = {
    'Less than 1 year': 22, '1–2 years': 31, '3–5 years': 38, '6–10 years': 42, 'More than 10 years': 35
  }
  const percentile = expBonus[experience] || 35

  const langBonus = languages.length > 1 ? languages.length * 2 : 0
  const oppMultiplier = (remoteOpen?.includes('Yes') ? 3 : 1) * (retraining?.includes('already') || retraining?.includes('leads') ? 2 : 1)

  const rewards: Record<number, {
    headline: string
    emoji: string
    stats: Stat[]
    message: string
    teaser?: string
  }> = {
    1: {
      headline: `Hey ${name}! 👋`,
      emoji: '🌍',
      stats: [
        { value: '3.2M', label: 'people are rebuilding their career right now' },
        { value: `${successRate}%`, label: `of ${industry} workers successfully pivot careers` },
        { value: '#1', label: 'thing that helps — starting the assessment you just began' },
      ],
      message: `You're not alone. Workers from ${industry} are among the most adaptable people in the job market. The fact that you're here already puts you ahead.`,
      teaser: 'Keep going — your experience profile is next...',
    },
    2: {
      headline: 'Your experience is an asset 💪',
      emoji: '📈',
      stats: [
        { value: `Top ${percentile}%`, label: 'of career changers in your experience group' },
        { value: `${languages.length > 1 ? `${langBonus * 10}%` : '40%'}`, label: languages.length > 1 ? 'more opportunities from speaking multiple languages' : 'more opportunities if you speak a second language' },
        { value: '8 in 10', label: 'people underestimate how transferable their skills are' },
      ],
      message: `Everything you've learned in your career so far — the people, the pressure, the processes — that knowledge doesn't disappear. It transfers. We're about to show you exactly where.`,
      teaser: 'Next: your current situation helps us find urgent matches for you...',
    },
    3: {
      headline: "You're more ready than you think ⚡",
      emoji: '🚀',
      stats: [
        { value: '90 days', label: 'average time to find new work for people in your situation' },
        { value: `${oppMultiplier}x`, label: 'more opportunities available to you based on your openness' },
        { value: '73%', label: 'of successful career changers say openness was the key factor' },
      ],
      message: `Your willingness to ${retraining?.includes('already') ? 'keep learning' : 'consider new paths'} is one of the strongest predictors of career success. We already see your opportunity window is wider than average.`,
      teaser: 'Now let\'s discover your personality type...',
    },
    4: {
      headline: 'Your personality is emerging... 🧠',
      emoji: '✨',
      stats: [
        { value: '60 yrs', label: 'of career science behind these questions' },
        { value: '900+', label: 'career paths mapped to your answers' },
        { value: 'Top 3', label: 'career matches already forming in your profile' },
      ],
      message: `The way you think and work is unlike anyone else's. We're already seeing patterns in your answers that point to specific careers where people like you thrive.`,
      teaser: 'One more round of personality questions and your type will be locked in...',
    },
    5: {
      headline: 'Your personality type is clear 🎯',
      emoji: '🧬',
      stats: [
        { value: '48', label: 'data points collected about how you think and work' },
        { value: 'Unique', label: 'combination of traits — less than 20% share yours' },
        { value: 'High', label: 'predicted job satisfaction score for your profile' },
      ],
      message: `Your personality profile is now one of the most complete we've seen. The combination of how you scored is rare — and it maps to careers that have unusually high satisfaction rates.`,
      teaser: 'Next: your skills — this is where your matches get really specific...',
    },
    6: {
      headline: 'You have more skills than you think 🏆',
      emoji: '💎',
      stats: [
        { value: '12+', label: 'transferable skills identified in your profile so far' },
        { value: 'High', label: 'demand for your skill combination right now' },
        { value: '3', label: 'career fields already showing strong matches' },
      ],
      message: `The skills you've built over your career are in demand in ways you might not expect. Companies aren't just hiring for technical skills — they're desperate for people who communicate, lead, and solve real problems.`,
      teaser: 'Almost there — your values will unlock your perfect career culture...',
    },
    7: {
      headline: "This combination is rare 💫",
      emoji: '🌟',
      stats: [
        { value: '14%', label: 'of people share your exact combination of values' },
        { value: 'Highest', label: 'job satisfaction scores for profiles like yours' },
        { value: '92%', label: 'match accuracy once values are factored in' },
      ],
      message: `You don't just want a job. You want the right job. People who are clear about their values like you are far more likely to find work that actually makes them happy — not just employed.`,
      teaser: 'Last block — 5 final questions and your results are ready...',
    },
    8: {
      headline: '✨ Profile Complete ✨',
      emoji: '🎉',
      stats: [
        { value: '43', label: 'questions answered — full profile built' },
        { value: '847', label: 'career paths cross-referenced with your answers' },
        { value: 'Ready', label: 'your personalized career matches are waiting' },
      ],
      message: `This is not a generic result. Every career match you're about to see was calculated specifically for YOU — your background, personality, skills, and values combined.`,
      teaser: undefined,
    },
  }

  return rewards[blockId] || rewards[1]
}

export default function RewardScreen({ blockId, answers, onContinue }: Props) {
  const content = getRewardContent(blockId, answers)
  const isFinal = blockId === 8

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[100px] pointer-events-none" />

      <div className="max-w-lg w-full relative z-10">
        {/* Emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="text-5xl text-center mb-6"
        >
          {content.emoji}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-2xl md:text-3xl font-light text-center mb-8 ${isFinal ? 'text-orange-400' : 'text-white'}`}
        >
          {content.headline}
        </motion.h2>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {content.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-center"
            >
              <div className="text-xl font-semibold text-orange-400 mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-300 text-center leading-relaxed mb-8"
        >
          {content.message}
        </motion.p>

        {/* Teaser */}
        {content.teaser && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-sm text-gray-500 text-center mb-8 italic"
          >
            {content.teaser}
          </motion.p>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex justify-center"
        >
          <button
            onClick={onContinue}
            className={`px-10 py-4 font-medium rounded-full transition-all duration-200 hover:scale-105 shadow-lg ${
              isFinal
                ? 'bg-orange-500 hover:bg-orange-400 text-white text-lg shadow-orange-500/30'
                : 'bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/20'
            }`}
          >
            {isFinal ? '🎯 See My Career Matches →' : 'Keep Going →'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
