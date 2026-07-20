'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home, Car, Truck, Sparkles, Building2, Church, TrendingUp, Zap,
} from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'
import { LinhaCard, type LinhaCardData } from '@/components/shared/LinhaCard'
import { DetailModal, type DetailData } from '@/components/shared/DetailModal'
import { WhatsAppRedirectModal } from '@/components/shared/WhatsAppRedirectModal'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const ACCENT = '#ae251c'
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type CategoriaId =
  | 'imoveis' | 'veiculos' | 'pesados' | 'servicos'
  | 'condominios' | 'igrejas' | 'alavancagem' | 'cotas'

const CATEGORIAS: { id: CategoriaId; icon: React.ElementType; image: string; imagePosition?: string }[] = [
  { id: 'imoveis',     icon: Home,       image: '/consorcio/cards/imoveis.jpg'     },
  { id: 'veiculos',    icon: Car,        image: '/consorcio/cards/veiculos.jpg'    },
  { id: 'pesados',     icon: Truck,      image: '/consorcio/cards/pesados.jpg'     },
  { id: 'servicos',    icon: Sparkles,   image: '/consorcio/cards/servicos.jpg'    },
  { id: 'condominios', icon: Building2,  image: '/consorcio/cards/condominios.jpg' },
  { id: 'igrejas',     icon: Church,     image: '/consorcio/cards/igrejas.jpg'     },
  { id: 'alavancagem', icon: TrendingUp, image: '/consorcio/cards/alavancagem.jpg' },
  { id: 'cotas',       icon: Zap,        image: '/consorcio/cards/cotas.jpg'       },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}

export default function ConsorciosCategorias() {
  const { t } = useLocale()
  const [active, setActive] = useState<LinhaCardData | null>(null)
  const [wa, setWa] = useState<LinhaCardData | null>(null)

  const categorias: LinhaCardData[] = CATEGORIAS.map((cfg, i) => ({
    seq: String(i + 1).padStart(2, '0'),
    icon: cfg.icon,
    image: cfg.image,
    imagePosition: cfg.imagePosition,
    title: t(`consorciosV2.linha.${cfg.id}.title`),
    short: t(`consorciosV2.linha.${cfg.id}.short`),
    body: t(`consorciosV2.linha.${cfg.id}.body`),
    bullets: t(`consorciosV2.linha.${cfg.id}.bullets`).split('|'),
    ariaLabel: t(`consorciosV2.linha.${cfg.id}.aria`),
  }))

  // LinhaCard segue usando `bullets` (preview no hover do card). O modal de
  // detalhe consome `items`, então a conversão acontece aqui na fronteira.
  const activeDetail: DetailData | null = active
    ? {
        eyebrow: t('consorciosV2.linhas.detail.eyebrow'),
        title: active.title,
        short: active.short,
        body: active.body,
        items: active.bullets.map((name) => ({ name })),
        image: active.image,
        imagePosition: active.imagePosition,
        icon: active.icon,
      }
    : null

  const activeWaMessage = wa
    ? t(`consorciosV2.linha.${CATEGORIAS[Number(wa.seq) - 1].id}.wa`)
    : ''
  const waHref = wa ? formatWhatsAppLink(WHATSAPP, activeWaMessage) : ''

  return (
    <section
      id="consorcios-categorias"
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
            {t('consorciosV2.linhas.eyebrow')}
          </p>
          <h2
            className="mt-4 text-display text-white"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
            }}
          >
            {t('consorciosV2.linhas.title')}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categorias.map((c) => (
            <LinhaCard
              key={c.seq}
              data={c}
              ctaLabel={t('consorciosV2.linhas.cta')}
              accent={ACCENT}
              onSelect={setActive}
              dense
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 50vw, 300px"
            />
          ))}
        </motion.div>
      </div>

      <DetailModal
        open={active !== null}
        data={activeDetail}
        labels={{
          itemsLabel: t('consorciosV2.linhas.detail.bulletsLabel'),
          cta: t('consorciosV2.linhas.detail.cta'),
          close: t('consorciosV2.linhas.detail.close'),
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
