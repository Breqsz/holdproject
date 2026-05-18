'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, X } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
const AUTO_ROTATE_MS = 5000

type ModalidadeId = 'individual' | 'adesao' | 'empresarial' | 'odonto'

type Modalidade = {
  id: ModalidadeId
  seq: string
  title: string
  short: string
  long: string
  waMessage: string
  image: { src: string; alt: string }
}

const MODALIDADES: Modalidade[] = [
  {
    id: 'individual',
    seq: '01',
    title: 'Individual e Familiar',
    short:
      'Soluções em saúde para pessoas e famílias que buscam proteção, previsibilidade e acesso com segurança.',
    long: 'Escolher um plano de saúde envolve mais do que comparar preços e coberturas. Cada decisão precisa considerar perfil de utilização, rede credenciada, previsibilidade financeira e momento de vida. A HOLD conecta você e sua família às soluções mais adequadas por meio de análise estratégica, acompanhamento próximo e suporte em todas as etapas.',
    waMessage: 'Olá! Tenho interesse em planos de saúde Individual ou Familiar.',
    image: {
      src: '/images/personas/pessoa-fisica.webp',
      alt: 'Família reunida ao pôr do sol',
    },
  },
  {
    id: 'adesao',
    seq: '02',
    title: 'Coletivo por Adesão',
    short:
      'Alternativas estratégicas para profissionais vinculados a entidades de classe e categorias elegíveis.',
    long: 'O plano coletivo por adesão é uma alternativa voltada a profissionais vinculados a entidades de classe, associações e categorias elegíveis. Essa modalidade pode oferecer condições estratégicas de contratação, mas exige análise criteriosa sobre elegibilidade, regras, cobertura, rede credenciada e cenário de longo prazo. A HOLD realiza uma avaliação personalizada para identificar as alternativas mais adequadas ao perfil e à necessidade de cada cliente.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Coletivo por Adesão.',
    image: {
      src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      alt: 'Profissionais em reunião colaborativa',
    },
  },
  {
    id: 'empresarial',
    seq: '03',
    title: 'Empresarial',
    short:
      'Estruturação de benefícios para MEIs, PMEs e grandes empresas, com soluções alinhadas ao porte, momento e estratégia de cada operação.',
    long: 'A estruturação de benefícios em saúde vai além da contratação de um plano. Empresas de diferentes portes precisam equilibrar qualidade assistencial, previsibilidade financeira, retenção de talentos e sustentabilidade da operação. A HOLD atua na construção de soluções empresariais para MEIs, PMEs e grandes empresas, conectando cada operação às alternativas mais adequadas ao seu momento, perfil e estratégia.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Empresarial.',
    image: {
      src: '/images/personas/empresa.webp',
      alt: 'Equipe em reunião em ambiente corporativo',
    },
  },
  {
    id: 'odonto',
    seq: '04',
    title: 'Odontológico',
    short:
      'Cobertura odontológica para pessoas e empresas com foco em cuidado, prevenção e bem-estar.',
    long: 'O cuidado com a saúde também passa pela prevenção e pelo acompanhamento odontológico. A HOLD estrutura soluções odontológicas para pessoas, famílias e empresas, buscando equilíbrio entre cobertura, qualidade de atendimento, rede credenciada e custo-benefício. Nosso acompanhamento é realizado de forma próxima e estratégica, considerando o perfil e as necessidades de cada cliente.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Odontológico.',
    image: {
      src: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80',
      alt: 'Consultório odontológico moderno',
    },
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

function ImageStage({ data }: { data: Modalidade }) {
  return (
    <motion.div
      key={data.id}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      className="absolute inset-0"
    >
      <Image
        src={data.image.src}
        alt={data.image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
        priority={data.id === 'individual'}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#07162a] via-[#07162a]/85 to-transparent"
      />
    </motion.div>
  )
}

function DetailsModal({
  data,
  open,
  onOpenChange,
}: {
  data: Modalidade | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!data) return null
  const wa = formatWhatsAppLink(WHATSAPP, data.waMessage)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,640px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-[#07162a] ring-1 ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          <div className="relative aspect-[16/9] bg-[#0b1f3a]">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="(max-width: 768px) 94vw, 640px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#07162a] to-transparent"
            />
            <Dialog.Close
              aria-label="Fechar"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 ring-1 ring-white/20 text-white/90 transition-colors hover:bg-black/60"
            >
              <X size={16} strokeWidth={1.8} />
            </Dialog.Close>
          </div>

          <div className="px-7 py-7 md:px-9 md:py-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
              {data.seq} · Modalidade
            </p>
            <Dialog.Title className="mt-2 text-white text-2xl md:text-[28px] font-semibold leading-tight">
              {data.title}
            </Dialog.Title>
            <Dialog.Description className="mt-5 text-[14.5px] leading-relaxed text-[#9ab2cc] max-w-[60ch]">
              {data.long}
            </Dialog.Description>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-6 py-3 transition-colors"
            >
              <WhatsAppIcon size={16} />
              Falar com especialista
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default function SaudeModalidades() {
  const [activeId, setActiveId] = useState<ModalidadeId>(MODALIDADES[0].id)
  const [isHoveringList, setIsHoveringList] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState<Modalidade | null>(null)
  const reducedMotion = useReducedMotion()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const active = MODALIDADES.find((m) => m.id === activeId) ?? MODALIDADES[0]
  const wa = formatWhatsAppLink(WHATSAPP, active.waMessage)

  const advance = useCallback(() => {
    setActiveId((prev) => {
      const i = MODALIDADES.findIndex((m) => m.id === prev)
      return MODALIDADES[(i + 1) % MODALIDADES.length].id
    })
  }, [])

  useEffect(() => {
    if (reducedMotion || isHoveringList || modalOpen) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    intervalRef.current = setInterval(advance, AUTO_ROTATE_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [reducedMotion, isHoveringList, modalOpen, advance])

  function openDetails(m: Modalidade) {
    setModalData(m)
    setModalOpen(true)
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

        <div className="grid gap-8 lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:gap-14">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label="Modalidades de contratação"
            className="lg:order-1 order-2 lg:self-start"
            onMouseEnter={() => setIsHoveringList(true)}
            onMouseLeave={() => setIsHoveringList(false)}
          >
            <ul className="flex lg:flex-col lg:gap-1 gap-2 overflow-x-auto lg:overflow-visible snap-x lg:snap-none pb-2 lg:pb-0 -mx-1 px-1">
              {MODALIDADES.map((m) => {
                const isActive = activeId === m.id
                return (
                  <li key={m.id} className="snap-start shrink-0 lg:shrink">
                    <button
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="saude-modalidade-stage"
                      onClick={() => setActiveId(m.id)}
                      onMouseEnter={() => setActiveId(m.id)}
                      className="relative w-full text-left flex items-center gap-3.5 px-4 py-3.5 lg:py-4 rounded-lg transition-colors duration-300 hover:bg-white/[0.025]"
                    >
                      <span
                        aria-hidden
                        className={[
                          'pointer-events-none absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[#ae251c] origin-top transition-transform duration-500',
                          isActive ? 'scale-y-100' : 'scale-y-0',
                        ].join(' ')}
                      />
                      <span
                        aria-hidden
                        className={[
                          'inline-block h-1.5 w-1.5 rounded-full transition-all duration-300 shrink-0',
                          isActive
                            ? 'bg-[#ae251c] ring-4 ring-[#ae251c]/15 scale-110'
                            : 'bg-white/25',
                        ].join(' ')}
                      />
                      <span
                        className={[
                          'tabular text-[11px] font-semibold tracking-[0.18em] transition-colors',
                          isActive ? 'text-[#ae251c]' : 'text-white/45',
                        ].join(' ')}
                      >
                        {m.seq}
                      </span>
                      <span
                        className={[
                          'text-[14.5px] font-medium transition-colors whitespace-nowrap lg:whitespace-normal',
                          isActive ? 'text-white' : 'text-white/65',
                        ].join(' ')}
                      >
                        {m.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Image stage */}
          <div
            id="saude-modalidade-stage"
            role="tabpanel"
            aria-live="polite"
            className="lg:order-2 order-1 relative aspect-[4/5] lg:aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] bg-[#0b1f3a] lg:sticky lg:top-32"
          >
            <AnimatePresence mode="wait" initial={false}>
              <ImageStage key={active.id} data={active} />
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 p-7 md:p-9 z-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
                    <span className="tabular">{active.seq}</span>
                    <span aria-hidden className="h-px w-8 bg-[#ae251c]/60" />
                    <span className="text-white/70">Modalidade</span>
                  </div>
                  <h3
                    className="mt-3 text-white font-semibold leading-tight"
                    style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}
                  >
                    {active.title}
                  </h3>
                  <p className="mt-3 text-[14px] md:text-[14.5px] leading-relaxed text-white/80 max-w-[44ch]">
                    {active.short}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-5 py-2.5 transition-colors"
                    >
                      <WhatsAppIcon size={14} />
                      Falar no WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => openDetails(active)}
                      className="group inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 ring-1 ring-white/20 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
                    >
                      Ver detalhes
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <DetailsModal data={modalData} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  )
}
