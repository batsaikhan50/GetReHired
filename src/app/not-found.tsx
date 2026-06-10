'use client'

import Link from 'next/link'

// Client component so it can use the same visual language without server data.
// Root not-found also catches all unmatched URLs across the app.
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="font-display text-7xl text-[var(--accent)] mb-4">404</p>
        <h1 className="font-display text-2xl text-stone-900 mb-3">This page took a different career path</h1>
        <p className="text-sm text-stone-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] text-sm rounded-md transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/assessment"
            className="px-6 py-3 border border-stone-300 hover:border-stone-500 text-stone-700 text-sm rounded-md transition-colors"
          >
            Start the assessment
          </Link>
        </div>
      </div>
    </div>
  )
}
