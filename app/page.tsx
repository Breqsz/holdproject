'use client'

import HomeHero from '@/components/sections/HomeHero'
import SolucoesGrid from '@/components/sections/SolucoesGrid'
import Parceiros from '@/components/sections/Parceiros'
import SobreNos from '@/components/sections/SobreNos'
import ParaEscritorios from '@/components/sections/ParaEscritorios'
import ComoFunciona from '@/components/sections/ComoFunciona'
import Depoimentos from '@/components/sections/Depoimentos'
import FAQ from '@/components/sections/FAQ'
import Contato from '@/components/sections/Contato'
import { useAudience } from '@/lib/audience'

export default function Home() {
  const { audience, hydrated } = useAudience()
  const showPJ = hydrated && audience === 'pj'

  return (
    <>
      <HomeHero />

      <SolucoesGrid />
      <Parceiros />
      <SobreNos />
      {showPJ ? <ParaEscritorios /> : <ComoFunciona />}
      <Depoimentos />
      <FAQ />
      <Contato />
    </>
  )
}
