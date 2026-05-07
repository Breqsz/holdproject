# Navbar Redesign — Barra Executiva Dark

**Data:** 2026-05-07  
**Status:** Aprovado

## Contexto

Substituição do `CardNav.tsx` (card branco expansível) por uma barra executiva dark premium, próxima ao estilo de corretoras/fintechs premium (referência: consorce.com) com identidade visual Hold.

## Estrutura da Navbar

### Desktop (≥768px)

```
[64px height | bg: #07162a]
Logo SVG | Home · Soluções▾ · Sobre · Contato | [PT/EN] [Fale com um especialista →]
─────────────────── border gold (ativa no scroll) ────────────────────
```

**Logo:** `logo-02.svg` embeddado inline, viewBox `"140 250 1650 510"`. Paths `.st2` → `rgba(255,255,255,.93)`. `.st0` (compass) mantém `#ae251c`. `.st1` (strokes decorativos) → transparent.

**Links de navegação:**
- Home → `#home`
- Soluções ▾ → dropdown (ver abaixo)
- Sobre → `#sobre-nos`
- Contato → `#contato`

**Dropdown "Soluções"** (abre no clique — desktop e mobile):
- 560px de largura, `bg: #0b1f3a`, `border: 1px solid rgba(201,168,76,.14)`, `border-radius: 16px`
- Grid 2×2 com: Planos de Saúde, Seguros, Consórcios, Soluções Financeiras
- Cada item: ícone gold (34×34px) + nome + descrição de uma linha
- Footer: "Atuação independente e integrada" + link "Ver todas →"
- Animação: `translateY(-10px→0)` + `opacity(0→1)`, `210ms`, `cubic-bezier(.32,.72,0,1)`

**Scroll state:**
- Ao passar 80px: `border-bottom: 1px solid rgba(201,168,76,.28)` + `box-shadow: 0 8px 36px rgba(0,0,0,.42)`

**PT/EN toggle:**
- `bg: rgba(255,255,255,.05)`, border `rgba(255,255,255,.08)`, border-radius 8px
- Botão ativo: `bg: rgba(255,255,255,.1)`, cor branca; inativo: `rgba(255,255,255,.3)`

**CTA:**
- "Fale com um especialista" + arrow em box interno (button-in-button)
- `bg: #ae251c`, `border-radius: 10px`, `box-shadow: 0 3px 14px rgba(174,37,28,.35)`
- Hover: opacity .9 + `translateY(-1px)` + shadow reforçada

### Mobile (<768px)

- Hamburguer (2 linhas) na direita da barra
- Ao abrir: overlay fullscreen `bg: #07162a`
- Linhas morpham em X (rotate 45/-45)
- Links staggerados (framer-motion spring): Home / Soluções / Sobre / Contato + número à direita (01–04)
- Footer do overlay: CTA vermelho full-width + PT/EN toggle
- Animação de entrada: `opacity: 0→1` + `translateY(32→0)` com delay `i * 0.06s`

## Conteúdo i18n

Novos keys necessários (ou reutilizar/renomear os existentes):

| Key | PT | EN |
|-----|----|----|
| `nav.home` | Home | Home |
| `nav.solucoes` | Soluções | Solutions |
| `nav.sobre` | Sobre | About |
| `nav.contato` | Contato | Contact |
| `nav.cta` | Fale com um especialista | Talk to a specialist |
| `nav.dd.saude` | Planos de Saúde | Health Plans |
| `nav.dd.seguros` | Seguros | Insurance |
| `nav.dd.consorcios` | Consórcios | Consortiums |
| `nav.dd.financeiro` | Soluções Financeiras | Financial Solutions |
| `nav.dd.footer` | Atuação independente e integrada | Independent and integrated |
| `nav.dd.ver_todas` | Ver todas | See all |

## Arquitetura de implementação

- **Arquivo a modificar:** `components/layout/CardNav.tsx` — reescrever completamente
- **Arquivo a remover (ou manter como legado):** `components/layout/Navbar.tsx` — deixar mas não usar
- **Sem mudanças em:** `app/layout.tsx` (import permanece `CardNav`)
- **Framer Motion:** manter para entrada da nav e stagger do mobile overlay
- **i18n:** usar `useLocale()` existente

## Decisões de design

- Gold NUNCA dominante — apenas como sinal funcional (border scroll, dot hover, icon bg, footer link)
- Navy `#07162a` sempre visível, sem transparência — autoridade constante
- Todas as transições usam `cubic-bezier(.32,.72,0,1)` — nunca `linear` ou `ease-in-out`
- Animações apenas em `transform` e `opacity` — nunca `width`, `height`, `top`, `left`
- `backdrop-blur` apenas no overlay mobile — nunca em containers scrolláveis

## Fora de escopo

- Redesign do restante das páginas
- Mudanças no Footer
- Alterações nas rotas
