const whatsappMessage =
  'Olá! Vim pelo site da Terraplanagem Três Irmãs e gostaria de solicitar um orçamento.'

/** Somente dígitos, com DDI 55. */
const whatsappNumber = '5534991675216'

export const site = {
  name: 'Terraplanagem Três Irmãs',
  legalName: 'Terraplanagem Três Irmãs',
  cnpj: '09.301.856/0001-71',
  tagline: 'Do solo bruto ao nível perfeito.',
  phoneDisplay: '(34) 99167-5216',
  phoneHref: `tel:+${whatsappNumber}`,
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  instagram: 'https://www.instagram.com/terraplanagemtresirmas/',
  instagramHandle: '@terraplanagemtresirmas',
  facebook: '',
  facebookHandle: '',
  address: 'Rua Pedro Mamede, 70, Vida Nova, Uberlândia, MG · CEP 38409-053',
  city: 'Uberlândia, MG',
  googleProfile: 'https://share.google/cKfY6JdqiluKqZL7H',
  googleRating: '4,4',
  googleReviewCount: 53,
} as const

/** A cidade com `highlight` aparece marcada como sede. */
export const cities = [
  { name: 'Uberlândia', highlight: true },
  { name: 'Todo o estado de Minas', highlight: false },
] as const

export const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Frota', href: '#frota' },
  { label: 'Serviços feitos', href: '#obras' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Atendimento', href: '#atendimento' },
] as const
