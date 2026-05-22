'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, createTranslator, langLabels } from '@/lib/translations'

interface LanguageCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
  langLabel: string
}

const Ctx = createContext<LanguageCtx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('grh_lang') as Lang | null
    if (saved === 'en' || saved === 'mn') setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('grh_lang', l)
  }

  const t = createTranslator(lang)

  return (
    <Ctx.Provider value={{ lang, setLang, t, langLabel: langLabels[lang] }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
