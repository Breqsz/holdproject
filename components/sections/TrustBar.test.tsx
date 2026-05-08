import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrustBar from './TrustBar'

vi.mock('@/components/icons/HoldLogo', () => ({
  HoldLogo: ({ className }: { className?: string }) => <svg className={className} data-testid="hold-logo" />,
}))

describe('TrustBar', () => {
  it('renders 5 items', () => {
    render(<TrustBar />)
    const items = document.querySelectorAll('[data-testid="trustbar-item"]')
    expect(items).toHaveLength(5)
  })

  it('renders 5 dots', () => {
    render(<TrustBar />)
    const dots = document.querySelectorAll('[data-testid="trustbar-dot"]')
    expect(dots).toHaveLength(5)
  })

  it('first dot is active by default', () => {
    render(<TrustBar />)
    const dots = document.querySelectorAll('[data-testid="trustbar-dot"]')
    expect(dots[0].className).toContain('bg-[#c9a84c]')
    expect(dots[1].className).not.toContain('bg-[#c9a84c]')
  })
})
