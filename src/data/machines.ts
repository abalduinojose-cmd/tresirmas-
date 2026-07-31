/**
 * Frota da Terraplanagem Três Irmãs. Para adicionar o vídeo de uma máquina:
 * 1. Coloque o arquivo .mp4 em /public/videos/
 * 2. Preencha `video` com '/videos/nome-do-arquivo.mp4'
 * 3. (Opcional) Gere um poster .jpg e aponte em `poster`
 * Máquinas sem `video` aparecem como card "vídeo em breve".
 */
export type Machine = {
  name: string
  description: string
  video: string | null
  poster: string | null
}

export const machines: Machine[] = [
  {
    name: 'Escavadeira Hidráulica',
    description: 'Escavação e movimentação de grandes volumes de terra.',
    video: './videos/hero-desktop.mp4',
    poster: './videos/hero-desktop.jpg',
  },
  {
    name: 'Retroescavadeira',
    description: 'Versatilidade para valas, fundações e carregamento.',
    video: null,
    poster: null,
  },
  {
    name: 'Trator de Esteira',
    description: 'Força bruta para corte, aterro e nivelamento pesado.',
    video: null,
    poster: null,
  },
  {
    name: 'Caminhão Basculante',
    description: 'Transporte ágil de terra, brita e material de obra.',
    video: null,
    poster: null,
  },
  {
    name: 'Rolo Compactador',
    description: 'Compactação uniforme para bases e pavimentação.',
    video: null,
    poster: null,
  },
  {
    name: 'Motoniveladora',
    description: 'Acabamento fino de plataformas, estradas e acessos.',
    video: null,
    poster: null,
  },
]
