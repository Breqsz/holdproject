import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('renders the eyebrow, short and body', () => {
    render(
      <DetailModal
        open
        data={{ ...DATA, body: 'Corpo explicativo.' }}
        labels={LABELS}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )
    expect(screen.getByText('Seguros')).toBeTruthy()
    expect(screen.getByText('Resumo da linha.')).toBeTruthy()
    expect(screen.getByText('Corpo explicativo.')).toBeTruthy()
  })

  it('renders item names and the optional description', () => {
    render(<DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />)
    expect(screen.getByText('Morte natural')).toBeTruthy()
    expect(screen.getByText('Invalidez')).toBeTruthy()
    expect(screen.getByText('Total ou parcial.')).toBeTruthy()
  })

  it('omits the items block entirely when there are no items', () => {
    render(
      <DetailModal
        open
        data={{ ...DATA, items: [] }}
        labels={LABELS}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )
    expect(screen.queryByText('Coberturas')).toBeNull()
  })

  it('never renders an em dash as a list marker', () => {
    const { container } = render(
      <DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />,
    )
    expect(container.textContent).not.toContain('—')
  })

  it('calls onConfirm when the CTA is pressed', async () => {
    const onConfirm = vi.fn()
    const user = userEvent.setup()
    render(<DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={onConfirm} />)
    await user.click(screen.getByRole('button', { name: 'Falar com especialista' }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('calls onClose when the close button is pressed', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<DetailModal open data={DATA} labels={LABELS} onClose={onClose} onConfirm={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(onClose).toHaveBeenCalled()
  })
})
