import type { NextConfig } from "next";

const securityHeaders = [
  // A05 – prevent clickjacking (X-Frame-Options)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // A05 – stop MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // A05 – only send referrer on same origin
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // A05 – disable browser features not needed
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // A05 – basic XSS protection for older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // A05 – HSTS: enforce HTTPS for 1 year
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // A05 – Content Security Policy
  // Allows: self, Framer Motion inline styles, Google favicons, Clearbit logos, job-board assets
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-eval in dev
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://logo.clearbit.com https://www.google.com https://img.themuse.com https://*.remotive.com",
      "connect-src 'self' https://api.adzuna.com https://remotive.com https://www.themuse.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig;
