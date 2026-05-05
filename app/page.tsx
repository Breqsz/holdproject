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
import CurvedLoop from '@/components/motion/CurvedLoop'
import { useAudience } from '@/lib/audience'

export default function Home() {
  const { audience, hydrated } = useAudience()
  const showPJ = hydrated && audience === 'pj'

  return (
    <>
      <HomeHero />

      {/* Curved values divider — between Hero and Solutions */}
      <div aria-hidden className="bg-[#07162a] py-8 md:py-10">
        <CurvedLoop
          marqueeText="SEGURANÇA ✦ PLANEJAMENTO ✦ ACOMPANHAMENTO ✦ RESULTADOS ✦ "
          curveAmount={300}
          speed={0.55}
          direction="left"
          interactive={false}
          className="fill-white/15"
          fontSize="text-[2.2rem] md:text-[3rem]"
        />
      </div>

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
