import { useEffect } from 'react'
import { ANO_FUNDACAO, site } from '../data/site'
import { raizDoSite } from '../lib/rotas'
import { WhatsAppButton } from '../components/layout/WhatsAppButton'
import { Logo } from '../components/ui/Logo'
import { Trace } from '../components/ui/Trace'
import { Reveal } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'
import { IconArrowUpRight, IconPin, IconWhatsApp } from '../components/ui/Icons'

/** Página institucional /sobre: a história da empresa em uma tela só. */
export function SobrePage() {
  // Mesmo título que o pos-build grava no HTML da rota, para não divergirem.
  useEffect(() => {
    document.title = `Sobre a ${site.name} | Empresa familiar desde ${ANO_FUNDACAO}`
  }, [])

  const raiz = raizDoSite()

  return (
    <div className="flex min-h-dvh flex-col bg-black text-white">
      <Trace className="w-full" />

      {/* Topo enxuto: logo volta para a home */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <a href={raiz || './'} aria-label={`${site.name}, voltar ao início`}>
          <Logo variant="light" className="h-12 w-auto md:h-14" />
        </a>
        <a
          href={raiz || './'}
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-white/55 uppercase italic transition-colors hover:text-brand"
        >
          Voltar ao site
          <IconArrowUpRight className="h-3.5 w-3.5 rotate-45" />
        </a>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pt-10 pb-20 md:px-8 md:pt-16">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-5 flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.32em] text-white/60 uppercase">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
                Sobre a Três Irmãs
              </p>
              <h1 className="font-display text-[2rem] leading-[1.08] text-white sm:text-5xl">
                Uma empresa familiar <span className="text-brand">movendo terra</span> desde{' '}
                {ANO_FUNDACAO}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                Fundada em 2008, somos uma empresa familiar especializada em serviços de
                terraplanagem. Estamos preparados para atender projetos de pequeno, médio e
                grande porte, oferecendo sempre soluções inteligentes e econômicas para quem
                precisa construir ou reformar.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                Nosso compromisso é agregar valor à sua obra com serviços executados dentro dos
                mais rigorosos padrões de qualidade e segurança. Acima de tudo, prezamos por uma
                relação transparente, próxima e dinâmica, garantindo um atendimento personalizado
                e de confiança.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <ButtonLink href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp className="h-4.5 w-4.5" />
                  Falar com a gente
                </ButtonLink>
                <a
                  href={site.phoneHref}
                  className="font-display text-xl text-white transition-colors hover:text-brand"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-10 flex items-start gap-2.5 text-sm leading-relaxed text-white/60">
                <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" />
                {site.address}
              </p>
            </Reveal>
          </div>

          {/* A sede, com o totem da empresa */}
          <Reveal delay={0.15}>
            <figure className="relative overflow-hidden rounded-2xl bg-neutral-950">
              <img
                src={`${raiz}sede.jpg`}
                alt={`Totem da ${site.name} na entrada da sede, em Uberlândia`}
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-12 text-sm font-semibold text-white">
                Nossa sede em Uberlândia, MG
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </main>

      {/* A base dourada, assinatura do site */}
      <div className="bg-brand text-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-1.5 px-5 py-4 text-[11px] font-bold tracking-[0.14em] uppercase sm:flex-row sm:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Uberlândia · MG</p>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  )
}
