import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstrategiaBand from './EstrategiaBand'

describe('EstrategiaBand', () => {
  it('renders the eyebrow phrase', () => {
    render(<EstrategiaBand />)
    expect(screen.getByText('Mais do que produtos.')).toBeInTheDocument()
  })

  it('renders the italic patrimonio phrase', () => {
    render(<EstrategiaBand />)
    expect(
      screen.getByText('Uma estratégia completa para o seu patrimônio.'),
    ).toBeInTheDocument()
  })

  it('exposes the full band text as the section aria-label', () => {
    const { container } = render(<EstrategiaBand />)
    const section = container.querySelector('section')
    expect(section).not.toBeNull()
    expect(section?.getAttribute('aria-label')).toBe(
      'Mais do que produtos. Uma estratégia completa para o seu patrimônio.',
    )
  })
})
