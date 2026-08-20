/**
 * Obras já realizadas, exibidas na seção "Serviços feitos".
 * Para adicionar uma obra: coloque as fotos em /public/obras/ e
 * acrescente um item aqui (a primeira foto ganha destaque no celular).
 */
export type Obra = {
  titulo: string
  local: string
  fotos: { src: string; alt: string }[]
}

export const obras: Obra[] = [
  {
    titulo: 'Bases e escavações para construção',
    local: 'Uberlândia',
    fotos: [
      {
        src: './obras/base-aerea.webp',
        alt: 'Vista aérea da escavação de base para construção em Uberlândia',
      },
      {
        src: './obras/base-escavacao.jpg',
        alt: 'Escavadeira hidráulica trabalhando na escavação da base',
      },
      {
        src: './obras/base-pronta.webp',
        alt: 'Platô nivelado e pronto para receber a construção',
      },
    ],
  },
  {
    titulo: 'Nivelamento e preparo de platô',
    local: 'Uberlândia',
    fotos: [
      {
        src: './obras/nivelamento-urbano.jpg',
        alt: 'Pá carregadeira nivelando o terreno rebaixado de uma obra em Uberlândia',
      },
      {
        src: './obras/plato-pronto.jpg',
        alt: 'Platô nivelado e compactado, pronto para o início da construção',
      },
    ],
  },
  {
    titulo: 'Terraplenagem em área rural',
    local: 'Região de Uberlândia',
    fotos: [
      {
        src: './obras/rural-komatsu.jpg',
        alt: 'Pá carregadeira Komatsu preparando o terreno em propriedade rural',
      },
    ],
  },
  {
    titulo: 'Bolsão para captação de água',
    local: 'Área rural',
    fotos: [
      {
        src: './obras/bolsao.jpg',
        alt: 'Bolsão escavado para captação de água em área rural',
      },
    ],
  },
  {
    titulo: 'Desassoreamento do Rio Uberabinha',
    local: 'Usina Martins',
    fotos: [
      {
        src: './obras/uberabinha-1.jpg',
        alt: 'Escavadeira hidráulica escavando o leito do Rio Uberabinha',
      },
      {
        src: './obras/uberabinha-2.jpg',
        alt: 'Movimentação de terra no desassoreamento do Rio Uberabinha',
      },
      {
        src: './obras/uberabinha-3.jpg',
        alt: 'Frente de trabalho do desassoreamento na Usina Martins',
      },
    ],
  },
]
