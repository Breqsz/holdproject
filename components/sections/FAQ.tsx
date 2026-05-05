'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface FaqItem {
  q: string
  a: string
}

const faqs: FaqItem[] = [
  { q: 'O que é consórcio?', a: 'O consórcio é uma modalidade de compra baseada na formação de grupos de pessoas com objetivos em comum, regulamentado pela Lei nº 11.795/2008 e fiscalizado pelo Banco Central do Brasil.' },
  { q: 'Como funciona o consórcio?', a: 'Os participantes pagam parcelas mensais que formam um fundo comum. Mensalmente ocorrem assembleias onde consorciados são contemplados por sorteio ou lance.' },
  { q: 'O consórcio tem juros?', a: 'Não. Os custos envolvem: taxa de administração, fundo de reserva (quando previsto) e seguro (se contratado).' },
  { q: 'Posso escolher o valor da carta de crédito?', a: 'Sim. No momento da adesão você define o valor conforme seu objetivo e capacidade de pagamento.' },
  { q: 'O que é carta de crédito?', a: 'É o valor contratado, disponibilizado após a contemplação para aquisição do bem ou serviço. Funciona como pagamento à vista.' },
  { q: 'Como posso ser contemplado?', a: 'Por sorteio ou lance. Modalidades: lance livre, lance fixo, lance fidelidade.' },
  { q: 'O que é lance embutido?', a: 'Utilização de parte da própria carta de crédito como lance para aumentar as chances de contemplação.' },
  { q: 'Qual a diferença entre meia parcela, parcela reduzida e upgrade?', a: 'Meia parcela: valor reduzido até contemplação. Parcela reduzida: redução só no fundo comum. Upgrade: aumenta crédito até 100% após contemplação.' },
  { q: 'O que acontece após a contemplação?', a: 'A administradora realiza análise de crédito. Aprovado, o consorciado pode utilizar a carta conforme as regras do grupo.' },
  { q: 'Quanto tempo tenho para usar a carta de crédito?', a: 'Não há prazo obrigatório imediato. Pode usar a qualquer momento dentro do prazo do grupo, com valor atualizado conforme contrato.' },
  { q: 'Posso usar o FGTS no consórcio?', a: 'Sim, em consórcios imobiliários: ofertar lances, amortizar saldo devedor, complementar valor do imóvel.' },
  { q: 'As parcelas podem mudar?', a: 'Sim. Podem ser reajustadas com base em índices como IPCA ou INCC para manter o poder de compra.' },
  { q: 'O que acontece se eu atrasar parcelas?', a: 'Impede participação em sorteios e lances. Inadimplência prolongada pode cancelar a cota.' },
  { q: 'Posso desistir do consórcio?', a: 'Sim. Tem direito à devolução dos valores pagos ao fundo comum, conforme regras contratuais.' },
  { q: 'Posso vender ou transferir minha cota?', a: 'Sim, mediante aprovação da administradora.' },
  { q: 'Consórcio ou financiamento: qual a diferença?', a: 'Consórcio: sem juros, médio/longo prazo, contemplação por sorteio ou lance. Financiamento: crédito imediato, com juros, custo total mais elevado.' },
  { q: 'O consórcio é seguro?', a: 'Sim. Regulamentado pela Lei nº 11.795/2008 e fiscalizado pelo Banco Central do Brasil.' },
  { q: 'O consórcio é investimento?', a: 'Pode ser estruturado como ferramenta de alavancagem patrimonial. Performance depende da estratégia e momento de mercado.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }

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
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header — left-aligned editorial */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
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
                className="ground-divide"
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen ? 'true' : 'false'}
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
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-[#07162a]/55 text-sm leading-relaxed">
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
