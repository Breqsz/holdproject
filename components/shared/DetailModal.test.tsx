import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
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

  it('renders the items label when items are present', () => {
    render(<DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />)
    expect(screen.getByText('Coberturas')).toBeTruthy()
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

  it('replaces marker glyphs with a hairline rule and weight contrast', () => {
    render(<DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />)

    // No banned marker glyphs anywhere in the rendered output. Dialog content is
    // portaled to document.body, so assert against the dialog rather than the
    // render container.
    const dialog = screen.getByRole('dialog')
    expect(dialog.textContent).not.toContain('—')
    expect(dialog.textContent).not.toContain('·')

    // Structural replacement: each item is a hairline-separated <li>.
    const items = dialog.querySelectorAll('li')
    expect(items.length).toBe(DATA.items.length)
    items.forEach((item) => {
      expect(item.classList.contains('border-t')).toBe(true)
      expect(item.className).toContain('border-white/[0.09]')
    })

    // Structural replacement: the item name carries the weight contrast.
    expect(screen.getByText('Morte natural').classList.contains('font-semibold')).toBe(true)
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

  it('renders the photo when image is provided, decorative', () => {
    render(
      <DetailModal
        open
        data={{ ...DATA, image: '/images/x.webp' }}
        labels={LABELS}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )
    // Dialog.Portal mounts to document.body, a sibling of RTL's container div,
    // so we scope the query to the dialog root rather than `container`
    // (same pattern the glyph-guard test above uses).
    const dialog = screen.getByRole('dialog')
    const img = dialog.querySelector('img')
    expect(img).not.toBeNull()
    expect(img!.getAttribute('alt')).toBe('')
  })

  it('removes the dialog from the DOM once the exit transition completes after closing', async () => {
    const { rerender } = render(
      <DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />,
    )
    expect(screen.getByRole('dialog')).toBeTruthy()

    rerender(
      <DetailModal open={false} data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />,
    )

    await waitFor(
      () => {
        expect(screen.queryByRole('dialog')).toBeNull()
      },
      { timeout: 2000 },
    )
  })

  it('falls back to the icon when there is no image', () => {
    const Icon = () => <svg data-testid="fallback-icon" />
    render(
      <DetailModal
        open
        data={{ ...DATA, icon: Icon }}
        labels={LABELS}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.querySelector('img')).toBeNull()
    expect(screen.getByTestId('fallback-icon')).toBeTruthy()
  })
})
