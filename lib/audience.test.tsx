import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AudienceProvider, useAudience } from './audience'

function Probe() {
  const { audience, setAudience, hydrated } = useAudience()
  return (
    <div>
      <span data-testid="audience">{audience}</span>
      <span data-testid="hydrated">{hydrated ? 'yes' : 'no'}</span>
      <button onClick={() => setAudience('pj')}>set-pj</button>
      <button onClick={() => setAudience('pf')}>set-pf</button>
    </div>
  )
}

describe('AudienceProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('defaults to "pf" when no value is stored', () => {
    render(<AudienceProvider><Probe /></AudienceProvider>)
    expect(screen.getByTestId('audience')).toHaveTextContent('pf')
  })

  it('hydrates from localStorage when "pj" is stored', () => {
    window.localStorage.setItem('hold:audience', 'pj')
    render(<AudienceProvider><Probe /></AudienceProvider>)
    expect(screen.getByTestId('audience')).toHaveTextContent('pj')
  })

  it('ignores invalid stored values', () => {
    window.localStorage.setItem('hold:audience', 'garbage')
    render(<AudienceProvider><Probe /></AudienceProvider>)
    expect(screen.getByTestId('audience')).toHaveTextContent('pf')
  })

  it('marks hydrated=true after mount', () => {
    render(<AudienceProvider><Probe /></AudienceProvider>)
    expect(screen.getByTestId('hydrated')).toHaveTextContent('yes')
  })

  it('persists changes to localStorage', async () => {
    const user = userEvent.setup()
    render(<AudienceProvider><Probe /></AudienceProvider>)
    await user.click(screen.getByText('set-pj'))
    expect(screen.getByTestId('audience')).toHaveTextContent('pj')
    expect(window.localStorage.getItem('hold:audience')).toBe('pj')
  })

  it('toggles back to pf', async () => {
    const user = userEvent.setup()
    render(<AudienceProvider><Probe /></AudienceProvider>)
    await user.click(screen.getByText('set-pj'))
    await user.click(screen.getByText('set-pf'))
    expect(screen.getByTestId('audience')).toHaveTextContent('pf')
    expect(window.localStorage.getItem('hold:audience')).toBe('pf')
  })

  it('throws when useAudience is used outside the provider', () => {
    // Suppress the React error log for this expected throw
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Probe />)).toThrow(/AudienceProvider/)
    errorSpy.mockRestore()
  })
})

import { vi } from 'vitest'
