import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AudienceProvider } from '@/lib/audience'
import { LocaleProvider } from '@/lib/i18n'
import { ServiceLeadForm } from './ServiceLeadForm'

vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn().mockResolvedValue({ status: 200, text: 'OK' }) },
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
  formatWhatsAppLink: (number: string, msg: string) =>
    `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
}))

import emailjs from '@emailjs/browser'
const mockedSend = (emailjs as { send: ReturnType<typeof vi.fn> }).send

function renderForm() {
  return render(
    <LocaleProvider>
      <AudienceProvider>
        <ServiceLeadForm service="Seguros" />
      </AudienceProvider>
    </LocaleProvider>
  )
}

describe('ServiceLeadForm', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('hold:locale', 'pt')
    mockedSend.mockClear()
    vi.spyOn(window, 'open').mockImplementation(() => null)
    ;(window.open as ReturnType<typeof vi.fn>).mockClear?.()
  })

  it('renders the service label and intro title', () => {
    renderForm()
    expect(screen.getByText('Seguros')).toBeInTheDocument()
    expect(screen.getByText('Quero saber mais')).toBeInTheDocument()
  })

  it('renders Nome, WhatsApp and Mensagem fields', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('(34) 99999-9999')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Conte brevemente/)).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: /Enviar e abrir/ }))
    await waitFor(() => {
      expect(screen.getByText('Nome obrigatório')).toBeInTheDocument()
      expect(screen.getByText('WhatsApp inválido')).toBeInTheDocument()
    })
  })

  it('opens WhatsApp with prefilled message after valid submit', async () => {
    const user = userEvent.setup()
    renderForm()
    await user.type(screen.getByPlaceholderText('Seu nome'), 'João')
    await user.type(screen.getByPlaceholderText('(34) 99999-9999'), '34999999999')
    await user.click(screen.getByRole('button', { name: /Enviar e abrir/ }))
    await waitFor(() => {
      expect(window.open).toHaveBeenCalled()
    })
    const url = (window.open as ReturnType<typeof vi.fn>).mock.calls[0][0] as string
    expect(url).toMatch(/wa\.me/)
    expect(decodeURIComponent(url)).toContain('João')
    expect(decodeURIComponent(url)).toContain('Seguros')
  })

  it('respects custom intro props', () => {
    render(
      <LocaleProvider>
        <AudienceProvider>
          <ServiceLeadForm service="Saúde" introTitle="Tem interesse?" introBody="Te chamamos no zap." />
        </AudienceProvider>
      </LocaleProvider>
    )
    expect(screen.getByText('Tem interesse?')).toBeInTheDocument()
    expect(screen.getByText('Te chamamos no zap.')).toBeInTheDocument()
  })

  describe('with showAudienceField', () => {
    function renderWithAudience() {
      return render(
        <LocaleProvider>
          <AudienceProvider>
            <ServiceLeadForm service="Saúde" showAudienceField />
          </AudienceProvider>
        </LocaleProvider>
      )
    }

    it('renders the 3 audience radio options when showAudienceField is true', () => {
      renderWithAudience()
      expect(screen.getByLabelText(/Pessoa física/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^MEI$/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^Empresa$/i)).toBeInTheDocument()
    })

    it('shows validation error when no audience is selected on submit', async () => {
      renderWithAudience()
      fireEvent.click(screen.getByRole('button', { name: /Enviar e abrir/ }))
      await waitFor(() => {
        expect(screen.getByText(/Selecione uma opção/i)).toBeInTheDocument()
      })
    })

    it('sends the literal audience label in the WhatsApp message', async () => {
      const user = userEvent.setup()
      renderWithAudience()
      await user.click(screen.getByLabelText(/^MEI$/i))
      await user.type(screen.getByPlaceholderText('Seu nome'), 'Maria')
      await user.type(screen.getByPlaceholderText('(34) 99999-9999'), '34988887777')
      await user.click(screen.getByRole('button', { name: /Enviar e abrir/ }))
      await waitFor(() => {
        expect(window.open).toHaveBeenCalled()
      })
      const url = (window.open as ReturnType<typeof vi.fn>).mock.calls[0][0] as string
      expect(decodeURIComponent(url)).toContain('Maria')
      expect(decodeURIComponent(url)).toContain('MEI')
    })
  })
})
