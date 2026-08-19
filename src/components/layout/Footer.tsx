import { navLinks, site } from '../../data/site'
import { scrollToId } from '../../hooks/useLenis'
import { Logo } from '../ui/Logo'
import {
  IconArrowUpRight,
  IconFacebook,
  IconInstagram,
  IconPin,
  IconWhatsApp,
} from '../ui/Icons'

// Redes sem link cadastrado ficam ocultas automaticamente.
const socials = [
  { href: site.instagram, label: `Instagram da ${site.name}`, Icon: IconInstagram },
  { href: site.facebook, label: `Facebook da ${site.name}`, Icon: IconFacebook },
].filter((social) => social.href)

/**
 * Rodapé centralizado: marca no alto, tagline, WhatsApp em destaque,
 * navegação em linha e contatos, tudo empilhado no eixo central.
 */
export function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-black text-white">
      {/* Fio dourado que abre o rodapé */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-brand/50 to-transparent"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pt-20 text-center md:px-8 md:pt-24">
        <Logo variant="light" className="h-16 w-auto md:h-20" />

        <p className="font-display mt-7 max-w-lg text-[1.6rem] leading-[1.15] text-white sm:text-3xl md:text-[2.2rem]">
          {site.tagline}
        </p>

        {/* Contato em destaque */}
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left text-white transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.06]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-black transition-transform duration-300 ease-out group-hover:scale-110">
            <IconWhatsApp className="h-5.5 w-5.5" />
          </span>
          <span>
            <span className="block text-[10px] font-semibold tracking-[0.3em] text-white/40 uppercase">
              Fale com a gente
            </span>
            <span className="font-display text-xl transition-colors group-hover:text-brand md:text-2xl">
              {site.phoneDisplay}
            </span>
          </span>
          <IconArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </a>

        {/* Navegação em linha */}
        <nav aria-label="Navegação do rodapé" className="mt-10 w-full">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(link.href)
                  }}
                  className="inline-block rounded-full px-3.5 py-2 text-[11px] font-bold tracking-[0.18em] text-white/50 uppercase italic transition-colors duration-200 hover:bg-white/[0.06] hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Endereço e atendimento */}
        <div className="mt-8 space-y-2.5 text-sm leading-relaxed text-white/55">
          <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <IconPin className="h-4.5 w-4.5 shrink-0 text-brand" />
            {site.address}
          </p>
          <p className="text-white/40">
            Atendimento em Uberlândia e todo o estado de Minas Gerais · Segunda a sexta, das 7h às
            18h.
          </p>
        </div>

        {/* Redes */}
        <div className="mt-9 flex flex-col items-center gap-3.5">
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

      {/* Barra final */}
      <div className="relative mx-auto mt-14 max-w-7xl px-5 md:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent md:inset-x-8"
        />
        <div className="flex flex-col items-center gap-2.5 py-8 text-xs text-white/30 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          {site.cnpj && (
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand/60" />
              CNPJ {site.cnpj}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
