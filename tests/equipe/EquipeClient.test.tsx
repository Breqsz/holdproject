import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import EquipeClient from '@/app/equipe/EquipeClient'
import { AudienceProvider } from '@/lib/audience'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, style, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap
          return React.createElement(tag, { ...d, style }, children)
        },
    }
  )
  const make = () => ({ get: () => 0, set: () => {}, onChange: () => () => {} })
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
    useMotionValue: make,
    useSpring: make,
    useTransform: make,
  }
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
  return render(<AudienceProvider><EquipeClient /></AudienceProvider>)
}

describe('EquipeClient', () => {
  beforeEach(() => { window.localStorage.clear() })

  it('renders the H1 about consultive team', () => {
    renderClient()
    expect(
      screen.getByRole('heading', { level: 1, name: /Time consultivo, presente em cada etapa/i })
    ).toBeInTheDocument()
  })

  it('renders all 6 team members by name', () => {
    renderClient()
    ;[
      'Jacimar Mendonça',
      'Time de Saúde',
      'Time de Seguros',
      'Time de Consórcios',
      'Time Patrimonial',
      'Atendimento & Pós-venda',
    ].forEach((name) => {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument()
    })
  })

  it('renders all 6 team member roles', () => {
    renderClient()
    ;[
      'Diretoria executiva',
      'Especialistas em planos de saúde',
      'Consultores em proteção patrimonial',
      'Estruturação de consórcios',
      'Estratégia patrimonial',
      'Relacionamento com cliente',
    ].forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument()
    })
  })

  it('renders the contact section with WhatsApp CTA', () => {
    renderClient()
    expect(screen.getByRole('link', { name: /Falar no WhatsApp/i })).toBeInTheDocument()
  })

  it('renders the lead form (direct contact section)', () => {
    renderClient()
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument()
    expect(screen.getByText(/Direcionar contato/i)).toBeInTheDocument()
  })

  it('uses the renamed jacimar avatar path', () => {
    renderClient()
    const img = screen.getByAltText('Jacimar Mendonça') as HTMLImageElement
    expect(img.src).toContain('/personagem/jacimar-avatar-3d.png')
  })
})
