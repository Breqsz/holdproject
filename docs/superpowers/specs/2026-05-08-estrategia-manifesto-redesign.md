# EstrategiaManifesto Redesign — Editorial Spread Navy

**Data:** 2026-05-08
**Status:** Aprovado
**Componente afetado:** `components/sections/EstrategiaManifesto.tsx`

## Contexto

Redesign do componente `EstrategiaManifesto` (manifesto cinematográfico + Missão/Visão/Valores) para alinhar visualmente com a DNA da nova `SolucoesGrid` (referência fornecida pelo usuário): slab navy escuro unificado, tipografia serif Cormorant Garamond, badges circulares com cores alternadas, hairlines dourados, dot-grid texturizado, recortes arquitetônicos diagonais.

A versão atual usa fundo claro (`#f7f7f6 → #ecedee`) com card escuro embutido e MVV em ícones vermelhos sobre branco. A nova versão move toda a seção para slab navy unificado em estilo editorial-magazine.

**Páginas onde o componente aparece:** `app/page.tsx` (linha 26).

## Visão Geral da Composição

```
┌────────────────────────────────────────────────────────────────────┐
│  [thin gold hairline edge-to-edge no topo]                         │
│                                                                    │
│  [section padding superior — section-pad token]                    │
│                                                                    │
│  ┌─────────────────────┬──────────────────────────────────────┐   │
│  │  ● ESTRATÉGIA       │                                      │   │
│  │                     │      [imagem 4:5 portrait]           │   │
│  │  Mais do que        │      clip-path diagonal              │   │
│  │  produtos.          │      gold hairline tracing           │   │
│  │  Uma estratégia     │      strong shadow                   │   │
│  │  completa para o    │                                      │   │
│  │  seu patrimônio.    │      ┌─ glass quote bar ─┐           │   │
│  │  ────  (gold rule)  │      │ Integramos saúde…  │          │   │
│  │  body 14px          │      └────────────────────┘          │   │
│  └─────────────────────┴──────────────────────────────────────┘   │
│                                                                    │
│            ─── M · V · V (eyebrow gold) ───                       │
│            ──────── gold hairline rule ────────                   │
│                                                                    │
│  ┌──────────────┬─────────────┬─────────────┐                     │
│  │   ◯ red      │   ◯ blue    │   ◯ gold    │                     │
│  │   Missão     │   Visão     │   Valores   │                     │
│  │   (italic)   │   (italic)  │   (italic)  │                     │
│  │   body…      │   body…     │   body…     │                     │
│  └──────────────┴─────────────┴─────────────┘                     │
│                                                                    │
│  [section padding inferior]                                        │
└────────────────────────────────────────────────────────────────────┘
```

## Section Shell

