import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { navLinks, site } from '../../data/site'
import { scrollToId } from '../../hooks/useLenis'
import { Logo } from '../ui/Logo'
import { IconArrowUpRight, IconWhatsApp } from '../ui/Icons'

const EASE = [0.22, 1, 0.36, 1] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Fio de progresso da leitura, com inércia suave
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trava o scroll do body com o menu aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (href: string) => {
    setOpen(false)
    // espera o menu fechar antes de rolar
    requestAnimationFrame(() => scrollToId(href))
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled && !open
          ? 'border-b border-white/10 bg-black/80 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand transition-opacity duration-300 ${
          scrolled && !open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <nav
        aria-label="Navegação principal"
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 md:px-8 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <a
          href="#hero"
          aria-label={`${site.name}, voltar ao topo`}
          onClick={(e) => {
            e.preventDefault()
            goTo('#hero')
          }}
          className="shrink-0"
        >
          <Logo
            variant="light"
            className={`w-auto transition-all duration-300 ${
              scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'
            }`}
          />
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  goTo(link.href)
                }}
                className="group relative text-sm font-semibold tracking-wider text-white/85 uppercase transition-colors hover:text-white"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 -skew-x-[20deg] bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden items-center gap-2.5 overflow-hidden rounded-full bg-brand py-1.5 pr-1.5 pl-5 text-sm font-bold tracking-wider text-black uppercase italic transition-shadow duration-200 hover:shadow-lg hover:shadow-brand/30 sm:inline-flex"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-full w-full -skew-x-[20deg] bg-black/15 transition-transform duration-500 ease-out group-hover:translate-x-[220%]"
            />
            <span className="relative">Solicitar Orçamento</span>
            <span
              aria-hidden="true"
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 ease-out group-hover:scale-110"
            >
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

          {/* Botão menu mobile */}
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg lg:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-brand transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Menu mobile fullscreen */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-0 z-[-1] flex h-dvh flex-col justify-between gap-10 overflow-y-auto bg-black px-6 pt-28 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <nav aria-label="Menu mobile">
                <ul className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, delay: 0.06 * i, ease: EASE }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          goTo(link.href)
                        }}
                        className="font-display block py-2 text-4xl text-white transition-colors hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Texto institucional: vive só aqui no menu */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
                className="mt-9 border-t border-white/10 pt-7"
              >
                <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold tracking-[0.32em] text-white/40 uppercase">
                  <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
                  Sobre a Três Irmãs
                </p>
                <p className="max-w-md text-sm leading-relaxed text-white/55">
                  Fundada em 2008, somos uma empresa familiar especializada em serviços de
                  terraplanagem. Estamos preparados para atender projetos de pequeno, médio e
                  grande porte, oferecendo sempre soluções inteligentes e econômicas para quem
                  precisa construir ou reformar.
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
                  Nosso compromisso é agregar valor à sua obra com serviços executados dentro dos
                  mais rigorosos padrões de qualidade e segurança. Acima de tudo, prezamos por uma
                  relação transparente, próxima e dinâmica, garantindo um atendimento
                  personalizado e de confiança.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
              className="shrink-0 space-y-4"
            >
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-bold tracking-wider text-black uppercase italic"
              >
                <IconWhatsApp className="h-5 w-5" />
                Solicitar Orçamento
              </a>
              <p className="text-center text-sm text-white/50">
                {site.phoneDisplay} · {site.city}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
