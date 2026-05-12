'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

export default function ScrollUI() {
  const { t } = useLocale()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    function check() {
      const doc = document.documentElement
      const scrolled = doc.scrollTop + doc.clientHeight
      setShowTop(scrolled / doc.scrollHeight >= 0.85)
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <>
      {/* Thin progress bar pinned to the very top */}
      <motion.div
        aria-hidden
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#ae251c] pointer-events-none"
      />

      {/* Back-to-top — appears when 85 % of page is scrolled, sits above the WhatsApp button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            aria-label={t('ui.back_to_top')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-4 sm:right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#07162a] ring-1 ring-white/15 text-[#7a9ab8] shadow-lg hover:bg-[#142f54] hover:ring-[#7a9ab8]/40 transition-colors duration-200"
            style={{ bottom: 'calc(max(1.25rem, env(safe-area-inset-bottom)) + 4.5rem)' }}
          >
            <ChevronUp size={20} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
