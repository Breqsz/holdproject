import type { Metadata } from 'next'
import ConsorciosClient from './ConsorciosClient'

export const metadata: Metadata = {
  title: 'Consórcios — estratégia patrimonial sem juros',
  description:
    'Consórcios para imóveis, veículos, agro, condomínios e mais — com diagnóstico, estratégia de contemplação e acompanhamento completo da Hold Corretora.',
  alternates: { canonical: '/consorcios/' },
}

export default function Page() {
  return <ConsorciosClient />
}
