import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Carousel, { type CarouselItem } from './Carousel'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_: unknown, tag: string) =>
        React.forwardRef(
          (
            { children, style: _s, animate: _a, transition: _t, drag: _d,
              onDragEnd: _de, onAnimationStart: _as, onAnimationComplete: _ac,
              dragConstraints: _dc, ...rest }: Record<string, unknown>,
            ref: unknown
          ) => React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return {
    motion,
    useMotionValue: (initial: number) => ({ get: () => initial, set: vi.fn() }),
    useTransform: () => ({ get: () => 0, set: vi.fn() }),
  }
})

const ITEMS: CarouselItem[] = [
  { id: 1, title: '+19', description: 'Anos de Experiência',  icon: <span>★</span> },
  { id: 2, title: '+60', description: 'Parceiros Comerciais', icon: <span>★</span> },
  { id: 3, title: '4',   description: 'Frentes Integradas',   icon: <span>★</span> },
]

describe('Carousel', () => {
  it('renders without crashing using default items', () => {
    render(<Carousel />)
    expect(screen.getByText('Anos de Experiência')).toBeInTheDocument()
    expect(screen.getByText('Parceiros Comerciais')).toBeInTheDocument()
    expect(screen.getByText('Frentes Integradas')).toBeInTheDocument()
  })

  it('renders custom item titles and descriptions', () => {
    render(<Carousel items={ITEMS} />)
    expect(screen.getAllByText('+19').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('+60').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('4').length).toBeGreaterThanOrEqual(1)
  })

  it('renders one dot indicator per item', () => {
    const { container } = render(<Carousel items={ITEMS} />)
    // dots are h-2 w-2 rounded-full divs inside the dot container
    const dots = container.querySelectorAll('.h-2.w-2.rounded-full')
    expect(dots.length).toBe(ITEMS.length)
  })

  it('clicking a dot does not throw', () => {
    const { container } = render(<Carousel items={ITEMS} />)
    const dots = container.querySelectorAll('.h-2.w-2.rounded-full')
    expect(() => fireEvent.click(dots[1])).not.toThrow()
  })

  it('renders with round=true without crashing', () => {
    const { container } = render(<Carousel items={ITEMS} round baseWidth={200} />)
    expect(container.querySelector('.rounded-full')).not.toBeNull()
  })

  it('respects baseWidth for container width', () => {
    const { container } = render(<Carousel items={ITEMS} baseWidth={320} />)
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper?.style.width).toBe('320px')
  })
})
