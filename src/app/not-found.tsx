'use client'

import Link from 'next/link'
import { Star, Sparkle } from '@/components/doodle/Doodles'

// Client component so it can use the same visual language without server data.
// Root not-found also catches all unmatched URLs across the app.
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center justify-center px-6 relative overflow-hidden text-center doodle-grid">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <Star className="absolute top-1/4 left-1/4 w-7 h-7 text-orange-400/50 doodle-wobble" />
      <Sparkle className="absolute bottom-1/3 right-1/4 w-6 h-6 text-orange-300/50" />

      <div className="relative z-10 max-w-md">
        <p className="text-8xl font-doodle text-orange-400 mb-2">404</p>
        <h1 className="text-2xl font-light text-white mb-3">This page took a different career path</h1>
        <p className="text-sm text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rough-border border-orange-300 transition-all hover:scale-[1.03]"
          >
            Back to home
          </Link>
          <Link
            href="/assessment"
            className="px-6 py-3 border-gray-600 hover:border-gray-400 text-gray-300 text-sm font-medium rough-border-2 transition-colors"
          >
            Start the assessment
          </Link>
        </div>
      </div>
    </div>
  )
}
