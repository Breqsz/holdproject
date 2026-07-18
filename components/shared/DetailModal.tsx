'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

export type DetailItem = {
  name: string
  desc?: string
}

export type DetailData = {
  eyebrow: string
  title: string
  short: string
  body?: string
  items: DetailItem[]
  image?: string
  imagePosition?: string
  icon?: React.ElementType
}

export type DetailModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  data: DetailData | null
  labels: {
    itemsLabel: string
    cta: string
    close: string
  }
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function DetailModal({ open, onClose, onConfirm, data, labels }: DetailModalProps) {
  const isOpen = open && data !== null

  return (
    <Dialog.Root open={isOpen} onOpenChange={(next) => { if (!next) onClose() }}>
      <AnimatePresence>
        {isOpen && data && (
          <Dialog.Portal key="detail-modal" forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[100] bg-[#07162a]/82 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-[880px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
                style={{ fontFamily: 'var(--font-outfit)', background: '#000d2d' }}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.42, ease: EASE }}
              >
                <Dialog.Close
                  aria-label={labels.close}
                  className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
                >
                  <X size={16} strokeWidth={1.8} aria-hidden="true" />
                </Dialog.Close>

                <div className="flex max-h-[90dvh] flex-col md:flex-row">
                  {/* Coluna da foto: faixa no topo no mobile, coluna inteira no desktop */}
                  <div
                    aria-hidden
                    className="relative h-[132px] w-full flex-shrink-0 md:h-auto md:w-[340px]"
                  >
                    {data.image ? (
                      <Image
                        src={data.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 340px"
                        quality={92}
                        className="object-cover"
                        style={{ objectPosition: data.imagePosition ?? 'center' }}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background:
                            'radial-gradient(120% 90% at 80% 8%, rgba(174,37,28,0.20) 0%, rgba(11,31,58,0) 55%), linear-gradient(135deg, #102a4d 0%, #0b1f3a 70%)',
                        }}
                      >
                        {data.icon && <data.icon size={72} strokeWidth={1.4} className="opacity-90 text-[#ae251c]" />}
                      </div>
                    )}
                    {/* Fade para o navy: vertical no mobile, horizontal no desktop */}
                    <div
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,13,45,0)_35%,#000d2d_100%)] md:bg-[linear-gradient(90deg,rgba(0,13,45,0)_60%,rgba(0,13,45,0.92)_100%)]"
                    />
                  </div>

                  {/* Coluna de conteúdo: o scroll vive aqui, nunca no painel */}
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#7a9ab8]">
                        {data.eyebrow}
                      </p>

                      <Dialog.Title
                        className="mt-2 text-white"
                        style={{
                          fontFamily: 'var(--font-gellix)',
                          fontSize: 'clamp(1.45rem, 2.6vw, 1.8rem)',
                          lineHeight: 1.12,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {data.title}
                      </Dialog.Title>

                      <Dialog.Description className="mt-3 text-[13.5px] leading-relaxed text-white/85">
                        {data.short}
                      </Dialog.Description>

                      {data.body && (
                        <p className="mt-3 text-[13px] leading-relaxed text-white/70">{data.body}</p>
                      )}

                      {data.items.length > 0 && (
                        <div className="mt-5 border-t border-white/12 pt-4">
                          <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#aec3d8]">
                            {labels.itemsLabel}
                          </p>
                          <ul className="flex flex-col">
                            {data.items.map((item) => (
                              <li
                                key={item.name}
                                className="border-t border-white/[0.09] py-2.5 first:border-t-0"
                              >
                                <p className="text-[13px] font-semibold leading-snug text-white/95">
                                  {item.name}
                                </p>
                                {item.desc && (
                                  <p className="mt-0.5 text-[13px] leading-snug text-white/60">
                                    {item.desc}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* CTA ancorado: sempre alcançável, nunca rola para fora */}
                    <div
                      className="flex-shrink-0 border-t border-white/10 px-6 py-4 md:px-8"
                      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}
                    >
                      <button
                        type="button"
                        onClick={onConfirm}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d] md:w-auto"
                      >
                        <WhatsAppIcon size={16} />
                        {labels.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
