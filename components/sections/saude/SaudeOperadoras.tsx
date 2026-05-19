'use client'

import { motion } from 'framer-motion'
import LogoLoop, { type LogoItem } from '@/components/motion/LogoLoop'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const OPERADORAS: LogoItem[] = [
  { src: '/images/logosEmpresasParceiras/Amil.webp', alt: 'Amil' },
  { src: '/images/logosEmpresasParceiras/bradesco.webp', alt: 'Bradesco Saúde' },
  { src: '/images/logosEmpresasParceiras/Hapvida.webp', alt: 'Hapvida' },
  { src: '/images/logosEmpresasParceiras/Omint.webp', alt: 'Omint' },
  { src: '/images/logosEmpresasParceiras/PortoSeguro.webp', alt: 'Porto Seguro' },
  { src: '/images/logosEmpresasParceiras/SegurosUnimed.webp', alt: 'Seguros Unimed' },
  { src: '/images/logosEmpresasParceiras/SulAmerica.webp', alt: 'SulAmérica' },
]

export default function SaudeOperadoras() {
  return (
    <section
      id="saude-operadoras"
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
            PARCEIROS
          </p>
          <h2
            className="mt-4 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Trabalhamos com as principais seguradoras e operadoras do mercado
          </h2>
        </motion.div>

        <div className="relative">
          <LogoLoop
            logos={OPERADORAS}
            speed={60}
            direction="left"
            logoHeight={44}
            gap={56}
            scaleOnHover
            fadeOut
            fadeOutColor="#F5F5F5"
            ariaLabel="Operadoras de saúde parceiras"
          />
        </div>
      </div>
    </section>
  )
}
