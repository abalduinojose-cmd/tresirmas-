/**
 * Frota da Terraplanagem Três Irmãs. Cada máquina pode ter:
 * - `video` (mp4 em /public/videos/) com `poster` opcional, ou
 * - `photo` (jpg em /public/frota/), ou
 * - nada: aparece o selo "foto em breve" até o material chegar.
 */
export type Machine = {
  name: string
  description: string
  video: string | null
  poster: string | null
  photo: string | null
}

export const machines: Machine[] = [
  {
    name: 'Pá Carregadeira',
    description: 'Carregamento rápido de terra, cascalho e materiais.',
    video: null,
    poster: null,
    photo: './frota/pa-carregadeira.webp',
  },
  {
    name: 'Retroescavadeira',
    description: 'Versatilidade para valas, fundações e carregamento.',
    video: './videos/retroescavadeira.mp4',
    poster: './frota/retroescavadeira.jpg',
    photo: null,
  },
  {
    name: 'Motoniveladora',
    description: 'Acabamento fino de plataformas, estradas e acessos.',
    video: null,
    poster: null,
    photo: './frota/motoniveladora.jpg',
  },
  {
    name: 'Escavadeira Hidráulica',
    description: 'Escavação e movimentação de grandes volumes de terra.',
    video: null,
    poster: null,
    photo: './frota/escavadeira.jpg',
  },
  {
    name: 'Rolo Compactador',
    description: 'Compactação uniforme para bases e pavimentação.',
    video: null,
    poster: null,
    photo: './frota/rolo-compactador.jpg',
  },
  {
    name: 'Trator com Grade',
    description: 'Gradeamento e preparo do solo para nivelar e plantar.',
    video: null,
    poster: null,
    photo: null,
  },
  {
    name: "Caminhão-Pipa d'Água",
    description: 'Água para a obra e controle de poeira nos acessos.',
    video: null,
    poster: null,
    photo: null,
  },
  {
    name: 'Caminhão Basculante Truck',
    description: 'Grandes volumes de terra e cascalho por viagem.',
    video: null,
    poster: null,
    photo: './frota/basculante-truck.jpg',
  },
  {
    name: 'Caminhão Basculante Toco',
    description: 'Agilidade em acessos estreitos e obras urbanas.',
    video: null,
    poster: null,
    photo: null,
  },
]
