'use client'

import { Target, Landmark, Users, Handshake, TrendingUp } from 'lucide-react'
import { HoldLogo } from '@/components/icons/HoldLogo'

const ITEMS = [
  {
    Icon: Target,
    line1: 'Atuação independente',
    line2: 'e estratégica',
  },
  {
    Icon: Landmark,
    line1: 'Instituições regulamentadas',
    line2: 'e consolidadas',
  },
  {
    Icon: Users,
    line1: 'Especialistas em',
    line2: 'diferentes áreas',
  },
  {
    Icon: Handshake,
    line1: 'Relacionamento próximo,',
    line2: 'transparente e contínuo',
  },
  {
    Icon: TrendingUp,
    line1: 'Soluções completas para',
    line2: 'proteger e fazer seu patrimônio crescer',
  },
]

export default function TrustBar() {
  return (
    <div className="bg-[#040d1a] border-t border-white/[0.07]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 xl:px-14 py-[18px] flex items-center gap-0">

        {/* Items */}
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

        {/* Logo */}
        <div className="shrink-0 ml-6 pl-6 border-l border-white/[0.08]">
          <HoldLogo className="h-[22px] w-auto" variant="dark" />
        </div>

      </div>
    </div>
  )
}
