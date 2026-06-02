/**
 * Real Google reviews for HOLD - Consórcios, Seguros e Planos de Saúde
 * Source: https://www.google.com/search?q=HOLD+SEGUROS+uberlandia
 * Aggregated rating: 4.9 / 39 reviews
 *
 * Curated subset selected by:
 *   - completeness of text (skip empty review entries)
 *   - inclusion of full name
 *   - distinct praise angles (atendimento, contemplação, sinistro, parceria, etc.)
 */

export interface GoogleReview {
  name: string
  text: string
  rating: 1 | 2 | 3 | 4 | 5
}

export const googleReviews: GoogleReview[] = [
  {
    name: 'Tatiane Mendes Borges Dias',
    rating: 5,
    text: 'Sou cliente da Hold há alguns anos e sempre renovo meus seguros com eles. O atendimento é excelente: ágil, atencioso e com total transparência em todas as etapas. A equipe está sempre disponível para tirar dúvidas e encontrar as melhores soluções.',
  },
  {
    name: 'Igor Tavares',
    rating: 5,
    text: 'Excelente atendimento! O corretor foi extremamente atencioso, prestativo e tirou todas as minhas dúvidas com clareza e paciência. Passou total segurança durante o processo e consegui adquirir meu primeiro carro graças ao consórcio deles! Com certeza recomendo o trabalho e voltarei a procurar sempre que precisar.',
  },
  {
    name: 'Eduardo Shuiti Aoyagui Oda',
    rating: 5,
    text: 'Sou cliente a muitos anos da Hold tanto nos planos de consórcio como em seguros. O que posso dizer é que é uma ótima experiência: renovações sempre feitas com dias de antecedência em relação às cotações, sempre buscando a melhor cobertura.',
  },
  {
    name: 'Flavia Guimarães',
    rating: 5,
    text: 'Empresa séria e de confiança, com atendimento de primeira. O Jacimar foi super atencioso, explicou cada detalhe do consórcio e dos seguros de forma clara e objetiva, transmitindo muita segurança. Excelente profissional, sempre disponível.',
  },
  {
    name: 'Tiago Dias',
    rating: 5,
    text: 'Sou cliente há mais de 10 anos. HOLD é uma empresa extremamente responsável e comprometida com seus clientes. Sempre disponíveis para esclarecer dúvidas e oferecer as melhores soluções, demonstrando transparência e honestidade em todo o processo. Atendimento de excelência e confiança total!',
  },
  {
    name: 'Cristhian José',
    rating: 5,
    text: 'Atendimento de primeira linha: presteza, rapidez, educação e principalmente nesse serviço para nós clientes, fui atendido com empatia o que me deixou extremamente seguro e amparado.',
  },
  {
    name: 'Ana Paula Oliveira',
    rating: 5,
    text: 'Ótima assistência em sinistro. Tive uma experiência em outro estado, fui muito bem atendida e o socorro foi rápido. Super indico.',
  },
  {
    name: 'Ana Cordeiro',
    rating: 5,
    text: 'Atendimento impecável, com transparência e atenção em cada detalhe. Recebi todas as orientações de forma clara e senti total segurança para contratar meu seguro e iniciar meu consórcio. A equipe realmente se preocupa com o cliente e oferece as melhores soluções do mercado. Recomendo de olhos fechados!',
  },
]

export const googleSummary = {
  rating: 4.9,
  count: 39,
  href: 'https://www.google.com/search?q=HOLD+SEGUROS+uberlandia#lrd=0x94a44501a8679115:0x231b333094479e8d,1,,,,',
  writeHref: 'https://www.google.com/search?q=HOLD+SEGUROS+uberlandia#lrd=0x94a44501a8679115:0x231b333094479e8d,3,,,,',
} as const
