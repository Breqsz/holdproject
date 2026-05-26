'use client'

import { motion } from 'framer-motion'
import LogoLoop, { type LogoItem } from '@/components/motion/LogoLoop'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const SEGURADORAS: LogoItem[] = [
  { src: '/images/logosEmpresasParceiras/PortoSeguro.webp', alt: 'Porto Seguro' },
  { src: '/images/logosEmpresasParceiras/SulAmerica.webp', alt: 'SulAmérica' },
  { src: '/images/logosEmpresasParceiras/MAPFRE.webp', alt: 'MAPFRE' },
  { src: '/images/logosEmpresasParceiras/HDIseguros.webp', alt: 'HDI Seguros' },
  { src: '/images/logosEmpresasParceiras/MAGSeguros.webp', alt: 'MAG Seguros' },
  { src: '/images/logosEmpresasParceiras/TokioSeguadora.webp', alt: 'Tokio Marine' },
  { src: '/images/logosEmpresasParceiras/bradesco.webp', alt: 'Bradesco Seguros' },
]

export default function SegurosSeguradoras() {
  return (
    <section
      id="seguros-seguradoras"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-12"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07162a]/55">
            Seguradoras parceiras
          </p>
          <h2
            className="mt-4 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Comparativo entre as principais seguradoras do mercado.
          </h2>
        </motion.div>

        <div className="relative">
          <LogoLoop
            logos={SEGURADORAS}
            speed={60}
            direction="left"
            logoHeight={44}
            gap={56}
            scaleOnHover
            fadeOut
            fadeOutColor="#F5F5F5"
            ariaLabel="Carrossel de seguradoras parceiras"
          />
        </div>
      </div>
    </section>
  )
}
