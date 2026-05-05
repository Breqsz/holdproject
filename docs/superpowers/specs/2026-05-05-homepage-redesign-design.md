# Homepage Redesign — Design Spec
**Date:** 2026-05-05  
**Status:** Approved  
**Scope:** `HomeHero.tsx` + global section backgrounds + `page.tsx` layout wrapper

---

## 1. Direction

**Option C — Dark Refinado (evoluído):** The hero stays in the existing dark navy (`#07162a`) but gains a rounded image card (Halo-style). All sections below the hero switch to `#F5F5F5`. Dark sections (SobreNos, Contato) remain dark. The CardNav is untouched.

---

## 2. What Changes

### 2a. HomeHero — complete rework

**Outer shell:** `background: #07162a`, position relative, keeps atmosphere orbs (blue + red blurs).

**CardNav:** unchanged — `CardNav.tsx` renders above the hero card as-is.

**Hero card:**
- `margin: 0 10px`, `border-radius: 16px`, `overflow: hidden`, `height: calc(100vh - 96px)`
- Two stacked `<Image>` elements (Next.js), both `object-fit: cover`, `object-position: center top`
  - `persona_hero.jpg` — visible when `audience === 'pf'`
  - `office_hero.avif` — visible when `audience === 'pj'`
  - Swap via `opacity` transition (`transition: opacity 650ms ease`) so crossfade is smooth
- Dark gradient overlay: `linear-gradient(to top, rgba(7,22,42,.95) 0%, rgba(7,22,42,.55) 38%, rgba(7,22,42,.18) 100%)`

**Content inside card** (absolute, bottom-anchored, `padding: 22px 24px`):
1. **AudienceToggle** — moved inside the card. New `variant="hero"` styling:
   - Wrapper: `background: rgba(255,255,255,.07)`, `backdrop-filter: blur(8px)`, `border-radius: 100px`
   - Active pill: `background: #ae251c` (red, unchanged)
   - Inactive label: `rgba(255,255,255,.4)`
2. **Rotating headline** (existing `RotatingText` component, unchanged logic):
   - Line 1 (FRENTES): `color: #ae251c`, `font-size: clamp(2rem,5.5vw,3rem)`, `letter-spacing: -0.045em`, `overflow: hidden`
   - Line 2 "com": `color: #fff`, same size
   - Line 3 (VALORES + "."): `color: #ae251c` + `color: #fff` for the dot
   - Single shared `rotationIndex` drives both (unchanged)
3. **Subtitle** `<p>`: `color: rgba(255,255,255,.42)`, `font-size: ~11px / text-base`, `max-width: 280px`
   - PF copy: "Proteção inteligente para o que mais importa na sua vida e família."
   - PJ copy: "Soluções corporativas de proteção e crescimento patrimonial para o seu negócio."
4. **CTA row**: unchanged — MagneticCTA (WhatsApp, red pill) + secondary ghost pill "Conhecer soluções" / "Para escritórios"

**Marquee strip** (below card, inside dark outer):
- Keep existing `CurvedLoop` component with unchanged props — no modifications.
- Background wrapper: `#07162a`, `border-top: 1px solid rgba(255,255,255,.05)`, `padding: 8px 0 10px`

### 2b. Page-level section backgrounds

| Section | Current bg | New bg |
|---|---|---|
| `CurvedLoop` divider | `#07162a` | `#07162a` — unchanged |
| `SolucoesGrid` | dark navy | `#F5F5F5` |
| `Parceiros` | dark navy | `#F5F5F5` |
| `SobreNos` | dark navy | `#07162a` — unchanged (dark) |
| `ComoFunciona` / `ParaEscritorios` | dark navy | `#F5F5F5` |
| `Depoimentos` | dark navy | `#F5F5F5` |
| `FAQ` | dark navy | `#F5F5F5` |
| `Contato` | dark navy | `#07162a` — unchanged (dark, per component) |

Text colors inside each section must be updated to match the new background (dark text on light, existing light text on dark sections).

### 2c. AudienceToggle — new `variant="hero"`

Add a `hero` variant to `AudienceToggle.tsx`:
- Wrapper: `bg-[rgba(255,255,255,0.07)] ring-1 ring-white/10 backdrop-blur-sm`
- Inactive text: `text-white/40 hover:text-white/70`
- Active pill: stays `bg-[#ae251c]` (same as `dark` variant)

---

## 3. What Does NOT Change

- `CardNav.tsx` — zero modifications
- All section content, copy, logic, animations (Framer Motion, GSAP, RotatingText, count-up)
- `AudienceToggle` audience context, `useAudience` hook, `showPJ` logic in `page.tsx`
- `CurvedLoop` marquee text and animation
- WhatsApp CTA logic, `MagneticCTA` spring physics
- Font stack (Gellix + Outfit)
- Footer
- All section internal layouts (SolucoesGrid card gradients preserved, etc.)

---

## 4. Files Touched

| File | Change |
|---|---|
| `components/sections/HomeHero.tsx` | Full rework — hero card, image swap, toggle inside card |
| `components/AudienceToggle.tsx` | Add `hero` variant |
| `components/sections/SolucoesGrid.tsx` | `bg` → `bg-[#F5F5F5]`, text colors to dark |
| `components/sections/Parceiros.tsx` | `bg` → `bg-[#F5F5F5]`, text colors to dark |
| `components/sections/ComoFunciona.tsx` | `bg` → `bg-[#F5F5F5]`, text colors to dark |
| `components/sections/ParaEscritorios.tsx` | `bg` → `bg-[#F5F5F5]`, text colors to dark |
| `components/sections/Depoimentos.tsx` | `bg` → `bg-[#F5F5F5]`, text colors to dark |
| `components/sections/FAQ.tsx` | `bg` → `bg-[#F5F5F5]`, text colors to dark |

---

## 5. Image Assets

| Audience | File | Usage |
|---|---|---|
| PF (Para você) | `public/images/hero/persona_hero.jpg` | Hero card background |
| PJ (Para sua empresa) | `public/images/hero/office_hero.avif` | Hero card background |

Both loaded as Next.js `<Image>` with `fill`, `priority`, `sizes="100vw"`.

---

## 6. Behaviour Contract

- Image crossfade fires whenever `audience` context value changes
- `rotationIndex` drives both `RotatingText` instances — no change to timing (3800ms)
- Toggle always visible inside the hero card (not gated by scroll or audience)
- `showPJ` in `page.tsx` still gates `ParaEscritorios` vs `ComoFunciona`
