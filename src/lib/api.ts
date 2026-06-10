// Base URL for API calls.
//
// On the web this is empty, so calls stay same-origin ("/api/jobs").
// In the Capacitor mobile build the pages are bundled into the app and there
// is no local server, so NEXT_PUBLIC_API_BASE points at the deployed site
// (e.g. https://getrehired.vercel.app) and every API call goes there.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? ''

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`
}

// Dev-only: when NEXT_PUBLIC_PAYMENT_MOCK=1 (set in .env.mobile until the
// site is deployed), checkout goes to the bundled mock page instead of the
// server's /api/checkout, and /payment/success accepts the dev_mock id
// without a server round-trip. Remove the flag for production builds.
export const PAYMENT_MOCK = process.env.NEXT_PUBLIC_PAYMENT_MOCK === '1'

export function checkoutUrl(): string {
  return PAYMENT_MOCK ? '/payment/mock' : apiUrl('/api/checkout')
}
