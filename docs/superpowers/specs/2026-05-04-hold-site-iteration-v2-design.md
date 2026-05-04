# Hold Corretora — Site Iteration v2 (Design Spec)

**Data:** 2026-05-04
**Branch:** `main`
**Stack:** Next.js 14 · React 18 · Tailwind 3 · Framer Motion · GSAP · Vitest

## Objetivo

Iterar o site da Hold Corretora com (i) posicionamento mais amplo no Hero (não só consórcio), (ii) arquitetura PF/PJ aplicada de ponta a ponta, (iii) prova social real (Google), (iv) ícones bespoke, e (v) polimento de motion premium em pontos cirúrgicos. Mantém a identidade visual existente (paleta navy + vermelho `#ae251c` + dourado `#c9a84c`).

---

## 1. Hero (`components/sections/HomeHero.tsx`)

**Background:** mantém gradiente navy + dot grid + 3 blobs de luz já existentes.

**H1 — 3 linhas, todas brancas, palavras rotativas em vermelho `#ae251c`:**
```
[Consórcio | Seguros | Saúde | Investimentos]
com
[inteligência | confiança | estratégia | clareza | método | visão | propósito].
```
- Componente `<RotatingText>` (port React Bits, JS+Tailwind, dep `motion`).
- **2 instâncias sincronizadas** via timer compartilhado (state no parent → ambos `RotatingText` recebem `auto={false}` e `currentTextIndex` controlado externamente). Troca a cada **2400 ms**, `staggerFrom="last"`, transition spring `damping: 30, stiffness: 400`.
- Tipografia: `clamp(2.5rem, 6.4vw, 4.75rem)`, `var(--font-outfit)`, peso display.

**Subtítulo:**
> "Do diagnóstico à conquista, a Hold conduz cada decisão com você e por você — em consórcio, seguros, saúde e investimentos."

**Lateral direita — `jacimar-avatar-3d.png`:**
- Composição: container à direita ocupando ~40% da largura no desktop, escala fluida `lg:h-[520px]`.
- Wrapper com glow ring vermelho discreto atrás (`radial-gradient` + blur, opacidade `.18`) — ecoa a referência do mockup.
- Em mobile: stack vertical, avatar abaixo do bloco textual com altura reduzida.
- Container do hero passa a ser `lg:grid-cols-[1.4fr_1fr]` (texto à esquerda, avatar à direita).

**AudienceToggle:** mantém (PF | PJ).

**CTAs:** WhatsApp magnético (atual) + "Conhecer soluções" (atual).

**Os 4 selos (Segurança/Planejamento/Acompanhamento/Resultados):** **removidos** do hero. Migram para o divisor curvo (seção 2).

---

## 2. Divisor curvo entre Hero e Soluções

Novo componente importado: `<CurvedLoop>` (port React Bits, JS+Tailwind).

**Conteúdo:**
> `SEGURANÇA ✦ PLANEJAMENTO ✦ ACOMPANHAMENTO ✦ RESULTADOS ✦ ` (repete via marquee)

**Props:** `curveAmount={300}`, `speed={1.2}`, `direction="left"`, `interactive={false}`, classe `fill-white/15` (texto sutil), seção bg `#07162a` (mesma do Hero) → transição visual fluida.

Funciona como respiração entre seções — substitui a linha de pills ambient sem virar elemento "gritão".

---

## 3. Soluções Grid (`components/sections/SolucoesGrid.tsx`) — restaurada

**Layout 1+3 asymmetric (Consórcio em destaque):**
```
┌──────────────────────────┬──────────────┐
│                          │   SEGUROS    │
│       CONSÓRCIO          ├──────────────┤
│  (col-span-2 row-span-3) │    SAÚDE     │
│                          ├──────────────┤
│                          │ INVESTIMENTOS│
└──────────────────────────┴──────────────┘
```
- Tailwind: container `grid lg:grid-cols-3 lg:grid-rows-3 gap-4 md:gap-5`.
- Card Consórcio: `lg:col-span-2 lg:row-span-3`, padding maior (`p-10`), título maior `clamp(1.75rem, 2.6vw, 2.25rem)`.
- Demais 3 cards: `lg:col-span-1 lg:row-span-1`, padding atual.
- Hover: `y: -4` mantido + spotlight radial (já existe).

**Header da seção:** sai a coluna esquerda com personagem. Header (eyebrow + h2 + paragraph) volta para o **topo da seção**, full-width left-aligned, max-w-3xl.

**Personagem:** removido daqui (migra para Hero).

