import { cities, site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { IconPin } from '../ui/Icons'

/** Linhas topográficas decorativas, bem sutis, no fundo. */
function TopoLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/3 opacity-[0.06]"
      viewBox="0 0 600 400"
      fill="none"
      preserveAspectRatio="xMaxYMid slice"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${-40 + i * 30} 400 C ${120 + i * 40} ${300 - i * 24}, ${260 + i * 30} ${330 - i * 30}, ${420 + i * 26} ${210 - i * 22} S ${640} ${120 - i * 14}, ${680} ${60 - i * 10}`}
          stroke="#ffffff"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

export function Coverage() {
  return (
    <section id="atendimento" className="relative overflow-hidden bg-black py-16 md:py-24">
      <TopoLines />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTag tone="light">Área de atendimento</SectionTag>
          <h2 className="font-display max-w-3xl text-[1.9rem] text-white sm:text-5xl lg:text-6xl">
            Onde a gente <span className="text-brand">opera</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Sede no bairro Vida Nova, em Uberlândia, com estrutura e frota própria para atender
            obras em todo o estado de Minas Gerais.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-9 flex flex-wrap gap-3">
            {cities.map((city) => (
              <li key={city.name}>
                <span
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold tracking-wider uppercase transition-colors ${
                    city.highlight
                      ? 'border-brand bg-brand text-black'
                      : 'border-white/20 text-white/85 hover:border-brand/70'
                  }`}
                >
                  <IconPin className="h-4 w-4" />
                  {city.name}
                  {city.highlight && (
                    <span className="rounded-full bg-black px-2 py-0.5 text-[10px] tracking-[0.2em] text-brand">
                      Sede
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-sm text-white/45">
            Precisa da gente na sua cidade?{' '}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand"
            >
              Consulta a gente no WhatsApp
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
