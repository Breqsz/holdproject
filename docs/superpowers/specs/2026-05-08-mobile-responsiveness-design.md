# Mobile Responsiveness — Hero + TrustBar

**Data:** 2026-05-08
**Status:** Aprovado

## Contexto

Duas seções da homepage apresentam problemas graves em mobile:

1. **HomeHero** — a imagem de fundo fica fixada no canto direito (`objectPosition: '100% 0%'`), cobrindo o texto em telas estreitas. O container `max-w-[640px]` pode vazar do `px-6` em dispositivos muito pequenos.
2. **TrustBar** — os 5 itens ficam em `flex` horizontal sem nenhum breakpoint responsivo. Em 375px todos os itens se espremem em uma linha, tornando o texto ilegível.

## Abordagem escolhida

### Hero — Overlay gradiente (mobile)

Em telas menores que `md` (768px):
- Adicionar um `<div>` overlay com `bg-gradient-to-r from-white via-white/90 to-transparent` posicionado absolutamente sobre a imagem, cobrindo ~65% da largura da esquerda para a direita
- Mudar `objectPosition` para `center` no mobile (preserva `100% 0%` em `md+`)
- Limitar o container de texto a `max-w-[85%] sm:max-w-[640px]` para evitar vazamento em telas muito estreitas

Em `md+` nenhuma mudança — comportamento atual preservado.

### TrustBar — Scroll horizontal (mobile)

Em telas menores que `md`:
- Trocar o `flex` atual por `flex overflow-x-auto scroll-smooth` com `scroll-snap-type: x mandatory`
- Cada item: `flex-shrink-0 w-[72vw] scroll-snap-align: start` (largura fixa para garantir que ~1.2 itens fiquem visíveis, sugerindo scroll)
- Remover `border-r`, `pr-6`, `mr-6` dos itens no mobile (esses espaçamentos são para o layout desktop)
- Adicionar sombra fade à direita (`pointer-events-none absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#040d1a] to-transparent`) para indicar mais conteúdo
- Adicionar dots de posição abaixo do carrossel via `useState` + `useRef` + handler `onScroll` no React
- Esconder scrollbar nativa (`scrollbar-width: none` / `::-webkit-scrollbar { display: none }`)

Em `md+` nenhuma mudança — layout desktop preservado integralmente.

## Arquivos a modificar

| Arquivo | Mudança |
|---------|---------|
| `components/sections/HomeHero.tsx` | overlay div mobile + objectPosition responsivo + max-w do container |
| `components/sections/TrustBar.tsx` | wrapper scroll + itens com snap + sombra fade + dots |

## Verificação

1. Abrir no Chrome DevTools em 375px, 390px (iPhone 14), 414px
2. **Hero:** texto deve ser legível sobre a imagem; foto parcialmente visível à direita; CTA acessível
3. **TrustBar:** itens roláveis lateralmente; sombra à direita visível; dots atualizam com scroll
4. Em 768px+ ambas as seções devem ser indistinguíveis do estado atual
5. Testar scroll suave no mobile real (iOS Safari e Android Chrome) se possível
