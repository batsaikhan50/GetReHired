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
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center justify-center px-6 relative overflow-hidden text-center">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md">
        <p className="text-5xl mb-4">⚠️</p>
        <h1 className="text-2xl font-light text-white mb-3">Something went wrong</h1>
        <p className="text-sm text-gray-500 mb-8">
          An unexpected error occurred. You can try again — your answers are saved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rounded-full transition-all hover:scale-[1.03]"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 text-sm font-medium rounded-full transition-colors"
          >
            Back to home
          </a>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-gray-700">Reference: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
