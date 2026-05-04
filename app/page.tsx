import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Hero from '@/components/sections/Hero'
import SobreNos from '@/components/sections/SobreNos'
import ServicoPillars from '@/components/sections/ServicoPillars'
import ParaClientes from '@/components/sections/ParaClientes'
import ParaEscritorios from '@/components/sections/ParaEscritorios'
import Depoimentos from '@/components/sections/Depoimentos'
import FAQ from '@/components/sections/FAQ'
import Contato from '@/components/sections/Contato'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SobreNos />
        <ServicoPillars />
        <ParaClientes />
        <ParaEscritorios />
        <Depoimentos />
        <FAQ />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
