'use client'

import dynamic from 'next/dynamic'
import HomeHero from '@/components/sections/HomeHero'
import { Reveal } from '@/components/motion/Reveal'
import { useAudience } from '@/lib/audience'

const EstrategiaBand      = dynamic(() => import('@/components/sections/EstrategiaBand'))
const EstrategiaManifesto = dynamic(() => import('@/components/sections/EstrategiaManifesto'))
const StatsBar        = dynamic(() => import('@/components/sections/StatsBar'))
const SolucoesGrid    = dynamic(() => import('@/components/sections/SolucoesGrid'))
const ParaEscritorios = dynamic(() => import('@/components/sections/ParaEscritorios'))
const ComoFunciona    = dynamic(() => import('@/components/sections/ComoFunciona'))
const Depoimentos     = dynamic(() => import('@/components/sections/Depoimentos'))
const TrustBar        = dynamic(() => import('@/components/sections/TrustBar'))
const FAQ             = dynamic(() => import('@/components/sections/FAQ'))
const Contato         = dynamic(() => import('@/components/sections/Contato'))

export default function Home() {
  const { audience, hydrated } = useAudience()
  const showPJ = hydrated && audience === 'pj'

  return (
    <>
      <HomeHero />

      <EstrategiaBand />
      <EstrategiaManifesto />
      <SolucoesGrid />
      <Reveal><StatsBar /></Reveal>
      {showPJ ? <ParaEscritorios /> : <ComoFunciona />}
      <Depoimentos />
      <Reveal><TrustBar /></Reveal>
      <FAQ />
      <Reveal><Contato /></Reveal>
    </>
  )
}
