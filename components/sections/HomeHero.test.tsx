import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomeHero from './HomeHero'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy({}, {
    get: (_t, tag: string) =>
      React.forwardRef(({ children, initial, animate, transition, style, ...rest }: any, ref: unknown) => {
        void initial; void animate; void transition
        return React.createElement(tag, { ...rest, style, ref }, children)
      }),
  })
  const make = () => ({ get: () => 0, set: () => {}, onChange: () => () => {} })
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useMotionValue: make,
    useSpring: make,
  }
})

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: any) => {
    const React = require('react')
    return React.createElement('a', { href, ...rest }, children)
  },
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }: any) => {
    const React = require('react')
    return React.createElement('img', { src, alt, ...rest })
  },
}))

vi.mock('@/lib/utils', () => ({
  formatWhatsAppLink: (number: string, message: string) =>
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
}))

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => ({
      'hero.eyebrow':            'Ecossistema HOLD',
      'hero.title.line1':        'Um ecossistema.',
      'hero.title.line2':        'Quatro frentes.',
      'hero.title.line3':        'Uma estratégia para proteger, planejar e expandir patrimônios.',
      'hero.subtitle':           'Soluções em saúde, seguros, consórcios e finanças integradas.',
      'hero.cta.specialist':     'Fale com um especialista',
      'hero.cta.solutions':      'Conheça nossas soluções',
      'hero.service.saude':      'Saúde',
      'hero.service.seguros':    'Seguros',
      'hero.service.consorcios': 'Consórcios',
      'hero.service.financas':   'Soluções Financeiras',
      'hero.photo.alt':          'Família atendida pela Hold Corretora',
      'hero.wa.pf':              'Olá! Quero conversar com um especialista da Hold.',
    } as Record<string, string>)[key] ?? key,
  }),
}))

describe('HomeHero', () => {
  it('renders section with id="home"', () => {
    render(<HomeHero />)
    expect(document.querySelector('#home')).not.toBeNull()
  })

  it('renders headline lines 1 and 2', () => {
    render(<HomeHero />)
    expect(screen.getByText('Um ecossistema.')).toBeInTheDocument()
    expect(screen.getByText('Quatro frentes.')).toBeInTheDocument()
  })

  it('renders primary CTA linking to WhatsApp', () => {
    render(<HomeHero />)
    const link = screen.getByRole('link', { name: /Fale com um especialista/i })
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toMatch(/wa\.me/)
  })

  it('renders the WhatsApp CTA immediately on mount, without waiting for the typing animation', () => {
    render(<HomeHero />)
    // No fake timers advanced here — TextType's onTypingComplete never fires,
    // so isTypingDone stays false. The CTA must still be in the document with
    // its href intact, proving mobile visibility does not depend on typing.
    const cta = screen.getByRole('link', { name: /especialista/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', expect.stringContaining('wa.me'))
  })

  it('forces full opacity on mobile (max-md:!opacity-100) on subtitle and CTA row, independent of typing state', () => {
    render(<HomeHero />)
    const subtitle = screen.getByText('Soluções em saúde, seguros, consórcios e finanças integradas.')
    expect(subtitle.className).toContain('max-md:!opacity-100')
    expect(subtitle.className).toContain('max-md:!transition-none')

    const cta = screen.getByRole('link', { name: /especialista/i })
    const ctaRow = cta.parentElement
    expect(ctaRow?.className).toContain('max-md:!opacity-100')
    expect(ctaRow?.className).toContain('max-md:!transition-none')
  })

  it('gives the CTA pills a 44px+ mobile tap target (h-12) while preserving h-10 on desktop', () => {
    render(<HomeHero />)
    const waLink = screen.getByRole('link', { name: /especialista/i })
    expect(waLink.className).toContain('h-12')
    expect(waLink.className).toContain('md:h-10')

    const solutionsLink = screen.getByRole('link', { name: /Conheça nossas soluções/i })
    expect(solutionsLink.className).toContain('h-12')
    expect(solutionsLink.className).toContain('md:h-10')
  })

  it('renders secondary CTA linking to #solucoes', () => {
    render(<HomeHero />)
    const link = screen.getByRole('link', { name: /Conheça nossas soluções/i })
    expect(link).toHaveAttribute('href', '#solucoes')
  })

  it('renders the hero background photo', () => {
    render(<HomeHero />)
    const imgs = Array.from(document.querySelectorAll('img'))
    expect(imgs.some(img => img.getAttribute('src')?.includes('HOME_IMAGE_8'))).toBe(true)
  })

  it('does not render AudienceToggle', () => {
    render(<HomeHero />)
    expect(screen.queryByRole('button', { name: /Para você/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /Para sua empresa/i })).toBeNull()
  })

  it('renders the mobile hero band fade div', () => {
    render(<HomeHero />)
    const fade = document.querySelector('[data-testid="mobile-band-fade"]')
    expect(fade).toBeTruthy()
  })

  it('band fade dissolves the image into the white text section (mobile only, to-white)', () => {
    render(<HomeHero />)
    const fade = document.querySelector('[data-testid="mobile-band-fade"]')
    expect(fade?.className).toContain('to-white')
    expect(fade?.className).toContain('md:hidden')
  })
})
