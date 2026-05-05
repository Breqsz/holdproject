'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Audience = 'pf' | 'pj'

const STORAGE_KEY = 'hold:audience'

interface AudienceContextValue {
  audience: Audience
  setAudience: (next: Audience) => void
  hydrated: boolean
}

const AudienceContext = createContext<AudienceContextValue | null>(null)

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>('pf')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'pf' || stored === 'pj') {
        setAudienceState(stored)
      }
    } catch {
      // localStorage unavailable — keep default
    }
    setHydrated(true)
  }, [])

  const setAudience = (next: Audience) => {
    setAudienceState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  return (
    <AudienceContext.Provider value={{ audience, setAudience, hydrated }}>
      {children}
    </AudienceContext.Provider>
  )
}

export function useAudience() {
  const ctx = useContext(AudienceContext)
  if (!ctx) throw new Error('useAudience must be used inside AudienceProvider')
  return ctx
}
