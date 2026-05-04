import { describe, it, expect } from 'vitest'
import { googleReviews, googleSummary } from './reviews-google'

describe('googleReviews dataset', () => {
  it('contains at least 6 curated reviews', () => {
    expect(googleReviews.length).toBeGreaterThanOrEqual(6)
  })

  it('each review has a non-empty name and text and rating in 1..5', () => {
    for (const r of googleReviews) {
      expect(r.name.trim().length).toBeGreaterThan(0)
      expect(r.text.trim().length).toBeGreaterThan(20)
      expect(r.rating).toBeGreaterThanOrEqual(1)
      expect(r.rating).toBeLessThanOrEqual(5)
    }
  })

  it('googleSummary exposes rating, count and href', () => {
    expect(googleSummary.rating).toBeGreaterThan(4)
    expect(googleSummary.count).toBeGreaterThan(0)
    expect(googleSummary.href.startsWith('https://')).toBe(true)
  })
})
