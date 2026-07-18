'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

// Rehomed from the now-deleted `LinhaDetailModal.tsx` (Task 6): this is the
// shape LinhaCard's consumers build and pass in; the DetailModal boundary
// derives its own `DetailData` from it (see e.g. ConsorciosCategorias.tsx).
export type LinhaDetailData = {
  seq: string
  title: string
  short: string
  body: string
  bullets: string[]
  image?: string
  imagePosition?: string
  icon?: React.ElementType
}

export type LinhaCardData = LinhaDetailData & { ariaLabel: string }

/**
 * Card genérico portado do SegurosLinhas. Renderiza foto full-bleed se houver
 * `image`; caso contrário cai para um tratamento ícone + gradiente (mesma forma,
 * top-bar, hover-reveal e CTA). `accent` controla a cor de destaque por frente.
 */
export function LinhaCard({
  data,
  ctaLabel,
  accent = '#ae251c',
  onSelect,
  tall = false,
  dense = false,
  sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 360px',
}: {
  data: LinhaCardData
  ctaLabel: string
  accent?: string
  onSelect: (l: LinhaCardData) => void
  /** Card mais alto (estilo home), opt-in — não afeta os cards já existentes em outras frentes */
  tall?: boolean
  /** Card compacto no mobile (grade 2-col), opt-in — mobile menor + bullets ocultos; lg inalterado */
  dense?: boolean
  /** `sizes` do next/image. Default casa o layout 4-col; passe o sizes 2-col em grids maiores. */
  sizes?: string
}) {
  const Icon = data.icon
  const hasPhoto = Boolean(data.image)
  const minH = dense
    ? 'min-h-[240px] lg:min-h-[380px]'
    : tall
      ? 'min-h-[420px] sm:min-h-[520px]'
      : 'min-h-[300px] sm:min-h-[380px]'

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className="h-full"
    >
      <button
        type="button"
        onClick={() => onSelect(data)}
        aria-label={data.ariaLabel}
        aria-haspopup="dialog"
        className={`group relative block w-full text-left overflow-hidden rounded-2xl h-full ${minH} transition-shadow duration-500 hover:shadow-[0_28px_70px_-22px_rgba(0,0,0,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07162a]`}
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {hasPhoto ? (
            <Image
              src={data.image as string}
              alt=""
              fill
              sizes={sizes}
              quality={92}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              style={{ objectPosition: data.imagePosition ?? 'center' }}
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{
                background:
                  'radial-gradient(130% 120% at 82% 8%, rgba(174,37,28,0.16) 0%, rgba(11,31,58,0) 52%), linear-gradient(150deg, #123056 0%, #0b1f3a 55%, #07162a 100%)',
              }}
            />
          )}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: hasPhoto
                ? 'linear-gradient(180deg, rgba(7,22,42,0.10) 0%, rgba(7,22,42,0.45) 45%, rgba(7,22,42,0.95) 100%)'
                : 'linear-gradient(180deg, rgba(7,22,42,0) 30%, rgba(7,22,42,0.55) 100%)',
            }}
          />
        </div>

        <span
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: accent }}
        />

        {!hasPhoto && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-5 top-5 text-[42px] font-extrabold leading-none text-white/8 tabular-nums"
          >
            {data.seq}
          </span>
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(520px circle at 18% 22%, ${accent}29, transparent 60%)`,
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7">
          {!hasPhoto && Icon && (
            <span
              aria-hidden
              className="mb-auto inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1"
              style={{ background: `${accent}1f`, borderColor: `${accent}4d` }}
            >
              <Icon size={22} strokeWidth={1.6} style={{ color: accent }} />
            </span>
          )}

          <h3
            className="text-display text-white tracking-tight leading-[1.05] mb-3 mt-5"
            style={{
              fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
              letterSpacing: '-0.02em',
              textShadow: '0 1px 16px rgba(0,0,0,0.5)',
            }}
          >
            {data.title}
          </h3>

          <p
            className="text-[12.5px] sm:text-[13px] leading-[1.5] max-w-[36ch] mb-4"
            style={{
              color: 'rgba(255,255,255,0.78)',
              textShadow: '0 1px 12px rgba(0,0,0,0.5)',
            }}
          >
            {data.short}
          </p>

          <div
            data-testid="linha-bullets"
            className={`${dense ? 'hidden lg:block ' : ''}overflow-hidden mb-4 lg:transition-[max-height,opacity] lg:duration-500 lg:ease-out lg:opacity-0 lg:max-h-0 lg:group-hover:opacity-100 lg:group-hover:max-h-44`}
          >
            <div className="flex flex-col gap-1 pt-3 border-t border-white/15 lg:flex-row lg:flex-wrap lg:gap-x-3 lg:gap-y-1.5">
              {data.bullets.map((b) => (
                <span
                  key={b}
                  className="text-[11.5px] text-white/85 leading-snug pt-2 lg:pt-2 lg:text-[11px] lg:leading-tight"
                >
                  · {b}
                </span>
              ))}
            </div>
          </div>

          <span className="inline-flex items-center gap-2.5 self-start text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white">
            {ctaLabel}
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
              style={{ background: accent }}
            >
              <ArrowRight size={12} className="text-white" />
            </span>
          </span>
        </div>
      </button>
    </motion.div>
  )
}
