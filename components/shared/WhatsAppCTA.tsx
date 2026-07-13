'use client'

import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

/**
 * CTA primário padrão "Fale com um especialista": pílula vermelha com o glifo
 * do WhatsApp à esquerda, rótulo e seta em cápsula à direita. Abre a conversa
 * no WhatsApp (wa.me) em nova aba. Referência de design aprovada pelo cliente.
 */
export function WhatsAppCTA({
  href,
  label,
  className = '',
}: {
  href: string
  label: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-[#ae251c] hover:bg-[#8f1f17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors ${className}`}
    >
      <WhatsAppIcon size={17} />
      <span>{label}</span>
      <span
        aria-hidden
        className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <ArrowRight size={14} />
      </span>
    </a>
  )
}
