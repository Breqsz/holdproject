'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { useLocale } from '@/lib/i18n'

type Props = {
  open: boolean
  onClose: () => void
  href: string
  label: string
  message: string
  countdownSeconds?: number
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function WhatsAppRedirectModal({
  open,
  onClose,
  href,
  label,
  message,
  countdownSeconds = 5,
}: Props) {
  const { t } = useLocale()
  const [count, setCount] = useState(countdownSeconds)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      setCount(countdownSeconds)
      return
    }
    if (count <= 0) {
      window.location.href = href
      return
    }
    const t = window.setTimeout(() => setCount((c) => c - 1), 1000)
    return () => window.clearTimeout(t)
  }, [open, count, countdownSeconds, href])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-redirect-title"
        >
          <button
            type="button"
            aria-label={t('saudeV2.wa.modal.close')}
            onClick={onClose}
            className="absolute inset-0 bg-[#07162a]/82 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="relative w-full max-w-md rounded-2xl bg-[#0b1f3a] ring-1 ring-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] p-6 sm:p-8"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <span
              aria-hidden
              className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(to right, transparent, #ae251c 30%, #ae251c 70%, transparent)' }}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t('saudeV2.wa.modal.close')}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-white/55 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <X size={15} strokeWidth={1.8} />
            </button>

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
              {t('saudeV2.wa.modal.eyebrow')}
            </p>
            <h3
              id="wa-redirect-title"
              className="mt-3 text-white"
              style={{ fontSize: 'clamp(1.4rem, 2.6vw, 1.75rem)', lineHeight: 1.18 }}
            >
              {t('saudeV2.wa.modal.title.prefix')}{' '}
              <span
                className="font-semibold tabular-nums"
                style={{ color: '#ae251c' }}
              >
                {count}s
              </span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#7a9ab8]">
              {t('saudeV2.wa.modal.body.prefix')}{' '}
              <span className="text-white">{label}</span>
              {t('saudeV2.wa.modal.body.suffix')}
            </p>

            <p className="mt-3 rounded-lg bg-white/[0.04] ring-1 ring-white/10 px-4 py-3 text-[13.5px] leading-relaxed text-white/85">
              “{message}”
            </p>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              <WhatsAppIcon size={16} />
              {t('saudeV2.wa.modal.go')}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full items-center justify-center px-6 py-2 text-[11px] uppercase tracking-[0.22em] text-white/50 hover:text-white/80 transition-colors"
            >
              {t('saudeV2.wa.modal.cancel')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
