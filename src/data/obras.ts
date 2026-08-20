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
