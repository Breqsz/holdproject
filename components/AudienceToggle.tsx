'use client'

import { motion } from 'framer-motion'
import { useAudience } from '@/lib/audience'
import { useLocale } from '@/lib/i18n'

const SPRING = { type: 'spring' as const, stiffness: 110, damping: 22 }

interface AudienceToggleProps {
  variant?: 'dark' | 'light' | 'hero'
  className?: string
}

export function AudienceToggle({ variant = 'dark', className = '' }: AudienceToggleProps) {
  const { audience, setAudience } = useAudience()
  const { t } = useLocale()

  const wrapper =
    variant === 'dark'
      ? 'bg-[#142f54] ring-1 ring-white/10'
      : variant === 'hero'
      ? 'bg-[rgba(255,255,255,0.07)] ring-1 ring-white/10 backdrop-blur-sm'
      : 'bg-white/10 ring-1 ring-white/15 backdrop-blur-sm'

  const inactive =
    variant === 'dark'
      ? 'text-[#7a9ab8] hover:text-white'
      : variant === 'hero'
      ? 'text-white/40 hover:text-white/70'
      : 'text-white/70 hover:text-white'

  const labels: { id: 'pf' | 'pj'; label: string }[] = [
    { id: 'pf', label: t('audience.pf') },
    { id: 'pj', label: t('audience.pj') },
  ]

  return (
    <div
      className={`relative inline-flex items-center rounded-full p-1 gap-1 ${wrapper} ${className}`}
      role="group"
      aria-label={t('audience.aria')}
    >
      {labels.map(({ id, label }) => {
        const isActive = audience === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => setAudience(id)}
            aria-pressed={isActive}
            className="relative z-10 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200"
            style={{ color: isActive ? '#ffffff' : undefined }}
          >
            {isActive && (
              <motion.span
                layoutId="audience-toggle-pill"
                className="absolute inset-0 rounded-full bg-[#ae251c] -z-10"
                transition={SPRING}
              />
            )}
            <span className={isActive ? '' : inactive}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
