import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AudienceProvider } from '@/lib/audience'
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
    <AudienceProvider>
      <ServiceLeadForm service="Seguros" />
    </AudienceProvider>
  )
}

describe('ServiceLeadForm', () => {
  beforeEach(() => {
    window.localStorage.clear()
    mockedSend.mockClear()
    vi.spyOn(window, 'open').mockImplementation(() => null)
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
      <AudienceProvider>
        <ServiceLeadForm service="Saúde" introTitle="Tem interesse?" introBody="Te chamamos no zap." />
      </AudienceProvider>
    )
    expect(screen.getByText('Tem interesse?')).toBeInTheDocument()
    expect(screen.getByText('Te chamamos no zap.')).toBeInTheDocument()
  })
})
