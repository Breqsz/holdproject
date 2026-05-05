'use client'

import { motion } from 'framer-motion'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const href = number ? `https://wa.me/${number}` : '#'

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.35)]"
    >
      {/* Perpetual breathing ring — Framer-controlled, smoother than CSS animate-ping */}
      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.6, 1.6], opacity: [0.45, 0, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-[#25D366]"
      />
      <WhatsAppIcon size={28} className="relative z-10 text-white" />
    </motion.a>
  )
}