**Ícones:** lucide → **4 SVGs custom em `components/icons/sectors/`**:
- `ConsorcioIcon.tsx` — 3 retângulos ascendentes ligados por linha 1.5px (planejamento → contemplação → conquista). 24×24 viewBox.
- `SegurosIcon.tsx` — escudo pentagonal com camada interna (proteção em camadas). 24×24.
- `SaudeIcon.tsx` — linha de pulso transicionando para meia-folha (cuidado integrado). 24×24.
- `InvestimentosIcon.tsx` — arco ascendente terminando em ponto luminoso (trajetória). 24×24.

Cada um aceita `className`, `size`, `color` via prop `currentColor`-aware. Stroke 1.5px. Animação opcional: `stroke-dashoffset` 0→full no entry da seção (~800ms, `whileInView`).

---

## 4. CardNav (`components/layout/CardNav.tsx`) — texto branco no card "Suporte"

- `ITEMS[2].textColor`: `'#07162a'` → `'#ffffff'`
- `bgColor` (`#c9a84c`) mantém-se.
- A mudança aplica automaticamente a label, links e cor do `ArrowUpRight` que já leem `item.textColor`.

---

## 5. Sobre Nós (`components/sections/SobreNos.tsx`) — 3º stat

**Grid de stats:** 2 col → 3 col responsive
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 max-w-3xl">
```

**Stats finais:**
1. `+19` · "Anos de experiência"
2. `+60` · "Parceiros comerciais"
3. `+4` · "Frentes integradas: consórcio, seguros, saúde, investimentos"

Mesmo tratamento visual (display fluid + rule-gold + label).

---

## 6. PF/PJ Architecture — `<ParaEscritorios>` ↔ `<ComoFunciona>`

**`app/page.tsx`:**
```tsx
'use client'
const { audience, hydrated } = useAudience()
// até hidratar, renderiza PF (default) → evita CLS
{!hydrated || audience === 'pf' ? <ComoFunciona /> : <ParaEscritorios />}
```

(Outras seções do site permanecem agnósticas a PF/PJ — apenas Hero (CTAs) e este slot mudam por audience. AudienceToggle continua persistindo em `localStorage` via `useAudience`.)

**Novo: `components/sections/ComoFunciona.tsx`** — espelho visual de `ParaEscritorios`:
- Eyebrow: "Para você"
- Título: "Como funciona seu plano com a Hold"
- Subtítulo + body extraídos de `contextoprojeto/detalhes.txt` (seção CONSÓRCIO PARA CLIENTES + COMO FUNCIONA O PROCESSO)
- "O que você ganha com a Hold" (substitui "Diferenciais da operação"): 6-8 itens — `Sem juros`, `Atendimento consultivo`, `Estratégia de contemplação personalizada`, `Acompanhamento integral`, `Transparência em todas as etapas`, `Parcerias com administradoras autorizadas pelo Banco Central`, `Adequação ao seu objetivo e momento`, `Suporte pós-venda contínuo`.
- Timeline com 4 marcadores (vs 5 do PJ):
  1. **Diagnóstico e planejamento**
  2. **Estratégia de contemplação**
  3. **Utilização do crédito**
  4. **Acompanhamento completo**
- Badge final: `ShieldCheck` "Operação regulamentada pelo Banco Central"
- CTA: WhatsApp com mensagem PF.

---

## 7. Premium motion no flow de etapas

Aplicado a **ambos** `ParaEscritorios` (5 steps) e `ComoFunciona` (4 steps):

**Linha conectora (desktop):** scroll-linked. Substitui o gradient hairline estático por um SVG `<path>` cujo `pathLength` é animado via Framer `useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] })` + `useTransform(scrollYProgress, [0, 1], [0, 1])`.

**Marcador numerado:**
- Entry: `whileInView`, stagger `0.12s`, spring `damping: 18, stiffness: 220`
- Scale 0.6 → 1
- Glow ring: pseudo-elemento `box-shadow: 0 0 24px var(--gold)` que pulsa 1× ao entrar (`@keyframes pulse-once 0.9s`)

**Texto do step:**
- Entry: fade-up `y: 14 → 0`, opacity `0 → 1`, com leve blur-out → blur-in (`filter: blur(6px) → blur(0)`, 0.6s, `EASE_OUT_EXPO`)

**Performance:** todas as animações via `transform` + `opacity` + `filter`; respeitar `prefers-reduced-motion` (desliga blur e pulses).

---

## 8. Depoimentos (`components/sections/Depoimentos.tsx`) — reviews reais

**Eyebrow:** "Pessoas que confiaram em nós" (substitui o atual via `messages/pt.json`).

**Selo Google** ao lado direito do título (linha do header):
- Badge inline: ícone G colorido (4 cores oficiais Google: azul/vermelho/amarelo/verde) + "**4,9 ★** · 39 avaliações no Google"
- Link `<a>` aberto em nova aba para o perfil real Google Business da HOLD em Uberlândia
- Componente novo: `components/icons/GoogleGIcon.tsx`

**Cards (8 reviews curados das 30+ enviadas):**
1. Tatiane Mendes Borges Dias
2. Igor Tavares
3. Andreia Milaine Siqueira
4. Eduardo Shuiti Aoyagui Oda
5. Flavia Guimarães
6. Tiago Dias
7. Cristhian José
8. Ana Paula Oliveira
9. Ana Cordeiro (alternativa/9º)

Para cada card:
- 5 estrelas (todos são 5★)
- Pull-quote: texto integral (sem cortes) — apenas remover quebras de linha com elipses do Google ("Mais") quando presentes
- Nome: real (capitalização preservada)
- Linha-role: **"Google review"** com mini-ícone G ao lado (não inventar profissão)

**Estrutura geral do carousel mantém:** Embla, prev/next inline com header.

---

## 9. Nova seção `<Parceiros>` com `<LogoLoop>`

**Localização:** entre `<SolucoesGrid>` e `<SobreNos>`.

**`components/sections/Parceiros.tsx`:**
- Eyebrow: "Parceiros"
- Título: "Operamos com administradoras e seguradoras de referência"
- Subtítulo: 1 linha curta de contexto.
- `<LogoLoop>` (port React Bits, JS+Tailwind):
  - 7 logos de `/images/logosEmpresasParceiras/`: HDI, MAG, MAPFRE, SulAmérica, Tokio, Unimed, Bradesco.
  - Props: `speed={60}`, `direction="left"`, `logoHeight={44}`, `gap={56}`, `scaleOnHover`, `fadeOut`, `fadeOutColor="#0b1f3a"` (matching seção bg).
  - `ariaLabel="Parceiros administradoras e seguradoras"`.
- Bg da seção: `#0b1f3a` (alterna com vizinhas).

