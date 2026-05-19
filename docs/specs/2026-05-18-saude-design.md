# Design Spec — Página /saude (v2)

**Data:** 2026-05-18
**Status:** Aprovado pelo cliente
**Substitui:** `docs/specs/2026-05-14-saude-design.md` (versão anterior aposentada — não implementada)

---

## Contexto

Versão completa e institucional da página /saude, focada em consultoria estratégica, autoridade no segmento e atendimento próximo. Substitui o stub atual (`SaudeClient.tsx` hero beige + 4 cards genéricos) e abandona a estrutura PF/PJ (`AudienceToggle` + `AnimatePresence`) do spec anterior.

**Decisões-chave do brainstorming:**
- Substitui totalmente o spec antigo — não há `AudienceToggle` na página
- 4 modalidades de contratação (Individual&Familiar / Coletivo Adesão / Empresarial / Odonto) em grid `lg:grid-cols-4` com expansão accordion full-width
- Operadoras via `LogoLoop` com 8 logos (5 a fornecer)
- FAQ com 10 perguntas, accordion rico aceitando sub-headings para a Q8 (urgência/emergência)
- Hero H1 mantém a frase institucional integral do brief
- 3 chips minimalistas em "Sobre Nós" (só título, sem descrição)
- CTA Final = form `ServiceLeadForm` 2-col + WhatsApp secundário
- Arquitetura híbrida: Hero / Sobre / Diferenciais / CTA inline em `SaudeClient.tsx`; Modalidades, FAQ e Operadoras extraídos para `components/sections/saude/*`

---

## Arquitetura da página

```
/saude
├── 1. Hero                  (#142f54 gradient)   inline
├── 2. Sobre Nós             (#07162a)            inline
├── 3. Modalidades           (#07162a)            <SaudeModalidades />
├── 4. Diferenciais HOLD     (#142f54)            inline
├── 5. Operadoras            (#F5F5F5)            <SaudeOperadoras />
├── 6. FAQ                   (#F5F5F5)            <SaudeFAQ />
└── 7. CTA Final             (#142f54)            inline (ServiceLeadForm)
```

**Ritmo de bg:** dark navy → dark profundo → dark profundo → navy → light → light → navy. Três movimentos: profundidade → pausa light → fechamento navy.

---

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `app/saude/SaudeClient.tsx` | Reescrever | Compõe seções; inline: Hero, Sobre, Diferenciais, CTA |
| `components/sections/saude/SaudeModalidades.tsx` | Criar | Grid 4 + accordion full-width |
| `components/sections/saude/SaudeModalidades.test.tsx` | Criar | Testes (render, expansão, WhatsApp link) |
| `components/sections/saude/SaudeFAQ.tsx` | Criar | Accordion rico com sub-headings (Q8) |
| `components/sections/saude/SaudeFAQ.test.tsx` | Criar | Testes (render 10 itens, expand/collapse, Q8 sub-blocks) |
| `components/sections/saude/SaudeOperadoras.tsx` | Criar | Wrap `LogoLoop` com 8 logos |
| `components/sections/saude/SaudeOperadoras.test.tsx` | Criar | Testes (render heading + carrossel) |
| `app/saude/SaudeClient.test.tsx` | Criar | Smoke test (presença das 7 seções) |
| `public/images/logosEmpresasParceiras/Amil.webp` | Adicionar | **Cliente fornece** |
| `public/images/logosEmpresasParceiras/Hapvida.webp` | Adicionar | **Cliente fornece** |
| `public/images/logosEmpresasParceiras/Omint.webp` | Adicionar | **Cliente fornece** |
| `public/images/logosEmpresasParceiras/PortoSeguro.webp` | Adicionar | **Cliente fornece** |
| `public/images/logosEmpresasParceiras/SegurosUnimed.webp` | Adicionar | **Cliente fornece** |

**Componentes reutilizados sem alteração:**
`Reveal` · `WhatsAppIcon` · `ServiceLeadForm` · `LogoLoop`

**Removido:** `SaudeJornada` (do spec antigo — não foi implementado, não precisa ser criado).

