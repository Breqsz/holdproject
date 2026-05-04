import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/lib/i18n'
import { Toaster } from 'sonner'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hold Corretora — Consultoria Especializada em Consórcios',
  description:
    'Consórcio com estratégia, planejamento e acompanhamento. Uberlândia, MG. Seguros, Saúde e Investimentos.',
  keywords: 'consórcio, consultoria, seguros, saúde, investimentos, Uberlândia',
  openGraph: {
    title: 'Hold Corretora',
    description: 'Consultoria especializada em consórcios — Uberlândia, MG',
    url: 'https://holdcorretora.com',
    siteName: 'Hold Corretora',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body>
        <LocaleProvider>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: { background: '#142f54', color: '#e0e8f0', border: '1px solid #1e4a7a' },
            }}
          />
        </LocaleProvider>
      </body>
    </html>
  )
}
