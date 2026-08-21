import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { IconArrowUpRight } from './Icons'

type ButtonLinkProps = {
  variant?: 'primary' | 'outline' | 'dark'
  children: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>

const base =
  'group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 text-[13px] font-semibold tracking-[0.04em] transition-all duration-300 ease-out active:scale-[0.98] sm:text-sm'

const variants = {
  primary: 'bg-brand text-black hover:shadow-lg hover:shadow-brand/25 hover:brightness-105',
  outline: 'border border-white/25 text-white hover:border-white/70 hover:bg-white/[0.07]',
  dark: 'bg-black text-white hover:bg-neutral-800',
} as const

/**
 * CTA do site: pill limpa, sem itálico nem moeda. A seta desliza para a
 * direita no hover, dando a direção sem poluir o botão.
 */
export function ButtonLink({ variant = 'primary', children, ...rest }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]}`} {...rest}>
      <span className="inline-flex items-center gap-2.5">{children}</span>
      <IconArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 opacity-70 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </a>
  )
}
