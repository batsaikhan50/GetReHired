'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

// Next.js 16: error boundaries receive `unstable_retry` to re-render the segment.
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    // In a real deployment this would go to an error reporting service.
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-2xl text-stone-900 mb-3">Something went wrong</h1>
        <p className="text-sm text-stone-500 mb-8">
          An unexpected error occurred. You can try again — your answers are saved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] text-sm rounded-md transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-stone-300 hover:border-stone-500 text-stone-700 text-sm rounded-md transition-colors"
          >
            Back to home
          </a>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-stone-400">Reference: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
