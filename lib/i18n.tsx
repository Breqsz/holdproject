'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import pt from '@/messages/pt.json'
import en from '@/messages/en.json'

type Locale = 'pt' | 'en'

const messages: Record<Locale, Record<string, string>> = { pt, en }

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt')

  function t(key: string): string {
    return messages[locale][key] ?? messages['pt'][key] ?? key
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
