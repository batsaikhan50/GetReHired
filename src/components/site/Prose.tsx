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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-light text-white mb-2">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mb-10">{subtitle}</p>}
      <div className="space-y-6 text-[15px] leading-relaxed text-gray-300 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_a]:text-orange-400 [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-white">
        {children}
      </div>
    </div>
  )
}
