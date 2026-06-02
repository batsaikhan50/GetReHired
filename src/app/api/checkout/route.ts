import { NextRequest, NextResponse } from 'next/server'
import { polar, POLAR_PRODUCT_ID, polarConfigured } from '@/lib/polar'

// GET /api/checkout
// Creates a Polar checkout for the one-time "unlock" product and redirects the
// browser to Polar's hosted checkout. On success Polar redirects back to
// /payment/success?checkout_id=... (Polar substitutes the real id).
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin

  if (!polarConfigured()) {
    // Misconfigured env — send the user back rather than crash.
    return NextResponse.redirect(`${origin}/results?payment=unavailable`)
  }

  try {
    const checkout = await polar.checkouts.create({
      products: [POLAR_PRODUCT_ID],
      successUrl: `${origin}/payment/success?checkout_id={CHECKOUT_ID}`,
    })
    return NextResponse.redirect(checkout.url)
  } catch (err) {
    console.error('Polar checkout creation failed:', err)
    return NextResponse.redirect(`${origin}/results?payment=error`)
  }
}
