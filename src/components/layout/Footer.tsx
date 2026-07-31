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

/** Etiqueta de coluna do rodapé. */
function ColumnTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-6 text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">
      {children}
    </h2>
  )
}

/** Rodapé moderno: fios finos, tipografia grande e contato em destaque. */
export function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-black text-white">
      {/* Fio dourado que abre o rodapé */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-brand/50 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
        {/* Marca + chamada principal */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo variant="light" className="h-14 w-auto md:h-16" />
            <p className="font-display mt-7 max-w-lg text-[1.6rem] leading-[1.15] text-white sm:text-3xl md:text-[2.4rem]">
              {site.tagline}
            </p>
          </div>

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.06]"
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
        </div>

        {/* Colunas */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <ColumnTitle>Navegação</ColumnTitle>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(link.href)
                    }}
                    className="inline-block text-sm text-white/65 transition-all duration-200 ease-out hover:translate-x-1 hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Onde estamos</ColumnTitle>
            <p className="flex items-start gap-3 text-sm leading-relaxed text-white/65">
              <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" />
              {site.address}
            </p>
          </div>

          <div>
            <ColumnTitle>Atendimento</ColumnTitle>
            <p className="text-sm leading-relaxed text-white/65">
              Uberlândia e todo o estado
              <br />
              de Minas Gerais.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/40">
              Segunda a sexta, das 7h às 18h.
            </p>
          </div>

          <div>
            <ColumnTitle>Redes</ColumnTitle>
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
                className="group mt-4 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-brand"
              >
                {site.instagramHandle}
                <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Barra final */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-9 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
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
