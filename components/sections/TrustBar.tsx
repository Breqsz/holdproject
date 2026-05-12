'use client'

import { useRef, useState, useCallback } from 'react'
import { Target, Landmark, Users, Handshake, TrendingUp } from 'lucide-react'
import { HoldLogo } from '@/components/icons/HoldLogo'

const ITEMS = [
  { Icon: Target,     line1: 'Atuação independente',        line2: 'e estratégica' },
  { Icon: Landmark,   line1: 'Instituições regulamentadas', line2: 'e consolidadas' },
  { Icon: Users,      line1: 'Especialistas em',            line2: 'diferentes áreas' },
  { Icon: Handshake,  line1: 'Relacionamento próximo,',     line2: 'transparente e contínuo' },
  { Icon: TrendingUp, line1: 'Soluções completas para',     line2: 'proteger e fazer seu patrimônio crescer' },
]

export default function TrustBar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const firstItem = el.firstElementChild as HTMLElement | null
    if (!firstItem) return
    const stride = firstItem.offsetWidth + 16 // gap-4 = 16px
    const index = Math.round(el.scrollLeft / stride)
    setActiveDot(Math.min(index, ITEMS.length - 1))
  }, [])

  return (
    <div className="bg-[#040d1a] border-t border-white/[0.07]">
      {/* Desktop layout */}
      <div className="hidden md:flex mx-auto max-w-[1280px] px-6 lg:px-10 xl:px-14 py-[18px] items-center gap-0">
        {ITEMS.map(({ Icon, line1, line2 }, i) => (
          <div
            key={i}
            className="flex flex-1 items-center gap-3 border-r border-white/[0.08] pr-6 mr-6 last:border-r-0 last:pr-0 last:mr-0"
          >
            <Icon size={17} className="shrink-0 text-[#ae251c]" strokeWidth={1.6} />
            <span className="text-[11.5px] leading-[1.38] text-white/50 font-light">
              {line1}<br />{line2}
            </span>
          </div>
        ))}
        <div className="shrink-0 ml-6 pl-6 border-l border-white/[0.08]">
          <HoldLogo className="h-[22px] w-auto" variant="dark" />
        </div>
      </div>

      {/* Mobile layout — carrossel horizontal */}
      <div className="md:hidden relative">
        {/* Sombra fade à direita */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#040d1a] to-transparent z-10"
        />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          aria-label="Diferenciais Hold"
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 py-4 gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map(({ Icon, line1, line2 }, i) => (
            <div
              key={i}
              data-testid="trustbar-item"
              className="flex-shrink-0 w-[72vw] snap-start flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
            >
              <Icon size={18} className="shrink-0 text-[#ae251c] mt-0.5" strokeWidth={1.6} />
              <span className="text-[12px] leading-[1.45] text-white/55 font-light">
                {line1}<br />{line2}
              </span>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div aria-hidden="true" className="flex justify-center gap-1.5 pb-3">
          {ITEMS.map((_, i) => (
            <div
              key={i}
              data-testid="trustbar-dot"
              className={[
                'h-[3px] rounded-full transition-all duration-300',
                i === activeDot
                  ? 'w-6 bg-[#ae251c]'
                  : 'w-3 bg-white/20',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
