'use client'

import { ReactNode } from 'react'

/** Shared typographic container for long-form content (legal, about). */
export function Prose({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-stone-900 mb-2">{title}</h1>
      {subtitle && <p className="text-sm text-stone-400 mb-10">{subtitle}</p>}
      <div className="space-y-6 text-[15px] leading-relaxed text-stone-600 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-stone-900 [&_h2]:mt-10 [&_h2]:mb-3 [&_a]:text-[var(--accent)] [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-stone-900 [&_strong]:font-medium">
        {children}
      </div>
    </div>
  )
}