---

## 10. Footer (`components/layout/Footer.tsx`) — Lojacorr

Adicionar bloco "Membro Lojacorr" no footer, visível em todas as páginas:
- Texto: "Membro" + logo Lojacorr + "Maior rede de corretoras do Brasil"
- Asset: priorizar **SVG**; fallback PNG se SVG não disponível. Path proposto: `/images/lojacorr/lojacorr.svg` (ou `.png`).
- Posição: linha inferior do Footer, alinhado à direita ou abaixo do bloco de contato — definir com base no Footer atual ao implementar.

> ⚠️ Asset Lojacorr ainda não existe no repo — será coletado/criado durante a implementação. Marcar como dependência externa no plano.

---

## 11. Componentes React Bits a portar

Adicionar em `components/motion/` (3 novos):
- `RotatingText.tsx` — port literal do source fornecido (JS, dep `motion`)
- `CurvedLoop.tsx` — port literal (JS, sem dep extra)
- `LogoLoop.tsx` — port literal (JS, sem dep extra)

Todos como `'use client'`. Tipar com TypeScript leve (`Props` mínimas) para integrar com o restante do código tipado.

---

## 12. i18n — strings novas em `messages/pt.json` e `messages/en.json`

Adicionar/atualizar chaves:
- `hero.rotation.frentes` (array): `["Consórcio","Seguros","Saúde","Investimentos"]`
- `hero.rotation.valores` (array): `["inteligência","confiança","estratégia","clareza","método","visão","propósito"]`
- `hero.middle`: `"com"` / `"with"`
- `hero.subtitle`: nova versão broader
- `divider.values` (array): `["SEGURANÇA","PLANEJAMENTO","ACOMPANHAMENTO","RESULTADOS"]` — strings do CurvedLoop entre Hero e Soluções
- `solutions.eyebrow`, `solutions.title`, `solutions.subtitle` — mantém
- `comoFunciona.*` — bloco novo (eyebrow, title, subtitle, body, ganhos[], steps[1..4].title/desc, badge, cta)
- `partners.*` — **mantém intacto** (continua sendo das chaves de `ParaEscritorios.tsx`).
- `partnersLogos.*` — bloco novo da seção `<Parceiros>` (eyebrow, title, subtitle).
- `testimonials.eyebrow`: "Pessoas que confiaram em nós"
- `testimonials.googleBadge`: "4,9 ★ · 39 avaliações no Google"
- `about.stat.frentes`: "Frentes integradas: consórcio, seguros, saúde, investimentos"

---

## 13. Conteúdo placeholder

Onde não houver fonte oficial em `contextoprojeto/detalhes.txt` ou input direto do cliente, usar **lorem ipsum em itálico** com cor desbotada (`text-white/40 italic`) para sinalizar visualmente que é placeholder. Nunca inventar promessa comercial. Aplica a sub-rotas `/seguros/`, `/saude/`, `/investimentos/`, `/equipe/` quando faltar texto.

