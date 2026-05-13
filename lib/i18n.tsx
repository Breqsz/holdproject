'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import pt from '@/messages/pt.json'
import en from '@/messages/en.json'

type Locale = 'pt' | 'en'

const STORAGE_KEY = 'hold:locale'

const messages: Record<Locale, Record<string, string>> = { pt, en }

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'pt' || stored === 'en') {
        setLocaleState(stored)
        return
      }
      const nav = window.navigator.language?.slice(0, 2).toLowerCase()
      if (nav === 'en') setLocaleState('en')
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, [])

  function setLocale(next: Locale) {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.lang = next === 'pt' ? 'pt-BR' : 'en'
    } catch {
      /* ignore */
    }
  }

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
