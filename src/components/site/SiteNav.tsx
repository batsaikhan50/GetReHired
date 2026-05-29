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
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0d0f14]/80 backdrop-blur-md border-b border-gray-800/60">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1 group">
          <span className="text-lg font-semibold text-white tracking-tight">GetRe</span>
          <span className="font-doodle text-2xl text-orange-400 leading-none">Hired</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <LanguageToggle />
          <Link
            href="/assessment"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rough-border border-orange-300 transition-all hover:scale-[1.03]"
          >
            {t('Start Free')}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex sm:hidden items-center gap-3">
          <LanguageToggle />
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="text-gray-300 p-1.5 -mr-1.5"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-800/60 px-4 py-4 flex flex-col gap-1 bg-[#0d0f14]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm text-gray-300 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-full text-center"
          >
            {t('Start Free')}
          </Link>
        </div>
      )}
    </header>
  )
}
