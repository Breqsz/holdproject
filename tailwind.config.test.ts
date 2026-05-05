import config from './tailwind.config'
import { describe, it, expect } from 'vitest'

describe('tailwind.config', () => {
  it('includes gellix font family', () => {
    const fonts = (config.theme?.extend?.fontFamily ?? {}) as Record<string, string[]>
    expect(fonts.gellix).toBeDefined()
    expect(fonts.gellix[0]).toBe('var(--font-gellix)')
  })

  it('includes outfit (sans) font family', () => {
    const fonts = (config.theme?.extend?.fontFamily ?? {}) as Record<string, string[]>
    expect(fonts.sans).toBeDefined()
    expect(fonts.sans[0]).toBe('var(--font-outfit)')
  })
})