---

## Seção 1 — Hero `#142f54`

**Background:** `linear-gradient(135deg, #0d2240 0%, #142f54 60%, #0f2548 100%)`
**Overlays:**
- `dot-grid pointer-events-none absolute inset-0 opacity-[0.06]`
- blob top-right: `#1a4b8a` opacity `.18` blur `110px` (480×480)
- blob bottom-left: `#ae251c` opacity `.10` blur `90px` (280×280)

**Layout:** `grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center` · `pt-32 pb-16 md:pt-40 md:pb-24`

**Coluna esquerda:**
- Eyebrow pill `"Saúde · Hold Corretora"` — borda `#ae251c/30` · bg `#ae251c/15` · texto `#ae251c` · `tracking-[0.22em]`
- H1 `"Soluções em saúde estruturadas com estratégia, análise e acompanhamento consultivo."` · `text-display text-white text-pretty` · `style.fontSize: 'clamp(1.85rem, 4vw, 3.25rem)'`
- Sub: `"A HOLD conecta pessoas, famílias e empresas às soluções em saúde mais adequadas para cada perfil, necessidade e momento."` · `max-w-[58ch] text-lg text-[#7a9ab8] leading-relaxed`
- 2 CTAs:
  - `[ WhatsApp ]` verde `#25D366` hover `#1ebe5d` → mensagem: `"Olá! Quero falar com um especialista em planos de saúde."`
  - `[ Comparar planos → ]` ghost (bg `white/[0.08]` ring `white/15`) → scroll `href="#saude-form"`

**Coluna direita (lg+):**
- `aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10`
- `<Image src="/images/hero/saude.webp" fill priority sizes="(max-width:1024px) 0px, 50vw" />`
- Overlay gradient `from-[#0d2240]/70 via-transparent to-transparent`

`Reveal` aplicado nos blocos da esquerda com delays escalonados (`0`, `0.08`, `0.16`, `0.24`, `0.32`).

---

## Seção 2 — Sobre Nós `#07162a` (inline)

**Container:** `section-pad bg-[#07162a]` · `max-w-5xl mx-auto px-6 lg:px-8` · `font-outfit`

**Conteúdo:**
- Eyebrow: `"O JEITO HOLD"` — `text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]`
- H2: `"O jeito HOLD de estruturar soluções em saúde"` · `text-display text-white` · `clamp(1.75rem, 3.6vw, 2.75rem)`
- Body: parágrafo integral do brief — `mt-6 max-w-[60ch] text-[#7a9ab8] leading-relaxed text-lg`
  > *"Mais do que intermediar soluções, atuamos de forma consultiva na construção de estratégias em saúde, benefícios e planejamento, conectando cada cliente às decisões mais adequadas ao seu momento, necessidade e visão de futuro."*
- 3 chips em `flex flex-wrap gap-3 mt-10`:
  - `"Atendimento consultivo"`
  - `"Soluções personalizadas"`
  - `"Acompanhamento próximo"`

**Chip styling:**
```
inline-flex items-center rounded-full
border border-[#ae251c]/30 bg-[#ae251c]/10
px-4 py-2
text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e0e8f0]
```

---

## Seção 3 — Modalidades `#07162a` — `<SaudeModalidades />`

**Arquivo:** `components/sections/saude/SaudeModalidades.tsx`

### Header
- Eyebrow: `"MODALIDADES DE CONTRATAÇÃO"`
- H2: `"Soluções em saúde para diferentes perfis e formatos de contratação"`
- Sub (do brief, max-w-3xl): `"A HOLD estrutura soluções em saúde de forma personalizada, considerando perfil, necessidade, momento e estratégia de cada cliente. Atuamos com diferentes modalidades de contratação para pessoas, famílias, profissionais e empresas."`

### Grid de cards

`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`

