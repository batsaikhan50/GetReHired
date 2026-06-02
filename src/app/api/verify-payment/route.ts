import { NextRequest, NextResponse } from 'next/server'
import { polar, isCheckoutPaid, polarConfigured } from '@/lib/polar'

// GET /api/verify-payment?checkout_id=...
// Server-side confirmation that a checkout was actually paid, so the client
// can't just fake the unlock by visiting /payment/success directly.
export async function GET(req: NextRequest) {
  const checkoutId = req.nextUrl.searchParams.get('checkout_id')

  if (!checkoutId) {
    return NextResponse.json({ paid: false, error: 'Missing checkout_id' }, { status: 400 })
  }
  if (!polarConfigured()) {
    return NextResponse.json({ paid: false, error: 'Payments not configured' }, { status: 503 })
  }

  try {
    const checkout = await polar.checkouts.get({ id: checkoutId })
    return NextResponse.json({
      paid: isCheckoutPaid(checkout.status),
      status: checkout.status,
    })
  } catch (err) {
    console.error('Polar checkout verification failed:', err)
    return NextResponse.json({ paid: false, error: 'Verification failed' }, { status: 502 })
  }
}
