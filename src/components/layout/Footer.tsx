import { Fragment } from 'react'
import { navLinks, site } from '../../data/site'
import { scrollToId } from '../../hooks/useLenis'
import { raizDoSite } from '../../lib/rotas'
import { Logo } from '../ui/Logo'
import { Trace } from '../ui/Trace'
import {
  IconArrowUpRight,
  IconFacebook,
  IconGoogleMono,
  IconInstagram,
  IconPin,
  IconWhatsApp,
} from '../ui/Icons'

// Redes sem link cadastrado ficam ocultas automaticamente.
const socials = [
  { href: site.instagram, label: `Instagram da ${site.name}`, Icon: IconInstagram },
  { href: site.googleProfile, label: `Perfil da ${site.name} no Google`, Icon: IconGoogleMono },
  { href: site.facebook, label: `Facebook da ${site.name}`, Icon: IconFacebook },
].filter((social) => social.href)

/**
 * Rodapé centralizado com a assinatura da casa: abre com o traço diagonal,
 * a tagline vira a peça central em Archivo e a página termina apoiada
 * numa base dourada sólida, o chão da obra.
 */
export function Footer() {
  return (
    <footer id="contato" className="overflow-hidden bg-black text-white">
      {/* O traço assinatura abre o rodapé */}
      <Trace className="w-full" />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 pt-12 text-center md:px-8 md:pt-16">
        <Logo variant="light" className="h-14 w-auto md:h-16" />

        {/* A tagline como peça central */}
        <p className="font-display mt-8 text-[2rem] leading-[1.08] text-white sm:text-4xl md:text-5xl">
          Do solo bruto ao <span className="text-brand">nível perfeito.</span>
        </p>

        {/* Contato direto */}
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-3.5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-black transition-transform duration-300 ease-out group-hover:scale-110">
            <IconWhatsApp className="h-5 w-5" />
          </span>
          <span className="font-display text-xl text-white transition-colors group-hover:text-brand md:text-2xl">
            {site.phoneDisplay}
          </span>
        </a>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm leading-relaxed text-white/55">
          <IconPin className="h-4.5 w-4.5 shrink-0 text-brand" />
          {site.address}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/40">
          Segunda a sexta, das 7h às 18h · Atendemos todo o estado de Minas Gerais.
        </p>

        {/* Navegação em linha, separada por pontos dourados */}
        <nav aria-label="Navegação do rodapé" className="mt-9 w-full">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5">
            {navLinks.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 && (
                  <li aria-hidden="true">
                    <span className="block h-1 w-1 rounded-full bg-brand/50" />
                  </li>
                )}
                <li>
                  <a
                    {...(link.href.startsWith('#')
                      ? {
                          href: link.href,
                          onClick: (e: React.MouseEvent) => {
                            e.preventDefault()
                            scrollToId(link.href)
                          },
                        }
                      : { href: `${raizDoSite()}${link.href}` })}
                    className="inline-block text-[11px] font-bold tracking-[0.22em] text-white/55 uppercase italic transition-colors duration-200 hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>

        {/* Redes */}
        <div className="mt-8 flex flex-col items-center gap-3.5 pb-12 md:pb-14">
          <div className="flex gap-2.5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white/65 transition-all duration-200 hover:border-brand hover:bg-brand hover:text-black"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          {site.instagramHandle && (
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-brand"
            >
              {site.instagramHandle}
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>

      {/* A base dourada: o chão que sustenta a página */}
      <div className="bg-brand text-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-1.5 px-5 py-4 text-[11px] font-bold tracking-[0.14em] uppercase sm:flex-row sm:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          {site.cnpj && <p className="text-black/70">CNPJ {site.cnpj}</p>}
          <p>Uberlândia · MG</p>
        </div>
      </div>
    </footer>
  )
}
