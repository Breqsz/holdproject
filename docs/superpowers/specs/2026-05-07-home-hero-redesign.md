# Home Hero Redesign

**Date:** 2026-05-07
**Component:** `components/sections/HomeHero.tsx`
**Status:** Approved

## Summary

Replace the current `HomeHero` (centered copy + AudienceToggle + rotating text + full-bleed photo) with a premium editorial-split hero. The home page positions HOLD as an integrated ecosystem, not a vertical-specific product. No audience toggle, no stats (those appear further down the page).

## Layout

Desktop: asymmetric two-column grid (`1.1fr 1fr`), full viewport height (`min-h-[100dvh]`).
Mobile: single-column stack — copy on top, photo below in `aspect-[4/3]`.

## Left column — copy

Vertical stack with `justify-content: center`, generous padding (`pl-16 pr-10` desktop, `px-6` mobile).

| Element | Spec |
|---|---|
| Eyebrow | `ECOSSISTEMA HOLD` · `text-[10px] tracking-[0.22em] uppercase font-semibold` · color `#ae251c` · preceded by a 16px gradient line `from-[#ae251c]/80 to-transparent` |
| H1 line 1 | `"Um ecossistema."` · `text-white` |
| H1 line 2 | `"Quatro frentes."` · `text-white` |
| H1 line 3 | `"Uma estratégia para proteger, planejar e expandir patrimônios."` · `text-white/42` · smaller (`text-[1.3rem]` desktop) · `font-medium` |
| H1 scale | `clamp(2.4rem, 5.2vw, 3.8rem)` for lines 1–2, `clamp(1.1rem, 2.2vw, 1.45rem)` for line 3 |
| H1 weight | `font-extrabold` (800) for lines 1–2, `font-medium` (500) for line 3 |
| H1 tracking | `tracking-[-0.035em]` lines 1–2 |
| Body | Subtitle from i18n key `hero.subtitle` · `text-white/38 text-[0.95rem] leading-[1.75]` · `max-w-[46ch]` |
| Services row | 4 items inline · each: `4px circle` (color-coded) + label · separated by `1px solid rgba(255,255,255,0.07)` vertical rules |
| Service colors | Saúde `#22c55e` · Seguros `#3b82f6` · Consórcios `#a855f7` · Soluções Financeiras `#c9a84c` |
| CTA primary | `"Fale com um especialista"` · red pill `bg-[#ae251c]` · button-in-button: `→` inside `w-[26px] h-[26px] rounded-full bg-black/20` · magnetic hover (reuse `MagneticCTA` from existing codebase) |
| CTA secondary | `"Conheça nossas soluções"` · ghost pill `border border-white/10 bg-white/[0.03]` · `text-white/60` · hover `border-white/22 text-white/85` |
| No stats | Stats (+19, +60, 4 frentes) intentionally omitted — they appear in a section below |
| No AudienceToggle | Home sells the ecosystem; toggle lives only on internal service pages |

## Right column — photo

Double-Bezel frame occupying the full column height with `p-3` inset from section edges.

**Outer shell:**
```
rounded-[18px]
border border-white/[0.08]
bg-white/[0.025]
p-[5px]
box-shadow: 0 0 40px rgba(174,37,28,0.06)  /* red glow accent */
```

**Inner core:**
```
rounded-[14px]  /* = 18px - 4px, concentric curve */
overflow-hidden
box-shadow: inset 0 1px 0 rgba(255,255,255,0.07)
```

**Photo content:**
- Source: `public/images/hero/family-hero.webp` (existing) until a dedicated high-res image is sourced
- `object-cover object-center` — fills the frame
- Next.js `<Image>` with `fill`, `priority`, `quality={90}`, `sizes="(max-width:1024px) 100vw, 50vw"`
- Overlay: `linear-gradient(160deg, rgba(6,15,30,0.42), rgba(10,24,48,0.15) 50%, rgba(6,15,30,0.50))`
- Left fade: `linear-gradient(to right, #060f1e 0%, rgba(6,15,30,0.55) 28%, transparent 58%)` — dissolves photo into background

**Red corner accent:**
Pseudo-element `::after` on the outer shell — `radial-gradient(circle, rgba(174,37,28,0.22), transparent 70%)` positioned `bottom-[-20px] right-[-20px]` — not a stripe, a glow.

## Background

```css
background: linear-gradient(125deg, #040d1a 0%, #071528 45%, #0a1c36 100%)
```

Three blur orbs (`pointer-events-none`, `aria-hidden`):
- `#1a3f7a` · 480px · top-right · `opacity-[.20]` · `blur-[110px]`
- `#ae251c` · 240px · bottom-left · `opacity-[.07]` · `blur-[90px]`
- `#2a5ca0` · 280px · mid-right · `opacity-[.12]` · `blur-[80px]`

Dot-grid overlay: `radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)` at `24px 24px`, `opacity-[0.06]`.

## Animations

Reuse existing patterns from the codebase:

| Element | Animation |
|---|---|
| All copy elements | `containerVariants` stagger + `itemVariants` (already defined in project) |
| Easing | `[0.16, 1, 0.3, 1]` (`EASE_OUT_EXPO`) — existing constant |
| CTA primary | `MagneticCTA` component — already in `HomeHero.tsx` |
| CTA secondary hover | `transition-colors duration-300` |
| Photo frame entry | `motion.div` fade-in `opacity: 0 → 1` + slight `x: 20 → 0`, delay 0.3s |

## i18n keys

New or updated keys in `messages/pt.json` and `messages/en.json`:

| Key | PT value |
|---|---|
| `hero.eyebrow` | `Ecossistema HOLD` *(update existing)* |
| `hero.title.line1` | `Um ecossistema.` |
| `hero.title.line2` | `Quatro frentes.` |
| `hero.title.line3` | `Uma estratégia para proteger, planejar e expandir patrimônios.` |
| `hero.subtitle` | `Soluções em saúde, seguros, consórcios e finanças integradas para proteger e evoluir o patrimônio de pessoas e empresas com visão estratégica.` |
| `hero.cta.specialist` | `Fale com um especialista` |
| `hero.cta.solutions` | `Conheça nossas soluções` |
| `hero.service.saude` | `Saúde` |
| `hero.service.seguros` | `Seguros` |
| `hero.service.consorcios` | `Consórcios` |
| `hero.service.financas` | `Soluções Financeiras` |

## File changes

| File | Action |
|---|---|
| `components/sections/HomeHero.tsx` | Full rewrite — new design |
| `components/sections/HomeHero.test.tsx` | Update tests to match new structure |
| `messages/pt.json` | Add/update hero keys |
| `messages/en.json` | Add/update hero keys (EN copy) |
| `app/page.tsx` | No changes needed — already imports `HomeHero` |

## Out of scope

- AudienceToggle on home (intentional removal)
- Stats in hero (stats stay in their dedicated section below)
- Character/boneco 3D (removed from home hero)
- Replacing the existing `Hero.tsx` component (separate component, untouched)
