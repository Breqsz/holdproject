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

  // Regressao: o painel ja foi centrado com `left-1/2 top-1/2 -translate-x-1/2
  // -translate-y-1/2`. Como o framer escreve `transform` inline para animar
  // y/scale, aquelas classes eram sobrescritas e o modal abria no canto.
  // jsdom nao calcula layout, entao o guarda e estrutural.
  it('centers via a flex wrapper, never via a transform on the animated panel', () => {
    render(<DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />)
    const panel = screen.getByRole('dialog')

    expect(panel.className).not.toMatch(/-translate-[xy]-/)

    const wrapper = panel.parentElement
    expect(wrapper).not.toBeNull()
    expect(wrapper!.className).toContain('flex')
    expect(wrapper!.className).toContain('items-center')
    expect(wrapper!.className).toContain('justify-center')
  })

  // Regressao: o painel perdeu `relative` ao virar filho do wrapper de flex, e
  // o Dialog.Close (que e `absolute`) passou a resolver contra o wrapper
  // `fixed inset-0`, aparecendo no canto da viewport em vez de no painel.
  it('anchors the close button to the panel, not the viewport', () => {
    render(<DetailModal open data={DATA} labels={LABELS} onClose={vi.fn()} onConfirm={vi.fn()} />)
    const panel = screen.getByRole('dialog')
    const close = screen.getByRole('button', { name: LABELS.close })

    expect(panel.contains(close)).toBe(true)
    expect(close.className).toContain('absolute')
    expect(panel.className).toContain('relative')
  })

  // Regressao: `sizes` dizia 340px (a largura da coluna), mas object-cover numa
  // coluna alta escala a foto pela ALTURA, exigindo largura de origem bem maior.
  // Com 340px o browser baixava uma variante pequena e ampliava, borrando tudo.
  it('requests a source wide enough for the tall cover crop', () => {
    render(
      <DetailModal
        open
        data={{ ...DATA, image: '/images/x.webp' }}
        labels={LABELS}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )
    const img = screen.getByRole('dialog').querySelector('img')!
    const sizes = img.getAttribute('sizes') ?? ''
    const desktopWidth = Number(sizes.match(/(\d+)px\s*$/)?.[1] ?? 0)
    expect(desktopWidth).toBeGreaterThanOrEqual(1000)
  })
})
