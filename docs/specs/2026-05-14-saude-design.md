# Design Spec — Página /saude

**Data:** 2026-05-14  
**Status:** Aprovado pelo cliente  
**Serve de esqueleto para:** /seguros, /investimentos (pattern visual, não componente compartilhado)

---

## Contexto

A `SaudeClient.tsx` atual é um stub: hero beige `#f4f1ea` inconsistente com o restante do site, seção de benefícios com 4 cards ícone-título-parágrafo (anti-pattern explícito no PRODUCT.md), e formulário com copy "em construção". Esta spec define a versão completa com conteúdo real.

**Decisões de brainstorming:**
- Conteúdo real (não placeholder)
- PF e PJ com peso igual — AnimatePresence bifurca tudo
- Seletor de categorias com detail card animado (padrão Consórcios)
- Pattern visual — Seguros e Soluções replicam a estrutura manualmente
- Hero dark navy `#142f54` (cor canônica de Saúde, consistente com o restante do site)

---

## Arquitetura da página

```
/saude
├── Hero (#142f54)
├── Seção container (#07162a)
│   └── AnimatePresence: ParaVoce | ParaEmpresa
│       ├── ParaVoce (PF)
│       │   ├── Eyebrow + H2
│       │   ├── CategoryGrid (4 botões: Individual/Familiar/Odonto/Telemedicina)
│       │   ├── CategoryDetail (animado, conteúdo real por categoria)
│       │   └── SaudeJornada (4 passos)
│       └── ParaEmpresa (PJ)
│           ├── Eyebrow + H2
│           └── Card B2B empresarial
└── ServiceLeadForm (#142f54)
```

---

## Seção 1 — Hero

**Background:** `linear-gradient(135deg, #0d2240 0%, #142f54 60%, #0f2548 100%)`  
**Blobs:** top-right `#1a4b8a` opacity 0.18 blur 110px · bottom-left `#ae251c` opacity 0.10 blur 90px  
**Dot-grid overlay:** `opacity-[0.06]`  
**Layout:** `grid lg:grid-cols-[1.1fr_1fr]`, imagem `saude.webp` à direita com overlay gradient bottom

**Copy (PF padrão — whatsapp muda por audiência):**
- Eyebrow pill: `"Saúde · Hold Corretora"` — borda/bg `#ae251c/30` e `#ae251c/15`, cor `#ae251c`
- H1: `"Saúde com escolha consciente — sem letras miúdas."`
- Sub: `"Comparamos operadoras com critérios reais — rede credenciada, custo, carências, reembolsos — para indicar o plano que faz sentido pra você ou pra sua empresa."`
- `AudienceToggle variant="dark"`
- CTAs: WhatsApp (verde `#25D366`) + `"Comparar planos →"` (scroll para `#saude-form`, bg `#07162a`)

**WhatsApp messages:**
- PF: `"Olá! Quero comparar planos de saúde para minha família."`
- PJ: `"Olá! Quero conhecer as opções de Plano de Saúde Empresarial."`

---

## Seção 2 — Conteúdo principal

**Background container:** `#07162a`  
**id:** `saude-content`  
**Font:** `var(--font-outfit)`

### Estado PF — `ParaVoce`

**Eyebrow pill:** `"Planos para você e sua família"` (bg/ring white/5 e white/10, cor `#7a9ab8`)  
**H2:** `"Qual tipo de cobertura você precisa?"`

#### CategoryGrid

4 botões em `grid-cols-2 sm:grid-cols-4`:

| id | Ícone Lucide | Label |
|----|-------------|-------|
| `individual` | `Heart` | Individual |
| `familiar` | `Users` | Familiar |
| `odonto` | `Stethoscope` | Odonto |
| `telemedicina` | `Activity` | Telemedicina |

- Inativo: `bg-[#142f54] text-[#7a9ab8]` → hover `#1e4a7a`
- Ativo: `bg-[#ae251c] text-white`
- `layoutId="saude-cat-pill"` para spring animation (padrão Consórcios)

#### CategoryDetail — conteúdo por categoria

Cada detail card tem: seq `01/04`, título, descrição, grid 2 colunas (O que analisamos / Para quem é ideal), CTA WhatsApp.

**Individual:**
- Desc: `"Comparamos operadoras locais e nacionais por rede credenciada, carências, cobertura ambulatorial e hospitalar. Recomendamos com base no seu perfil — não no maior comissionamento."`
- O que analisamos: Rede credenciada na cidade · Tabelas de carência por operadora · Cobertura ambulatorial e hospitalar · Política de reembolso
- Ideal para: `"Profissionais liberais, autônomos e pessoas sem vínculo empregatício que precisam de cobertura independente."`

**Familiar:**
- Desc: `"Planos com coberturas para diferentes faixas etárias no mesmo contrato. Avaliamos cobertura pediátrica, maternidade e idosos com critério."`
- O que analisamos: Cobertura obstétrica e maternidade · Planos pediátricos · Faixas etárias e reajustes · Portabilidade de carências
- Ideal para: `"Famílias com filhos pequenos que precisam de atenção especial à cobertura obstétrica e pediátrica."`

**Odonto:**
- Desc: `"Cobertura odontológica avulsa ou complementar — procedimentos preventivos, restaurações, próteses e ortodontia."`
- O que analisamos: Preventivo e restaurador · Ortodontia · Próteses e implantes · Individual ou familiar
- Ideal para: `"Quem quer complementar o plano de saúde com cobertura odontológica, ou contratar odonto de forma independente."`

