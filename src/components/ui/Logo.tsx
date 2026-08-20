import { site } from '../../data/site'

/**
 * Logo da empresa (arquivo em /public/logo.webp, 300x264).
 * As medidas abaixo precisam bater com as do arquivo: é o que reserva o
 * espaço certo antes da imagem carregar e evita o texto pular na navbar.
 */
const LOGO = { src: './logo.webp', width: 300, height: 264 } as const

type LogoProps = {
  /** Mantido por compatibilidade: hoje a mesma arte serve fundo claro e escuro. */
  variant?: 'light' | 'badge'
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src={LOGO.src}
      alt={site.name}
      width={LOGO.width}
      height={LOGO.height}
      className={className}
    />
  )
}
