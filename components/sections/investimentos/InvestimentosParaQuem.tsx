'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}

// Os chips "acendem" 1 por 1 ao entrar na viewport (aceito no live: speed 0.6 -> 1083ms, sequência lenta 220ms).
const CHIP_DURATION = 1083
const CHIP_DRAW = 975
const CHIP_STAGGER = 220

export default function InvestimentosParaQuem() {
  const { t } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const items = t('investimentosV2.paraQuem.items').split('|')
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = listRef.current
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
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReducedMotion])

  return (
    <section
      id="investimentos-para-quem"
      className="section-pad bg-[#050f22]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <style>{`
        .pqc-chip { background:#ae251c; }
        .pqc-check { color:#fff; }
        .pqc-list[data-inview] .pqc-chip {
          animation: pqc-chipin ${CHIP_DURATION}ms cubic-bezier(0.16,1,0.3,1) both;
          animation-delay: calc(var(--i,0) * ${CHIP_STAGGER}ms);
        }
        .pqc-list[data-inview] .pqc-check path {
          stroke-dasharray: 26;
          animation: pqc-draw ${CHIP_DRAW}ms cubic-bezier(0.22,1,0.36,1) both;
          animation-delay: calc(var(--i,0) * ${CHIP_STAGGER}ms + 110ms);
        }
        @keyframes pqc-chipin { from { opacity:0; transform:scale(0.4); } to { opacity:1; transform:scale(1); } }
        @keyframes pqc-draw { from { stroke-dashoffset:26; } to { stroke-dashoffset:0; } }
        @media (prefers-reduced-motion: reduce) {
          .pqc-chip, .pqc-check path { animation:none !important; }
          .pqc-check path { stroke-dashoffset:0; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10 lg:mb-12"
        >
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-[34px] flex-none bg-[#ae251c]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
              {t('investimentosV2.paraQuem.eyebrow')}
            </p>
          </div>
          <h2
            className="mt-4 text-white font-semibold tracking-[-0.02em] leading-[1.06] max-w-[20em]"
            style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.6rem)' }}
          >
            {t('investimentosV2.paraQuem.title')}
          </h2>
        </motion.div>

        <ul ref={listRef} className="pqc-list grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {items.map((it, i) => (
            <li
              key={it}
              className="flex items-center gap-3.5 border-b border-white/[0.12] py-4"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="pqc-chip inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <Check size={16} className="pqc-check" strokeWidth={2.6} />
              </span>
              <span className="text-[16px] font-medium text-white">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
