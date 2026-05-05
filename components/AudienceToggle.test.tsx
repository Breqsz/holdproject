import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AudienceProvider } from '@/lib/audience'
import { AudienceToggle } from './AudienceToggle'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, layoutId: _l, transition: _t, ...rest }: any) =>
          React.createElement(tag, rest, children),
    }
  )
  return { motion }
})

function renderToggle() {
  return render(
    <AudienceProvider>
      <AudienceToggle />
    </AudienceProvider>
  )
}

describe('AudienceToggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders both audience buttons', () => {
    renderToggle()
    expect(screen.getByRole('button', { name: 'Para você' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Para sua empresa' })).toBeInTheDocument()
  })

  it('marks "Para você" as pressed by default', () => {
    renderToggle()
    expect(screen.getByRole('button', { name: 'Para você' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Para sua empresa' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('flips aria-pressed when "Para sua empresa" is clicked', async () => {
    const user = userEvent.setup()
    renderToggle()
    await user.click(screen.getByRole('button', { name: 'Para sua empresa' }))
    expect(screen.getByRole('button', { name: 'Para sua empresa' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Para você' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('persists the choice to localStorage', async () => {
    const user = userEvent.setup()
    renderToggle()
    await user.click(screen.getByRole('button', { name: 'Para sua empresa' }))
    expect(window.localStorage.getItem('hold:audience')).toBe('pj')
  })

  it('exposes a labelled group for screen readers', () => {
    renderToggle()
    expect(screen.getByRole('group', { name: 'Selecionar audiência' })).toBeInTheDocument()
  })

  it('applies backdrop-blur wrapper when variant="hero"', () => {
    render(
      <AudienceProvider>
        <AudienceToggle variant="hero" />
      </AudienceProvider>
    )
    const group = screen.getByRole('group', { name: 'Selecionar audiência' })
    expect(group.className).toMatch(/backdrop-blur/)
  })
})
