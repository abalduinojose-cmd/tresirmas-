/**
 * Avaliações reais (5 estrelas) do perfil da Terraplanagem Três Irmãs no Google.
 * As fotos de perfil ficam em /public/reviews/.
 */
export type Review = {
  name: string
  avatar: string
  badge: string
  timeAgo: string
  text: string
  rating: number
}

export const reviews: Review[] = [
  {
    name: 'João Barbosa Neto',
    avatar: './reviews/joao.png',
    badge: 'Local Guide',
    timeAgo: '3 meses atrás',
    text: 'Empresa tradicional no ramo, profissionais confiáveis, experientes.',
    rating: 5,
  },
  {
    name: 'Eliomar Meireles Gomes',
    avatar: './reviews/eliomar.png',
    badge: 'Local Guide',
    timeAgo: 'um ano atrás',
    text: 'Atendimento de excelência, a secretária é super educada, a terra vermelha é a melhor que nós já compramos em Uberlândia! Super recomendo!',
    rating: 5,
  },
  {
    name: 'Deon Borges',
    avatar: './reviews/deon.png',
    badge: 'Local Guide',
    timeAgo: '4 anos atrás',
    text: 'Atendimento perfeito, pessoal muito educado e comprometido.',
    rating: 5,
  },
  {
    name: 'Matheus Sousa',
    avatar: './reviews/matheus.png',
    badge: 'Local Guide',
    timeAgo: 'um ano atrás',
    text: 'Serviço prestado com qualidade e preço bom.',
    rating: 5,
  },
  {
    name: 'Stenio Vieira Mello',
    avatar: './reviews/stenio.png',
    badge: 'Local Guide',
    timeAgo: '2 anos atrás',
    text: 'Pessoal amigo, correto, ótimos serviços. Indico.',
    rating: 5,
  },
  {
    name: 'Viviane Crosara',
    avatar: './reviews/viviane.png',
    badge: 'Local Guide',
    timeAgo: '3 anos atrás',
    text: 'Excelente atendimento!',
    rating: 5,
  },
  {
    name: 'Celso Obo',
    avatar: './reviews/celso.png',
    badge: 'Cliente',
    timeAgo: '7 anos atrás',
    text: 'Empresa muito boa, trabalha com segurança, qualidade e eficaz. Recomendo.',
    rating: 5,
  },
  {
    name: 'Anderson Alvarenga',
    avatar: './reviews/anderson.png',
    badge: 'Local Guide',
    timeAgo: '5 anos atrás',
    text: 'É o melhor preço da cidade!!!',
    rating: 5,
  },
  {
    name: 'Marıa Paula Penteado Augusto',
    avatar: './reviews/maria-paula.png',
    badge: 'Local Guide',
    timeAgo: 'um ano atrás',
    text: 'Excelentes parceiros da Jurema Tijolaria',
    rating: 5,
  },
  {
    name: 'Elias Teodoro',
    avatar: './reviews/elias.png',
    badge: 'Cliente',
    timeAgo: '4 anos atrás',
    text: 'Atendimento muito bom e entrega rápida',
    rating: 5,
  },
  {
    name: 'Emerson Alves Pinto',
    avatar: './reviews/emerson.png',
    badge: 'Local Guide',
    timeAgo: '3 anos atrás',
    text: 'Ótimo fornecedor e cliente',
    rating: 5,
  },
  {
    name: 'Rosemeire Candido',
    avatar: './reviews/rosemeire.png',
    badge: 'Local Guide',
    timeAgo: '5 anos atrás',
    text: 'Atendimento excelente.',
    rating: 5,
  },
]
