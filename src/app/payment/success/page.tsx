'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Loader2 } from 'lucide-react'

// sessionStorage flag the results page reads to reveal all matches.
export const UNLOCK_KEY = 'grh_unlocked'

function SuccessInner() {
  const router = useRouter()
  const params = useSearchParams()
  const [state, setState] = useState<'verifying' | 'paid' | 'failed'>('verifying')

  useEffect(() => {
    const checkoutId = params.get('checkout_id')
    if (!checkoutId) {
      setState('failed')
      return
    }
    let cancelled = false
    fetch(`/api/verify-payment?checkout_id=${encodeURIComponent(checkoutId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data.paid) {
          try {
            sessionStorage.setItem(UNLOCK_KEY, '1')
          } catch {
            /* ignore */
          }
          setState('paid')
          setTimeout(() => router.push('/results'), 1600)
        } else {
          setState('failed')
        }
      })
      .catch(() => !cancelled && setState('failed'))
    return () => {
      cancelled = true
    }
  }, [params, router])

  return (
    <div className="min-h-screen bg-[#0b0d11] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-full max-w-md bg-[#12151c] border border-gray-800 rounded-2xl px-8 py-10">
        {state === 'verifying' && (
          <>
            <Loader2 className="w-10 h-10 text-orange-400 mx-auto mb-5 animate-spin" />
            <p className="text-gray-400">Confirming your payment…</p>
          </>
        )}

        {state === 'paid' && (
          <>
            <CheckCircle2 className="w-14 h-14 text-orange-400 mx-auto mb-5" />
            <h1 className="text-2xl font-semibold text-white mb-2">Payment confirmed</h1>
            <p className="text-gray-400">Thank you. Unlocking your full results…</p>
          </>
        )}

        {state === 'failed' && (
          <>
            <h1 className="text-2xl font-semibold text-white mb-3">We couldn&apos;t confirm that payment</h1>
            <p className="text-sm text-gray-500 mb-8">
              If you were charged, contact us and we&apos;ll resolve it right away. Otherwise you can
              return and try again.
            </p>
            <Link
              href="/results"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Back to results
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessInner />
    </Suspense>
  )
}
