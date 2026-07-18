'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'

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
          <Dialog.Portal forceMount>
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
                <Dialog.Title
                  className="text-white"
                  style={{
                    fontFamily: 'var(--font-gellix)',
                    fontSize: 'clamp(1.45rem, 2.6vw, 1.8rem)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {data.title}
                </Dialog.Title>
                <Dialog.Description className="sr-only">{data.short}</Dialog.Description>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
