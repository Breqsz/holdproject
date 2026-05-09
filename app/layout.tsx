import type { Metadata } from 'next'
import { Outfit, Cormorant_Garamond } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { LocaleProvider } from '@/lib/i18n'
import { AudienceProvider } from '@/lib/audience'
import { Toaster } from 'sonner'
import CardNav from '@/components/layout/CardNav'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ScrollUI from '@/components/layout/ScrollUI'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const gellix = localFont({
  src: [
    { path: '../public/fonts/Gellix-TRIAL-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Gellix-TRIAL-Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/fonts/Gellix-TRIAL-Black.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-gellix',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://holdcorretora.com'),
  title: {
    default: 'Hold Corretora — Consultoria especializada em consórcios',
    template: '%s · Hold Corretora',
  },
  description:
    'Consultoria estratégica em consórcios, seguros, saúde e investimentos. +19 anos de experiência em Uberlândia, MG.',
  keywords: ['consórcio', 'consultoria', 'seguros', 'saúde', 'investimentos', 'Uberlândia', 'Hold Corretora'],
  openGraph: {
    title: 'Hold Corretora',
    description: 'Estratégia, planejamento e acompanhamento — consórcios, seguros, saúde e investimentos.',
    url: 'https://holdcorretora.com',
    siteName: 'Hold Corretora',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${gellix.variable} ${cormorant.variable}`}>
      <body>
        <LocaleProvider>
          <AudienceProvider>
            <CardNav />
            <main>{children}</main>
            <Footer />
            <ScrollUI />
            <WhatsAppButton />
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: { background: '#142f54', color: '#e0e8f0', border: '1px solid #1e4a7a' },
              }}
            />
          </AudienceProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
