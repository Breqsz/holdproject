# Saúde — Modalidades (Cinematic Image-led Redesign)

**Status:** approved, ready to implement
**Date:** 2026-05-18
**Owner:** capitaoxd97@gmail.com

## Context & motivation

A seção `SaudeModalidades` foi redesenhada uma primeira vez (cards-linha + painel institucional lateral) e o usuário pediu propostas alternativas. Após brainstorming de 4 direções, a direção escolhida foi **Cinematic Image-led Reveal**: lista compacta à esquerda + card de imagem premium à direita que troca conforme a modalidade selecionada.

Checkpoint do estado anterior: commit `ce977762fc0e09bff7703876bc4c4c4a2d7be9bc` (memória `project_checkpoint_pre_modalidades_redesign.md`).

## Goals

- Preencher o vazio à direita com uma área de imagem dominante (65% da largura).
- Sensação cinematográfica/editorial sem perder sobriedade institucional.
- Preservar o conteúdo (`short` e `long` text + WhatsApp CTA específico por modalidade).
- Hover-led no desktop, tap-led no mobile, com auto-rotação opcional quando idle.

## Non-goals

- Não substituir as fotos dos personagens 3D no resto do site.
- Não alterar a home, hero do saúde, ou outras seções.
- Não adicionar novas dependências (Radix Dialog já está no projeto).

## Design

### Layout

**Desktop (≥1024px):**
- Header full-width (eyebrow + h2 + intro), igual hoje.
- Grid 2-col abaixo: `minmax(0, 35fr) / minmax(0, 65fr)`, gap 14.
- Card de imagem à direita usa `lg:sticky lg:top-32` para acompanhar scroll.

**Mobile (<1024px):**
- Lista vira `flex overflow-x-auto` de chips compactos (snap-x).
- Card de imagem abaixo, full-width 4:5.
- Sem sticky.

### Lista esquerda (tab selector)

Cada item renderiza:
```
[dot] 01  ─  Individual e Familiar
```

- **Dot:** `h-1.5 w-1.5 rounded-full`. Ativo: `bg-[#ae251c]` + `ring-4 ring-[#ae251c]/15 scale-110`.
- **Seq:** `tabular text-xs font-semibold tracking-[0.18em]`. Ativo: `text-[#ae251c]`, inativo: `text-white/35`.
- **Título:** `text-[15px] font-medium`. Ativo: `text-white`, inativo: `text-white/65`.
- **Barra vertical:** 2px à esquerda, vermelha, `scale-y` de 0→1 no estado ativo.
- Hover: idem ativo (preview behavior).

Padding por item: `py-3.5 px-4`. Border-bottom `white/8` entre itens.

**Aria:** `role="tablist"` no container, `role="tab"` + `aria-selected` + `aria-controls="saude-card"` por item.

### Card direito (image stage)

- `aspect-[4/5]` (portrait editorial).
- `rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]`.
- `role="tabpanel"` + `id="saude-card"` + `aria-live="polite"`.

Estrutura interna (z-stack):
1. `<Image fill>` da modalidade ativa, `object-cover`.
2. Gradient overlay no rodapé: `bg-gradient-to-t from-[#0b1f3a] via-[#0b1f3a]/85 to-transparent`, ~55% altura.
3. Bloco de texto sobre o overlay (bottom-left, `p-7 md:p-9`):
   - `01 ──` (seq tabular vermelho + traço fino)
   - Título grande (`text-2xl md:text-3xl font-semibold text-white`)
   - Short text (`text-[14px] text-white/80 max-w-[42ch] mt-3`)
   - Pílula CTA WhatsApp (`bg-[#25D366] hover:bg-[#1ebe5d]`) + botão secundário "Ver detalhes" (`bg-white/10 ring-1 ring-white/20`) que abre o modal

### Transição entre modalidades

- Cross-fade via `<AnimatePresence mode="wait">` com `<motion.div key={activeId}>` envolvendo a imagem.
- `initial: { opacity: 0, scale: 1.04 }`, `animate: { opacity: 1, scale: 1 }`, `exit: { opacity: 0 }`.
- Duração: 0.55s, ease `[0.16, 1, 0.3, 1]`.
- Texto (bloco com título/short/CTAs) cross-fade na mesma key, sem scale.

### Auto-rotação

- `setInterval(5000ms)` quando `hoveredId === null`.
- `clearInterval` quando hover entra na lista; reset ao sair.
- Respeita `useReducedMotion()`: desabilita auto-rotação se true.
- Não rotaciona enquanto o modal está aberto.

### Modal (long text)

- Implementação: `@radix-ui/react-dialog` (já no projeto).
- Trigger: botão "Ver detalhes" no card de imagem.
- Conteúdo: `Dialog.Content` com:
  - Header: imagem hero da modalidade (aspect 16:9, top do modal)
  - Título `text-2xl font-semibold`
  - Long text `text-[15px] leading-relaxed text-[#9ab2cc] max-w-[60ch]`
  - CTA WhatsApp pílula verde
  - Close button (top-right, `X` icon)
- Visual: `bg-[#07162a] ring-1 ring-white/10 rounded-2xl max-w-2xl`, overlay backdrop `bg-black/60 backdrop-blur-sm`.
- Animação: fade + scale leve (Radix data attrs com Tailwind).

### Data updates

`MODALIDADES[i].image.src`:
- 01 Individual: `/images/personas/pessoa-fisica.webp` (mantém)
- 02 Adesão: `https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80` (profissionais em encontro/aperto de mão)
- 03 Empresarial: `/images/personas/empresa.webp` (mantém)
- 04 Odonto: `https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80` (consultório odontológico moderno)

Campo `image.fit` deixa de ser usado (todas vão `object-cover`); remover para limpar a interface.

### next.config.mjs

Adicionar:
```js
images: {
  ...
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
}
```

### Arquivos afetados

- `next.config.mjs` — adicionar remotePatterns
- `components/sections/saude/SaudeModalidades.tsx` — reescrita (~250 linhas estimadas)
- `components/sections/saude/SaudeModalidades.test.tsx` — atualizar asserções (tab pattern + modal trigger)
- `components/sections/saude/SaudeModalidadesSidePanel.tsx` — **deletar**
- `components/sections/saude/SaudeModalidadesSidePanel.test.tsx` — **deletar**

## Testing

Manter cobertura equivalente; novos casos:
- Renderiza heading + 4 tabs (cada uma com `role="tab"`)
- Tab 01 começa com `aria-selected="true"` (default selection)
- Clicar uma tab muda `aria-selected` (sem disparar modal)
- Botão "Ver detalhes" abre dialog com o long text correspondente
- WhatsApp CTA dentro do card aponta para o link correto
- Auto-rotação não é testada (lógica de timer fora do escopo de testes unitários)

## Risks & open questions

- **Unsplash hotlinking**: ok para staging/dev, mas em produção convém baixar e servir self-hosted. Não bloqueia este merge.
- **Layout shift no auto-rotate**: as imagens têm aspect fixo no card, então não há CLS. ✓
- **Mobile horizontal scroll**: precisa testar em telas pequenas; se ficar ruim, fallback é stack vertical de chips em 2 colunas.

## Rollback

`git reset --hard ce977762` devolve o estado antes do redesign (cards-linha + sidepanel).
