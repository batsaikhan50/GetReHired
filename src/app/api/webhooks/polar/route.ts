import { Webhooks } from '@polar-sh/nextjs'

// POST /api/webhooks/polar
// Polar calls this on payment events. The adapter verifies the signature
// against POLAR_WEBHOOK_SECRET before invoking our handlers.
//
// Today (no accounts yet) the client-side success flow handles the unlock, so
// this mainly logs. Once Supabase lands, `onOrderPaid` is where we'll durably
// mark a customer as paid (by email / external customer id) so they can log
// back in and always see their full report.
export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET || '',
  onOrderPaid: async (payload) => {
    const order = payload.data
    console.info('[polar] order paid', {
      orderId: order.id,
      email: order.customer?.email,
      amount: order.totalAmount,
      productId: order.productId,
    })
    // TODO(supabase): upsert paid entitlement for order.customer.email /
    // order.customer.externalId so the unlock persists across sessions.
  },
  onPayload: async (payload) => {
    // Catch-all for visibility during development.
    console.info('[polar] webhook event:', payload.type)
  },
})
