import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatsAppCTA } from './WhatsAppCTA'

describe('WhatsAppCTA', () => {
  it('renders a red pill link that opens WhatsApp in a new tab', () => {
    render(<WhatsAppCTA href="https://wa.me/5599999?text=oi" label="Fale com um especialista" />)
    const link = screen.getByRole('link', { name: /Fale com um especialista/i })
    expect(link).toHaveAttribute('href', 'https://wa.me/5599999?text=oi')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(link.className).toMatch(/bg-\[#ae251c\]/)
  })

  it('renders the WhatsApp glyph (svg) inside the button', () => {
    const { container } = render(
      <WhatsAppCTA href="https://wa.me/1" label="Fale com um especialista" />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('appends the extra className passed in', () => {
    render(<WhatsAppCTA href="https://wa.me/1" label="X" className="mt-10" />)
    expect(screen.getByRole('link', { name: 'X' }).className).toMatch(/mt-10/)
  })
})
