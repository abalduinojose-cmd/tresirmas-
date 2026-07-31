import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { ButtonLink } from '../ui/Button'
import { IconGoogle, IconWhatsApp } from '../ui/Icons'

/** CTA final: cartão dourado minimalista, com a ação isolada por um fio. */
export function FinalCTA() {
  return (
    <section aria-label="Solicite um orçamento" className="bg-black px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="rounded-[2rem] bg-brand px-7 py-16 md:rounded-[2.5rem] md:px-16 md:py-24">
            <div className="grid gap-12 md:grid-cols-[1.25fr_auto_0.75fr] md:items-center md:gap-16">
              {/* Mensagem */}
              <div>
                <p className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-black/45 uppercase">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-black/40" />
                  Orçamento sem compromisso
                </p>
                <h2 className="font-display mt-5 text-[1.9rem] text-black sm:text-5xl lg:text-[3.4rem]">
                  Precisa de máquinas para sua obra?
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-black/65 md:text-lg">
                  Chama no WhatsApp e receba a resposta de quem entende de obra.
                </p>
              </div>

              {/* Fio separando a mensagem da ação */}
              <div aria-hidden="true" className="hidden h-full w-px bg-black/12 md:block" />

              {/* Ação */}
              <div className="flex flex-col items-start gap-6">
                <ButtonLink
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="dark"
                >
                  <IconWhatsApp className="h-4.5 w-4.5 text-brand" />
                  Chamar no WhatsApp
                </ButtonLink>

                <div className="space-y-2.5 border-t border-black/12 pt-5 text-sm">
                  <a
                    href={site.phoneHref}
                    className="block font-bold text-black transition-opacity hover:opacity-70"
                  >
                    {site.phoneDisplay}
                  </a>
                  <p className="flex items-center gap-2 text-black/55">
                    <IconGoogle className="h-4 w-4" />
                    {site.googleReviewCount} avaliações no Google
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
