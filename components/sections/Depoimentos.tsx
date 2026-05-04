'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale } from '@/lib/i18n'

interface Testimonial {
  name: string
  role: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Rafael Mendonça',
    role: 'Empresário',
    rating: 5,
    text: 'A Hold estruturou todo o processo de aquisição do nosso novo galpão via consórcio. Suporte excepcional do início ao fim.',
  },
  {
    name: 'Camila Borges',
    role: 'Médica',
    rating: 5,
    text: 'Consegui contemplação em 8 meses com a estratégia deles. Planejamento financeiro acima do esperado.',
  },
  {
    name: 'Gustavo Almeida',
    role: 'Assessor de Investimentos',
    rating: 5,
    text: 'Parceria estratégica para meu escritório. A mesa de consórcios deles complementa perfeitamente nosso portfólio.',
  },
  {
    name: 'Priscila Cavalcanti',
    role: 'Empresária',
    rating: 5,
    text: 'Renovei toda a frota da empresa sem comprometer o caixa. Processo transparente e muito bem conduzido.',
  },
  {
    name: 'Thiago Rezende',
    role: 'Arquiteto',
    rating: 5,
    text: 'Adquiri meu imóvel comercial com carta de crédito contemplada. Economizei muito em relação ao financiamento.',
  },
  {
    name: 'Fernanda Lopes',
    role: 'Contadora',
    rating: 5,
    text: 'Excelente acompanhamento pós-venda. São referência em consórcio estratégico em Uberlândia.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Depoimentos() {
  const { t } = useLocale()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section
      id="depoimentos"
      className="py-24 md:py-32 bg-[#0b1f3a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Eyebrow + heading */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
              {t('testimonials.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white"
          >
            {t('testimonials.title')}
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.15 }}
        >
          {/* Embla viewport — overflow hidden */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  /* flex-[0_0_...] pins card width inside embla */
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)] min-w-0"
                >
                  {/* Outer bezel */}
                  <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5 h-full">
                    {/* Inner bezel */}
                    <div className="rounded-[calc(1rem-0.375rem)] bg-[#142f54] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] p-6 h-full flex flex-col gap-4">
                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: item.rating }).map((_, si) => (
                          <Star
                            key={si}
                            size={14}
                            fill="#c9a84c"
                            color="#c9a84c"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-[#7a9ab8] text-sm leading-relaxed flex-1">
                        &ldquo;{item.text}&rdquo;
                      </p>

                      {/* Author */}
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {item.name}
                        </p>
                        <p className="text-[#7a9ab8] text-xs mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={scrollPrev}
              aria-label="Depoimento anterior"
              className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-[#e0e8f0]"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={scrollNext}
              aria-label="Próximo depoimento"
              className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-[#e0e8f0]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
