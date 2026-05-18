'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Briefcase, Building2, Smile, Plus } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type ModalidadeId = 'individual' | 'adesao' | 'empresarial' | 'odonto'

type Modalidade = {
  id: ModalidadeId
  seq: string
  icon: React.ElementType
  title: string
  short: string
  long: string
  waMessage: string
}

const MODALIDADES: Modalidade[] = [
  {
    id: 'individual',
    seq: '01 / 04',
    icon: Users,
    title: 'Individual e Familiar',
    short: 'Soluções em saúde para pessoas e famílias que buscam proteção, previsibilidade e acesso com segurança.',
    long: 'Escolher um plano de saúde envolve mais do que comparar preços e coberturas. Cada decisão precisa considerar perfil de utilização, rede credenciada, previsibilidade financeira e momento de vida. A HOLD conecta você e sua família às soluções mais adequadas por meio de análise estratégica, acompanhamento próximo e suporte em todas as etapas.',
    waMessage: 'Olá! Tenho interesse em planos de saúde Individual ou Familiar.',
  },
  {
    id: 'adesao',
    seq: '02 / 04',
    icon: Briefcase,
    title: 'Coletivo por Adesão',
    short: 'Alternativas estratégicas para profissionais vinculados a entidades de classe e categorias elegíveis.',
    long: 'O plano coletivo por adesão é uma alternativa voltada a profissionais vinculados a entidades de classe, associações e categorias elegíveis. Essa modalidade pode oferecer condições estratégicas de contratação, mas exige análise criteriosa sobre elegibilidade, regras, cobertura, rede credenciada e cenário de longo prazo. A HOLD realiza uma avaliação personalizada para identificar as alternativas mais adequadas ao perfil e à necessidade de cada cliente.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Coletivo por Adesão.',
  },
  {
    id: 'empresarial',
    seq: '03 / 04',
    icon: Building2,
    title: 'Empresarial',
    short: 'Estruturação de benefícios para MEIs, PMEs e grandes empresas, com soluções alinhadas ao porte, momento e estratégia de cada operação.',
    long: 'A estruturação de benefícios em saúde vai além da contratação de um plano. Empresas de diferentes portes precisam equilibrar qualidade assistencial, previsibilidade financeira, retenção de talentos e sustentabilidade da operação. A HOLD atua na construção de soluções empresariais para MEIs, PMEs e grandes empresas, conectando cada operação às alternativas mais adequadas ao seu momento, perfil e estratégia.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Empresarial.',
  },
  {
    id: 'odonto',
    seq: '04 / 04',
    icon: Smile,
    title: 'Odontológico',
    short: 'Cobertura odontológica para pessoas e empresas com foco em cuidado, prevenção e bem-estar.',
    long: 'O cuidado com a saúde também passa pela prevenção e pelo acompanhamento odontológico. A HOLD estrutura soluções odontológicas para pessoas, famílias e empresas, buscando equilíbrio entre cobertura, qualidade de atendimento, rede credenciada e custo-benefício. Nosso acompanhamento é realizado de forma próxima e estratégica, considerando o perfil e as necessidades de cada cliente.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Odontológico.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

function ExpandedPanel({ data }: { data: Modalidade }) {
  const wa = formatWhatsAppLink(WHATSAPP, data.waMessage)
  return (
    <div
      role="region"
      aria-labelledby={`saude-card-${data.id}`}
      className="bg-[#142f54] ring-1 ring-[#ae251c]/30 rounded-2xl px-6 py-8 md:px-12 md:py-12 mt-2"
    >
      <span className="tabular text-[#ae251c]/70 text-xs font-semibold tracking-[0.2em]">
        {data.seq}
      </span>
      <h3
        className="mt-3 text-display text-white"
        style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}
      >
        {data.title}
      </h3>
      <p className="mt-4 text-[#7a9ab8] leading-relaxed max-w-[62ch] text-base">
        {data.long}
      </p>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-6 py-3 transition-colors"
      >
        <WhatsAppIcon size={16} />
        Falar com especialista
      </a>
    </div>
  )
}

export default function SaudeModalidades() {
  const [selected, setSelected] = useState<ModalidadeId | null>(null)

  function toggle(id: ModalidadeId) {
    setSelected((prev) => (prev === id ? null : id))
  }

  const selectedData = MODALIDADES.find((m) => m.id === selected)

  return (
    <section
      id="saude-modalidades"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]"
          >
            MODALIDADES DE CONTRATAÇÃO
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-display text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
          >
            Soluções em saúde para diferentes perfis e formatos de contratação
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[60ch] text-[#7a9ab8] leading-relaxed"
          >
            A HOLD estrutura soluções em saúde de forma personalizada, considerando perfil,
            necessidade, momento e estratégia de cada cliente. Atuamos com diferentes
            modalidades de contratação para pessoas, famílias, profissionais e empresas.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {MODALIDADES.map((m) => {
            const Icon = m.icon
            const isSelected = selected === m.id
            const panelId = `saude-card-${m.id}`
            return (
              <motion.button
                key={m.id}
                id={panelId}
                variants={fadeUp}
                onClick={() => toggle(m.id)}
                aria-expanded={isSelected ? 'true' : 'false'}
                aria-controls={`saude-panel-${m.id}`}
                className={[
                  'group text-left rounded-2xl px-6 py-7 transition-all duration-200',
                  'bg-[#0b1f3a]',
                  isSelected
                    ? 'ring-2 ring-[#ae251c]/50'
                    : 'ring-1 ring-white/10 hover:ring-[#ae251c]/25',
                ].join(' ')}
              >
                <Icon size={28} strokeWidth={1.5} className="text-[#ae251c]" />
                <p
                  className="mt-5 text-white font-semibold leading-snug"
                  style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.25rem)' }}
                >
                  {m.title}
                </p>
                <div className="rule-accent h-px w-10 mt-3" />
                <p className="mt-3 text-sm text-[#7a9ab8] leading-relaxed">
                  {m.short}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs">
                  <span
                    className={
                      isSelected
                        ? 'text-[#ae251c] font-semibold'
                        : 'text-[#7a9ab8] group-hover:text-[#e0e8f0]'
                    }
                  >
                    {isSelected ? 'Recolher' : 'Saber mais'}
                  </span>
                  <motion.span
                    animate={{ rotate: isSelected ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className={isSelected ? 'text-[#ae251c]' : 'text-[#7a9ab8]'}
                  >
                    <Plus size={16} strokeWidth={1.8} />
                  </motion.span>
                </div>
              </motion.button>
            )
          })}

          <AnimatePresence initial={false}>
            {selectedData && (
              <motion.div
                key={selectedData.id}
                id={`saude-panel-${selectedData.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="col-span-full overflow-hidden"
              >
                <ExpandedPanel data={selectedData} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
