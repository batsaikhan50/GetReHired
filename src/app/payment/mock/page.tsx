'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock, CreditCard, ShieldCheck, Check } from 'lucide-react'

// DEV-ONLY preview of the checkout. The real screen is Polar's hosted page;
// this stand-in lets the unlock flow be demoed before Polar keys are set.
// /api/checkout only routes here in development when POLAR_* env is missing.
// Light, PayPal-like theme — branded and trustworthy, no doodle styling.

const INCLUDED = [
  'All 30 ranked career matches',
  'Salary range + time-to-hire for each',
  'Personalized skills roadmap',
  'Live job listings for every path',
]

export default function MockCheckoutPage() {
  const router = useRouter()
  const [paying, setPaying] = useState(false)

  const pay = () => {
    setPaying(true)
    setTimeout(() => router.push('/payment/success?checkout_id=dev_mock'), 700)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <Link href="/results" className="flex items-center justify-center gap-1 mb-5">
          <span className="text-xl font-bold text-slate-900 tracking-tight">GetRe</span>
          <span className="font-doodle text-3xl text-orange-500 leading-none">Hired</span>
        </Link>

        {/* Dev banner */}
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs text-center">
          Developer preview — no real payment. Add POLAR_* keys for live checkout.
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 text-slate-500 text-sm">
            <Lock className="w-4 h-4" />
            Secure checkout
          </div>

          <div className="px-6 py-6">
            {/* Line item */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <p className="text-slate-900 font-semibold">GetReHired — Full Career Report</p>
                <p className="text-sm text-slate-500 mt-0.5">One-time payment · lifetime access</p>
              </div>
              <span className="text-2xl font-semibold text-slate-900 tabular-nums shrink-0 ml-3">$5.00</span>
            </div>

            {/* What's included */}
            <ul className="py-4 space-y-2 border-b border-slate-100">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="flex items-center justify-between py-4 text-sm">
              <span className="text-slate-500">Total due today</span>
              <span className="text-slate-900 font-semibold tabular-nums">$5.00 USD</span>
            </div>

            {/* Fake card field — visual only */}
            <div className="flex items-center gap-2 px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-sm mb-5">
              <CreditCard className="w-4 h-4" />
              <span className="tracking-widest">5678 •••• •••• 4242</span>
            </div>

            <button
              onClick={pay}
              disabled={paying}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium rounded-lg transition-colors"
            >
              {paying ? 'Processing…' : 'Pay $5.00'}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Encrypted &amp; secured by Polar · No subscription
            </p>
          </div>
        </div>

        <Link href="/results" className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-5 transition-colors">
          Cancel and go back
        </Link>
      </div>
    </div>
  )
}
