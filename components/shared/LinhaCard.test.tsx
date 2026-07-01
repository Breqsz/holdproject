import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LinhaCard, type LinhaCardData } from '@/components/shared/LinhaCard'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        React.forwardRef(
          (
            {
              children,
              whileHover: _wh,
              variants: _v,
              transition: _tr,
              ...rest
            }: Record<string, unknown>,
            ref: unknown
          ) => React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return { motion }
})

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ alt, src }: any) => <img alt={alt ?? ''} src={typeof src === 'string' ? src : ''} />,
}))

function DummyIcon() {
  return <svg data-testid="dummy-icon" />
}

const baseData: LinhaCardData = {
  seq: '01',
  icon: DummyIcon,
  title: 'Renda fixa estruturada',
  short: 'Composição entre títulos públicos e CDBs.',
  body: 'corpo',
  bullets: ['Títulos públicos', 'CDBs'],
  ariaLabel: 'Abrir Renda fixa',
}

describe('LinhaCard — photo treatment', () => {
  it('renders the full-bleed photo and title when given an image, with no Hold eyebrow / index', () => {
    const { container } = render(
      <LinhaCard
        data={{ ...baseData, image: '/investimento/pilares/renda-fixa.jpg' }}
        ctaLabel="Conhecer"
        onSelect={() => {}}
        tall
      />
    )
    expect(container.querySelector('img')).toHaveAttribute('src', '/investimento/pilares/renda-fixa.jpg')
    expect(screen.getByText('Renda fixa estruturada')).toBeInTheDocument()
    // sem eyebrow "Hold" e sem índice "01 / 04"
    expect(screen.queryByText(/Hold/i)).toBeNull()
    expect(screen.queryByText(/\d{2}\s*\/\s*\d{2}/)).toBeNull()
  })

  it('fires onSelect when clicked', () => {
    const onSelect = vi.fn()
    render(
      <LinhaCard data={{ ...baseData, image: '/x.jpg' }} ctaLabel="Conhecer" onSelect={onSelect} tall />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Abrir Renda fixa' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('default (no image) keeps the icon+gradient fallback — other frentes unaffected', () => {
    render(<LinhaCard data={baseData} ctaLabel="Conhecer" onSelect={() => {}} />)
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByTestId('dummy-icon')).toBeInTheDocument()
  })
})

describe('LinhaCard — dense (opt-in, mobile compacto)', () => {
  it('default: min-h padrão e bullets visíveis (outras frentes inalteradas)', () => {
    render(
      <LinhaCard data={{ ...baseData, image: '/x.jpg' }} ctaLabel="Conhecer" onSelect={() => {}} />
    )
    const button = screen.getByRole('button', { name: 'Abrir Renda fixa' })
    expect(button.className).toContain('min-h-[300px]')
    expect(button.className).not.toContain('min-h-[240px]')
    expect(screen.getByTestId('linha-bullets').className).not.toContain('hidden lg:block')
  })

  it('dense: min-h compacto no mobile e bullets ocultos no mobile', () => {
    render(
      <LinhaCard data={{ ...baseData, image: '/x.jpg' }} ctaLabel="Conhecer" onSelect={() => {}} dense />
    )
    const button = screen.getByRole('button', { name: 'Abrir Renda fixa' })
    expect(button.className).toContain('min-h-[240px]')
    expect(button.className).toContain('lg:min-h-[380px]')
    const bullets = screen.getByTestId('linha-bullets')
    expect(bullets.className).toContain('hidden')
    expect(bullets.className).toContain('lg:block')
  })

  it('dense ainda dispara onSelect ao clicar', () => {
    const onSelect = vi.fn()
    render(
      <LinhaCard data={{ ...baseData, image: '/x.jpg' }} ctaLabel="Conhecer" onSelect={onSelect} dense />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Abrir Renda fixa' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
