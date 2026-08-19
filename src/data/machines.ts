/**
 * Frota da Terraplanagem Três Irmãs. Para adicionar o vídeo de uma máquina:
 * 1. Coloque o arquivo .mp4 em /public/videos/
 * 2. Preencha `video` com '/videos/nome-do-arquivo.mp4'
 * 3. (Opcional) Gere um poster .jpg e aponte em `poster`
 * Máquinas sem `video` aparecem como card "vídeo em breve" no desktop
 * e como item da lista compacta no mobile.
 */
export type Machine = {
  name: string
  description: string
  video: string | null
  poster: string | null
}

export const machines: Machine[] = [
  {
    name: 'Pá Carregadeira',
    description: 'Carregamento rápido de terra, cascalho e materiais.',
    video: null,
    poster: null,
  },
  {
    name: 'Retroescavadeira',
    description: 'Versatilidade para valas, fundações e carregamento.',
    video: null,
    poster: null,
  },
  {
    name: 'Motoniveladora',
    description: 'Acabamento fino de plataformas, estradas e acessos.',
    video: null,
    poster: null,
  },
  {
    name: 'Escavadeira Hidráulica',
    description: 'Escavação e movimentação de grandes volumes de terra.',
    video: './videos/hero-desktop.mp4',
    poster: './videos/hero-desktop.jpg',
  },
  {
    name: 'Rolo Compactador',
    description: 'Compactação uniforme para bases e pavimentação.',
    video: null,
    poster: null,
  },
  {
    name: 'Trator com Grade',
    description: 'Gradeamento e preparo do solo para nivelar e plantar.',
    video: null,
    poster: null,
  },
  {
    name: "Caminhão-Pipa d'Água",
    description: 'Água para a obra e controle de poeira nos acessos.',
    video: null,
    poster: null,
  },
  {
    name: 'Caminhão Basculante Truck',
    description: 'Grandes volumes de terra e cascalho por viagem.',
    video: null,
    poster: null,
  },
  {
    name: 'Caminhão Basculante Toco',
    description: 'Agilidade em acessos estreitos e obras urbanas.',
    video: null,
    poster: null,
  },
]
