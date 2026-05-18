'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type FAQBlock =
  | { type: 'p'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'ul'; items: string[] }

type FAQItem = {
  q: string
  body: FAQBlock[]
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: 'Qual a diferença entre plano individual, coletivo por adesão e empresarial?',
    body: [
      { type: 'p', text: 'Os planos de saúde variam conforme a modalidade de contratação e elegibilidade do beneficiário.' },
      { type: 'h4', text: 'Individual ou familiar' },
      { type: 'p', text: 'Contratado diretamente pela pessoa física, com cobertura destinada ao titular e seus dependentes.' },
      { type: 'h4', text: 'Coletivo por adesão' },
      { type: 'p', text: 'Voltado a profissionais vinculados a entidades de classe, sindicatos, associações ou conselhos profissionais elegíveis.' },
      { type: 'h4', text: 'Empresarial' },
      { type: 'p', text: 'Destinado a empresas de diferentes portes, incluindo MEIs, PMEs e grandes operações, mediante contratação vinculada ao CNPJ.' },
      { type: 'p', text: 'Cada modalidade possui características específicas relacionadas a:' },
      { type: 'ul', items: ['elegibilidade', 'reajustes', 'regras contratuais', 'composição do grupo', 'carências', 'formatos de contratação'] },
      { type: 'p', text: 'Por isso, a análise adequada do perfil e da necessidade é fundamental antes da contratação.' },
    ],
  },
  {
    q: 'MEI pode contratar plano empresarial?',
    body: [
      { type: 'p', text: 'Sim. O Microempreendedor Individual (MEI) pode contratar plano de saúde empresarial, desde que atenda aos critérios estabelecidos pela operadora e possua CNPJ ativo dentro das exigências regulatórias.' },
      { type: 'p', text: 'As condições variam conforme:' },
      { type: 'ul', items: ['tempo de abertura da empresa', 'número mínimo de vidas', 'operadora', 'região de comercialização', 'modalidade contratada'] },
      { type: 'p', text: 'Em muitos casos, o plano empresarial pode representar uma alternativa estratégica de custo-benefício para profissionais formalizados e suas famílias.' },
    ],
  },
  {
    q: 'Quem pode contratar plano coletivo por adesão?',
    body: [
      { type: 'p', text: 'Os planos coletivos por adesão são destinados a profissionais vinculados a:' },
      { type: 'ul', items: ['entidades de classe', 'sindicatos', 'associações profissionais', 'conselhos profissionais', 'categorias elegíveis'] },
      { type: 'p', text: 'A contratação depende da comprovação de vínculo com a entidade responsável pela adesão ao contrato coletivo.' },
      { type: 'p', text: 'Essa modalidade pode oferecer condições diferenciadas de contratação, mas exige análise criteriosa sobre:' },
      { type: 'ul', items: ['elegibilidade', 'regras de permanência', 'cobertura', 'rede credenciada', 'reajustes', 'cenário de longo prazo'] },
    ],
  },
  {
    q: 'Como escolher o plano ideal?',
    body: [
      { type: 'p', text: 'A escolha do plano de saúde envolve mais do que comparação de preço. É importante analisar fatores como:' },
      { type: 'ul', items: ['perfil de utilização', 'faixa etária', 'rede hospitalar', 'abrangência geográfica', 'acomodação', 'coparticipação', 'previsibilidade financeira', 'necessidades familiares ou empresariais', 'cenário de médio e longo prazo'] },
      { type: 'p', text: 'Além disso, diferentes modalidades podem apresentar vantagens específicas conforme o perfil do cliente.' },
      { type: 'p', text: 'A HOLD realiza uma análise consultiva e personalizada para auxiliar na construção da solução mais adequada para cada realidade.' },
    ],
  },
  {
    q: 'O que é carência no plano de saúde?',
    body: [
      { type: 'p', text: 'Carência é o período contado a partir do início de vigência do contrato em que determinadas coberturas ainda não podem ser utilizadas integralmente.' },
      { type: 'p', text: 'A Lei nº 9.656/98 estabelece prazos máximos de carência para planos regulamentados, incluindo:' },
      { type: 'ul', items: ['24 horas para urgência e emergência', 'até 180 dias para consultas, exames, internações e demais procedimentos', '300 dias para parto a termo', 'até 24 meses para cobertura parcial temporária relacionada a doenças ou lesões preexistentes'] },
      { type: 'p', text: 'Os prazos podem variar conforme:' },
      { type: 'ul', items: ['operadora', 'modalidade do plano', 'campanhas promocionais', 'análise de redução de carência', 'portabilidade'] },
    ],
  },
  {
    q: 'É possível reduzir ou aproveitar carências?',
    body: [
      { type: 'p', text: 'Sim, em alguns casos. Dependendo do histórico do beneficiário e das regras da operadora, pode haver:' },
      { type: 'ul', items: ['redução de carências', 'aproveitamento de prazos já cumpridos', 'portabilidade de carências', 'campanhas promocionais específicas'] },
      { type: 'p', text: 'A análise depende de fatores como:' },
      { type: 'ul', items: ['tempo de permanência no plano anterior', 'compatibilidade entre produtos', 'documentação apresentada', 'regras regulatórias da ANS', 'critérios da operadora'] },
      { type: 'p', text: 'Cada situação deve ser avaliada individualmente.' },
    ],
  },
  {
    q: 'Os planos de saúde seguem regulamentação da ANS e da Lei nº 9.656/98?',
    body: [
      { type: 'p', text: 'Sim. Os planos de saúde regulamentados seguem as diretrizes estabelecidas pela Agência Nacional de Saúde Suplementar (ANS) e pela Lei nº 9.656/98, principal legislação da saúde suplementar no Brasil.' },
      { type: 'p', text: 'A regulamentação estabelece regras relacionadas a:' },
      { type: 'ul', items: ['cobertura mínima obrigatória', 'carências', 'urgência e emergência', 'reajustes', 'portabilidade', 'doenças e lesões preexistentes', 'direitos dos beneficiários', 'responsabilidades das operadoras', 'segmentação assistencial', 'funcionamento dos contratos'] },
      { type: 'p', text: 'Além disso, a ANS também define o Rol de Procedimentos e Eventos em Saúde, que representa a cobertura mínima obrigatória dos planos regulamentados.' },
      { type: 'p', text: 'A HOLD auxilia seus clientes na compreensão dessas regras para proporcionar mais clareza, segurança e previsibilidade na tomada de decisão.' },
    ],
  },
  {
    q: 'Como funcionam os atendimentos de urgência e emergência nos planos de saúde?',
    body: [
      { type: 'p', text: 'Os atendimentos de urgência e emergência possuem regras específicas definidas pela Lei nº 9.656/98 e pela regulamentação da ANS.' },
      { type: 'h4', text: 'O que é considerado emergência?' },
      { type: 'p', text: 'São situações que impliquem risco imediato à vida ou possibilidade de lesões irreparáveis ao paciente, conforme declaração médica.' },
      { type: 'h4', text: 'O que é considerado urgência?' },
      { type: 'p', text: 'São situações resultantes de:' },
      { type: 'ul', items: ['acidentes pessoais', 'complicações no processo gestacional'] },
      { type: 'h4', text: 'Qual o prazo de cobertura?' },
      { type: 'p', text: 'Nos planos regulamentados, o prazo máximo de carência para atendimentos de urgência e emergência é de 24 horas após o início da vigência contratual.' },
      { type: 'p', text: 'Após esse período, o beneficiário passa a ter direito à cobertura conforme a segmentação do plano contratado e as regras previstas em contrato.' },
      { type: 'h4', text: 'Como funciona a cobertura nos planos hospitalares?' },
      { type: 'p', text: 'Nos planos com cobertura hospitalar, os atendimentos de urgência e emergência podem incluir:' },
      { type: 'ul', items: ['pronto atendimento', 'exames', 'procedimentos', 'medicamentos utilizados durante o atendimento', 'internações', 'cirurgias', 'tratamentos necessários à estabilização do quadro clínico'] },
      { type: 'h4', text: 'Como funciona nos planos exclusivamente ambulatoriais?' },
      { type: 'p', text: 'Nos planos exclusivamente ambulatoriais, a cobertura de urgência e emergência é limitada às primeiras 12 horas de atendimento.' },
      { type: 'p', text: 'Caso exista necessidade de internação após esse período, podem ser aplicadas regras específicas previstas contratualmente e na regulamentação da ANS. Nessas situações, pode haver:' },
      { type: 'ul', items: ['remoção do paciente', 'encaminhamento ao SUS', 'continuidade assistencial conforme segmentação contratada'] },
      { type: 'h4', text: 'O que acontece em casos de doença ou lesão preexistente?' },
      { type: 'p', text: 'Quando houver Cobertura Parcial Temporária (CPT) relacionada a doença ou lesão preexistente declarada, podem existir limitações temporárias para:' },
      { type: 'ul', items: ['procedimentos de alta complexidade', 'cirurgias', 'leitos de alta tecnologia relacionados à condição declarada'] },
      { type: 'p', text: 'Ainda assim, permanecem garantidos os atendimentos necessários à estabilização do quadro de urgência ou emergência conforme previsto na legislação.' },
      { type: 'h4', text: 'Por que é importante analisar o contrato?' },
      { type: 'p', text: 'As condições de cobertura podem variar conforme:' },
      { type: 'ul', items: ['modalidade do plano', 'segmentação assistencial', 'abrangência', 'tipo de acomodação', 'coparticipação', 'carências', 'CPT', 'regras da operadora'] },
      { type: 'p', text: 'A HOLD auxilia seus clientes na compreensão dessas condições, buscando mais clareza, segurança e previsibilidade na escolha do plano mais adequado.' },
    ],
  },
  {
    q: 'A HOLD trabalha com quais seguradoras/operadoras?',
    body: [
      { type: 'p', text: 'A HOLD atua com diferentes seguradoras/operadoras do mercado, buscando identificar as soluções mais adequadas ao perfil e às necessidades de cada cliente. Entre elas:' },
      { type: 'ul', items: ['Amil', 'Bradesco Saúde', 'Hapvida', 'Omint', 'Porto Seguro', 'Seguros Unimed', 'SulAmérica', 'Unimed'] },
      { type: 'p', text: 'A disponibilidade pode variar conforme:' },
      { type: 'ul', items: ['região', 'modalidade', 'perfil do beneficiário', 'elegibilidade', 'regras comerciais vigentes'] },
    ],
  },
  {
    q: 'A HOLD acompanha após a contratação?',
    body: [
      { type: 'p', text: 'Sim. Nosso trabalho vai além da contratação do plano. A HOLD atua com acompanhamento próximo e suporte consultivo para auxiliar clientes em diferentes etapas da jornada, incluindo:' },
      { type: 'ul', items: ['análise de utilização', 'orientações contratuais', 'movimentações cadastrais', 'dúvidas operacionais', 'reavaliações estratégicas', 'suporte relacionado às modalidades contratadas'] },
      { type: 'p', text: 'O objetivo é proporcionar mais segurança, clareza e continuidade no relacionamento com cada cliente.' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }

function renderBlock(block: FAQBlock, i: number) {
  switch (block.type) {
    case 'p':
      return (
        <p key={i} className="mt-3 text-[#07162a]/60 text-sm leading-relaxed">
          {block.text}
        </p>
      )
    case 'h4':
      return (
        <h4 key={i} className="mt-6 text-[#07162a] font-semibold text-sm">
          {block.text}
        </h4>
      )
    case 'ul':
      return (
        <ul key={i} className="mt-3 space-y-1.5">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-[#07162a]/60 text-sm leading-relaxed">
              <span className="mt-2 h-1 w-1 rounded-full bg-[#ae251c] shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )
  }
}

export default function SaudeFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  function toggle(index: number) {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section
      id="saude-faq"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07162a]/55"
          >
            DÚVIDAS FREQUENTES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            Perguntas frequentes sobre planos de saúde
          </motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openItems.includes(index)
            const contentId = `saude-faq-content-${index}`
            return (
              <motion.div key={index} variants={fadeUp} className="ground-divide">
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen ? 'true' : 'false'}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-[#07162a] font-medium text-sm md:text-base leading-snug group-hover:text-[#ae251c] transition-colors">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className="shrink-0 text-[#7a9ab8] group-hover:text-[#ae251c] transition-colors"
                  >
                    <Plus size={18} strokeWidth={1.6} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={contentId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-8">
                        {item.body.map((block, i) => renderBlock(block, i))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
