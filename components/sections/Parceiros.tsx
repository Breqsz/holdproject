'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/lib/i18n'
import LogoLoop, { type LogoItem } from '@/components/motion/LogoLoop'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const partnerLogos: LogoItem[] = [
  { src: '/images/logosEmpresasParceiras/HDIseguros.png', alt: 'HDI Seguros' },
  { src: '/images/logosEmpresasParceiras/MAGSeguros.png', alt: 'MAG Seguros' },
  { src: '/images/logosEmpresasParceiras/MAPFRE.png', alt: 'MAPFRE' },
  { src: '/images/logosEmpresasParceiras/SulAmerica.png', alt: 'SulAmérica' },
  { src: '/images/logosEmpresasParceiras/TokioSeguadora.png', alt: 'Tokio Marine' },
  { src: '/images/logosEmpresasParceiras/Unimed.png', alt: 'Unimed' },
  { src: '/images/logosEmpresasParceiras/bradesco.png', alt: 'Bradesco Seguros' },
]

export default function Parceiros() {
  const { t } = useLocale()
  return (
    <section id="parceiros" className="section-pad bg-[#0b1f3a]" style={{ fontFamily: 'var(--font-outfit)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
            {t('partnersLogos.eyebrow')}
          </span>
          <h2
            className="mt-5 text-display text-white"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            {t('partnersLogos.title')}
          </h2>
          <p className="mt-4 max-w-[60ch] text-[#7a9ab8] leading-relaxed text-sm">
            {t('partnersLogos.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          <LogoLoop
            logos={partnerLogos}
            speed={60}
            direction="left"
            logoHeight={44}
            gap={56}
            scaleOnHover
            fadeOut
            fadeOutColor="#0b1f3a"
            ariaLabel="Parceiros administradoras e seguradoras"
          />
        </div>
      </div>
    </section>
  )
}