**Telemedicina:**
- Desc: `"Atendimento remoto integrado a planos selecionados. Consultas 24/7 com clínicos, pediatras e especialistas — sem filas, sem deslocamento."`
- O que analisamos: Atendimento 24/7 · Clínico, pediatra e especialistas · Receituário digital · Integrado a planos parceiros
- Ideal para: `"Complemento a planos com rede menor — amplia o acesso sem trocar de operadora."`

**WhatsApp por categoria:** `"Olá! Tenho interesse em plano de saúde — tipo: {title}."`

#### SaudeJornada

Componente novo baseado em `ConsorcioJornada`. Mesmo visual: rail horizontal, step circles, auto-advance 2.5s.

4 passos:
1. **Diagnóstico** — `"Perfil de uso, faixa etária, rede preferida e histórico de operadora"`
2. **Comparativo** — `"3 a 5 opções com rede, carências, cobertura e preço por faixa"`
3. **Contratação** — `"Conduzimos do início ao fim, sem burocracia ou surpresas"`
4. **Acompanhamento** — `"Suporte em sinistros, reajustes e revisão anual do plano"`

Badge final: `"Operação autorizada e regulamentada pela ANS"`  
CTA final: `"Quero comparar planos"` → WhatsApp PF

> **Nota:** `SaudeJornada` é versão simplificada de `ConsorcioJornada` — sem a lista de ganhos/diferenciais (conteúdo já coberto pelo CategoryDetail). Mantém: rail de progresso animado + 4 steps com auto-advance + badge + CTA. Strings hard-coded no componente (sem i18n, padrão do restante de SaudeClient).

---

### Estado PJ — `ParaEmpresa`

**Eyebrow:** `"Saúde Empresarial"` — bg/cor `#ae251c/20` e `#ae251c`  
**H2:** `"Planos coletivos para PMEs e corporações."`

**Card** (`bg: linear-gradient(135deg, #0b1f3a 0%, #142f54 100%)`, ring `white/10`):
- Body: `"Da micro-empresa com 2 colaboradores à corporação com centenas de vidas — estruturamos planos coletivos com análise de sinistralidade, migração assistida e gestão de adesão. RH mais leve, time mais saudável."`
- Título diff: `"Diferenciais do atendimento B2B"`
- Lista (grid 2 colunas):
  1. Diagnóstico de sinistralidade antes da renovação
  2. Migração assistida sem gap de cobertura
  3. Odonto empresarial integrado ao plano principal
  4. Suporte em onboarding e comunicação com RH
- CTA WhatsApp: `"Falar com especialista empresarial"`

---

## Seção 3 — Formulário

**Background:** `#142f54`  
**id:** `saude-form`  
**Layout:** `grid lg:grid-cols-2`

**Coluna esquerda:**
- Eyebrow: `"Análise personalizada"` (cor `#7a9ab8`)
- H2: `"Encontre o plano certo — sem esforço."`
- Body: `"Conta o seu perfil de uso, faixa etária e cidade. Voltamos com 2 a 3 opções comparadas por rede, carências e preço — no primeiro retorno."`
- Linha decorativa `rule-accent`
- Trust text: `"Sem custo · sem compromisso · resposta em horário comercial."`

**Coluna direita:**
```tsx
<ServiceLeadForm
  service="Saúde"
  introTitle="Quero comparar planos"
  introBody="Conta o que importa pra você (rede, especialidades, faixa etária) — voltamos com 2 ou 3 opções claras."
/>
```

---

## Novos componentes necessários

| Componente | Arquivo | Base |
|-----------|---------|------|
| `SaudeJornada` | `components/sections/SaudeJornada.tsx` | `ConsorcioJornada.tsx` |

**Componentes reutilizados sem alteração:**
- `AudienceToggle`
- `ServiceLeadForm`
- `Reveal`
- `WhatsAppIcon`

---

## Paleta e tokens

| Token | Valor | Uso |
|-------|-------|-----|
| Hero bg | `#142f54` → `#0d2240` | Gradiente hero |
| Container bg | `#07162a` | Seção de conteúdo |
| Form bg | `#142f54` | Seção formulário |
| Accent | `#ae251c` | Eyebrows, ativo, CTAs |
| Text sub | `#7a9ab8` | Corpo de texto secundário |
| Text primary | `#e0e8f0` | Texto sobre dark |
| Card bg | `#0b1f3a` | Detail card |

---

## Esqueleto para outras páginas

O pattern desta página define o template visual para os demais serviços:

```
Hero (dark, cor canônica do serviço)
  └── eyebrow vermelho · headline display italic · sub · AudienceToggle · 2 CTAs · imagem direita

Conteúdo (bg #07162a)
  └── AnimatePresence PF/PJ
      ├── PF: seletor N categorias + CategoryDetail animado + Jornada 4 passos
      └── PJ: card B2B único

Formulário (bg cor canônica do serviço)
  └── 2 col: copy contextual + ServiceLeadForm
```

**Seguros:** cor canônica `#0b1f3a`, gradient hero `#2a0606→#4a0e0e→#07162a`, categorias: Vida / Auto / Residencial / Empresarial  
**Soluções Financeiras:** cor `gradient #ae251c+#07162a`, categorias: TBD
