/**
 * Contato.test.tsx
 *
 * Coverage plan:
 *  1. Renders eyebrow + title from i18n.
 *  2. Renders the tab toggle with both labels.
 *  3. Default tab is "client" — client fields are visible.
 *  4. Switching to "partner" tab shows partner fields.
 *  5. Client form — Zod validation shows inline errors on empty submit.
 *  6. Partner form — Zod validation shows inline errors on empty submit.
 *  7. Client form — happy path: emailjs.send called, toast.success, window.open, form reset.
 *  8. Partner form — happy path: emailjs.send called, toast.success, window.open.
 *  9. emailjs failure — toast.error shown.
 * 10. Loading state: submit button is disabled while the request is in-flight.
 */

import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

// ── Mocks ──────────────────────────────────────────────────────────────────

// emailjs
vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn() },
}))

// sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// framer-motion — strip animation so AnimatePresence swaps instantly
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ({ children, ...rest }: any) =>
            React.createElement(prop, rest, children),
      },
    ),
  }
})

// i18n — deterministic labels
vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => key, // returns the key itself so assertions are stable
  }),
}))

// utils
vi.mock('@/lib/utils', () => ({
  formatWhatsAppLink: (number: string, msg: string) =>
    `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
}))

// ── Helpers ────────────────────────────────────────────────────────────────

import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import Contato from './Contato'

const mockedSend = emailjs.send as ReturnType<typeof vi.fn>
const mockedToastSuccess = toast.success as ReturnType<typeof vi.fn>
const mockedToastError = toast.error as ReturnType<typeof vi.fn>

function renderContato() {
  return render(<Contato />)
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Contato section', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: emailjs resolves successfully
    mockedSend.mockResolvedValue({ status: 200, text: 'OK' })
    // Silence window.open in jsdom
    vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ── 1. Renders title ──────────────────────────────────────────────────────
  it('renders title from i18n', () => {
    renderContato()
    expect(screen.getByText('contact.title')).toBeInTheDocument()
  })

  // ── 2. Tab toggle labels ────────────────────────────────────────────────
  it('renders both tab labels', () => {
    renderContato()
    expect(
      screen.getByRole('button', { name: 'contact.client.title' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'contact.partner.title' }),
    ).toBeInTheDocument()
  })

  // ── 3. Default tab is client ────────────────────────────────────────────
  it('shows client fields by default', () => {
    renderContato()
    expect(screen.getByText('contact.segment.label')).toBeInTheDocument()
    expect(screen.getByText('contact.credit.label')).toBeInTheDocument()
    expect(screen.getByText('contact.term.label')).toBeInTheDocument()
    expect(screen.getByText('contact.name.label')).toBeInTheDocument()
    expect(screen.getByText('contact.whatsapp.label')).toBeInTheDocument()
  })

  // ── 4. Switch to partner tab ────────────────────────────────────────────
  it('shows partner fields after clicking partner tab', async () => {
    renderContato()
    await userEvent.click(
      screen.getByRole('button', { name: 'contact.partner.title' }),
    )
    expect(screen.getByText('contact.company.label')).toBeInTheDocument()
    expect(screen.getByText('contact.broker.label')).toBeInTheDocument()
    expect(screen.getByText('contact.advisors.label')).toBeInTheDocument()
    expect(screen.getByText('contact.phone.label')).toBeInTheDocument()
    expect(screen.getByText('contact.email.label')).toBeInTheDocument()
  })

  // ── 5. Client form validation ───────────────────────────────────────────
  it('shows client validation errors on empty submit', async () => {
    renderContato()
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.submit.client' }),
    )
    await waitFor(() => {
      expect(screen.getByText('Selecione um segmento')).toBeInTheDocument()
      expect(screen.getByText('Informe o crédito desejado')).toBeInTheDocument()
      expect(screen.getByText('Informe o prazo')).toBeInTheDocument()
      expect(screen.getByText('Nome obrigatório')).toBeInTheDocument()
      expect(screen.getByText('WhatsApp inválido')).toBeInTheDocument()
    })
    expect(mockedSend).not.toHaveBeenCalled()
  })

  // ── 6. Partner form validation ──────────────────────────────────────────
  it('shows partner validation errors on empty submit', async () => {
    renderContato()
    await userEvent.click(
      screen.getByRole('button', { name: 'contact.partner.title' }),
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.submit.partner' }),
    )
    await waitFor(() => {
      expect(screen.getByText('Razão social obrigatória')).toBeInTheDocument()
      expect(
        screen.getByText('Nome do escritório obrigatório'),
      ).toBeInTheDocument()
      expect(screen.getByText('Informe a quantidade')).toBeInTheDocument()
      expect(screen.getByText('Telefone inválido')).toBeInTheDocument()
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
    })
    expect(mockedSend).not.toHaveBeenCalled()
  })

  // ── 7. Client form happy path ───────────────────────────────────────────
  it('client form: calls emailjs, toast.success and window.open on valid submit', async () => {
    renderContato()

    // Fill all fields
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      'Imóvel',
    )
    await userEvent.type(screen.getByPlaceholderText('500.000'), '300000')
    await userEvent.type(screen.getByPlaceholderText('ex: 60 meses'), '60 meses')
    await userEvent.type(
      screen.getByPlaceholderText('Seu nome completo'),
      'João Silva',
    )
    await userEvent.type(
      screen.getByPlaceholderText('(11) 99999-9999'),
      '11999998888',
    )

    await userEvent.click(
      screen.getByRole('button', { name: 'contact.submit.client' }),
    )

    await waitFor(() => {
      expect(mockedSend).toHaveBeenCalledTimes(1)
      expect(mockedToastSuccess).toHaveBeenCalledWith('contact.success')
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining('wa.me'),
        '_blank',
      )
    })
  })

  // ── 8. Partner form happy path ──────────────────────────────────────────
  it('partner form: calls emailjs, toast.success and window.open on valid submit', async () => {
    renderContato()

    await userEvent.click(
      screen.getByRole('button', { name: 'contact.partner.title' }),
    )

    await userEvent.type(
      screen.getByPlaceholderText('Razão social da empresa'),
      'Empresa Teste Ltda',
    )
    await userEvent.type(
      screen.getByPlaceholderText('Nome do escritório / correspondente'),
      'Escritório Parceiro',
    )
    await userEvent.type(screen.getByPlaceholderText('Ex: 5'), '10')
    // Partner tab has its own phone field (distinct from client's whatsapp)
    await userEvent.type(
      screen.getByPlaceholderText('(11) 99999-9999'),
      '11988887777',
    )
    await userEvent.type(
      screen.getByPlaceholderText('contato@empresa.com.br'),
      'parceiro@empresa.com',
    )

    await userEvent.click(
      screen.getByRole('button', { name: 'contact.submit.partner' }),
    )

    await waitFor(() => {
      expect(mockedSend).toHaveBeenCalledTimes(1)
      expect(mockedToastSuccess).toHaveBeenCalledWith('contact.success')
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining('wa.me'),
        '_blank',
      )
    })
  })

  // ── 9. emailjs failure → toast.error ───────────────────────────────────
  it('shows toast.error when emailjs throws', async () => {
    mockedSend.mockRejectedValueOnce(new Error('network error'))

    renderContato()

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Veículo')
    await userEvent.type(screen.getByPlaceholderText('500.000'), '150000')
    await userEvent.type(screen.getByPlaceholderText('ex: 60 meses'), '48 meses')
    await userEvent.type(
      screen.getByPlaceholderText('Seu nome completo'),
      'Maria Souza',
    )
    await userEvent.type(
      screen.getByPlaceholderText('(11) 99999-9999'),
      '11977776666',
    )

    await userEvent.click(
      screen.getByRole('button', { name: 'contact.submit.client' }),
    )

    await waitFor(() => {
      expect(mockedToastError).toHaveBeenCalledWith('contact.error')
      expect(mockedToastSuccess).not.toHaveBeenCalled()
    })
  })

  // ── 10. Loading state ───────────────────────────────────────────────────
  it('disables submit button while request is pending', async () => {
    // Never resolves during the test
    mockedSend.mockImplementationOnce(
      () => new Promise(() => {}),
    )

    renderContato()

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Serviços')
    await userEvent.type(screen.getByPlaceholderText('500.000'), '50000')
    await userEvent.type(screen.getByPlaceholderText('ex: 60 meses'), '24 meses')
    await userEvent.type(
      screen.getByPlaceholderText('Seu nome completo'),
      'Carlos Lima',
    )
    await userEvent.type(
      screen.getByPlaceholderText('(11) 99999-9999'),
      '11966665555',
    )

    // Click the submit button
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: /contact\.submit\.client/i }),
      )
    })

    // Re-query after click so we get the post-render DOM node
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /contact\.submit\.client/i }),
      ).toBeDisabled()
    })
  })
})
