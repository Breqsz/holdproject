'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type BlockType = 'p' | 'h4' | 'ul'

type FAQConfig = {
  id: number
  blocks: BlockType[]
}

const FAQ_CONFIG: FAQConfig[] = [
  { id: 1, blocks: ['p'] },
  { id: 2, blocks: ['p'] },
  { id: 3, blocks: ['p'] },
  { id: 4, blocks: ['p'] },
  { id: 5, blocks: ['p'] },
  { id: 6, blocks: ['p'] },
  { id: 7, blocks: ['p'] },
  { id: 8, blocks: ['p'] },
  { id: 9, blocks: ['p'] },
  { id: 10, blocks: ['p'] },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }

function renderBlock(type: BlockType, value: string, i: number) {
  switch (type) {
    case 'p':
      return (
        <p key={i} className="mt-3 text-[#07162a]/60 text-sm leading-relaxed">
          {value}
        </p>
      )
    case 'h4':
      return (
        <h4 key={i} className="mt-6 text-[#07162a] font-semibold text-sm">
          {value}
        </h4>
      )
    case 'ul':
      return (
        <ul key={i} className="mt-3 space-y-1.5">
          {value.split('|').map((it, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-[#07162a]/60 text-sm leading-relaxed"
            >
              <span className="mt-2 h-1 w-1 rounded-full bg-[#ae251c] shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )
  }
}

export default function SegurosFAQ() {
  const { t } = useLocale()
  const [openItems, setOpenItems] = useState<number[]>([])

  function toggle(index: number) {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section
      id="seguros-faq"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07162a]/55"
          >
            {t('segurosV2.faq.eyebrow')}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            {t('segurosV2.faq.title')}
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-6 flex justify-center">
            <Image
              src="/personagem/faq_seguros.png"
              alt=""
              width={220}
              height={340}
              quality={95}
              className="w-32 sm:w-36 lg:w-40 h-auto"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(7,22,42,0.15))' }}
            />
          </motion.div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {FAQ_CONFIG.map((item, index) => {
            const isOpen = openItems.includes(index)
            const contentId = `seguros-faq-content-${index}`
            const question = t(`segurosV2.faq.q${item.id}.q`)
            return (
              <motion.div key={item.id} variants={fadeUp} className="ground-divide">
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen ? 'true' : 'false'}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-[#07162a] font-medium text-sm md:text-base leading-snug group-hover:text-[#ae251c] transition-colors">
                    {question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className="shrink-0 text-[#7a9ab8] group-hover:text-[#ae251c] transition-colors"
                  >
                    <Plus size={18} strokeWidth={1.6} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={contentId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-8">
                        {item.blocks.map((type, i) =>
                          renderBlock(type, t(`segurosV2.faq.q${item.id}.b${i + 1}`), i),
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
