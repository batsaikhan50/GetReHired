'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PartyPopper, ArrowRight } from 'lucide-react'
import { Star, Sparkle } from '@/components/doodle/Doodles'

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
          // Brief celebratory beat, then drop them back into the full results.
          setTimeout(() => router.push('/results'), 1800)
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
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center justify-center px-6 relative overflow-hidden text-center doodle-grid">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[120px] pointer-events-none" />
      <Star className="absolute top-1/4 left-1/4 w-7 h-7 text-orange-400/50 doodle-wobble" />
      <Sparkle className="absolute bottom-1/3 right-1/4 w-6 h-6 text-orange-300/50" />

      <div className="relative z-10 max-w-md">
        {state === 'verifying' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-orange-500/40 border-t-orange-400 animate-spin" />
            <p className="text-gray-400">Confirming your payment…</p>
          </>
        )}

        {state === 'paid' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-orange-500/15 border-2 border-orange-500/40 flex items-center justify-center">
              <PartyPopper className="w-9 h-9 text-orange-400" />
            </div>
            <h1 className="font-doodle text-5xl text-orange-300 mb-3">You&apos;re in!</h1>
            <p className="text-gray-400">Unlocking all your matches…</p>
          </motion.div>
        )}

        {state === 'failed' && (
          <>
            <p className="text-5xl mb-4">🤔</p>
            <h1 className="text-2xl font-light text-white mb-3">We couldn&apos;t confirm that payment</h1>
            <p className="text-sm text-gray-500 mb-8">
              If you were charged, don&apos;t worry — contact us and we&apos;ll sort it out. Otherwise
              you can head back and try again.
            </p>
            <Link
              href="/results"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rough-border border-orange-300 transition-all hover:scale-[1.03]"
            >
              Back to results
              <ArrowRight className="w-4 h-4" />
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
