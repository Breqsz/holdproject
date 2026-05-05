import { describe, it, expect, vi } from 'vitest'

// next/font/google must be mocked because Vitest can't run the font loader.
vi.mock('next/font/google', () => ({
  Outfit: () => ({ variable: 'mock-outfit-var' }),
}))

import RootLayout, { metadata } from '@/app/layout'

describe('RootLayout', () => {
  it('exports SEO metadata with title template and canonical url', () => {
    expect(metadata.title).toEqual({
      default: 'Hold Corretora — Consultoria especializada em consórcios',
      template: '%s · Hold Corretora',
    })
    expect(metadata.alternates?.canonical).toBe('/')
  })

  it('exposes openGraph metadata', () => {
    expect(metadata.openGraph?.siteName).toBe('Hold Corretora')
    expect(metadata.openGraph?.locale).toBe('pt_BR')
  })

  it('is a function component (renders the html shell)', () => {
    expect(typeof RootLayout).toBe('function')
  })
})
