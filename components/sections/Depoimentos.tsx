'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale } from '@/lib/i18n'
import { googleReviews, googleSummary } from '@/lib/reviews-google'
import GoogleGIcon from '@/components/icons/GoogleGIcon'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function Depoimentos() {
  const { t } = useLocale()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    onReInit()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onReInit)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onReInit)
    }
  }, [emblaApi])

  return (
    <section
      id="depoimentos"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-end justify-between gap-6 mb-12 flex-wrap"
        >
          <div className="max-w-2xl">
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-display text-[#07162a]"
              style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)' }}
            >
              {t('testimonials.title')}
            </motion.h2>

            {/* Google badge + write review */}
            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={googleSummary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#07162a]/[0.04] ring-1 ring-[#07162a]/10 px-4 py-2 hover:ring-[#07162a]/25 transition-colors"
                aria-label={t('testimonials.googleBadge')}
              >
                <GoogleGIcon size={18} />
                <span className="flex items-center gap-1.5 text-[#fbbf24] tabular text-sm font-bold">
                  {googleSummary.rating.toString().replace('.', ',')}
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                </span>
                <span className="text-[#07162a]/55 text-xs">
                  · {googleSummary.count} {t('testimonials.reviewCount')}
                </span>
              </a>

              <a
                href={googleSummary.writeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#07162a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0b1f3a] transition-colors"
              >
                <GoogleGIcon size={14} />
                {t('testimonials.writeReview')}
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="hidden md:block shrink-0">
            <Image
              src="/personagem/jacimar-avatar-question.png"
              alt=""
              width={220}
              height={340}
              quality={95}
              className="w-32 sm:w-36 lg:w-40 h-auto"
              style={{ filter: 'drop-shadow(0 18px 36px rgba(7,22,42,0.15))' }}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              aria-label={t('testimonials.prev')}
              className="w-11 h-11 rounded-full bg-[#07162a]/[0.08] hover:bg-[#07162a]/[0.14] transition-colors flex items-center justify-center text-[#07162a]"
            >
              <ArrowLeft size={18} strokeWidth={1.7} />
            </button>
            <button
              onClick={scrollNext}
              aria-label={t('testimonials.next')}
              className="w-11 h-11 rounded-full bg-[#07162a]/[0.08] hover:bg-[#07162a]/[0.14] transition-colors flex items-center justify-center text-[#07162a]"
            >
              <ArrowRight size={18} strokeWidth={1.7} />
            </button>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.15 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {googleReviews.map((item) => (
                <div
                  key={item.name}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(50%-10px)] min-w-0"
                >
                  <div className="rounded-2xl bg-white ring-1 ring-[#07162a]/[0.08] p-7 md:p-9 h-full flex flex-col gap-5">

                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, si) => (
                        <Star key={si} size={14} fill="#fbbf24" color="#fbbf24" />
                      ))}
                    </div>

                    <p
                      className="text-pretty text-[#07162a] leading-snug flex-1"
                      style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                        letterSpacing: '-0.005em',
                      }}
                    >
                      &ldquo;{item.text}&rdquo;
                    </p>

                    <div>
                      <div className="rule-accent h-px w-10 mb-4 opacity-60" />
                      <p className="text-[#07162a] font-semibold text-sm">{item.name}</p>
                      <p className="text-[#07162a]/50 text-[12.5px] sm:text-xs mt-0.5 inline-flex items-center gap-1.5">
                        <GoogleGIcon size={12} />
                        {t('testimonials.role')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots — indicador de posição, só no mobile (1 card/view) */}
          <div className="mt-6 flex justify-center gap-1.5 sm:hidden">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir ao depoimento ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={[
                  'h-1.5 rounded-full transition-all',
                  i === selectedIndex ? 'w-5 bg-[#07162a]' : 'w-1.5 bg-[#07162a]/25',
                ].join(' ')}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
