import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import SaudeClient from '@/app/saude/SaudeClient'
import { AudienceProvider } from '@/lib/audience'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap
          return React.createElement(tag, d, children)
        },
    }
  )
  return { motion, AnimatePresence: ({ children }: { children: React.ReactNode }) => children, useReducedMotion: () => false }
})

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => {
    const React = require('react')
    return React.createElement('img', { alt, src })
  },
}))

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

function renderClient() {
  return render(<AudienceProvider><SaudeClient /></AudienceProvider>)
}

describe('SaudeClient', () => {
  beforeEach(() => { window.localStorage.clear() })

  it('renders the H1 about saúde', () => {
    renderClient()
    expect(screen.getByRole('heading', { level: 1, name: /escolha consciente/i })).toBeInTheDocument()
  })

  it('renders all 4 cobertura blocks', () => {
    renderClient()
    expect(screen.getByText('Individual & Familiar')).toBeInTheDocument()
    expect(screen.getByText('Empresarial')).toBeInTheDocument()
    expect(screen.getByText('Odonto')).toBeInTheDocument()
    expect(screen.getByText('Telemedicina')).toBeInTheDocument()
  })

  it('renders the audience toggle', () => {
    renderClient()
    expect(screen.getByRole('button', { name: 'Para você' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Para sua empresa' })).toBeInTheDocument()
  })

  it('renders the WhatsApp CTA in hero', () => {
    renderClient()
    expect(screen.getByRole('link', { name: /Falar no WhatsApp/i })).toBeInTheDocument()
  })

  it('renders the lead form', () => {
    renderClient()
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument()
    expect(screen.getByText(/Quero comparar planos/i)).toBeInTheDocument()
  })
})
