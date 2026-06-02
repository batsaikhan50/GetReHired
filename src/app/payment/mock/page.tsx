'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock, CreditCard, ArrowRight } from 'lucide-react'
import { Star, Sparkle } from '@/components/doodle/Doodles'

// DEV-ONLY preview of the checkout. The real screen is Polar's hosted page;
// this stand-in lets the unlock flow be demoed before Polar keys are set.
// /api/checkout only routes here in development when POLAR_* env is missing.
export default function MockCheckoutPage() {
  const router = useRouter()
  const [paying, setPaying] = useState(false)

  const pay = () => {
    setPaying(true)
    setTimeout(() => router.push('/payment/success?checkout_id=dev_mock'), 700)
  }

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center justify-center px-6 relative overflow-hidden doodle-grid">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[120px] pointer-events-none" />
      <Star className="absolute top-1/4 left-1/4 w-6 h-6 text-orange-400/40 doodle-wobble" />
      <Sparkle className="absolute bottom-1/3 right-1/4 w-5 h-5 text-orange-300/40" />

      {/* Dev banner */}
      <div className="relative z-10 mb-4 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 text-xs font-medium">
        ⚠️ DEV PREVIEW — no real payment. Add POLAR_* keys for the live checkout.
      </div>

      <div className="relative z-10 w-full max-w-sm bg-[#161b25] border-gray-700 rough-border p-7">
        <div className="flex items-center gap-2 text-gray-500 text-xs mb-5">
          <Lock className="w-3.5 h-3.5" /> Secure checkout (simulated)
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white font-medium">Unlock All Matches</p>
            <p className="text-xs text-gray-500">One-time · GetReHired</p>
          </div>
          <span className="font-doodle text-4xl text-orange-300">$5</span>
        </div>

        {/* Fake disabled card field, just for the look */}
        <div className="flex items-center gap-2 px-3 py-3 mb-4 rounded-xl bg-[#0d0f14] border border-gray-800 text-gray-600 text-sm">
          <CreditCard className="w-4 h-4" /> •••• •••• •••• 4242
        </div>

        <button
          onClick={pay}
          disabled={paying}
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-medium rough-border border-orange-300 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          {paying ? 'Processing…' : <>Simulate payment <ArrowRight className="w-4 h-4" /></>}
        </button>

        <Link href="/results" className="block text-center text-xs text-gray-500 hover:text-gray-300 mt-4">
          Cancel and go back
        </Link>
      </div>
    </div>
  )
}
