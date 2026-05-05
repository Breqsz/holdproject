import type { Metadata } from 'next'
import SaudeClient from './SaudeClient'

export const metadata: Metadata = {
  title: 'Saúde — planos individuais, familiares e empresariais',
  description:
    'Comparativo de operadoras, contratação e renovação de planos de saúde para você, sua família e sua empresa.',
  alternates: { canonical: '/saude/' },
}

export default function Page() {
  return <SaudeClient />
}
