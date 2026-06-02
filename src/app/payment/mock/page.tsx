'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock, CreditCard, ShieldCheck } from 'lucide-react'

// DEV-ONLY preview of the checkout. The real screen is Polar's hosted page;
// this stand-in lets the unlock flow be demoed before Polar keys are set.
// /api/checkout only routes here in development when POLAR_* env is missing.
// Intentionally clean & professional — no doodle styling on payment screens.
export default function MockCheckoutPage() {
  const router = useRouter()
  const [paying, setPaying] = useState(false)

  const pay = () => {
    setPaying(true)
    setTimeout(() => router.push('/payment/success?checkout_id=dev_mock'), 700)
  }

  return (
    <div className="min-h-screen bg-[#0b0d11] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Dev banner */}
        <div className="mb-4 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300/90 text-xs text-center">
          Developer preview — no real payment. Add POLAR_* keys for live checkout.
        </div>

        <div className="bg-[#12151c] border border-gray-800 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2 text-gray-400 text-sm">
            <Lock className="w-4 h-4" />
            Secure checkout
          </div>

          <div className="px-6 py-6">
            {/* Line item */}
            <div className="flex items-center justify-between pb-5 border-b border-gray-800">
              <div>
                <p className="text-white font-medium">Unlock All Matches</p>
                <p className="text-sm text-gray-500 mt-0.5">One-time payment · GetReHired</p>
              </div>
              <span className="text-2xl font-semibold text-white tabular-nums">$5.00</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-4 text-sm">
              <span className="text-gray-400">Total due today</span>
              <span className="text-white font-semibold tabular-nums">$5.00</span>
            </div>

            {/* Fake card field — visual only */}
            <div className="flex items-center gap-2 px-3.5 py-3 rounded-lg bg-[#0b0d11] border border-gray-800 text-gray-600 text-sm mb-5">
              <CreditCard className="w-4 h-4" />
              <span className="tracking-widest">5678 •••• •••• 4242</span>
            </div>

            <button
              onClick={pay}
              disabled={paying}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-lg transition-colors"
            >
              {paying ? 'Processing…' : 'Pay $5.00'}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-600 mt-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Payments processed securely. No subscription.
            </p>
          </div>
        </div>

        <Link href="/results" className="block text-center text-sm text-gray-500 hover:text-gray-300 mt-5 transition-colors">
          Cancel and go back
        </Link>
      </div>
    </div>
  )
}
