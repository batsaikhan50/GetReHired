'use client'

import { useState, useRef, useEffect } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { Lang } from '@/lib/translations'

const options: { lang: Lang; flag: string; label: string }[] = [
  { lang: 'en', flag: '🇺🇸', label: 'English' },
  { lang: 'mn', flag: '🇲🇳', label: 'Монгол' },
]

export function LanguageToggle({
  className = '',
  variant = 'dark',
}: {
  className?: string
  // 'dark' for the app-flow pages, 'light' for the editorial marketing surface.
  variant?: 'dark' | 'light'
}) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const light = variant === 'light'

  const current = options.find((o) => o.lang === lang) || options[0]

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm transition-colors border ${
          light
            ? 'bg-white border-stone-200 hover:border-stone-400'
            : 'bg-gray-900/80 border-gray-700 hover:border-gray-500'
        }`}
      >
        <span>{current.flag}</span>
        <span className={`text-xs font-medium ${light ? 'text-stone-700' : 'text-gray-300'}`}>{current.lang.toUpperCase()}</span>
        <span className={`text-xs ${light ? 'text-stone-400' : 'text-gray-600'}`}>{open ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className={`absolute top-full mt-1.5 left-0 rounded-xl overflow-hidden shadow-xl z-50 min-w-[130px] border ${
          light ? 'bg-white border-stone-200' : 'bg-gray-900 border-gray-700'
        }`}>
          {options.map((o) => (
            <button
              key={o.lang}
              onClick={(e) => { e.stopPropagation(); setLang(o.lang); setOpen(false) }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                light
                  ? `hover:bg-stone-100 ${lang === o.lang ? 'text-[var(--accent)]' : 'text-stone-700'}`
                  : `hover:bg-gray-800 ${lang === o.lang ? 'text-orange-400' : 'text-gray-300'}`
              }`}
            >
              <span className="text-base">{o.flag}</span>
              <span className="text-xs">{o.label}</span>
              {lang === o.lang && <span className={`ml-auto text-xs ${light ? 'text-[var(--accent)]' : 'text-orange-500'}`}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
