'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useLocale } from '@/lib/i18n'

const STEPS = [1, 2, 3, 4, 5] as const

// Duração e escalonamento do "foco em passos" (aceito no live: speed 0.75 -> 1013ms, 210ms entre passos).
const WALK_DURATION = 1013
const WALK_STAGGER = 210

export default function InvestimentosMetodologia() {
  const { t } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const olRef = useRef<HTMLOListElement>(null)

  // O realce percorre 01 -> 05 quando a lista entra na viewport (não no load, senão dispara fora da tela).
  useEffect(() => {
    if (prefersReducedMotion) return
    const el = olRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute('data-inview', '')
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReducedMotion])

  return (
    <section
      id="investimentos-metodologia"
      className="section-pad bg-[#050f22]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <style>{`
        .mtd-num, .mtd-text { transition: color .3s ease, transform .35s cubic-bezier(0.16,1,0.3,1); }
        .mtd-list[data-inview] .mtd-num { animation: mtd-num ${WALK_DURATION}ms ease-in-out both; animation-delay: calc(var(--i,0) * ${WALK_STAGGER}ms); }
        .mtd-list[data-inview] .mtd-text { animation: mtd-text ${WALK_DURATION}ms ease-in-out both; animation-delay: calc(var(--i,0) * ${WALK_STAGGER}ms); }
        .mtd-row:hover .mtd-num { color:#ae251c; }
        .mtd-row:hover .mtd-text { color:#fff; transform:translateX(7px); }
        @keyframes mtd-num { 0%,100% { color:#7a9ab8; } 42%,58% { color:#ae251c; } }
        @keyframes mtd-text { 0%,100% { color:#e0e8f0; transform:none; } 42%,58% { color:#fff; transform:translateX(7px); } }
        @media (prefers-reduced-motion: reduce) {
          .mtd-num, .mtd-text { animation:none !important; transition:none; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-[34px] flex-none bg-[#ae251c]" />
            <span className="text-[12px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a9ab8]">
              {t('investimentosV2.metodologia.eyebrow')}
            </span>
          </div>
          <h2
            className="mt-[18px] text-display text-balance text-white max-w-[16em]"
            style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)', lineHeight: 1.08 }}
          >
            {t('investimentosV2.metodologia.title')}
          </h2>
        </div>

        <ol ref={olRef} className="mtd-list mt-[clamp(2.5rem,5vw,3.5rem)] border-t border-white/[0.115]">
          {STEPS.map((n, i) => (
            <li
              key={n}
              className="mtd-row grid grid-cols-[58px_1fr] items-baseline gap-[clamp(16px,2.5vw,32px)] border-b py-[22px] border-white/[0.115]"
              style={{ '--i': i } as CSSProperties}
            >
              <span
                className={`mtd-num text-[13px] font-semibold tabular-nums tracking-[0.1em] ${
                  n === 1 ? 'text-[#e2604f]' : 'text-[#7a9ab8]'
                }`}
              >
                {String(n).padStart(2, '0')}
              </span>
              <p className="mtd-text max-w-[54ch] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.5] text-[#e0e8f0]">
                {t(`investimentosV2.metodologia.step.${n}`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
