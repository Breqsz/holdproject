import type { Metadata } from 'next'
import SegurosClient from './SegurosClient'

export const metadata: Metadata = {
  title: 'Seguros — proteção patrimonial e familiar',
  description:
    'Seguros de vida, auto, residencial, empresarial e patrimonial. Diagnóstico, contratação e suporte completo em sinistros.',
  alternates: { canonical: '/seguros/' },
}

export default function Page() {
  return <SegurosClient />
}
