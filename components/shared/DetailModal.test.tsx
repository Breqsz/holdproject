import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DetailModal, type DetailData } from './DetailModal'

const LABELS = { itemsLabel: 'Coberturas', cta: 'Falar com especialista', close: 'Fechar' }

const DATA: DetailData = {
  eyebrow: 'Seguros',
  title: 'Vida e Pessoas',
  short: 'Resumo da linha.',
  items: [{ name: 'Morte natural' }, { name: 'Invalidez', desc: 'Total ou parcial.' }],
}

describe('DetailModal', () => {
  it('does not render anything when closed', () => {
    render(
      <DetailModal open={false} data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders a dialog with an accessible name when open', () => {
    render(
      <DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />,
    )
    expect(screen.getByRole('dialog', { name: 'Vida e Pessoas' })).toBeTruthy()
  })

  it('renders nothing when data is null even if open', () => {
    render(
      <DetailModal open data={null} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
