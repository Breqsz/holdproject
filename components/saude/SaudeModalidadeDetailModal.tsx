'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { useLocale } from '@/lib/i18n'

type DetailData = {
  seq: string
  image: string
  imagePosition?: string
  title: string
  short: string
  body: string
  bullets: string[]
}

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  data: DetailData | null
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function SaudeModalidadeDetailModal({ open, onClose, onConfirm, data }: Props) {
  const { t } = useLocale()
  const [mounted, setMounted] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    prevFocusRef.current = (document.activeElement as HTMLElement) ?? null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 60)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      window.clearTimeout(focusTimer)
      prevFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && data && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalidade-detail-title"
        >
          <button
            type="button"
            aria-label={t('saudeV2.modalidades.detail.close')}
            onClick={onClose}
            className="absolute inset-0 bg-[#07162a]/82 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="relative w-full max-w-xl rounded-2xl ring-1 ring-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] overflow-hidden max-h-[92dvh] flex flex-col"
            style={{ fontFamily: 'var(--font-outfit)', background: '#000d2d' }}
          >
            {/* Foto full-bleed de fundo */}
            <div aria-hidden className="absolute inset-0 z-0">
              <Image
                src={data.image}
                alt=""
                fill
                sizes="(max-width: 640px) 92vw, 580px"
                quality={92}
                className="object-cover"
                style={{ objectPosition: data.imagePosition ?? 'center' }}
              />
              {/* Gradiente: foto nítida no topo, escurece pra base (legibilidade) */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,13,45,0.04) 0%, rgba(0,13,45,0.10) 26%, rgba(0,13,45,0.45) 52%, rgba(0,13,45,0.82) 100%)',
                }}
              />
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t('saudeV2.modalidades.detail.close')}
              className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
            >
              <X size={15} strokeWidth={1.8} />
            </button>

            {/* Área de respiro da foto */}
            <div aria-hidden className="relative z-10 h-[150px] sm:h-[190px] flex-shrink min-h-[84px]" />

            {/* Painel de vidro fosco com o conteúdo */}
            <div
              className="relative z-10 m-3 sm:m-3.5 flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/15 shadow-[0_18px_50px_-16px_rgba(0,0,0,0.7)]"
              style={{
                background: 'rgba(11,31,58,0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <div
                className="overflow-y-auto px-5 sm:px-7 py-5 sm:py-6"
                style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}
              >
                <h3
                  id="modalidade-detail-title"
                  className="text-white"
                  style={{
                    fontFamily: 'var(--font-gellix)',
                    fontSize: 'clamp(1.4rem, 2.6vw, 1.75rem)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {data.title}
                </h3>

                <p className="mt-3 pl-3 border-l-2 border-[#ae251c]/80 text-[14px] leading-relaxed text-white/90">
                  {data.short}
                </p>

                <p className="mt-3.5 text-[13.5px] leading-relaxed text-white/72">
                  {data.body}
                </p>

                {data.bullets.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/12">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#aec3d8] mb-2.5">
                      {t('saudeV2.modalidades.detail.bulletsLabel')}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {data.bullets.map((b) => (
                        <span
                          key={b}
                          className="flex items-start gap-2 text-[12.5px] leading-snug text-white/82"
                        >
                          <span aria-hidden className="mt-0.5 font-bold text-[#ae251c]">·</span>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onConfirm}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  <WhatsAppIcon size={16} />
                  {t('saudeV2.modalidades.detail.cta')}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2.5 inline-flex w-full items-center justify-center px-6 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/50 hover:text-white/80 transition-colors"
                >
                  {t('saudeV2.modalidades.detail.close')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
