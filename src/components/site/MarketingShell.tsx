'use client'

import { ReactNode } from 'react'
import { SiteNav } from './SiteNav'
import { Footer } from './Footer'

/**
 * Wraps marketing/content pages with the shared nav + footer and the standard
 * dark background. Product-flow pages (assessment, results) do NOT use this.
 */
export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col">
      <SiteNav />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
}
