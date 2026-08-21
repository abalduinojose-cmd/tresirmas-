import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { travarScroll } from '../../hooks/useLenis'
import { IconChevronDown } from './Icons'

export type ItemLightbox = {
  src: string
  titulo: string
  descricao?: string
}

type LightboxProps = {
  itens: ItemLightbox[]
  /** Índice aberto, ou null com o visualizador fechado. */
  indice: number | null
  aoFechar: () => void
  aoTrocar: (indice: number) => void
}

/**
 * Visualizador de imagem em tela cheia: abre a foto ampliada, navega entre
 * as demais e fecha no Esc, no X ou clicando fora.
 */
export function Lightbox({ itens, indice, aoFechar, aoTrocar }: LightboxProps) {
  const aberto = indice !== null
  const item = aberto ? itens[indice] : null

  const anterior = useCallback(() => {
    if (indice === null) return
    aoTrocar((indice - 1 + itens.length) % itens.length)
  }, [indice, itens.length, aoTrocar])

  const proximo = useCallback(() => {
    if (indice === null) return
    aoTrocar((indice + 1) % itens.length)
  }, [indice, itens.length, aoTrocar])

  // Teclado: Esc fecha, setas navegam
  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') aoFechar()
      if (e.key === 'ArrowLeft') anterior()
      if (e.key === 'ArrowRight') proximo()
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberto, aoFechar, anterior, proximo])

  // Congela a página atrás do visualizador
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    travarScroll(aberto)
    return () => {
      document.body.style.overflow = ''
      travarScroll(false)
    }
  }, [aberto])

  return (
    <AnimatePresence>
      {aberto && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ampliada: ${item.titulo}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={aoFechar}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
        >
          {/* Fechar */}
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar foto ampliada"
            className="absolute top-4 right-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand hover:text-black sm:top-6 sm:right-6"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {itens.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  anterior()
                }}
                aria-label="Foto anterior"
                className="absolute left-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand hover:text-black sm:left-6"
              >
                <IconChevronDown className="h-5 w-5 rotate-90" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  proximo()
                }}
                aria-label="Próxima foto"
                className="absolute right-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand hover:text-black sm:right-6"
              >
                <IconChevronDown className="h-5 w-5 -rotate-90" />
              </button>
            </>
          )}

          <motion.figure
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
          >
            <img
              src={item.src}
              alt={item.titulo}
              className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl shadow-black/60"
            />
            <figcaption className="text-center">
              <p className="font-display text-lg text-white sm:text-xl">{item.titulo}</p>
              {item.descricao && (
                <p className="mt-1.5 text-sm text-white/60">{item.descricao}</p>
              )}
              {itens.length > 1 && (
                <p className="mt-3 text-xs text-white/40">
                  {(indice ?? 0) + 1} de {itens.length}
                </p>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
