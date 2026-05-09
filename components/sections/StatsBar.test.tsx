import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import StatsBar from './StatsBar'

vi.mock('next/image', () => ({
  default: ({ alt, ...rest }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={String(alt ?? '')} {...(rest as object)} />
  ),
}))

describe('StatsBar', () => {
  it('renders all four stat items', () => {
    render(<StatsBar />)
    expect(screen.getByText('+19')).toBeInTheDocument()
    expect(screen.getByText('+60')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders the three clickable items as buttons', () => {
    render(<StatsBar />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })

  it('propósito item has no button role (not clickable)', () => {
    render(<StatsBar />)
    const buttons = screen.getAllByRole('button')
    const labels = buttons.map((b) => b.textContent ?? '')
    expect(labels.every((l) => !l.includes('propósito'))).toBe(true)
  })

  it('renders the partners marquee region inside the accordion', () => {
    render(<StatsBar />)
    expect(
      screen.getByRole('region', { name: /parceiros estratégicos/i }),
    ).toBeInTheDocument()
  })

  it('renders all 7 partner logos in the marquee', () => {
    render(<StatsBar />)
    const logos = screen.getAllByRole('img')
    // LogoLoop renders multiple copies for the marquee — at least 7 unique logos.
    expect(logos.length).toBeGreaterThanOrEqual(7)
  })

  it('toggles accordion open/closed when +60 parceiros is clicked', () => {
    const { container } = render(<StatsBar />)
    const partnersBtn = screen.getByRole('button', { name: /parceiros estratégicos/i })
    const panel = container.querySelector('[style*="max-height"]') as HTMLElement
    expect(panel).toBeTruthy()

    // closed by default
    expect(panel.style.maxHeight).toBe('0px')

    // open
    fireEvent.click(partnersBtn)
    expect(panel.style.maxHeight).toBe('90px')

    // close again (toggle)
    fireEvent.click(partnersBtn)
    expect(panel.style.maxHeight).toBe('0px')
  })

  it('shows chevron-down indicator on +60 item only when accordion is open', () => {
    const { container } = render(<StatsBar />)
    const partnersBtn = screen.getByRole('button', { name: /parceiros estratégicos/i })

    // No chevron when closed
    expect(partnersBtn.querySelector('svg.lucide-chevron-down')).toBeNull()

    // Chevron appears when open
    fireEvent.click(partnersBtn)
    expect(partnersBtn.querySelector('svg.lucide-chevron-down')).toBeInTheDocument()
  })
})
