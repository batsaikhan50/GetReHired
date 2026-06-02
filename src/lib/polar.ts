import { Polar } from '@polar-sh/sdk'

// Server-side Polar client. Never import this into a client component —
// it carries the organization access token.
export const POLAR_SERVER =
  (process.env.POLAR_SERVER as 'sandbox' | 'production') || 'sandbox'

export const POLAR_PRODUCT_ID = process.env.POLAR_PRODUCT_ID || ''

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || '',
  server: POLAR_SERVER,
})

// A checkout counts as "paid" once Polar confirms the payment. `confirmed`
// means payment received & processing; `succeeded` means the order is created.
export function isCheckoutPaid(status: string): boolean {
  return status === 'confirmed' || status === 'succeeded'
}

export function polarConfigured(): boolean {
  return Boolean(process.env.POLAR_ACCESS_TOKEN && POLAR_PRODUCT_ID)
}