---

## 14. Resumo de arquivos

**Novos:**
- `components/motion/RotatingText.tsx`
- `components/motion/CurvedLoop.tsx`
- `components/motion/LogoLoop.tsx`
- `components/icons/sectors/ConsorcioIcon.tsx`
- `components/icons/sectors/SegurosIcon.tsx`
- `components/icons/sectors/SaudeIcon.tsx`
- `components/icons/sectors/InvestimentosIcon.tsx`
- `components/icons/GoogleGIcon.tsx`
- `components/sections/ComoFunciona.tsx`
- `components/sections/Parceiros.tsx`

**Modificados:**
- `app/page.tsx`
- `components/sections/HomeHero.tsx`
- `components/sections/SolucoesGrid.tsx`
- `components/sections/SobreNos.tsx`
- `components/sections/ParaEscritorios.tsx`
- `components/sections/Depoimentos.tsx`
- `components/layout/CardNav.tsx`
- `components/layout/Footer.tsx`
- `messages/pt.json`
- `messages/en.json`

**Deletado:** nada (avatar continua em `public/personagem/`, agora consumido pelo Hero).

---

## 15. Estratégia de testes (Vitest existing)

- Atualizar testes existentes que dependem do conteúdo antigo: `Hero.test.tsx`, `HomeHero.test.tsx`, `SobreNos.test.tsx`, `SolucoesGrid.test.tsx`.
- Novos testes:
  - `ComoFunciona.test.tsx` — renderiza eyebrow/título/4 steps; CTA WhatsApp formatado para PF.
  - `Parceiros.test.tsx` — renderiza N logos esperados.
  - `Depoimentos.test.tsx` — renderiza ≥6 reviews reais; selo Google presente; link aponta para Google Business.
  - `RotatingText.test.tsx` — sanity test (renderiza primeiro item; respeita `auto={false}`).
- `app/page.test.tsx` (se existir) — assert PF renderiza `<ComoFunciona>`, PJ renderiza `<ParaEscritorios>`.

---

## 16. Critérios de aceite

- [ ] Hero exibe duas rotações sincronizadas, todas em vermelho, com restante branco.
- [ ] Subtítulo do Hero não menciona apenas consórcio.
- [ ] `jacimar-avatar-3d.png` aparece à direita no Hero (desktop) e abaixo (mobile); removido do SolucoesGrid.
- [ ] Divisor curvo entre Hero e Soluções com 4 valores.
- [ ] Soluções: layout 1+3 com Consórcio destacado; ícones substituídos pelos SVGs custom.
- [ ] CardNav "Suporte" com texto branco.
- [ ] Sobre Nós com 3 stats (+19/+60/+4).
- [ ] Para Escritórios visível só em PJ; ComoFunciona visível em PF.
- [ ] Steps (PJ e PF) com motion premium (linha conectora animada por scroll, marcadores spring, texto blur-in).
- [ ] Depoimentos com reviews reais, selo Google 4,9 e eyebrow "Pessoas que confiaram em nós".
- [ ] Seção Parceiros com LogoLoop das 7 logos.
- [ ] Footer com "Membro Lojacorr" em todas as páginas.
- [ ] Build passa (`npm run build`); testes passam (`npm test`).
- [ ] Conformidade `prefers-reduced-motion` (motions críticos desabilitam).

---

## 17. Não-objetivos (out of scope)

- Redesenhar sub-rotas `/seguros/`, `/saude/`, `/investimentos/`, `/consorcios/`, `/equipe/` além do necessário para integrar Footer e CardNav.
- Internacionalização para idiomas além de PT/EN (ambos já existem).
- Mudanças no `AudienceToggle` em si — apenas consumir o estado atual.
- Substituição da paleta ou tipografia.
- Animação 3D ou WebGL.

---

## 18. Riscos & mitigações

| Risco | Mitigação |
|---|---|
| Hidratação da audience causar flicker no swap PF/PJ | Renderizar PF como default até `hydrated === true`; usar `min-h` igual em ambas seções |
| `<RotatingText>` controlado pelos 2 sincronizados gerar bug de índice | Lift state ao parent Hero; passar `currentIndex` por props; não usar `auto` |
| LogoLoop com poucos logos (7) ficar com gaps em telas largas | `MIN_COPIES` interno do componente já cobre; testar em 1920px |
| Asset Lojacorr não disponível em SVG | Aceitar PNG; documentar troca quando SVG chegar |
| Motion premium impactar perf em mobile | Respeitar `prefers-reduced-motion`; testar Lighthouse mobile ≥90 |
| Reviews do Google podem ter strings com `…Mais` truncado | Limpar manualmente no JSON antes de injetar |
