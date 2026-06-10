'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLang } from '@/contexts/LanguageContext'

/**
 * Marketing top navigation. Used on landing, about, pricing and legal pages.
 * The product flow pages (assessment, results, etc.) keep their own minimal
 * chrome, so this is intentionally not in the root layout.
 */
export function SiteNav() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/about', label: t('How it works') },
    { href: '/pricing', label: t('Pricing') },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#faf8f4]/90 backdrop-blur-md border-b border-[var(--rule)] pt-[var(--safe-top)]">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        {/* Wordmark */}
        <Link href="/" className="font-display text-xl text-stone-900">
          GetRe<span className="italic text-[var(--accent)]">Hired</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <LanguageToggle variant="light" />
          <Link
            href="/assessment"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-700 text-[#faf8f4] text-sm rounded-md transition-colors"
          >
            {t('Start Free')}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex sm:hidden items-center gap-3">
          <LanguageToggle variant="light" />
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="text-stone-700 p-1.5 -mr-1.5"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-[var(--rule)] px-5 py-4 flex flex-col gap-1 bg-[#faf8f4]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm text-stone-700 hover:text-stone-900"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-2.5 bg-stone-900 text-[#faf8f4] text-sm rounded-md text-center"
          >
            {t('Start Free')}
          </Link>
        </div>
      )}
    </header>
  )
}
