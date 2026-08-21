import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { navLinks, site } from '../../data/site'
import { scrollToId, travarScroll } from '../../hooks/useLenis'
import { raizDoSite } from '../../lib/rotas'
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

  // Trava o scroll (nativo e o suave do Lenis) com o menu aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    travarScroll(open)
    return () => {
      document.body.style.overflow = ''
      travarScroll(false)
    }
  }, [open])

  // O menu só existe no mobile: alargar a janela com ele aberto travaria a página
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 1024px)')
    const fechar = () => mq.matches && setOpen(false)
    fechar()
    mq.addEventListener('change', fechar)
    return () => mq.removeEventListener('change', fechar)
  }, [open])

  const goTo = (href: string) => {
    setOpen(false)
    // espera o menu fechar antes de rolar
    requestAnimationFrame(() => scrollToId(href))
  }

  /** Links de âncora rolam a página; os demais navegam para a rota. */
  const linkProps = (href: string) =>
    href.startsWith('#')
      ? {
          href,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault()
            goTo(href)
          },
        }
      : { href: `${raizDoSite()}${href}` }

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
                {...linkProps(link.href)}
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
            className="group hidden min-h-11 items-center gap-2.5 rounded-full bg-brand px-5 text-[13px] font-semibold tracking-[0.02em] text-black transition-all duration-300 hover:brightness-105 hover:shadow-lg hover:shadow-brand/25 sm:inline-flex"
          >
            Solicitar orçamento
            <IconArrowUpRight className="h-4 w-4 opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
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
            className="fixed inset-0 top-0 z-[-1] flex h-dvh flex-col justify-between gap-10 overflow-y-auto bg-black px-6 pt-28 pb-10 lg:hidden"
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
                        {...linkProps(link.href)}
                        className="font-display block py-2 text-4xl text-white transition-colors hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Atalho direto para a frota */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
                className="mt-9 border-t border-white/10 pt-7"
              >
                <a
                  href="#frota"
                  onClick={(e) => {
                    e.preventDefault()
                    goTo('#frota')
                  }}
                  className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-all duration-300 hover:border-brand hover:bg-brand hover:text-black"
                >
                  Conhecer a frota
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
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
                className="flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold tracking-[0.02em] text-black"
              >
                <IconWhatsApp className="h-5 w-5" />
                Solicitar orçamento
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
