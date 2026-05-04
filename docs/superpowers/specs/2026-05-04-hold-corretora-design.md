# Hold Corretora — Design Spec

**Data:** 2026-05-04  
**Cliente:** Jacimar — Hold Corretora (seguros, consórcios, saúde, investimentos) — Uberlândia, MG  
**Domínio:** holdcorretora.com  
**Deploy:** Hostgator (static export)

---

## Objetivo

Site institucional single-page (SPA-style) com navegação por âncoras. Substitui o WordPress atual. Foco inicial em consórcio, com pilares de Saúde, Seguros e Investimentos presentes como cards e com conteúdo placeholder até o cliente fornecer os textos.

---

## Stack Técnica

| Camada | Tecnologia | Obs |
|--------|-----------|-----|
| Framework | Next.js 14 (App Router) | `output: 'export'` para static |
| Styling | Tailwind CSS v3 + shadcn/ui | `components.json` já configurado |
| Animações | Framer Motion + React Bits (`@react-bits` no registry) | |
| i18n | Context customizado com JSON (pt/en) | Sem dependência externa |
| Formulário | EmailJS (client-side) | Substitui Resend — sem API route |
| Validação | react-hook-form + zod | |
| Toast | shadcn Sonner | |
| Icons | Lucide React | |
| Font | Inter via `next/font/google` | |
| Deploy | `out/` → Hostgator shared hosting | |

**Decisão EmailJS vs Resend:** Hostgator shared hosting não suporta Node.js API routes. EmailJS resolve o envio de email 100% client-side. Tier gratuito: 200 emails/mês. Se migrar para Vercel no futuro, troca é mínima.

---

## Paleta de Cores

```
Navy Dark (bg gradient):   #07162a → #0b1f3a
Navy Mid (cards/menus):    #142f54
Azul marca (logo/accent):  #020c30
Vermelho marca (CTA):      #ae251c
Grafite Invest.:           #1a1a2e  com dourado #c9a84c
Branco (Saúde):            #ffffff  com texto navy
```

---

## Estrutura de Arquivos

```
/
├── app/
│   ├── layout.tsx              ← metadata, fontes, providers
│   └── page.tsx                ← orquestra todas as seções
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── SobreNos.tsx
│       ├── ServicoPillars.tsx
│       ├── ParaClientes.tsx
│       ├── ParaEscritorios.tsx
│       ├── Depoimentos.tsx
│       ├── FAQ.tsx
│       └── Contato.tsx
├── lib/
│   ├── i18n.tsx
│   └── utils.ts
├── messages/
│   ├── pt.json
│   └── en.json
├── public/
│   └── images/
│       ├── hero/        ← home.jpg, quem-somos.jpg, saude.jpg, seguros.jpg, consorcios.jpg, investimentos.jpg
│       └── personas/    ← pessoa-fisica.jpg, empresa.jpg
└── next.config.ts       ← output: 'export'
```

Sem `app/api/` — não há rotas de servidor.

---

## Seções da Página

### 1. Navbar
- Fixed top, `bg-transparent` → `bg-[#0b1f3a]/95 backdrop-blur` ao scroll
- Links âncora: Home | Sobre nós | Para Clientes | Para Escritórios | FAQ | Contato
- Toggle PT | EN (troca locale via Context)
- Mobile: hamburger → shadcn `Sheet` lateral
- Logo: texto estilizado "HOLD" como placeholder até SVG final chegar

### 2. Hero `#home`
- Fundo: gradiente `#07162a → #0b1f3a` + `public/images/hero/home.jpg`
- H1: "Um ecossistema estratégico para proteger e expandir o seu patrimônio."
- Subtítulo: "Mais do que produtos, uma estratégia completa para o seu patrimônio."
- CTA primário (vermelho): "Para Clientes →"
- CTA secundário (outline branco): "Para Escritórios de Investimentos →"
- Animação: Framer Motion `staggerChildren` no H1 + CTAs
- 4 badges na base: Segurança · Planejamento · Acompanhamento · Resultados

### 3. Sobre Nós `#sobre-nos`
- Headline: "Mais do que viabilizar crédito. Estruturamos decisões com estratégia e propósito."
- Texto consultivo da `detalhes.txt`
- Stat counters animados: `+19 Anos de Experiência` | `+60 Parceiros Comerciais`
  - Count-up via `useEffect` + `requestAnimationFrame` no viewport
- Cards: MISSÃO | VISÃO | VALORES (3 colunas)

### 4. 4 Pilares `#servicos`
**Layout B aprovado — Consórcio em destaque:**
- Consórcio: card maior à esquerda, gradiente `#020c30→#142f54`, CTA vermelho visível
- Seguros (vermelho `#ae251c`), Saúde (branco/claro), Investimentos (grafite `#1a1a2e` + dourado `#c9a84c`): cards menores empilhados à direita
- Saúde e Investimentos: placeholder "Em breve — conteúdo a confirmar"
- `whileHover: { y: -6, scale: 1.02 }` em todos os cards

### 5. Para Clientes — Consórcio `#para-clientes`
**Toggle "Para Você / Para sua Empresa":**
- `useState<'voce' | 'empresa'>` + `AnimatePresence` Framer Motion
- Visual: pill toggle com fundo `#142f54`, ativo em `#ae251c`

