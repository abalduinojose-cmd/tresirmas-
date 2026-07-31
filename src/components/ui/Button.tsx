import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { IconArrowUpRight } from './Icons'

type ButtonLinkProps = {
  variant?: 'primary' | 'outline' | 'dark'
  children: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>

const base =
  'group relative inline-flex min-h-13 cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full py-2 pl-7 pr-2 text-sm font-bold tracking-widest uppercase italic transition-all duration-200 ease-out active:scale-[0.97]'

const variants = {
  primary: 'bg-brand text-black hover:shadow-lg hover:shadow-brand/30',
  outline: 'border-2 border-white/70 text-white hover:border-white hover:bg-white/10',
  dark: 'bg-black text-white hover:shadow-lg hover:shadow-black/30',
} as const

const coins = {
  primary: 'bg-black/10 text-black',
  outline: 'bg-white/15 text-white',
  dark: 'bg-white/15 text-brand',
} as const

/**
 * CTA do site: pill com "moeda" de seta na ponta. No hover, o traço
 * atravessa o botão e a seta avança, como o corte do logo.
 */
export function ButtonLink({ variant = 'primary', children, ...rest }: ButtonLinkProps) {
  const traceColor =
    variant === 'primary' ? 'bg-black/15' : variant === 'dark' ? 'bg-brand/40' : 'bg-white/25'

  return (
    <a className={`${base} ${variants[variant]}`} {...rest}>
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 -left-full w-full -skew-x-[20deg] ${traceColor} transition-transform duration-500 ease-out group-hover:translate-x-[220%]`}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
      <span
        aria-hidden="true"
        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${coins[variant]} transition-transform duration-300 ease-out group-hover:scale-110`}
      >
        <IconArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  )
}
