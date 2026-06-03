'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Coins, ShieldHalf, Network } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'
import { LinhaCard, type LinhaCardData } from '@/components/shared/LinhaCard'
import { LinhaDetailModal } from '@/components/shared/LinhaDetailModal'
import { WhatsAppRedirectModal } from '@/components/shared/WhatsAppRedirectModal'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const ACCENT = '#ae251c'
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type PilarId = 'rendaFixa' | 'rendaVariavel' | 'previdencia' | 'visaoIntegrada'

const PILARES: { id: PilarId; icon: React.ElementType; image: string; imagePosition: string }[] = [
  { id: 'rendaFixa',      icon: LineChart,  image: '/investimento/pilares/renda-fixa.jpg',      imagePosition: 'center 42%' },
  { id: 'rendaVariavel',  icon: Coins,      image: '/investimento/pilares/renda-variavel.jpg',  imagePosition: 'center'     },
  { id: 'previdencia',    icon: ShieldHalf, image: '/investimento/pilares/previdencia.jpg',      imagePosition: 'center 12%' },
  { id: 'visaoIntegrada', icon: Network,    image: '/investimento/pilares/visao-integrada.jpg',  imagePosition: 'center 32%' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}

export default function InvestimentosPilares() {
  const { t } = useLocale()
  const [active, setActive] = useState<LinhaCardData | null>(null)
  const [wa, setWa] = useState<LinhaCardData | null>(null)

  const pilares: LinhaCardData[] = PILARES.map((cfg, i) => ({
    seq: String(i + 1).padStart(2, '0'),
    icon: cfg.icon,
    image: cfg.image,
    imagePosition: cfg.imagePosition,
    title: t(`investimentosV2.linha.${cfg.id}.title`),
    short: t(`investimentosV2.linha.${cfg.id}.short`),
    body: t(`investimentosV2.linha.${cfg.id}.body`),
    bullets: t(`investimentosV2.linha.${cfg.id}.bullets`).split('|'),
    ariaLabel: t(`investimentosV2.linha.${cfg.id}.aria`),
  }))

  const activeWaMessage = wa
    ? t(`investimentosV2.linha.${PILARES[Number(wa.seq) - 1].id}.wa`)
    : ''
  const waHref = wa ? formatWhatsAppLink(WHATSAPP, activeWaMessage) : ''

  return (
    <section
      id="investimentos-pilares"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('investimentosV2.linhas.eyebrow')}
          </p>
          <h2
            className="mt-4 text-display text-white"
            style={{
              fontFamily: 'var(--font-gellix)',
              fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
            }}
          >
            {t('investimentosV2.linhas.title')}
          </h2>
          <p className="mt-6 max-w-[60ch] text-[#7a9ab8] leading-relaxed">
            {t('investimentosV2.linhas.body')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {pilares.map((p) => (
            <LinhaCard
              key={p.seq}
              data={p}
              ctaLabel={t('investimentosV2.linhas.cta')}
              accent={ACCENT}
              onSelect={setActive}
              tall
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 640px"
            />
          ))}
        </motion.div>
      </div>

      <LinhaDetailModal
        open={active !== null}
        data={active}
        accent={ACCENT}
        labels={{
          eyebrow: t('investimentosV2.linhas.detail.eyebrow'),
          bulletsLabel: t('investimentosV2.linhas.detail.bulletsLabel'),
          cta: t('investimentosV2.linhas.detail.cta'),
          close: t('investimentosV2.linhas.detail.close'),
        }}
        onClose={() => setActive(null)}
        onConfirm={() => {
          const l = active
          setActive(null)
          setWa(l)
        }}
      />
      <WhatsAppRedirectModal
        open={wa !== null}
        onClose={() => setWa(null)}
        href={waHref}
        label={wa?.title ?? ''}
        message={activeWaMessage}
      />
    </section>
  )
}
