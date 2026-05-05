import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  FieldError,
  StepperNav,
  StepPerfil,
  StepInteresse,
  StepEscritorio,
  StepDados,
  DoneState,
  INIT,
  type FormState,
} from './ContactWizardSteps'

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        React.forwardRef(
          (
            {
              children,
              initial: _i,
              animate: _a,
              exit: _e,
              variants: _v,
              transition: _t,
              ...rest
            }: Record<string, unknown>,
            ref: unknown
          ) => React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return {
    motion,
    AnimatePresence: ({ children }: { children: unknown }) => children,
  }
})

vi.mock('@/lib/utils', () => ({
  formatWhatsAppLink: (number: string, msg: string) =>
    `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
}))

vi.mock('@/components/icons/WhatsAppIcon', () => ({
  WhatsAppIcon: () => null,
}))

// ── Helpers ───────────────────────────────────────────────────────────────────

function clientData(overrides: Partial<FormState> = {}): FormState {
  return {
    ...INIT,
    type: 'client',
    name: 'João Silva',
    whatsapp: '34999998888',
    service: 'seguros',
    ...overrides,
  }
}

function partnerData(overrides: Partial<FormState> = {}): FormState {
  return {
    ...INIT,
    type: 'partner',
    name: 'Ana Costa',
    phone: '34999991111',
    email: 'ana@corp.com',
    broker: 'Escritório ABC',
    ...overrides,
  }
}

// ── FieldError ────────────────────────────────────────────────────────────────

describe('FieldError', () => {
  it('renders nothing when msg is undefined', () => {
    const { container } = render(<FieldError />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when msg is empty string', () => {
    const { container } = render(<FieldError msg="" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the error message when msg is provided', () => {
    render(<FieldError msg="Campo obrigatório" />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })
})

// ── StepperNav ────────────────────────────────────────────────────────────────

describe('StepperNav', () => {
  it('shows client labels: Perfil, Interesse, Contato', () => {
    render(<StepperNav step={1} isPartner={false} />)
    expect(screen.getByText('Perfil')).toBeInTheDocument()
    expect(screen.getByText('Interesse')).toBeInTheDocument()
    expect(screen.getByText('Contato')).toBeInTheDocument()
  })

  it('shows Escritório instead of Interesse for partner', () => {
    render(<StepperNav step={1} isPartner={true} />)
    expect(screen.getByText('Escritório')).toBeInTheDocument()
    expect(screen.queryByText('Interesse')).not.toBeInTheDocument()
  })

  it('shows step number for active and future steps', () => {
    render(<StepperNav step={1} isPartner={false} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('hides number for completed steps (shows checkmark instead)', () => {
    render(<StepperNav step={3} isPartner={false} />)
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})

// ── StepPerfil ────────────────────────────────────────────────────────────────

describe('StepPerfil', () => {
  it('renders both profile options', () => {
    render(<StepPerfil type="" onSelect={vi.fn()} />)
    expect(screen.getByText('Sou cliente')).toBeInTheDocument()
    expect(screen.getByText('Sou parceiro')).toBeInTheDocument()
  })

  it('calls onSelect("client") when Sou cliente is clicked', async () => {
    const onSelect = vi.fn()
    render(<StepPerfil type="" onSelect={onSelect} />)
    await userEvent.click(screen.getByText('Sou cliente'))
    expect(onSelect).toHaveBeenCalledWith('client')
  })

  it('calls onSelect("partner") when Sou parceiro is clicked', async () => {
    const onSelect = vi.fn()
    render(<StepPerfil type="" onSelect={onSelect} />)
    await userEvent.click(screen.getByText('Sou parceiro'))
    expect(onSelect).toHaveBeenCalledWith('partner')
  })

  it('shows error message when error prop is provided', () => {
    render(
      <StepPerfil
        type=""
        error="Selecione uma opção para continuar"
        onSelect={vi.fn()}
      />
    )
    expect(screen.getByText('Selecione uma opção para continuar')).toBeInTheDocument()
  })

  it('does not show error when error is undefined', () => {
    render(<StepPerfil type="" onSelect={vi.fn()} />)
    expect(
      screen.queryByText('Selecione uma opção para continuar')
    ).not.toBeInTheDocument()
  })
})

// ── StepInteresse ─────────────────────────────────────────────────────────────

describe('StepInteresse', () => {
  const upd = vi.fn()
  beforeEach(() => upd.mockClear())

  it('renders all 4 service buttons', () => {
    render(<StepInteresse d={INIT} e={{}} upd={upd} />)
    expect(screen.getByText('Consórcio')).toBeInTheDocument()
    expect(screen.getByText('Seguros')).toBeInTheDocument()
    expect(screen.getByText('Saúde')).toBeInTheDocument()
    expect(screen.getByText('Investimentos')).toBeInTheDocument()
  })

  it('calls upd("service", id) when a service button is clicked', async () => {
    render(<StepInteresse d={INIT} e={{}} upd={upd} />)
    await userEvent.click(screen.getByText('Seguros'))
    expect(upd).toHaveBeenCalledWith('service', 'seguros')
  })

  it('does not show consórcio extra fields when service is not consorcio', () => {
    render(<StepInteresse d={{ ...INIT, service: 'seguros' }} e={{}} upd={upd} />)
    expect(screen.queryByText('Segmento')).not.toBeInTheDocument()
    expect(screen.queryByText('Crédito desejado')).not.toBeInTheDocument()
  })

  it('shows Segmento, Crédito and Prazo when service is consorcio', () => {
    render(<StepInteresse d={{ ...INIT, service: 'consorcio' }} e={{}} upd={upd} />)
    expect(screen.getByText('Segmento')).toBeInTheDocument()
    expect(screen.getByText('Crédito desejado')).toBeInTheDocument()
    expect(screen.getByText('Prazo')).toBeInTheDocument()
  })

  it('shows service error from e object', () => {
    render(
      <StepInteresse
        d={INIT}
        e={{ service: 'Selecione um serviço de interesse' }}
        upd={upd}
      />
    )
    expect(screen.getByText('Selecione um serviço de interesse')).toBeInTheDocument()
  })

  it('shows consórcio field errors when present', () => {
    render(
      <StepInteresse
        d={{ ...INIT, service: 'consorcio' }}
        e={{ segment: 'Selecione um segmento', credit: 'Informe o crédito desejado' }}
        upd={upd}
      />
    )
    expect(screen.getByText('Selecione um segmento')).toBeInTheDocument()
    expect(screen.getByText('Informe o crédito desejado')).toBeInTheDocument()
  })
})

// ── StepEscritorio ────────────────────────────────────────────────────────────

describe('StepEscritorio', () => {
  const upd = vi.fn()
  beforeEach(() => upd.mockClear())

  it('renders 3 partner input fields', () => {
    render(<StepEscritorio d={INIT} e={{}} upd={upd} />)
    expect(screen.getByText('Razão Social')).toBeInTheDocument()
    expect(screen.getByText('Nome do Escritório / Correspondente')).toBeInTheDocument()
    expect(screen.getByText('Quantidade de Assessores')).toBeInTheDocument()
  })

  it('calls upd("company", ...) when company field changes', async () => {
    render(<StepEscritorio d={INIT} e={{}} upd={upd} />)
    await userEvent.type(screen.getByPlaceholderText('Nome da empresa'), 'T')
    expect(upd).toHaveBeenCalledWith('company', 'T')
  })

  it('calls upd("broker", ...) when broker field changes', async () => {
    render(<StepEscritorio d={INIT} e={{}} upd={upd} />)
    await userEvent.type(
      screen.getByPlaceholderText('Como o escritório é conhecido'),
      'A'
    )
    expect(upd).toHaveBeenCalledWith('broker', 'A')
  })

  it('shows company error from e object', () => {
    render(
      <StepEscritorio d={INIT} e={{ company: 'Razão social obrigatória' }} upd={upd} />
    )
    expect(screen.getByText('Razão social obrigatória')).toBeInTheDocument()
  })

  it('shows broker error from e object', () => {
    render(
      <StepEscritorio
        d={INIT}
        e={{ broker: 'Nome do escritório obrigatório' }}
        upd={upd}
      />
    )
    expect(screen.getByText('Nome do escritório obrigatório')).toBeInTheDocument()
  })
})

// ── StepDados ─────────────────────────────────────────────────────────────────

describe('StepDados', () => {
  const upd = vi.fn()
  beforeEach(() => upd.mockClear())

  it('renders name and whatsapp fields for client', () => {
    render(<StepDados d={INIT} e={{}} upd={upd} isClient={true} />)
    expect(screen.getByText('Nome completo')).toBeInTheDocument()
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
    expect(screen.queryByText('Telefone')).not.toBeInTheDocument()
    expect(screen.queryByText('E-mail')).not.toBeInTheDocument()
  })

  it('renders name, phone and email fields for partner', () => {
    render(<StepDados d={INIT} e={{}} upd={upd} isClient={false} />)
    expect(screen.getByText('Nome completo')).toBeInTheDocument()
    expect(screen.getByText('Telefone')).toBeInTheDocument()
    expect(screen.getByText('E-mail')).toBeInTheDocument()
    expect(screen.queryByText('WhatsApp')).not.toBeInTheDocument()
  })

  it('calls upd("name", ...) when name field changes', async () => {
    render(<StepDados d={INIT} e={{}} upd={upd} isClient={true} />)
    await userEvent.type(screen.getByPlaceholderText('Seu nome'), 'M')
    expect(upd).toHaveBeenCalledWith('name', 'M')
  })

  it('shows name error from e object', () => {
    render(
      <StepDados d={INIT} e={{ name: 'Nome obrigatório' }} upd={upd} isClient={true} />
    )
    expect(screen.getByText('Nome obrigatório')).toBeInTheDocument()
  })

  it('shows whatsapp error for client', () => {
    render(
      <StepDados
        d={INIT}
        e={{ whatsapp: 'WhatsApp inválido' }}
        upd={upd}
        isClient={true}
      />
    )
    expect(screen.getByText('WhatsApp inválido')).toBeInTheDocument()
  })

  it('shows phone and email errors for partner', () => {
    render(
      <StepDados
        d={INIT}
        e={{ phone: 'Telefone inválido', email: 'E-mail inválido' }}
        upd={upd}
        isClient={false}
      />
    )
    expect(screen.getByText('Telefone inválido')).toBeInTheDocument()
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
  })
})

// ── DoneState ─────────────────────────────────────────────────────────────────

describe('DoneState', () => {
  it('renders success heading', () => {
    render(<DoneState d={clientData()} onReset={vi.fn()} waNumber="5534999990000" />)
    expect(screen.getByText('Mensagem enviada!')).toBeInTheDocument()
  })

  it('greets user by first name', () => {
    render(
      <DoneState d={clientData({ name: 'João Silva' })} onReset={vi.fn()} waNumber="5534999990000" />
    )
    expect(screen.getByText(/Obrigado, João/)).toBeInTheDocument()
  })

  it('renders WhatsApp link with wa.me URL', () => {
    render(<DoneState d={clientData()} onReset={vi.fn()} waNumber="5534999990000" />)
    const link = screen.getByRole('link', { name: /Abrir no WhatsApp/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/5534999990000'))
  })

  it('WhatsApp link opens in a new tab', () => {
    render(<DoneState d={clientData()} onReset={vi.fn()} waNumber="5534999990000" />)
    const link = screen.getByRole('link', { name: /Abrir no WhatsApp/i })
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('calls onReset when "Enviar outra mensagem" is clicked', async () => {
    const onReset = vi.fn()
    render(<DoneState d={clientData()} onReset={onReset} waNumber="5534999990000" />)
    await userEvent.click(screen.getByText('Enviar outra mensagem'))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('builds a consórcio message for consórcio service', () => {
    const d = clientData({
      service: 'consorcio',
      segment: 'Imóvel',
      credit: '500000',
      term: '60 meses',
    })
    render(<DoneState d={d} onReset={vi.fn()} waNumber="5534999990000" />)
    const href = screen.getByRole('link', { name: /Abrir no WhatsApp/i }).getAttribute('href') ?? ''
    expect(href).toContain('Im%C3%B3vel')
  })

  it('builds a partner message for partner type', () => {
    render(
      <DoneState d={partnerData()} onReset={vi.fn()} waNumber="5534999990000" />
    )
    const href = screen.getByRole('link', { name: /Abrir no WhatsApp/i }).getAttribute('href') ?? ''
    expect(href).toContain('parceria')
  })
})
