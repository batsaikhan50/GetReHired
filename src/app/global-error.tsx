'use client' // Error boundaries must be Client Components

import './globals.css'

// global-error replaces the root layout when a render error happens above the
// segment error boundary, so it must render its own <html>/<body>.
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <title>Something went wrong — GetReHired</title>
        <div
          style={{
            minHeight: '100vh',
            background: '#0d0f14',
            color: '#f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        >
          <p style={{ fontSize: 48, marginBottom: 16 }}>⚠️</p>
          <h1 style={{ fontWeight: 300, fontSize: 24, marginBottom: 12 }}>
            Something went wrong
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 32, maxWidth: 400 }}>
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={() => unstable_retry()}
            style={{
              padding: '12px 24px',
              background: '#f97316',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              border: 'none',
              borderRadius: 9999,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