**Para Você — Layout B aprovado:**
- Grid 4×2 de icon-cards (ícone + label por categoria)
- Clicar em um card abre painel de detalhe abaixo com: título, visão estratégica, lista de aplicações, CTA WhatsApp
- 8 categorias: Imóveis · Veículos · Pesados · Serviços · Condomínios · Igrejas · Alavancagem · Cotas Contempladas
- Todo conteúdo já disponível em `contextoprojeto/detalhes.txt`

**Para sua Empresa:** exibe inline (dentro do mesmo container `#para-clientes`) um resumo do conteúdo B2B — diferenciais + CTA "Quero ser parceiro". O `#para-escritorios` é uma seção separada abaixo com o detalhamento completo. O toggle não faz scroll — apenas troca o conteúdo renderizado no painel.

**Seção "Como Funciona" (4 steps):**
1. Diagnóstico e planejamento
2. Estratégia de contemplação
3. Utilização do crédito
4. Acompanhamento completo

### 6. Para Escritórios `#para-escritorios`
- Conteúdo da "Mesa de Consórcios para Parceiros" de `detalhes.txt`
- Diferenciais em lista
- 5 steps: Capacitação · Estruturação · Suporte ao assessor · Atuação conjunta · Experiência do cliente
- Badge "Parceiros autorizados pelo Banco Central do Brasil"

### 7. Depoimentos `#depoimentos`
- shadcn Carousel (Embla)
- Cards: estrelas + nome + texto
- Mock data inicial; integração Google Reviews futura

### 8. FAQ `#faq`
- shadcn `Accordion` (type="multiple")
- 18 perguntas completas de `detalhes.txt`
- Framer Motion `AnimatePresence` no conteúdo dos itens

### 9. Contato `#contato`
**Formulário cliente (esquerda):**
- Segmento (dropdown), Crédito Desejado, Prazo, Nome, WhatsApp

**Formulário parceiro (direita):**
- Razão Social, Nome Corretora/Escritório, Qtd Assessores, Telefone, Email

**Submit:**
1. `emailjs.send(serviceId, templateId, params)` → email para Jacimar
2. `window.open(whatsappLink)` com mensagem pré-formatada

**Feedback:** shadcn Sonner toast de sucesso/erro

### 10. Footer
- Logo + tagline
- Links de navegação
- Ícones sociais: Instagram, LinkedIn, WhatsApp
- "Fiscalizado pelo Banco Central do Brasil"

### 11. WhatsApp Floating Button
- `position: fixed; bottom: 24px; right: 24px; z-index: 50`
- Ícone + CSS `animate-ping` no ring
- Link: `https://wa.me/55XXXXXXXXXXX` (número pendente do cliente)

---

## i18n

```typescript
// lib/i18n.tsx
type Locale = 'pt' | 'en'
const LocaleContext = createContext<{ locale: Locale; t: (key: string) => string }>()
```

Todos os textos em `messages/pt.json` e `messages/en.json`. Conteúdo PT já em `contextoprojeto/detalhes.txt`. Conteúdo EN a traduzir.

---

## Fluxo de Contato

```
Usuário preenche form
  → zod valida campos
  → emailjs.send(serviceId, templateId, params)
  → Email chega para Jacimar
  + window.open('https://wa.me/55...' + msg formatada)
  → Toast sucesso (Sonner)
```

---

## Animações (Framer Motion)

| Elemento | Animação |
|----------|----------|
| Hero title/CTAs | `staggerChildren` opacity+y |
| Seções ao scroll | `whileInView` + `viewport: { once: true }` |
| Stat counters | count-up RAF no viewport |
| Toggle Você/Empresa | `AnimatePresence` + `motion.div key` |
| Cards serviço | `whileHover: { y: -6, scale: 1.02 }` |
| FAQ accordion | shadcn Accordion + Framer AnimatePresence |
| WhatsApp button | CSS `animate-ping` |

---

## Pendências do Cliente

| Item | Status | Fallback |
|------|--------|---------|
| Número WhatsApp | ❌ pendente | `XXXXXXXXXXX` placeholder |
| Email institucional | ❌ pendente | variável de ambiente |
| Logo SVG (puzzle) | ❌ pendente | texto "HOLD" estilizado |
| URL Instagram | ❌ pendente | link desabilitado |
| Conteúdo Saúde/Seguros/Invest. | ❌ pendente | "Em breve — conteúdo a confirmar" |

---

## Variáveis de Ambiente

```env
# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_PARTNER=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=55XXXXXXXXXXX
```

---

## Configuração de Deploy

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },  // necessário para static export
  trailingSlash: true,
}
```

`npm run build` → gera pasta `out/` → upload via FTP para Hostgator.

---

## Referências Visuais

- Principal: `contextoprojeto/ref. hold.jpeg` + `contextoprojeto/WhatsApp Image 2026-05-04 at 10.53.23.jpeg`
- Estrutura/layout: consorce.com
- Formulário contato: `contextoprojeto/referenciaContatoFormulario.jpeg`
- Toggle: `contextoprojeto/referenciaToggleParaEmpresaParaVoce.png`
