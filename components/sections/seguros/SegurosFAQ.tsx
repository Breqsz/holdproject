'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type FAQItem = {
  q: string
  blocks: Array<{ type: 'p' | 'h4' | 'ul'; value: string }>
}

const FAQ: FAQItem[] = [
  {
    q: 'Como vocês escolhem a melhor seguradora para o meu perfil?',
    blocks: [
      {
        type: 'p',
        value:
          'Fazemos um diagnóstico do seu perfil (idade, patrimônio, uso, histórico de sinistros) e rodamos cotações em todas as seguradoras parceiras. A escolha leva em conta cobertura, franquia, prazo de regulação de sinistro e índice de reclamação.',
      },
    ],
  },
  {
    q: 'O que é franquia e como ela afeta o valor do seguro?',
    blocks: [
      {
        type: 'p',
        value:
          'Franquia é o valor que você paga em caso de sinistro antes da seguradora cobrir o restante. Quanto maior a franquia, menor o prêmio mensal, e vice-versa.',
      },
      {
        type: 'h4',
        value: 'Tipos comuns:',
      },
      {
        type: 'ul',
        value:
          'Franquia obrigatória (auto)|Franquia facultativa (mais barata, menos cobertura)|Sem franquia em coberturas adicionais',
      },
    ],
  },
  {
    q: 'Em caso de sinistro, vocês acompanham o processo?',
    blocks: [
      {
        type: 'p',
        value:
          'Sim. Abrimos o sinistro junto à seguradora, acompanhamos perícia e regulação, e cobramos prazos. Você não fala sozinho com a seguradora.',
      },
    ],
  },
  {
    q: 'Posso ter mais de um seguro na mesma corretora?',
    blocks: [
      {
        type: 'p',
        value:
          'Sim. Centralizar vida, auto, residencial e empresarial conosco simplifica gestão e tende a render desconto agregado em renovações.',
      },
    ],
  },
  {
    q: 'Como funciona a renovação anual?',
    blocks: [
      {
        type: 'p',
        value:
          'Renovamos com 30 dias de antecedência: reabrimos cotação em outras seguradoras, comparamos com a vigente e recomendamos a melhor opção. Não há renovação automática sem aviso.',
      },
    ],
  },
  {
    q: 'Vocês atendem PJ (empresarial)?',
    blocks: [
      {
        type: 'p',
        value:
          'Sim. Atendemos PMEs, indústrias e holdings com patrimônio, lucros cessantes, RC profissional, D&O e seguro de frota.',
      },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }

function renderBlock(type: 'p' | 'h4' | 'ul', value: string, i: number) {
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
            Perguntas frequentes
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            Tudo o que você precisa saber sobre seguros.
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-6 flex justify-center">
            <Image
              src="/personagem/faq_seguros.png"
              alt=""
              width={220}
              height={340}
              quality={95}
              className="w-40 sm:w-44 lg:w-52 h-auto"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(7,22,42,0.15))' }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FAQ.map((item, index) => {
            const isOpen = openItems.includes(index)
            const contentId = `seguros-faq-content-${index}`
            return (
              <motion.div key={item.q} variants={fadeUp} className="ground-divide">
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen ? 'true' : 'false'}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-[#07162a] font-medium text-sm md:text-base leading-snug group-hover:text-[#ae251c] transition-colors">
                    {item.q}
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
                        {item.blocks.map((b, i) => renderBlock(b.type, b.value, i))}
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
