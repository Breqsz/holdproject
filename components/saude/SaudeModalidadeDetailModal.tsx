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
            className="relative w-full max-w-xl rounded-2xl bg-[#0b1f3a] ring-1 ring-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] overflow-hidden max-h-[88vh] flex flex-col"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <div className="relative h-[140px] sm:h-[180px] w-full overflow-hidden flex-shrink-0">
              <Image
                src={data.image}
                alt=""
                fill
                sizes="(max-width: 640px) 92vw, 580px"
                quality={92}
                className="object-cover"
                style={{ objectPosition: data.imagePosition ?? 'center' }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7,22,42,0) 0%, rgba(11,31,58,0.95) 100%)',
                }}
              />
              <span
                aria-hidden
                className="absolute left-0 right-0 bottom-0 h-px"
                style={{
                  background:
                    'linear-gradient(to right, transparent, #ae251c 30%, #ae251c 70%, transparent)',
                }}
              />
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t('saudeV2.modalidades.detail.close')}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white/80 hover:text-white hover:bg-black/50 transition-colors"
            >
              <X size={15} strokeWidth={1.8} />
            </button>

            <div className="relative px-6 sm:px-8 py-6 sm:py-7 overflow-y-auto">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
                {t('saudeV2.modalidades.detail.eyebrow')} · {data.seq}
              </p>
              <h3
                id="modalidade-detail-title"
                className="mt-2 text-white"
                style={{
                  fontFamily: 'var(--font-gellix)',
                  fontSize: 'clamp(1.4rem, 2.6vw, 1.75rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}
              >
                {data.title}
              </h3>

              <p className="mt-4 pl-3 border-l-2 border-[#ae251c]/60 text-[14.5px] leading-relaxed text-white/85">
                {data.short}
              </p>

              <p className="mt-4 text-[14.5px] leading-relaxed text-white/72">
                {data.body}
              </p>

              {data.bullets.length > 0 && (
                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8] mb-2">
                    {t('saudeV2.modalidades.detail.bulletsLabel')}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {data.bullets.map((b) => (
                      <span key={b} className="text-[11.5px] text-white/80 leading-tight">
                        · {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={onConfirm}
                className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                <WhatsAppIcon size={16} />
                {t('saudeV2.modalidades.detail.cta')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full items-center justify-center px-6 py-2 text-[11px] uppercase tracking-[0.22em] text-white/50 hover:text-white/80 transition-colors"
              >
                {t('saudeV2.modalidades.detail.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
