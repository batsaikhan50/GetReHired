'use client'

import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'

export function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const cols: { heading: string; links: { href: string; label: string }[] }[] = [
    {
      heading: t('Product'),
      links: [
        { href: '/assessment', label: t('Take the assessment') },
        { href: '/pricing', label: t('Pricing') },
        { href: '/about', label: t('How it works') },
      ],
    },
    {
      heading: t('Legal'),
      links: [
        { href: '/privacy', label: t('Privacy Policy') },
        { href: '/terms', label: t('Terms of Service') },
      ],
    },
  ]

  return (
    <footer className="border-t border-gray-800/60 bg-[#0b0d11]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-baseline gap-1">
              <span className="text-lg font-semibold text-white tracking-tight">GetRe</span>
              <span className="font-doodle text-2xl text-orange-400 leading-none">Hired</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              {t('Find your next career after AI. Built for people whose jobs changed.')}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {cols.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-3">
                  {col.heading}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {year} GetReHired. {t('All rights reserved.')}
          </p>
          <p className="text-xs text-gray-600">
            {t('Not affiliated with any employer. Career guidance only.')}
          </p>
        </div>
      </div>
    </footer>
  )
}
