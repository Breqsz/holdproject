import type { Metadata } from 'next'
import InvestimentosClient from './InvestimentosClient'

export const metadata: Metadata = {
  title: 'Investimentos — visão integrada de patrimônio',
  description:
    'Diagnóstico, planejamento e parceria com escritórios de investimento para uma visão patrimonial estratégica de longo prazo.',
  alternates: { canonical: '/investimentos/' },
}

export default function Page() {
  return <InvestimentosClient />
}
