'use client'

import { ReactNode } from 'react'
import { SiteNav } from './SiteNav'
import { Footer } from './Footer'

/**
 * Wraps marketing/content pages with the shared nav + footer on the paper
 * background. Product-flow pages (assessment, results) do NOT use this.
 */
export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <SiteNav />
      <main className="flex-1 pt-[calc(4rem+var(--safe-top))]">{children}</main>
      <Footer />
    </div>
  )
}
