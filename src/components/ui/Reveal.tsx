import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/**
 * Scroll-reveal padrão do site: fade + subida curta, uma única vez.
 * Deslocamento pequeno e duração enxuta para o conteúdo assentar
 * sem chamar atenção para a própria animação.
 */
export function Reveal({ children, delay = 0, y = 12, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
