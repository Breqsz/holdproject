import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        React.forwardRef(
          (
            {
              children,
              initial: _i,
              animate: _a,
              whileHover: _wh,
              whileTap: _wt,
              transition: _t,
              ...rest
            }: Record<string, unknown>,
            ref: unknown
          ) =>
            React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return { motion }
})

describe('WhatsAppButton', () => {
  const ORIGINAL_ENV = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  afterEach(() => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = ORIGINAL_ENV
    vi.resetModules()
  })

  it('renders an anchor with aria-label "Falar no WhatsApp"', async () => {
    const { default: WhatsAppButton } = await import('./WhatsAppButton')
    render(<WhatsAppButton />)
    expect(screen.getByRole('link', { name: 'Falar no WhatsApp' })).toBeInTheDocument()
  })

  it('uses # when env var is missing', async () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = ''
    vi.resetModules()
    const { default: WhatsAppButton } = await import('./WhatsAppButton')
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: 'Falar no WhatsApp' })
    expect(link).toHaveAttribute('href', '#')
  })

  it('opens in a new tab with rel="noopener noreferrer"', async () => {
    const { default: WhatsAppButton } = await import('./WhatsAppButton')
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: 'Falar no WhatsApp' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