**4 cards** (`bg-[#0b1f3a]` ring `white/10` rounded-2xl p-6 cursor-pointer transition hover:ring-[#ae251c]/30):

| id | Ícone Lucide | Título | Chamada |
|---|---|---|---|
| `individual` | `Users` | Individual e Familiar | *"Soluções em saúde para pessoas e famílias que buscam proteção, previsibilidade e acesso com segurança."* |
| `adesao` | `Briefcase` | Coletivo por Adesão | *"Alternativas estratégicas para profissionais vinculados a entidades de classe e categorias elegíveis."* |
| `empresarial` | `Building2` | Empresarial | *"Estruturação de benefícios para MEIs, PMEs e grandes empresas, com soluções alinhadas ao porte, momento e estratégia de cada operação."* |
| `odonto` | `Smile` | Odontológico | *"Cobertura odontológica para pessoas e empresas com foco em cuidado, prevenção e bem-estar."* |

**Card layout:**
- Ícone `size={28} strokeWidth={1.5} text-[#ae251c]`
- Título `mt-5 text-white font-semibold` · `clamp(1.1rem, 1.6vw, 1.25rem)`
- Régua `rule-accent h-px w-10 mt-3`
- Chamada `mt-3 text-sm text-[#7a9ab8] leading-relaxed`
- Footer do card: `mt-6 flex items-center justify-between text-xs text-[#7a9ab8]` — texto `Saber mais` + ícone `Plus` (rotaciona 45° quando expandido)

**Quando o card está selecionado:** mantém `bg-[#0b1f3a]` mas ganha `ring-2 ring-[#ae251c]/50`, ícone do `Plus` rotaciona 45°, footer muda para `"Recolher"` em `text-[#ae251c]`. Estado mantido via `useState<CategoryId | null>(null)`.

### Painel expandido (full-width)

Posicionado **abaixo da row do card clicado** com `col-span-full` (em todos os breakpoints — em mobile o card vira coluna única, então fica imediatamente abaixo; em desktop fica abaixo da linha de 4 cards).

**Implementação:** após o `.map()`, renderizar um único `<AnimatePresence>` que contém o painel se `selected !== null`:

```tsx
{selected && (
  <motion.div
    key={selected}
    initial={{ opacity: 0, y: -8, height: 0 }}
    animate={{ opacity: 1, y: 0, height: 'auto' }}
    exit={{ opacity: 0, y: -4, height: 0 }}
    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    className="col-span-full overflow-hidden"
  >
    <ExpandedPanel id={selected} />
  </motion.div>
)}
```

**`ExpandedPanel` styling:**
- `bg-[#142f54] ring-1 ring-[#ae251c]/30 rounded-2xl px-6 py-8 md:px-12 md:py-12 mt-2`
- Sequencial `01 / 04` (tabular, `text-[#ae251c]/70 text-xs font-semibold tracking-[0.2em]`)
- Título `text-display text-white` · `clamp(1.5rem, 2.6vw, 2rem)`
- Texto integral do brief — `mt-4 text-[#7a9ab8] leading-relaxed max-w-[62ch] text-base`
- CTA WhatsApp verde no rodapé do painel (mensagem distinta por modalidade)

**Textos integrais por modalidade:**

#### Individual e Familiar (01/04)
> "Escolher um plano de saúde envolve mais do que comparar preços e coberturas. Cada decisão precisa considerar perfil de utilização, rede credenciada, previsibilidade financeira e momento de vida. A HOLD conecta você e sua família às soluções mais adequadas por meio de análise estratégica, acompanhamento próximo e suporte em todas as etapas."

**WhatsApp:** `"Olá! Tenho interesse em planos de saúde Individual ou Familiar."`

#### Coletivo por Adesão (02/04)
> "O plano coletivo por adesão é uma alternativa voltada a profissionais vinculados a entidades de classe, associações e categorias elegíveis. Essa modalidade pode oferecer condições estratégicas de contratação, mas exige análise criteriosa sobre elegibilidade, regras, cobertura, rede credenciada e cenário de longo prazo. A HOLD realiza uma avaliação personalizada para identificar as alternativas mais adequadas ao perfil e à necessidade de cada cliente."

**WhatsApp:** `"Olá! Tenho interesse em plano de saúde Coletivo por Adesão."`

#### Empresarial (03/04)
> "A estruturação de benefícios em saúde vai além da contratação de um plano. Empresas de diferentes portes precisam equilibrar qualidade assistencial, previsibilidade financeira, retenção de talentos e sustentabilidade da operação. A HOLD atua na construção de soluções empresariais para MEIs, PMEs e grandes empresas, conectando cada operação às alternativas mais adequadas ao seu momento, perfil e estratégia."

**WhatsApp:** `"Olá! Tenho interesse em plano de saúde Empresarial."`

#### Odontológico (04/04)
> "O cuidado com a saúde também passa pela prevenção e pelo acompanhamento odontológico. A HOLD estrutura soluções odontológicas para pessoas, famílias e empresas, buscando equilíbrio entre cobertura, qualidade de atendimento, rede credenciada e custo-benefício. Nosso acompanhamento é realizado de forma próxima e estratégica, considerando o perfil e as necessidades de cada cliente."

**WhatsApp:** `"Olá! Tenho interesse em plano de saúde Odontológico."`

### Comportamento

- Estado inicial: nenhum card selecionado (`selected: null`)
- Clicar num card seleciona; clicar no mesmo de novo deseleciona
- Apenas **uma** modalidade aberta por vez
- Em mobile (`grid-cols-1`), o painel aparece sempre na ordem do grid (após o card clicado, sempre full-width)
- Em desktop (`lg:grid-cols-4`), o painel aparece **abaixo de toda a row de 4 cards** (não inline entre eles — visual mais limpo)

### Acessibilidade

- Cards são `<button>` com `aria-expanded` e `aria-controls`
- Painel tem `role="region"` e `aria-labelledby` apontando para o card

---

## Seção 4 — Diferenciais HOLD `#142f54` (inline)

**Container:** `section-pad bg-[#142f54]` · `max-w-7xl mx-auto px-6 lg:px-8` · `font-outfit`

### Header
- Eyebrow: `"DIFERENCIAIS"` (`#7a9ab8`)
- Headline: `"O diferencial não está apenas na solução. Está na forma de conduzir cada decisão."` · `text-display text-white italic` · `clamp(1.5rem, 3vw, 2.25rem)` · `max-w-3xl`

### Grid de 3 cards

`grid md:grid-cols-3 gap-x-10 gap-y-12 mt-16`

**3 cards estilo "stat"** (sem bg, separados por divisores verticais em desktop via `md:border-l md:border-white/10 md:first:border-l-0 md:pl-8 first:pl-0`):

| # | Ícone | Título | Descrição |
|---|---|---|---|
| 1 | `Search` | Análise estratégica | Avaliação técnica considerando perfil, utilização, cobertura e previsibilidade. |
| 2 | `HandHeart` | Acompanhamento próximo | Suporte consultivo em todas as etapas da jornada. |
| 3 | `Layers` | Estrutura multissoluções | Integração entre saúde, benefícios e planejamento. |

**Card layout:**
- Ícone `size={32} strokeWidth={1.6} text-[#ae251c]`
- Título `mt-6 text-white font-semibold text-lg`
- Descrição `mt-3 text-[#7a9ab8] leading-relaxed text-sm`

`Reveal` com `delay` escalonado (`i * 0.08`).

---

## Seção 5 — Operadoras `#F5F5F5` — `<SaudeOperadoras />`

**Arquivo:** `components/sections/saude/SaudeOperadoras.tsx`

**Container:** `section-pad bg-[#F5F5F5]` · `max-w-7xl mx-auto px-6 lg:px-8` · `font-outfit`

### Header
- Eyebrow: `"PARCEIROS"` — `text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07162a]/55`
- H2: `"Trabalhamos com as principais seguradoras e operadoras do mercado"` · `text-display text-[#07162a]` · `clamp(1.5rem, 3vw, 2.25rem)` · `max-w-3xl`
- Sub: `"Disponibilidade varia conforme região, modalidade e perfil do beneficiário."` · `mt-4 text-[#07162a]/60 leading-relaxed text-sm max-w-[60ch]`

### Carrossel

```tsx
<LogoLoop
  logos={[
    { src: '/images/logosEmpresasParceiras/Amil.webp', alt: 'Amil' },
    { src: '/images/logosEmpresasParceiras/bradesco.webp', alt: 'Bradesco Saúde' },
    { src: '/images/logosEmpresasParceiras/Hapvida.webp', alt: 'Hapvida' },
    { src: '/images/logosEmpresasParceiras/Omint.webp', alt: 'Omint' },
    { src: '/images/logosEmpresasParceiras/PortoSeguro.webp', alt: 'Porto Seguro' },
    { src: '/images/logosEmpresasParceiras/SegurosUnimed.webp', alt: 'Seguros Unimed' },
    { src: '/images/logosEmpresasParceiras/SulAmerica.webp', alt: 'SulAmérica' },
    { src: '/images/logosEmpresasParceiras/Unimed.webp', alt: 'Unimed' },
  ]}
  speed={60}
  direction="left"
  logoHeight={44}
  gap={56}
  scaleOnHover
  fadeOut
  fadeOutColor="#F5F5F5"
  ariaLabel="Operadoras de saúde parceiras"
/>
```

**Nota:** se algum dos 5 arquivos pendentes não estiver disponível no momento da implementação, o componente entra com **fallback texto-only** (lista tipográfica) — decisão de implementação registrada como TODO na task de operadoras.

---

## Seção 6 — FAQ `#F5F5F5` — `<SaudeFAQ />`

**Arquivo:** `components/sections/saude/SaudeFAQ.tsx`

**Container:** `section-pad bg-[#F5F5F5]` · `max-w-3xl mx-auto px-6 lg:px-8` · `font-outfit`

### Header (centralizado)
- Eyebrow: `"DÚVIDAS FREQUENTES"`
- H2: `"Perguntas frequentes sobre planos de saúde"` · `mt-4 text-display text-[#07162a]` · `clamp(1.75rem, 3.6vw, 2.75rem)`

### Modelo de dados

```ts
type FAQBlock =
  | { type: 'p'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'ul'; items: string[] }

type FAQItem = {
  q: string
  body: FAQBlock[]
}
```

Estado: `const [openItems, setOpenItems] = useState<number[]>([])` (múltiplos itens podem ficar abertos — padrão do FAQ da home).

### Render dos blocos

```tsx
function renderBlock(block: FAQBlock, i: number) {
  switch (block.type) {
    case 'p':
      return <p key={i} className="mt-3 text-[#07162a]/60 text-sm leading-relaxed">{block.text}</p>
    case 'h4':
      return <h4 key={i} className="mt-6 text-[#07162a] font-semibold text-sm">{block.text}</h4>
    case 'ul':
      return (
        <ul key={i} className="mt-3 space-y-1.5">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-[#07162a]/60 text-sm leading-relaxed">
              <span className="mt-2 h-1 w-1 rounded-full bg-[#ae251c] shrink-0" />
              {it}
            </li>
          ))}
        </ul>
      )
  }
}
```

### Estilo do item (igual ao FAQ atual da home)
- Divisor `ground-divide`
- Botão full-width entre pergunta e ícone `Plus` (rotaciona 45° quando aberto)
- Pergunta `text-[#07162a] font-medium text-sm md:text-base leading-snug group-hover:text-[#ae251c]`
- Conteúdo expansível com `AnimatePresence` height + opacity, `duration 0.32`

### Conteúdo dos 10 itens

**Q1. Qual a diferença entre plano individual, coletivo por adesão e empresarial?**
```
[p] Os planos de saúde variam conforme a modalidade de contratação e elegibilidade do beneficiário.
[h4] Individual ou familiar
[p] Contratado diretamente pela pessoa física, com cobertura destinada ao titular e seus dependentes.
[h4] Coletivo por adesão
[p] Voltado a profissionais vinculados a entidades de classe, sindicatos, associações ou conselhos profissionais elegíveis.
[h4] Empresarial
[p] Destinado a empresas de diferentes portes, incluindo MEIs, PMEs e grandes operações, mediante contratação vinculada ao CNPJ.
[p] Cada modalidade possui características específicas relacionadas a:
[ul] elegibilidade · reajustes · regras contratuais · composição do grupo · carências · formatos de contratação
[p] Por isso, a análise adequada do perfil e da necessidade é fundamental antes da contratação.
```

**Q2. MEI pode contratar plano empresarial?**
```
[p] Sim. O Microempreendedor Individual (MEI) pode contratar plano de saúde empresarial, desde que atenda aos critérios estabelecidos pela operadora e possua CNPJ ativo dentro das exigências regulatórias.
[p] As condições variam conforme:
[ul] tempo de abertura da empresa · número mínimo de vidas · operadora · região de comercialização · modalidade contratada
[p] Em muitos casos, o plano empresarial pode representar uma alternativa estratégica de custo-benefício para profissionais formalizados e suas famílias.
```

**Q3. Quem pode contratar plano coletivo por adesão?**
```
[p] Os planos coletivos por adesão são destinados a profissionais vinculados a:
[ul] entidades de classe · sindicatos · associações profissionais · conselhos profissionais · categorias elegíveis
[p] A contratação depende da comprovação de vínculo com a entidade responsável pela adesão ao contrato coletivo.
[p] Essa modalidade pode oferecer condições diferenciadas de contratação, mas exige análise criteriosa sobre:
[ul] elegibilidade · regras de permanência · cobertura · rede credenciada · reajustes · cenário de longo prazo
```

**Q4. Como escolher o plano ideal?**
```
[p] A escolha do plano de saúde envolve mais do que comparação de preço. É importante analisar fatores como:
[ul] perfil de utilização · faixa etária · rede hospitalar · abrangência geográfica · acomodação · coparticipação · previsibilidade financeira · necessidades familiares ou empresariais · cenário de médio e longo prazo
[p] Além disso, diferentes modalidades podem apresentar vantagens específicas conforme o perfil do cliente.
[p] A HOLD realiza uma análise consultiva e personalizada para auxiliar na construção da solução mais adequada para cada realidade.
```

**Q5. O que é carência no plano de saúde?**
```
[p] Carência é o período contado a partir do início de vigência do contrato em que determinadas coberturas ainda não podem ser utilizadas integralmente.
[p] A Lei nº 9.656/98 estabelece prazos máximos de carência para planos regulamentados, incluindo:
[ul] 24 horas para urgência e emergência · até 180 dias para consultas, exames, internações e demais procedimentos · 300 dias para parto a termo · até 24 meses para cobertura parcial temporária relacionada a doenças ou lesões preexistentes
[p] Os prazos podem variar conforme:
[ul] operadora · modalidade do plano · campanhas promocionais · análise de redução de carência · portabilidade
```

**Q6. É possível reduzir ou aproveitar carências?**
```
[p] Sim, em alguns casos. Dependendo do histórico do beneficiário e das regras da operadora, pode haver:
[ul] redução de carências · aproveitamento de prazos já cumpridos · portabilidade de carências · campanhas promocionais específicas
[p] A análise depende de fatores como:
[ul] tempo de permanência no plano anterior · compatibilidade entre produtos · documentação apresentada · regras regulatórias da ANS · critérios da operadora
[p] Cada situação deve ser avaliada individualmente.
```

**Q7. Os planos de saúde seguem regulamentação da ANS e da Lei nº 9.656/98?**
```
[p] Sim. Os planos de saúde regulamentados seguem as diretrizes estabelecidas pela Agência Nacional de Saúde Suplementar (ANS) e pela Lei nº 9.656/98, principal legislação da saúde suplementar no Brasil.
[p] A regulamentação estabelece regras relacionadas a:
[ul] cobertura mínima obrigatória · carências · urgência e emergência · reajustes · portabilidade · doenças e lesões preexistentes · direitos dos beneficiários · responsabilidades das operadoras · segmentação assistencial · funcionamento dos contratos
[p] Além disso, a ANS também define o Rol de Procedimentos e Eventos em Saúde, que representa a cobertura mínima obrigatória dos planos regulamentados.
[p] A HOLD auxilia seus clientes na compreensão dessas regras para proporcionar mais clareza, segurança e previsibilidade na tomada de decisão.
```

**Q8. Como funcionam os atendimentos de urgência e emergência nos planos de saúde?**
```
[p] Os atendimentos de urgência e emergência possuem regras específicas definidas pela Lei nº 9.656/98 e pela regulamentação da ANS.
[h4] O que é considerado emergência?
[p] São situações que impliquem risco imediato à vida ou possibilidade de lesões irreparáveis ao paciente, conforme declaração médica.
[h4] O que é considerado urgência?
[p] São situações resultantes de:
[ul] acidentes pessoais · complicações no processo gestacional
[h4] Qual o prazo de cobertura?
[p] Nos planos regulamentados, o prazo máximo de carência para atendimentos de urgência e emergência é de 24 horas após o início da vigência contratual.
[p] Após esse período, o beneficiário passa a ter direito à cobertura conforme a segmentação do plano contratado e as regras previstas em contrato.
[h4] Como funciona a cobertura nos planos hospitalares?
[p] Nos planos com cobertura hospitalar, os atendimentos de urgência e emergência podem incluir:
[ul] pronto atendimento · exames · procedimentos · medicamentos utilizados durante o atendimento · internações · cirurgias · tratamentos necessários à estabilização do quadro clínico
[h4] Como funciona nos planos exclusivamente ambulatoriais?
[p] Nos planos exclusivamente ambulatoriais, a cobertura de urgência e emergência é limitada às primeiras 12 horas de atendimento.
[p] Caso exista necessidade de internação após esse período, podem ser aplicadas regras específicas previstas contratualmente e na regulamentação da ANS. Nessas situações, pode haver:
[ul] remoção do paciente · encaminhamento ao SUS · continuidade assistencial conforme segmentação contratada
[h4] O que acontece em casos de doença ou lesão preexistente?
[p] Quando houver Cobertura Parcial Temporária (CPT) relacionada a doença ou lesão preexistente declarada, podem existir limitações temporárias para:
[ul] procedimentos de alta complexidade · cirurgias · leitos de alta tecnologia relacionados à condição declarada
[p] Ainda assim, permanecem garantidos os atendimentos necessários à estabilização do quadro de urgência ou emergência conforme previsto na legislação.
[h4] Por que é importante analisar o contrato?
[p] As condições de cobertura podem variar conforme:
[ul] modalidade do plano · segmentação assistencial · abrangência · tipo de acomodação · coparticipação · carências · CPT · regras da operadora
[p] A HOLD auxilia seus clientes na compreensão dessas condições, buscando mais clareza, segurança e previsibilidade na escolha do plano mais adequado.
```

**Q9. A HOLD trabalha com quais seguradoras/operadoras?**
```
[p] A HOLD atua com diferentes seguradoras/operadoras do mercado, buscando identificar as soluções mais adequadas ao perfil e às necessidades de cada cliente. Entre elas:
[ul] Amil · Bradesco Saúde · Hapvida · Omint · Porto Seguro · Seguros Unimed · SulAmérica · Unimed
[p] A disponibilidade pode variar conforme:
[ul] região · modalidade · perfil do beneficiário · elegibilidade · regras comerciais vigentes
```

**Q10. A HOLD acompanha após a contratação?**
```
[p] Sim. Nosso trabalho vai além da contratação do plano. A HOLD atua com acompanhamento próximo e suporte consultivo para auxiliar clientes em diferentes etapas da jornada, incluindo:
[ul] análise de utilização · orientações contratuais · movimentações cadastrais · dúvidas operacionais · reavaliações estratégicas · suporte relacionado às modalidades contratadas
[p] O objetivo é proporcionar mais segurança, clareza e continuidade no relacionamento com cada cliente.
```

---

## Seção 7 — CTA Final `#142f54` (inline) `id="saude-form"`

**Container:** `section-tight bg-[#142f54]` · `max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start` · `font-outfit`

### Coluna esquerda
- Eyebrow: `"FALE COM A HOLD"` · `text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]`
- H2: `"Conte com a HOLD para estruturar sua solução em saúde com inteligência e segurança."` · `mt-4 text-display text-white` · `clamp(1.75rem, 3.6vw, 2.75rem)`
- Body: `"Nossa equipe está pronta para entender seu cenário e conectar você às alternativas mais adequadas para sua realidade."` · `mt-6 max-w-[58ch] text-[#7a9ab8] leading-relaxed`
- Régua `rule-accent h-px w-24 mt-8`
- Trust text: `"Sem custo · sem compromisso · resposta em horário comercial."` · `mt-6 text-sm text-[#7a9ab8]`
- Botão WhatsApp secundário verde:
  - href = `formatWhatsAppLink(WHATSAPP, 'Olá! Quero falar com um especialista em planos de saúde.')`
  - `mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-6 py-3`

### Coluna direita
```tsx
<ServiceLeadForm
  service="Saúde"
  introTitle="Falar com especialista"
  introBody="Conta seu cenário — perfil, modalidade, momento. Voltamos com a alternativa mais adequada."
/>
```

---

## Paleta canônica usada

| Token | Valor | Uso |
|---|---|---|
| Hero/Diferenciais/CTA bg | `#142f54` | Cor canônica Saúde |
| Container deep | `#07162a` | Sobre + Modalidades (header) |
| Card bg | `#0b1f3a` | Card de modalidade não-selecionado |
| Detail panel | `#142f54` | Painel expandido (full-width) |
| Card selected ring | `#ae251c/50` (ring-2) | Card de modalidade ativo |
| Light pause | `#F5F5F5` | Operadoras + FAQ |
| Accent | `#ae251c` | Eyebrows, ícones, CTAs, ring ativo |
| WhatsApp | `#25D366` / hover `#1ebe5d` | Botões WhatsApp |
| Text sub dark | `#7a9ab8` | Texto sobre dark |
| Text sub light | `#07162a/55` ou `#07162a/60` | Texto sobre light |
| Text primary dark | `#e0e8f0` | Texto bold sobre dark |

---

## Tokens compartilhados (Tailwind / globals.css)

Já existem no projeto, **reutilizar sem alterações**:
- `.section-pad` (padding vertical padrão)
- `.section-tight` (padding vertical reduzido)
- `.dot-grid` (grade de pontos overlay)
- `.text-display` (font display headline)
- `.rule-accent` (régua decorativa vermelha)
- `.ground-divide` (divisor entre FAQ items)
- `.tabular` (font-variant-numeric)

---

## Acessibilidade

- Hero CTA `[ Comparar planos → ]` faz scroll para `#saude-form` — verificar `scroll-behavior: smooth`
- Modalidades cards são `<button>` com `aria-expanded` e `aria-controls`
- Painel expandido tem `role="region"` e `aria-labelledby`
- FAQ items são `<button>` com `aria-expanded`
- Imagem do hero tem `alt` descritivo
- Logos no `LogoLoop` têm `alt` por operadora (não decorativos)
- Reduced motion respeitado via `useReducedMotion` quando aplicável (já padrão nos componentes existentes)

---

## Performance

- Hero image: `priority` + `sizes="(max-width:1024px) 0px, 50vw"` (não carrega em mobile)
- Logos: `loading="lazy"` (default do `LogoLoop`)
- Sem novas fontes — usa `var(--font-outfit)` e `var(--font-display)` existentes
- Tree-shaking dos ícones Lucide já é automático

---

## Esqueleto para outras páginas

Este pattern de "página institucional sem AudienceToggle" (Hero → Sobre → 4 Modalidades accordion → Diferenciais → Operadoras → FAQ → CTA Form) substitui o esqueleto antigo (Hero PF/PJ → AnimatePresence → Form).

Páginas que podem reutilizar este esqueleto: **Seguros** e **Soluções Financeiras** (ajustando paleta, ícones, modalidades e operadoras). Pattern visual apenas — não há componente compartilhado.
