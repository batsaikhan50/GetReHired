'use client'

import { ReactNode } from 'react'

/**
 * Hand-drawn SVG doodle accents. All inherit `currentColor` so they take the
 * text color of their container — wrap in a colored span to tint them.
 * Stroke paths are intentionally wobbly to read as sketched, not vector-perfect.
 */

type SvgProps = { className?: string; strokeWidth?: number }

/** Rough underline scribble — sits under a word/heading. */
export function Underline({ className = '', strokeWidth = 3 }: SvgProps) {
  return (
    <svg viewBox="0 0 200 16" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M3 11C40 5 80 4 120 7c25 2 50 5 76 2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M8 14C45 9 95 9 150 11"
        stroke="currentColor"
        strokeWidth={strokeWidth - 1}
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

/** Curvy hand-drawn arrow, points down-right by default. */
export function Arrow({ className = '', strokeWidth = 3 }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 12c18 2 40 14 48 40"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M44 50c8 1 14 2 18 4M58 36c2 8 2 14 4 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Four-point sparkle / star. */
export function Star({ className = '', strokeWidth = 2.5 }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 4c1 9 7 15 16 16-9 1-15 7-16 16-1-9-7-15-16-16 9-1 15-7 16-16Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

/** Tiny twinkle made of crossing strokes — scatter a few for sparkle. */
export function Sparkle({ className = '', strokeWidth = 2.5 }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2v8M12 14v8M2 12h8M14 12h8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

/** Loose oval scribble — circle something for emphasis. */
export function CircleScribble({ className = '', strokeWidth = 2.5 }: SvgProps) {
  return (
    <svg viewBox="0 0 220 90" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M150 8C90 0 30 8 14 34 2 54 26 76 96 82c64 5 116-8 110-40-3-17-30-30-72-34"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/** Soft organic blob — use as a background shape. */
export function Blob({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M44 -67C58 -58 71 -47 75 -33C79 -19 74 -2 68 13C62 28 55 42 43 53C31 64 15 72 -2 74C-19 77 -38 74 -53 64C-68 54 -79 37 -82 19C-85 1 -80 -18 -70 -33C-60 -48 -45 -59 -30 -67C-15 -75 0 -79 15 -78C30 -77 30 -76 44 -67Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/** Squiggly divider line. */
export function Squiggle({ className = '', strokeWidth = 3 }: SvgProps) {
  return (
    <svg viewBox="0 0 240 20" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M2 10c10-8 20 8 30 0s20-8 30 0 20 8 30 0 20-8 30 0 20 8 30 0 20-8 30 0"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/**
 * Heading with a hand-drawn underline doodle beneath it. Wrap the words you
 * want emphasized. Color the underline via `underlineClassName`.
 */
export function DoodleUnderline({
  children,
  className = '',
  underlineClassName = 'text-orange-400',
}: {
  children: ReactNode
  className?: string
  underlineClassName?: string
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <span className={`absolute -bottom-3 left-0 w-full h-3 ${underlineClassName}`} aria-hidden="true">
        <Underline className="w-full h-full" />
      </span>
    </span>
  )
}
