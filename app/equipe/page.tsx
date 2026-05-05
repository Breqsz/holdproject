import type { Metadata } from 'next'
import EquipeClient from './EquipeClient'

export const metadata: Metadata = {
  title: 'Equipe — quem cuida da sua estratégia',
  description:
    'Conheça os times consultivos da Hold Corretora — saúde, seguros, consórcios, patrimônio e relacionamento. Vínculo direto com cada cliente.',
  alternates: { canonical: '/equipe/' },
}

export default function Page() {
  return <EquipeClient />
}
