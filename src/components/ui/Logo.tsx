import { site } from '../../data/site'

/**
 * Logo da empresa.
 * Coloque os arquivos em /public: `logo-light.png` (para fundo escuro, usado na
 * navbar e no rodapé) e `logo.png` (para fundo claro). Depois troque
 * HAS_LOGO_FILES para true. Enquanto isso, aparece o nome em texto.
 */
const variants = {
  light: { src: './logo-light.png', width: 800, height: 299 },
  badge: { src: './logo.png', width: 550, height: 298 },
} as const

type LogoProps = {
  variant?: keyof typeof variants
  className?: string
}

const HAS_LOGO_FILES = true

export function Logo({ variant = 'light', className }: LogoProps) {
  if (!HAS_LOGO_FILES) {
    return (
      <span
        className={`font-display inline-flex items-center text-lg whitespace-nowrap text-current ${className ?? ''}`}
      >
        {site.name}
      </span>
    )
  }

  const v = variants[variant]
  return (
    <img src={v.src} alt={site.name} width={v.width} height={v.height} className={className} />
  )
}
