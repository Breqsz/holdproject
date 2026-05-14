'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLocale } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const RED = '#ae251c'

const PRINCIPLE_KEYS = ['mission', 'vision', 'values'] as const

export default function EstrategiaManifesto() {
  const { t } = useLocale()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  const PRINCIPLES = PRINCIPLE_KEYS.map((k) => ({
    title: t(`manifesto.${k}.title`),
    body: t(`manifesto.${k}.body`),
  }))

  return (
    <div data-impeccable-variants="1ef14584" data-impeccable-variant-count="4" style={{ display: "contents" }}>
      {/* impeccable-variants-start 1ef14584 */}
      {/* Original */}
      <div data-impeccable-variant="original">
        <section
          ref={ref}
          id="estrategia"
          className="section-pad bg-[#0b1f3a] relative overflow-hidden"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {/* Subtle backdrop glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 20% 30%, rgba(122,154,184,0.08), transparent 55%)',
            }}
          />

          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
            {/* ── Movement 1 — Cinematic image with overlaid bracket text ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] lg:max-h-[640px]"
              style={{
                boxShadow:
                  '0 30px 80px -30px rgba(0,0,0,0.7), 0 12px 32px -16px rgba(0,0,0,0.5)',
                background: '#050f1f',
              }}
            >
              {/* Image */}
              <Image
                src="/images/estrategia.jpg"
                alt={t('manifesto.image.alt')}
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 1160px"
                className="object-cover"
                style={{ objectPosition: 'center 45%' }}
              />

              {/* Heavy left-side gradient — Consorce style */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(7,22,42,0.96) 0%, rgba(7,22,42,0.92) 28%, rgba(7,22,42,0.65) 50%, rgba(7,22,42,0.20) 75%, rgba(7,22,42,0.0) 100%)',
                }}
              />

              {/* Inner border highlight */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              />

              {/* Overlay text — free-flowing, no card */}
              <div className="absolute inset-0 flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
                  className="w-full max-w-[620px] px-5 sm:px-12 lg:px-16 lg:pl-20"
                >
                  {/* Headline — two-part editorial */}
                  <motion.h2
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.4, ease: EASE }}
                    className="text-balance"
                    style={{
                      fontSize: 'clamp(1.35rem, 3vw, 2.625rem)',
                      lineHeight: 1.15,
                      letterSpacing: '-0.022em',
                      fontWeight: 600,
                      color: '#ffffff',
                      textShadow: '0 2px 18px rgba(0,0,0,0.45)',
                    }}
                  >
                    {t('manifesto.headline.lead')}
                    <span
                      className="block mt-3"
                      style={{
                        fontWeight: 700,
                        color: RED,
                        fontSize: 'clamp(1.4rem, 3.2vw, 2.875rem)',
                        lineHeight: 1.12,
                        letterSpacing: '-0.018em',
                      }}
                    >
                      {t('manifesto.headline.italic')}
                    </span>
                  </motion.h2>

                  {/* Body — single paragraph */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.75, delay: 0.7, ease: EASE }}
                    className="mt-8 text-[13.5px] sm:text-[14.5px] leading-[1.65] max-w-[56ch]"
                    style={{
                      color: '#c8d2e0',
                      fontWeight: 400,
                      textShadow: '0 1px 12px rgba(0,0,0,0.55)',
                    }}
                  >
                    {t('manifesto.body.1.pre')}{' '}
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>
                      {t('manifesto.body.1.years')}
                    </span>{' '}
                    {t('manifesto.body.1.middle')}{' '}
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>
                      {t('manifesto.body.1.partners')}
                    </span>
                    {t('manifesto.body.1.suffix')}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Régua de transição ── */}
            <div className="text-center mt-12 sm:mt-20 lg:mt-24 mb-10 sm:mb-14 lg:mb-16">
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
                className="h-px max-w-[240px] mx-auto"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, var(--hairline-accent) 50%, transparent 100%)',
                }}
              />
            </div>

            {/* ── Movement 2 — MVV compact ── */}
            <div className="max-w-[1080px] mx-auto">
              <div className="flex items-center justify-center gap-3 mb-10">
                <motion.span
                  aria-hidden
                  className="block h-px w-5"
                  style={{ background: 'rgba(224,232,240,0.55)', transformOrigin: 'center' }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
                />
                <motion.span
                  className="text-[11px] font-semibold uppercase"
                  style={{ letterSpacing: '0.32em', color: '#7a9ab8' }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.45, delay: 1.15, ease: 'easeOut' }}
                >
                  {t('manifesto.principles.eyebrow')}
                </motion.span>
                <motion.span
                  aria-hidden
                  className="block h-px w-5"
                  style={{ background: 'rgba(224,232,240,0.55)', transformOrigin: 'center' }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
                />
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-3">
                <motion.span
                  aria-hidden
                  className="hidden md:block absolute top-0 bottom-0 w-px"
                  style={{ left: 'calc(100% / 3)', background: 'var(--hairline-accent)', transformOrigin: 'top' }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.85, delay: 1.05, ease: EASE }}
                />
                <motion.span
                  aria-hidden
                  className="hidden md:block absolute top-0 bottom-0 w-px"
                  style={{ left: 'calc(200% / 3)', background: 'var(--hairline-accent)', transformOrigin: 'top' }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.85, delay: 1.05, ease: EASE }}
                />
                {PRINCIPLES.map(({ title, body }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.55, delay: 1.4 + i * 0.08, ease: 'easeOut' }}
                    className={[
                      'flex flex-col gap-[14px] py-6 md:py-3 px-0 md:px-10',
                      i > 0 ? 'border-t md:border-t-0 pt-6 md:pt-3' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={
                      i > 0 ? { borderColor: 'rgba(122,154,184,0.16)' } : undefined
                    }
                  >
                    <h3
                      className="leading-none"
                      style={{
                        fontWeight: 700,
                        fontSize: 'clamp(1.625rem, 2.4vw, 2.125rem)',
                        letterSpacing: '-0.012em',
                        color: RED,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-[15px] leading-[1.55] text-[#d4dfeb]"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Variants: insert below this line */}
      <style data-impeccable-css="1ef14584">{`
        /* ── V1: Two-column — image left, content + MVV right ── */
        @scope ([data-impeccable-variant="1"]) {
          :scope > .v1-s {
            position: relative; background: var(--surface-base);
            font-family: var(--font-outfit);
            padding: calc(var(--p-density,1) * 5rem) 0;
            overflow: hidden;
          }
          :scope > .v1-s .v1-dot { position: absolute; inset: 0; pointer-events: none; }
          :scope > .v1-s .v1-wrap {
            position: relative; max-width: 1200px; margin: 0 auto;
            padding: 0 1.5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: calc(var(--p-density,1) * 3rem);
            align-items: start;
          }
          :scope[data-p-split="40/60"] > .v1-s .v1-wrap { grid-template-columns: 2fr 3fr; }
          :scope > .v1-s .v1-img {
            position: relative; border-radius: 1rem;
            overflow: hidden; aspect-ratio: 3/4;
            box-shadow: 0 30px 80px -30px rgba(0,0,0,.7);
          }
          :scope > .v1-s .v1-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 45%; }
          :scope > .v1-s .v1-img .v1-grad {
            position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(180deg, rgba(7,22,42,.2) 0%, rgba(7,22,42,.55) 100%);
          }
          :scope > .v1-s .v1-content { padding-top: calc(var(--p-density,1) * 2rem); }
          :scope > .v1-s .v1-h2 {
            font-size: clamp(1.25rem,2.6vw,2.25rem); line-height: 1.15;
            letter-spacing: -.022em; font-weight: 600; color: #fff;
            margin-bottom: calc(var(--p-density,1) * .5rem);
          }
          :scope > .v1-s .v1-h2 span { display: block; margin-top: .6rem; font-weight: 700; color: #ae251c; font-size: clamp(1.3rem,2.8vw,2.5rem); }
          :scope > .v1-s .v1-body { color: #c8d2e0; font-size: 14px; line-height: 1.65; max-width: 52ch; margin-top: calc(var(--p-density,1) * 1.5rem); }
          :scope > .v1-s .v1-body strong { color: #fff; font-weight: 600; }
          :scope > .v1-s .v1-rule { height: 1px; background: var(--hairline-accent); margin: calc(var(--p-density,1) * 2rem) 0; max-width: 200px; }
          :scope > .v1-s .v1-eyebrow { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .32em; color: #7a9ab8; margin-bottom: calc(var(--p-density,1) * 1.25rem); }
          :scope > .v1-s .v1-mvv { display: flex; flex-direction: column; gap: calc(var(--p-density,1) * 1.5rem); }
          :scope > .v1-s .v1-mvv-item h3 { font-size: clamp(1.25rem,2vw,1.75rem); font-weight: 700; letter-spacing: -.012em; color: #ae251c; margin-bottom: .5rem; line-height: 1; }
          :scope > .v1-s .v1-mvv-item p { font-size: 13.5px; line-height: 1.55; color: #d4dfeb; }
          @media (max-width: 768px) {
            :scope > .v1-s .v1-wrap { grid-template-columns: 1fr; }
            :scope > .v1-s .v1-img { aspect-ratio: 16/9; }
          }
        }

        /* ── V2: MVV first, cinematic image below ── */
        @scope ([data-impeccable-variant="2"]) {
          :scope > .v2-s {
            position: relative; background: var(--surface-base);
            font-family: var(--font-outfit);
            padding: calc(var(--p-density,1) * 5rem) 0; overflow: hidden;
          }
          :scope > .v2-s .v2-wrap { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
          :scope > .v2-s .v2-eyebrow { text-align: center; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .32em; color: #7a9ab8; margin-bottom: calc(var(--p-density,1) * 2.5rem); display: flex; align-items: center; justify-content: center; gap: .75rem; }
          :scope > .v2-s .v2-eyebrow span.line { display: block; height: 1px; width: 20px; background: rgba(224,232,240,.55); }
          :scope > .v2-s .v2-mvv {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 0; margin-bottom: calc(var(--p-density,1) * 3.5rem);
            border: 1px solid var(--hairline-accent); border-radius: 1rem; overflow: hidden;
          }
          :scope[data-p-mvv="expanded"] > .v2-s .v2-mvv { gap: calc(var(--p-density,1) * 2rem); border: none; border-radius: 0; overflow: visible; }
          :scope > .v2-s .v2-mvv-item { padding: calc(var(--p-density,1) * 2rem); }
          :scope > .v2-s .v2-mvv-item + .v2-mvv-item { border-left: 1px solid var(--hairline-accent); }
          :scope[data-p-mvv="expanded"] > .v2-s .v2-mvv-item + .v2-mvv-item { border-left: none; }
          :scope > .v2-s .v2-mvv-item h3 { font-size: clamp(1.5rem,2.2vw,2rem); font-weight: 700; letter-spacing: -.012em; color: #ae251c; margin-bottom: .75rem; line-height: 1; }
          :scope > .v2-s .v2-mvv-item p { font-size: 13.5px; line-height: 1.6; color: #d4dfeb; }
          :scope > .v2-s .v2-img { position: relative; border-radius: 1.25rem; overflow: hidden; aspect-ratio: 16/7; box-shadow: 0 30px 80px -30px rgba(0,0,0,.7); }
          :scope > .v2-s .v2-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 45%; }
          :scope > .v2-s .v2-img .v2-grad { position: absolute; inset: 0; background: linear-gradient(90deg,rgba(7,22,42,.92) 0%,rgba(7,22,42,.7) 30%,rgba(7,22,42,.15) 65%,transparent 100%); pointer-events: none; }
          :scope > .v2-s .v2-img .v2-text { position: absolute; top: 50%; left: 0; transform: translateY(-50%); padding: 2rem 3rem; max-width: 560px; }
          :scope > .v2-s .v2-img .v2-text h2 { font-size: clamp(1.25rem,2.6vw,2.2rem); font-weight: 600; line-height: 1.15; letter-spacing: -.022em; color: #fff; }
          :scope > .v2-s .v2-img .v2-text h2 span { display: block; margin-top: .5rem; font-weight: 700; color: #ae251c; }
          :scope > .v2-s .v2-img .v2-text p { font-size: 13.5px; line-height: 1.65; color: #c8d2e0; margin-top: 1.25rem; max-width: 50ch; }
          :scope > .v2-s .v2-img .v2-text strong { color: #fff; font-weight: 600; }
          @media (max-width: 768px) {
            :scope > .v2-s .v2-mvv { grid-template-columns: 1fr; }
            :scope > .v2-s .v2-mvv-item + .v2-mvv-item { border-left: none; border-top: 1px solid var(--hairline-accent); }
            :scope > .v2-s .v2-img { aspect-ratio: 4/3; }
            :scope > .v2-s .v2-img .v2-text { padding: 1.5rem; }
          }
        }

        /* ── V3: Headline left + image right, MVV full-width below ── */
        @scope ([data-impeccable-variant="3"]) {
          :scope > .v3-s {
            position: relative; background: var(--surface-base);
            font-family: var(--font-outfit);
            padding: calc(var(--p-density,1) * 5rem) 0; overflow: hidden;
          }
          :scope > .v3-s .v3-wrap { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
          :scope > .v3-s .v3-hero { display: grid; grid-template-columns: 3fr 2fr; gap: calc(var(--p-density,1) * 3rem); align-items: center; margin-bottom: calc(var(--p-density,1) * 4rem); }
          :scope[data-p-img-side="left"] > .v3-s .v3-hero { grid-template-columns: 2fr 3fr; direction: rtl; }
          :scope[data-p-img-side="left"] > .v3-s .v3-hero > * { direction: ltr; }
          :scope > .v3-s .v3-text {}
          :scope > .v3-s .v3-text h2 { font-size: clamp(1.5rem,3.5vw,3rem); font-weight: 600; line-height: 1.1; letter-spacing: -.028em; color: #fff; }
          :scope > .v3-s .v3-text h2 span { display: block; margin-top: .75rem; font-weight: 800; color: #ae251c; font-size: clamp(1.6rem,3.8vw,3.25rem); }
          :scope > .v3-s .v3-text p { font-size: 14px; line-height: 1.65; color: #c8d2e0; margin-top: calc(var(--p-density,1) * 1.5rem); max-width: 54ch; }
          :scope > .v3-s .v3-text strong { color: #fff; font-weight: 600; }
          :scope > .v3-s .v3-img { position: relative; border-radius: 1.25rem; overflow: hidden; aspect-ratio: 3/4; box-shadow: 0 24px 60px -20px rgba(0,0,0,.7); }
          :scope > .v3-s .v3-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 40%; }
          :scope > .v3-s .v3-img .v3-border { position: absolute; inset: 0; border: 1px solid rgba(255,255,255,.06); border-radius: 1.25rem; pointer-events: none; }
          :scope > .v3-s .v3-rule { height: 1px; background: linear-gradient(90deg,transparent,var(--hairline-accent),transparent); margin-bottom: calc(var(--p-density,1) * 3rem); }
          :scope > .v3-s .v3-eyebrow { text-align: center; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .32em; color: #7a9ab8; margin-bottom: calc(var(--p-density,1) * 2rem); }
          :scope > .v3-s .v3-mvv { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; position: relative; }
          :scope > .v3-s .v3-mvv::before,:scope > .v3-s .v3-mvv::after { content: ''; position: absolute; top: 0; bottom: 0; width: 1px; background: var(--hairline-accent); }
          :scope > .v3-s .v3-mvv::before { left: calc(100% / 3); }
          :scope > .v3-s .v3-mvv::after { left: calc(200% / 3); }
          :scope > .v3-s .v3-mvv-item { padding: calc(var(--p-density,1) * 1.5rem) calc(var(--p-density,1) * 2.5rem); }
          :scope > .v3-s .v3-mvv-item h3 { font-size: clamp(1.75rem,2.6vw,2.25rem); font-weight: 700; letter-spacing: -.014em; color: #ae251c; margin-bottom: .75rem; line-height: 1; }
          :scope > .v3-s .v3-mvv-item p { font-size: 14px; line-height: 1.6; color: #d4dfeb; }
          @media (max-width: 768px) {
            :scope > .v3-s .v3-hero { grid-template-columns: 1fr; }
            :scope > .v3-s .v3-img { aspect-ratio: 16/9; }
            :scope > .v3-s .v3-mvv { grid-template-columns: 1fr; }
            :scope > .v3-s .v3-mvv::before,:scope > .v3-s .v3-mvv::after { display: none; }
            :scope > .v3-s .v3-mvv-item { border-top: 1px solid var(--hairline-accent); }
          }
        }

        /* ── V4: Panoramic strip + airy MVV ── */
        @scope ([data-impeccable-variant="4"]) {
          :scope > .v4-s {
            position: relative; background: var(--surface-base);
            font-family: var(--font-outfit);
            padding: calc(var(--p-density,1) * 5rem) 0; overflow: hidden;
          }
          :scope > .v4-s .v4-wrap { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
          :scope > .v4-s .v4-strip { position: relative; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 30px 80px -30px rgba(0,0,0,.7); margin-bottom: calc(var(--p-density,1) * 5rem); }
          :scope[data-p-ratio="panoramic"] > .v4-s .v4-strip { aspect-ratio: 21/6; }
          :scope[data-p-ratio="standard"] > .v4-s .v4-strip { aspect-ratio: 16/7; }
          :scope > .v4-s .v4-strip { aspect-ratio: 21/6; }
          :scope > .v4-s .v4-strip img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 45%; }
          :scope > .v4-s .v4-strip .v4-grad { position: absolute; inset: 0; background: linear-gradient(90deg,rgba(7,22,42,.95) 0%,rgba(7,22,42,.85) 22%,rgba(7,22,42,.55) 50%,rgba(7,22,42,.1) 80%,transparent 100%); pointer-events: none; }
          :scope > .v4-s .v4-strip .v4-text { position: absolute; inset: 0; display: flex; align-items: center; padding: 0 clamp(2rem,5vw,5rem); }
          :scope > .v4-s .v4-strip .v4-text h2 { font-size: clamp(1.1rem,2.4vw,2rem); font-weight: 600; line-height: 1.15; letter-spacing: -.022em; color: #fff; max-width: 520px; }
          :scope > .v4-s .v4-strip .v4-text h2 span { display: block; margin-top: .4rem; font-weight: 700; color: #ae251c; }
          :scope > .v4-s .v4-eyebrow { text-align: center; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .32em; color: #7a9ab8; margin-bottom: calc(var(--p-density,1) * 3rem); display: flex; align-items: center; justify-content: center; gap: .75rem; }
          :scope > .v4-s .v4-eyebrow span.line { display: block; height: 1px; width: 20px; background: rgba(224,232,240,.55); }
          :scope > .v4-s .v4-mvv { display: grid; grid-template-columns: repeat(3,1fr); gap: calc(var(--p-density,1) * 4rem) calc(var(--p-density,1) * 3rem); }
          :scope > .v4-s .v4-mvv-item h3 { font-size: clamp(2rem,3vw,2.75rem); font-weight: 800; letter-spacing: -.02em; color: #ae251c; margin-bottom: calc(var(--p-density,1) * 1rem); line-height: 1; }
          :scope > .v4-s .v4-mvv-item p { font-size: 14.5px; line-height: 1.65; color: #d4dfeb; max-width: 38ch; }
          :scope > .v4-s .v4-mvv-item .v4-num { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .2em; color: rgba(122,154,184,.7); margin-bottom: .5rem; }
          @media (max-width: 768px) {
            :scope > .v4-s .v4-strip { aspect-ratio: 4/3; }
            :scope > .v4-s .v4-mvv { grid-template-columns: 1fr; }
          }
        }
      `}</style>

      <div data-impeccable-variant="1" data-impeccable-params='[
        {"id":"density","kind":"range","min":0.7,"max":1.3,"step":0.05,"default":1,"label":"Density"},
        {"id":"split","kind":"steps","default":"50/50","label":"Column split","options":[{"value":"50/50","label":"50 / 50"},{"value":"40/60","label":"40 / 60"}]}
      ]'>
        <section className="v1-s">
          <div aria-hidden className="v1-dot dot-grid opacity-[0.3]" />
          <div className="v1-wrap">
            <div className="v1-img">
              <img src="/images/estrategia.jpg" alt={t('manifesto.image.alt')} />
              <div className="v1-grad" aria-hidden />
            </div>
            <div className="v1-content">
              <h2 className="v1-h2">
                {t('manifesto.headline.lead')}
                <span>{t('manifesto.headline.italic')}</span>
              </h2>
              <p className="v1-body">
                {t('manifesto.body.1.pre')} <strong>{t('manifesto.body.1.years')}</strong> {t('manifesto.body.1.middle')} <strong>{t('manifesto.body.1.partners')}</strong>{t('manifesto.body.1.suffix')}
              </p>
              <div className="v1-rule" aria-hidden />
              <p className="v1-eyebrow">{t('manifesto.principles.eyebrow')}</p>
              <div className="v1-mvv">
                {PRINCIPLES.map(({ title, body }) => (
                  <div key={title} className="v1-mvv-item">
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div data-impeccable-variant="2" data-impeccable-params='[
        {"id":"density","kind":"range","min":0.7,"max":1.3,"step":0.05,"default":1,"label":"Density"},
        {"id":"mvv","kind":"steps","default":"bordered","label":"MVV style","options":[{"value":"bordered","label":"Bordered"},{"value":"expanded","label":"Expanded"}]}
      ]' style={{ display: 'none' }}>
        <section className="v2-s">
          <div className="v2-wrap">
            <div className="v2-eyebrow">
              <span className="line" aria-hidden />
              {t('manifesto.principles.eyebrow')}
              <span className="line" aria-hidden />
            </div>
            <div className="v2-mvv">
              {PRINCIPLES.map(({ title, body }) => (
                <div key={title} className="v2-mvv-item">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <div className="v2-img">
              <img src="/images/estrategia.jpg" alt={t('manifesto.image.alt')} />
              <div className="v2-grad" aria-hidden />
              <div className="v2-text">
                <h2>
                  {t('manifesto.headline.lead')}
                  <span>{t('manifesto.headline.italic')}</span>
                </h2>
                <p>
                  {t('manifesto.body.1.pre')} <strong>{t('manifesto.body.1.years')}</strong> {t('manifesto.body.1.middle')} <strong>{t('manifesto.body.1.partners')}</strong>{t('manifesto.body.1.suffix')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div data-impeccable-variant="3" data-impeccable-params='[
        {"id":"density","kind":"range","min":0.7,"max":1.3,"step":0.05,"default":1,"label":"Density"},
        {"id":"img-side","kind":"steps","default":"right","label":"Image side","options":[{"value":"right","label":"Right"},{"value":"left","label":"Left"}]}
      ]' style={{ display: 'none' }}>
        <section className="v3-s">
          <div className="v3-wrap">
            <div className="v3-hero">
              <div className="v3-text">
                <h2>
                  {t('manifesto.headline.lead')}
                  <span>{t('manifesto.headline.italic')}</span>
                </h2>
                <p>
                  {t('manifesto.body.1.pre')} <strong>{t('manifesto.body.1.years')}</strong> {t('manifesto.body.1.middle')} <strong>{t('manifesto.body.1.partners')}</strong>{t('manifesto.body.1.suffix')}
                </p>
              </div>
              <div className="v3-img">
                <img src="/images/estrategia.jpg" alt={t('manifesto.image.alt')} />
                <div className="v3-border" aria-hidden />
              </div>
            </div>
            <div className="v3-rule" aria-hidden />
            <p className="v3-eyebrow">{t('manifesto.principles.eyebrow')}</p>
            <div className="v3-mvv">
              {PRINCIPLES.map(({ title, body }) => (
                <div key={title} className="v3-mvv-item">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div data-impeccable-variant="4" data-impeccable-params='[
        {"id":"density","kind":"range","min":0.7,"max":1.3,"step":0.05,"default":1,"label":"Density"},
        {"id":"ratio","kind":"steps","default":"panoramic","label":"Strip height","options":[{"value":"panoramic","label":"Panoramic"},{"value":"standard","label":"Standard"}]}
      ]' style={{ display: 'none' }}>
        <section className="v4-s">
          <div className="v4-wrap">
            <div className="v4-strip">
              <img src="/images/estrategia.jpg" alt={t('manifesto.image.alt')} />
              <div className="v4-grad" aria-hidden />
              <div className="v4-text">
                <h2>
                  {t('manifesto.headline.lead')}
                  <span>{t('manifesto.headline.italic')}</span>
                </h2>
              </div>
            </div>
            <div className="v4-eyebrow">
              <span className="line" aria-hidden />
              {t('manifesto.principles.eyebrow')}
              <span className="line" aria-hidden />
            </div>
            <div className="v4-mvv">
              {PRINCIPLES.map(({ title, body }, i) => (
                <div key={title} className="v4-mvv-item">
                  <div className="v4-num">0{i + 1}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* impeccable-variants-end 1ef14584 */}
    </div>
  )
}
