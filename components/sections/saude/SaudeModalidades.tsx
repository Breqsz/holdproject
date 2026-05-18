'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type ModalidadeId = 'individual' | 'adesao' | 'empresarial' | 'odonto'

type Modalidade = {
  id: ModalidadeId
  seq: string
  title: string
  short: string
  long: string
  waMessage: string
  image: { src: string; fit: 'cover' | 'contain'; alt: string }
}

const MODALIDADES: Modalidade[] = [
  {
    id: 'individual',
    seq: '01',
    title: 'Individual e Familiar',
    short: 'Soluções em saúde para pessoas e famílias que buscam proteção, previsibilidade e acesso com segurança.',
    long: 'Escolher um plano de saúde envolve mais do que comparar preços e coberturas. Cada decisão precisa considerar perfil de utilização, rede credenciada, previsibilidade financeira e momento de vida. A HOLD conecta você e sua família às soluções mais adequadas por meio de análise estratégica, acompanhamento próximo e suporte em todas as etapas.',
    waMessage: 'Olá! Tenho interesse em planos de saúde Individual ou Familiar.',
    image: { src: '/images/personas/pessoa-fisica.webp', fit: 'cover', alt: 'Família reunida ao pôr do sol' },
  },
  {
    id: 'adesao',
    seq: '02',
    title: 'Coletivo por Adesão',
    short: 'Alternativas estratégicas para profissionais vinculados a entidades de classe e categorias elegíveis.',
    long: 'O plano coletivo por adesão é uma alternativa voltada a profissionais vinculados a entidades de classe, associações e categorias elegíveis. Essa modalidade pode oferecer condições estratégicas de contratação, mas exige análise criteriosa sobre elegibilidade, regras, cobertura, rede credenciada e cenário de longo prazo. A HOLD realiza uma avaliação personalizada para identificar as alternativas mais adequadas ao perfil e à necessidade de cada cliente.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Coletivo por Adesão.',
    image: { src: '/personagem/Boneco_v1.png', fit: 'contain', alt: 'Especialista HOLD analisando indicadores' },
  },
  {
    id: 'empresarial',
    seq: '03',
    title: 'Empresarial',
    short: 'Estruturação de benefícios para MEIs, PMEs e grandes empresas, com soluções alinhadas ao porte, momento e estratégia de cada operação.',
    long: 'A estruturação de benefícios em saúde vai além da contratação de um plano. Empresas de diferentes portes precisam equilibrar qualidade assistencial, previsibilidade financeira, retenção de talentos e sustentabilidade da operação. A HOLD atua na construção de soluções empresariais para MEIs, PMEs e grandes empresas, conectando cada operação às alternativas mais adequadas ao seu momento, perfil e estratégia.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Empresarial.',
    image: { src: '/images/personas/empresa.webp', fit: 'cover', alt: 'Equipe em reunião em ambiente corporativo' },
  },
  {
    id: 'odonto',
    seq: '04',
    title: 'Odontológico',
    short: 'Cobertura odontológica para pessoas e empresas com foco em cuidado, prevenção e bem-estar.',
    long: 'O cuidado com a saúde também passa pela prevenção e pelo acompanhamento odontológico. A HOLD estrutura soluções odontológicas para pessoas, famílias e empresas, buscando equilíbrio entre cobertura, qualidade de atendimento, rede credenciada e custo-benefício. Nosso acompanhamento é realizado de forma próxima e estratégica, considerando o perfil e as necessidades de cada cliente.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Odontológico.',
    image: { src: '/personagem/Boneco_v3.png', fit: 'contain', alt: 'Especialista HOLD em atendimento consultivo' },
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
    <div className="bg-[#0b1f3a] ring-1 ring-[#ae251c]/25 rounded-2xl overflow-hidden grid lg:grid-cols-[1.4fr_1fr]">
      <div className="px-6 py-8 md:px-10 md:py-10">
        <p className="text-[#7a9ab8] leading-relaxed text-base max-w-[58ch]">
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
      <div
        className="relative hidden lg:block min-h-[280px]"
        style={{
          background: data.image.fit === 'contain'
            ? 'linear-gradient(135deg, #142f54 0%, #0d2240 100%)'
            : undefined,
        }}
      >
        <Image
          src={data.image.src}
          alt={data.image.alt}
          fill
          sizes="(max-width: 1024px) 0px, 35vw"
          className={data.image.fit === 'contain' ? 'object-contain object-bottom p-4' : 'object-cover'}
        />
        {data.image.fit === 'cover' && (
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0b1f3a]"
          />
        )}
      </div>
    </div>
  )
}

export default function SaudeModalidades() {
  const [selected, setSelected] = useState<ModalidadeId | null>(null)

  function toggle(id: ModalidadeId) {
    setSelected((prev) => (prev === id ? null : id))
  }

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
          role="list"
          className="border-t border-white/10"
        >
          {MODALIDADES.map((m) => {
            const isSelected = selected === m.id
            const panelId = `saude-panel-${m.id}`
            const buttonId = `saude-card-${m.id}`
            return (
              <motion.div key={m.id} variants={fadeUp} role="listitem" className="border-b border-white/10">
                <button
                  id={buttonId}
                  onClick={() => toggle(m.id)}
                  aria-expanded={isSelected ? 'true' : 'false'}
                  aria-controls={panelId}
                  className="group w-full text-left grid grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-center py-7 md:py-9 transition-colors hover:bg-white/[0.015]"
                >
                  <span
                    className="tabular text-[#ae251c] font-semibold leading-none"
                    style={{
                      fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {m.seq}
                  </span>

                  <div className="min-w-0">
                    <p
                      className="text-white font-semibold leading-snug transition-colors group-hover:text-[#e0e8f0]"
                      style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)' }}
                    >
                      {m.title}
                    </p>
                    <p className="mt-2 text-sm md:text-[15px] text-[#7a9ab8] leading-relaxed max-w-[68ch]">
                      {m.short}
                    </p>
                  </div>

                  <span className="flex items-center gap-3 shrink-0">
                    <span
                      className={[
                        'hidden md:inline text-xs uppercase tracking-[0.18em] font-semibold transition-colors',
                        isSelected ? 'text-[#ae251c]' : 'text-[#7a9ab8] group-hover:text-[#e0e8f0]',
                      ].join(' ')}
                    >
                      {isSelected ? 'Recolher' : 'Saber mais'}
                    </span>
                    <motion.span
                      animate={{ rotate: isSelected ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      className={[
                        'inline-flex items-center justify-center h-9 w-9 rounded-full ring-1 transition-colors',
                        isSelected
                          ? 'ring-[#ae251c]/50 text-[#ae251c] bg-[#ae251c]/10'
                          : 'ring-white/15 text-[#7a9ab8] group-hover:ring-[#ae251c]/30 group-hover:text-[#e0e8f0]',
                      ].join(' ')}
                    >
                      <Plus size={16} strokeWidth={1.8} />
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7">
                        <ExpandedPanel data={m} />
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
