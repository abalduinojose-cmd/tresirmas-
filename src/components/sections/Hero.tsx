import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { ReactNode } from 'react'
import { anosDeEmpresa, site } from '../../data/site'
import { ButtonLink } from '../ui/Button'
import { IconArrowUpRight, IconChevronDown, IconWhatsApp } from '../ui/Icons'
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { scrollToId } from '../../hooks/useLenis'

const EASE = [0.22, 1, 0.36, 1] as const

/** Linha do headline revelada de baixo para cima, com desfoque suave. */
function HeadlineLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: '112%', filter: 'blur(10px)', opacity: 0 }}
        animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
        transition={{
          duration: 1.1,
          ease: EASE,
          delay,
          filter: { duration: 0.8, delay: delay + 0.1 },
          opacity: { duration: 0.6, delay },
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const reduced = usePrefersReducedMotion()

  // Parallax sutil do vídeo + fade do conteúdo ao rolar
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const videoSrc = isMobile ? './videos/hero-mobile.mp4' : './videos/hero-desktop.mp4'
  const poster = isMobile ? './videos/hero-mobile.jpg' : './videos/hero-desktop.jpg'

  // Garante o vídeo rodando mesmo quando o navegador segura o autoplay
  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [videoSrc])

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Apresentação"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-black"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: videoY, scale: videoScale }}
        aria-hidden="true"
      >
        <video
          key={videoSrc}
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Overlay escuro + fade para a transição com a próxima seção */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/55" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 pb-28 md:px-8 md:pt-28 md:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          className="mb-7 flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-white/55 uppercase md:gap-3.5 md:text-[11px] md:tracking-[0.32em]"
        >
          <span aria-hidden="true" className="inline-block h-px w-8 shrink-0 bg-brand" />
          Terraplanagem, máquinas e obras
        </motion.p>

        <h1
          className="font-display max-w-6xl text-[min(calc((100vw-2.5rem)/10.9),4rem)] [font-stretch:105%]! text-white md:text-[min(calc((100vw-4rem)/12),5.6rem)] md:[font-stretch:118%]!"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.45)' }}
        >
          <HeadlineLine delay={0.15}>Construindo</HeadlineLine>
          <HeadlineLine delay={0.34}>
            <span className="relative inline-block text-brand">
              o futuro
              {/* brilho suave atrás da palavra em destaque */}
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.9, ease: 'easeOut' }}
                className="absolute inset-0 -z-10 blur-[40px]"
                style={{ background: 'radial-gradient(closest-side, rgba(215,165,74,0.45), transparent)' }}
              />
            </span>
          </HeadlineLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-balance text-white/80 md:text-lg"
        >
          <strong className="font-semibold text-white">Há {anosDeEmpresa} anos</strong> movendo
          terra em{' '}
          <strong className="font-semibold text-white">Uberlândia e em todo o estado de Minas
          Gerais</strong>, com maquinário de ponta e equipe qualificada do início ao fim.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.72 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          {/* CTA principal: no celular ocupa a largura toda, para o polegar alcançar */}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-brand px-7 text-[15px] font-semibold tracking-[0.01em] text-black shadow-lg shadow-brand/20 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-brand/35 hover:brightness-105 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            <IconWhatsApp className="h-5 w-5 shrink-0" />
            Solicitar orçamento
            <IconArrowUpRight className="h-4 w-4 shrink-0 opacity-60 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </a>
          <ButtonLink
            href="#frota"
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('#frota')
            }}
            className="w-full justify-center sm:w-auto"
          >
            Nossas máquinas
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.button
        type="button"
        aria-label="Rolar para a seção Sobre"
        onClick={() => scrollToId('#sobre')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-white/70 transition-colors hover:text-brand md:flex"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <IconChevronDown className="h-6 w-6" />
        </motion.span>
      </motion.button>
    </section>
  )
}
