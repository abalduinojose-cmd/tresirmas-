import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1] as const

/** Divisor: o traço amarelo cresce da esquerda para a direita ao entrar no viewport. */
export function Trace({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div aria-hidden="true" className={`h-1.5 overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full origin-left bg-brand"
        style={{ clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)' }}
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE }}
      />
    </div>
  )
}