- **Background:** `var(--surface-base)` (#0b1f3a) — token existente em globals.css
- **Backdrop overlay 1 (dot-grid):** absolute, opacity 0.35, classe `.dot-grid` (token existente)
- **Backdrop overlay 2 (radial glow):** `radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.06), transparent 60%)`, absolute, mix-blend-mode soft-light
- **Top edge:** thin hairline gold edge-to-edge — `background: var(--hairline-gold)`, height 1px
- **Bottom edge:** opcional hairline navy/14 fraco
- **Container:** `max-w-[1180px] mx-auto px-6 lg:px-10`
- **Padding vertical:** `section-pad` token (clamp 6rem → 9rem)
- **Tipografia base:** `font-family: var(--font-outfit)` no nível da section

## Movement 1 — Manifesto Editorial

### Layout grid (≥1024px)

`grid grid-cols-12 gap-12 items-center`

### Coluna esquerda (cols 1-5)

**Eyebrow:**
- Wrapper flex items-center gap-3, mb-8
- Dot 6×6 round-full bg `#c9a84c` (gold)
- Span: text "ESTRATÉGIA", font-size 11px, font-weight 600, letter-spacing 0.32em, text-transform uppercase, color rgba(201,168,76,0.75)

**Headline (H2):**
- Tag: `<h2>`
- Font-family: `var(--font-cormorant)` — Cormorant Garamond
- Font-size: clamp(2rem, 4vw, 3.2rem)
- Font-weight: 500
- Line-height: 1.12
- Letter-spacing: -0.015em
- Estrutura em 3 spans:
  - Span 1: "Mais do que produtos." — color `rgba(201,168,76,0.55)` (gold dim), display block
  - Span 2: "Uma estratégia completa" — color #ffffff, display block
  - Span 3: "para o seu patrimônio." — italic, color `#c9a84c` (gold), display block

**Régua gold curta:**
- mt-8, mb-7
- Width 64px, height 1px
- Background `var(--hairline-gold)`

**Body paragraph:**
- Tag: `<p>`
- Font-family: var(--font-outfit)
- Font-size: 14px
- Line-height: 1.78
- Color: rgba(255,255,255,0.65)
- max-width: 44ch
- Conteúdo: "Com mais de **19 anos de experiência** e acesso a mais de **60 parceiros**, a Hold Corretora atua como parceira estratégica na proteção, no planejamento e no crescimento patrimonial de pessoas e empresas, estruturando soluções completas e personalizadas em saúde, seguros, consórcios e finanças."
- Destaques inline: `<span class="text-white/95 font-medium">19 anos de experiência</span>` e `<span class="text-white/95 font-medium">60 parceiros</span>`

### Coluna direita (cols 6-12) — Imagem cinematográfica

**Wrapper article:**
- Aspect ratio aproximado 4:5 (height ~600–680px desktop)
- `position: relative; overflow: hidden`
- Border-radius: 0 (recorte diagonal substitui o radius)
- Background: #050f1f (fallback escuro)

**Clip-path arquitetônico:**
- `clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%)` — corte diagonal na borda esquerda
- Aplicado no wrapper article

**Imagem Next.js:**
- src: `/images/manifesto/vista-estrategica.webp`
- alt: "Sala executiva ao entardecer — gestão estratégica patrimonial Hold Corretora"
- fill, sizes "(max-width: 1024px) 100vw, 760px"
- objectFit cover, objectPosition: '40% center'

**Hairline gold tracejando a diagonal:**

Implementação concreta via SVG inline absolute-posicionado:
- `<svg>` absolute inset-0, viewBox "0 0 100 100" preserveAspectRatio="none", pointer-events-none, aria-hidden
- Single `<line>` element: x1=8 y1=0 x2=0 y2=100, stroke `#c9a84c` opacity 0.32, strokeWidth 0.18 (vector-effect non-scaling-stroke para manter 1px visual)

Justificativa: SVG escalando com viewBox preserveAspectRatio=none traceja a diagonal exata do clip-path independente do tamanho. Sem skew/rotate hacks.

**Inner border highlight:**
- absolute inset-0
- border 1px solid rgba(255,255,255,0.06)
- pointer-events none

**Shadow:**
- `box-shadow: 0 30px 80px -30px rgba(0,0,0,0.7), 0 12px 32px -16px rgba(0,0,0,0.5)`

**Dark overlay no canto inferior (para garantir leitura do quote bar):**
- absolute bottom-0 inset-x-0 height ~50%
- linear-gradient(180deg, transparent 0%, rgba(5,15,31,0.85) 65%, rgba(5,15,31,0.95) 100%)

### Quote bar sobreposto

**Posicionamento:**
- absolute, bottom-8 (32px), left-12 (48px), right-12 (48px)
- Padding: 24px 28px
- Border-radius: 12px

**Surface:**
- background: rgba(11, 31, 58, 0.78)
- backdrop-filter: blur(14px)
- border: 1px solid rgba(255,255,255,0.10)
- box-shadow: inset 0 1px 0 rgba(255,255,255,0.06)

**Texto:**
- font-family: var(--font-cormorant)
- font-style: italic
- font-weight: 500
- font-size: clamp(1.05rem, 1.5vw, 1.3rem)
- line-height: 1.45
- color: rgba(255,255,255,0.92)
- Conteúdo: "Integramos saúde, seguros, consórcios e finanças em uma gestão estratégica voltada à **proteção patrimonial**, **sucessão** e **eficiência financeira**."
- Destaques: 3 spans com `font-style: normal` (sai do italic), font-weight: 700, color #e8463a (red)

## Régua de Transição (entre Movement 1 e 2)

**Wrapper:**
- mt-20 lg:mt-24, mb-14 lg:mb-16
- Centered horizontalmente

**Eyebrow "M · V · V":**
- font-size: 10px
- font-weight: 600
- letter-spacing: 0.4em
- text-transform: uppercase
- color: rgba(201,168,76,0.6)
- mb-3

**Régua hairline:**
- max-width: 240px
- height: 1px
- background: linear-gradient(90deg, transparent 0%, var(--hairline-gold) 50%, transparent 100%)
- mx-auto

## Movement 2 — MVV Editorial

### Layout

- `grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0`
- max-width: 1080px
- mx-auto

### Hairlines verticais entre colunas (≥768px)

- Aplicar nas colunas 2 e 3: `md:border-l md:border-[var(--hairline-gold)]/50` (ou direto rgba(201,168,76,0.16))
- Padding: `md:pl-10 md:pr-10` para respiro

### Cada coluna (3 itens)

**Wrapper:**
- flex flex-col gap-5
- relative

**Badge circular:**
- 48×48 round-full
- flex items-center justify-center
- Background: `rgba({color}, 0.12)`
- Border: 1px solid `rgba({color}, 0.42)`
- Inner glow opcional: `box-shadow: inset 0 0 12px rgba({color}, 0.10)`

**Ícone (lucide-react):**
- size 22, strokeWidth 1.6
- color: `{color}` (full saturation)

**Título (H3):**
- font-family: var(--font-cormorant)
- font-style: italic
- font-weight: 500
- font-size: clamp(1.55rem, 2.3vw, 1.95rem)
- line-height: 1.2
- letter-spacing: -0.005em
- color: #ffffff

**Body:**
- font-family: var(--font-outfit)
- font-size: 13.5px
- line-height: 1.72
- color: rgba(255,255,255,0.62)

### Conteúdo dos 3 itens

| # | Icon (lucide) | Cor badge | Título (italic) | Body (mantido do componente atual) |
|---|---------------|-----------|-----------------|-------------------------------------|
| 0 | Target        | #e8463a (red)  | Missão  | "Ajudar pessoas e empresas a tomar melhores decisões, conectando saúde, seguros, consórcios e finanças de forma simples e estratégica." |
| 1 | Eye           | #5a86c0 (blue) | Visão   | "Ser referência para pessoas e empresas que buscam segurança para decidir e consistência para crescer." |
| 2 | Gem           | #c9a84c (gold) | Valores | "Agimos com integridade, falamos com transparência, cuidamos com responsabilidade, respeitamos cada história, pensamos no longo prazo e nunca negociamos a confiança." |

## Responsivo — breakpoints

### Movement 1 — colapsa em `<lg` (<1024px)

- Grid muda para single column (`grid-cols-1 lg:grid-cols-12`)
- Imagem move para o topo, aspect ratio muda para 16:9 (não portrait), full-width container
- **clip-path removido em <lg:** o recorte diagonal fica estranho em larguras pequenas — usar `clip-path: none` via media query (CSS condicional ou prop). Hairline gold da diagonal também escondido (apenas `lg:block`)
- Quote bar reposicionado: ocupa 100% da largura inferior (left-0 right-0), padding interno menor (16-20px)
- Coluna textual desce abaixo da imagem: eyebrow + headline + body
- Headline reduz para clamp(1.65rem, 6vw, 2.2rem)

### Movement 2 — colapsa em `<md` (<768px)

- Grid muda para single column (`grid-cols-1 md:grid-cols-3`)
- Em `<md`: hairlines verticais → hairlines horizontais entre cards (border-t no item ≥1, gold/16)
- Badge + título + body em layout vertical
- Padding entre itens: gap-10
- Em `md` a `lg` (768–1023px): mantém 3 colunas mas com gap-6 ao invés de gap-0 (respiro extra antes do desktop)

## Motion (framer-motion + useInView, once: true, margin: '-12%')

```
Eyebrow ESTRATÉGIA       fade x:-8→0    duration 0.7s   delay 0
Headline serif           fade y:18→0    duration 0.85s  delay 0.10
Régua gold curta         scaleX 0→1     duration 0.7s   delay 0.30 (origin-left)
Body paragraph           fade y:12→0    duration 0.75s  delay 0.40
Image card               fade scale     duration 1.10s  delay 0.25
                          0.98→1
Quote bar                fade y:14→0    duration 0.70s  delay 0.65
Régua transição          scaleX 0→1     duration 0.9s   delay 0.80
MVV badges (stagger)     fade y:16→0    duration 0.75s  delay 0.95 + 0.10×i
MVV títulos (stagger)    fade y:10→0    duration 0.70s  delay 1.05 + 0.10×i
MVV bodies (stagger)     fade y:8→0     duration 0.70s  delay 1.15 + 0.10×i
```

Easing global: `[0.16, 1, 0.3, 1]` (EASE_OUT_EXPO, mantém constante atual).

`@media (prefers-reduced-motion: reduce)` já tratado no globals.css globalmente — nenhum tratamento extra necessário.

## Mudanças Fora do Componente

### `app/layout.tsx` — Cormorant Garamond

**Atual:**
```ts
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
```

**Novo:**
```ts
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
```

Justificativa: a headline serif do Movement 1 usa Cormorant em peso 500 normal (não-italic). A última linha "para o seu patrimônio." e os títulos do MVV continuam italic.

### Imports necessários no componente

Manter os imports atuais:
- `useRef` from 'react'
- `Image` from 'next/image'
- `motion, useInView` from 'framer-motion'
- `Target, Eye, Gem` from 'lucide-react'

Nenhum novo import.

## Acessibilidade

- `<section id="estrategia">` mantido (link âncora preservado para navegação)
- Hierarquia: `<h2>` (manifesto headline) → `<h3>` (cada MVV) — preserva estrutura semântica atual
- Decorativos (dot-grid, glow, hairlines, badges interno) com `aria-hidden`
- Contraste mínimo: white sobre #0b1f3a respeita WCAG AA. Body em white/65 = contraste ~7.8:1 (passa AA Large ≥3:1 e AA Normal ≥4.5:1)
- `prefers-reduced-motion` respeitado via globals.css
- Imagem com `alt` descritivo (mantido do componente atual)

## Performance

- Sem novas dependências
- Cormorant Garamond: peso adicional (style normal) — mas já está sendo carregado com 3 weights, adicionar normal não é caro porque usa a mesma família
- Framer-motion: já no bundle
- `priority={false}` na Image (mantido) — lazy load OK porque é abaixo do hero
- Backdrop-filter (glass quote bar): aceitar custo em dispositivos antigos; fallback degradado para opaco se não suportado

## Testes

Atualizar/criar `EstrategiaManifesto.test.tsx` (já existe como untracked):

1. Renderiza H2 com texto contendo "Mais do que produtos" e "Uma estratégia completa"
2. Renderiza imagem com `alt` correto
3. Renderiza quote bar com texto "Integramos saúde, seguros, consórcios e finanças"
4. Renderiza 3 cards MVV com títulos: "Missão", "Visão", "Valores"
5. Cada MVV card contém o body text esperado
6. Section possui `id="estrategia"` (âncora)

Framework: vitest (per project-profile).

## Open Questions / Riscos

1. **Imagem `vista-estrategica.webp` em portrait 4:5:** pode requerer ajuste de `objectPosition` ou nova foto. Se a imagem não funcionar bem na proporção, fallback é manter a proporção atual (~16:9) e ajustar o clip-path para preservar legibilidade.
2. **Cormorant Garamond peso 500 normal:** caso o usuário queira um peso mais leve (400) ou mais pesado (600), ajustar facilmente após preview visual.
3. **Cor blue do badge "Visão" (#5a86c0):** escolhida para harmonizar com a paleta navy. Se contraste baixo, escurecer para #4a76b0.
4. **Glass quote bar com backdrop-blur:** se quebrar em alguns browsers, degradação aceitável (vira opaque rgba).

## Critérios de aceite

- [ ] Section possui fundo navy unificado `var(--surface-base)` com dot-grid + radial glow
- [ ] Movement 1 em 12-col grid no desktop, com imagem em portrait à direita e texto à esquerda
- [ ] Imagem com clip-path diagonal e hairline gold tracejando a borda
- [ ] Quote bar em glass-card sobreposto à imagem com texto serif italic + 3 acentos red
- [ ] Régua de transição centralizada com eyebrow "M · V · V"
- [ ] Movement 2 com 3 colunas, badges circulares 48px alternando red/blue/gold
- [ ] Títulos MVV em Cormorant Garamond italic, body em Outfit
- [ ] Hairlines verticais gold/16 entre colunas no desktop
- [ ] Mobile colapsa para single-column sem clip-path, imagem 16:9, MVV em coluna única com hairlines horizontais
- [ ] Motion com stagger conforme tabela
- [ ] Cormorant Garamond carregado com style ['normal', 'italic'] em layout.tsx
- [ ] Testes vitest atualizados e passando
- [ ] Sem erros de TypeScript / lint
- [ ] Sem regressões visuais nos componentes adjacentes (HomeHero, SolucoesGrid)
