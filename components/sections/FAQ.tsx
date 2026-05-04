'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

interface FaqItem {
  q: string
  a: string
}

const faqs: FaqItem[] = [
  {
    q: 'O que é consórcio?',
    a: 'O consórcio é uma modalidade de compra baseada na formação de grupos de pessoas com objetivos em comum, regulamentado pela Lei nº 11.795/2008 e fiscalizado pelo Banco Central do Brasil.',
  },
  {
    q: 'Como funciona o consórcio?',
    a: 'Os participantes pagam parcelas mensais que formam um fundo comum. Mensalmente ocorrem assembleias onde consorciados são contemplados por sorteio ou lance.',
  },
  {
    q: 'O consórcio tem juros?',
    a: 'Não. Os custos envolvem: taxa de administração, fundo de reserva (quando previsto) e seguro (se contratado).',
  },
  {
    q: 'Posso escolher o valor da carta de crédito?',
    a: 'Sim. No momento da adesão você define o valor conforme seu objetivo e capacidade de pagamento.',
  },
  {
    q: 'O que é carta de crédito?',
    a: 'É o valor contratado, disponibilizado após a contemplação para aquisição do bem ou serviço. Funciona como pagamento à vista.',
  },
  {
    q: 'Como posso ser contemplado?',
    a: 'Por sorteio ou lance. Modalidades: lance livre, lance fixo, lance fidelidade.',
  },
  {
    q: 'O que é lance embutido?',
    a: 'Utilização de parte da própria carta de crédito como lance para aumentar as chances de contemplação.',
  },
  {
    q: 'Qual a diferença entre meia parcela, parcela reduzida e upgrade?',
    a: 'Meia parcela: valor reduzido até contemplação. Parcela reduzida: redução só no fundo comum. Upgrade: aumenta crédito até 100% após contemplação.',
  },
  {
    q: 'O que acontece após a contemplação?',
    a: 'A administradora realiza análise de crédito. Aprovado, o consorciado pode utilizar a carta conforme as regras do grupo.',
  },
  {
    q: 'Quanto tempo tenho para usar a carta de crédito?',
    a: 'Não há prazo obrigatório imediato. Pode usar a qualquer momento dentro do prazo do grupo, com valor atualizado conforme contrato.',
  },
  {
    q: 'Posso usar o FGTS no consórcio?',
    a: 'Sim, em consórcios imobiliários: ofertar lances, amortizar saldo devedor, complementar valor do imóvel.',
  },
  {
    q: 'As parcelas podem mudar?',
    a: 'Sim. Podem ser reajustadas com base em índices como IPCA ou INCC para manter o poder de compra.',
  },
  {
    q: 'O que acontece se eu atrasar parcelas?',
    a: 'Impede participação em sorteios e lances. Inadimplência prolongada pode cancelar a cota.',
  },
  {
    q: 'Posso desistir do consórcio?',
    a: 'Sim. Tem direito à devolução dos valores pagos ao fundo comum, conforme regras contratuais.',
  },
  {
    q: 'Posso vender ou transferir minha cota?',
    a: 'Sim, mediante aprovação da administradora.',
  },
  {
    q: 'Consórcio ou financiamento: qual a diferença?',
    a: 'Consórcio: sem juros, médio/longo prazo, contemplação por sorteio ou lance. Financiamento: crédito imediato, com juros, custo total mais elevado.',
  },
  {
    q: 'O consórcio é seguro?',
    a: 'Sim. Regulamentado pela Lei nº 11.795/2008 e fiscalizado pelo Banco Central do Brasil.',
  },
  {
    q: 'O consórcio é investimento?',
    a: 'Pode ser estruturado como ferramenta de alavancagem patrimonial. Performance depende da estratégia e momento de mercado.',
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
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function FAQ() {
  const { t } = useLocale()
  const [openItems, setOpenItems] = useState<number[]>([])

  function toggle(index: number) {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
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
              {t('faq.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white max-w-2xl mx-auto"
          >
            {t('faq.title')}
          </motion.h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((item, index) => {
            const isOpen = openItems.includes(index)

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="border-b border-[#142f54]"
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen ? 'true' : 'false'}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-[#e0e8f0] font-medium text-sm md:text-base leading-snug group-hover:text-white transition-colors">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                    className="shrink-0 text-[#7a9ab8]"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[#7a9ab8] text-sm leading-relaxed">
                        {item.a}
                      </p>
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
