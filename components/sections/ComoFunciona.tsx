'use client'

import { useLocale } from '@/lib/i18n'

export default function ComoFunciona() {
  const { t } = useLocale()
  return (
    <section
      id="como-funciona"
      className="como-funciona-v2 section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <style>{`
        .como-funciona-v2 {
          position: relative;
          color: #07162a;
        }
        .como-funciona-v2 .v2-radio {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }
        .como-funciona-v2 .v2-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
        }
        @media (min-width: 900px) {
          .como-funciona-v2 .v2-inner {
            max-width: 760px;
          }
        }
        .como-funciona-v2 .v2-headline {
          font-size: clamp(2rem, 4.4vw, 3.25rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.05;
          margin: 0;
          color: #07162a;
        }
        .como-funciona-v2 .v2-h-word {
          color: rgba(7, 22, 42, 0.55);
          transition: color 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .como-funciona-v2 .v2-prose {
          position: relative;
          min-height: 16em;
        }
        @media (min-width: 640px) {
          .como-funciona-v2 .v2-prose {
            min-height: 13em;
          }
        }
        .como-funciona-v2 .v2-pillar-body {
          position: absolute;
          inset: 0;
          font-size: clamp(1.1rem, 1.45vw, 1.25rem);
          line-height: 1.55;
          color: rgba(7, 22, 42, 0.82);
          margin: 0;
          max-width: 40ch;
          opacity: 0;
          transform: translateY(8px);
          pointer-events: none;
          transition:
            opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .como-funciona-v2:has(#v2-r-1:checked) .v2-pb-1,
        .como-funciona-v2:has(#v2-r-2:checked) .v2-pb-2,
        .como-funciona-v2:has(#v2-r-3:checked) .v2-pb-3 {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .como-funciona-v2:has(#v2-r-1:checked) .v2-h-word { color: #07162a; }
        .como-funciona-v2:has(#v2-r-2:checked) .v2-h-word { color: #ae251c; }
        .como-funciona-v2:has(#v2-r-3:checked) .v2-h-word { color: #142f54; }
        .como-funciona-v2 .v2-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 0;
          padding: 0;
        }
        .como-funciona-v2 .v2-chip {
          cursor: pointer;
          user-select: none;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.6rem 0.9rem;
          color: #07162a;
          border: 1px solid rgba(7, 22, 42, 0.22);
          background: transparent;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 640px) {
          .como-funciona-v2 .v2-chip {
            font-size: 0.78rem;
            letter-spacing: 0.08em;
            padding: 0.7rem 1.15rem;
          }
        }
        .como-funciona-v2:has(#v2-r-1:checked) .v2-chip:nth-of-type(1),
        .como-funciona-v2:has(#v2-r-2:checked) .v2-chip:nth-of-type(2),
        .como-funciona-v2:has(#v2-r-3:checked) .v2-chip:nth-of-type(3) {
          border-color: #07162a;
          background: #07162a;
          color: #F5F5F5;
        }
        .como-funciona-v2:has(#v2-r-1:focus-visible) .v2-chip:nth-of-type(1),
        .como-funciona-v2:has(#v2-r-2:focus-visible) .v2-chip:nth-of-type(2),
        .como-funciona-v2:has(#v2-r-3:focus-visible) .v2-chip:nth-of-type(3) {
          outline: 2px solid #07162a;
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .como-funciona-v2 .v2-pillar-body,
          .como-funciona-v2 .v2-h-word,
          .como-funciona-v2 .v2-chip {
            transition: none;
          }
        }
      `}</style>

      <input type="radio" id="v2-r-1" name="como-funciona-pillar" defaultChecked className="v2-radio" aria-label={t('comoFunciona.pillar.intelligence.label')} />
      <input type="radio" id="v2-r-2" name="como-funciona-pillar" className="v2-radio" aria-label={t('comoFunciona.pillar.transparency.label')} />
      <input type="radio" id="v2-r-3" name="como-funciona-pillar" className="v2-radio" aria-label={t('comoFunciona.pillar.followup.label')} />

      <div className="v2-inner">
        <h2 className="v2-headline">
          {t('comoFunciona.headline.prefix')} <span className="v2-h-word">HOLD</span> {t('comoFunciona.headline.suffix')}
        </h2>

        <div className="v2-prose">
          <p className="v2-pillar-body v2-pb-1">
            {t('comoFunciona.pillar.intelligence.body')}
          </p>
          <p className="v2-pillar-body v2-pb-2">
            {t('comoFunciona.pillar.transparency.body')}
          </p>
          <p className="v2-pillar-body v2-pb-3">
            {t('comoFunciona.pillar.followup.body')}
          </p>
        </div>

        <div className="v2-chips">
          <label htmlFor="v2-r-1" className="v2-chip">{t('comoFunciona.pillar.intelligence.label')}</label>
          <label htmlFor="v2-r-2" className="v2-chip">{t('comoFunciona.pillar.transparency.label')}</label>
          <label htmlFor="v2-r-3" className="v2-chip">{t('comoFunciona.pillar.followup.label')}</label>
        </div>

      </div>
    </section>
  )
}
