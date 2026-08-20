import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { ButtonLink } from '../ui/Button'
import { IconGoogle, IconWhatsApp } from '../ui/Icons'

/** CTA final: cartão branco limpo, tudo no eixo central, uma ação só. */
export function FinalCTA() {
  return (
    <section aria-label="Solicite um orçamento" className="bg-black px-5 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col items-center rounded-[2rem] bg-white px-7 py-14 text-center md:rounded-[2.5rem] md:px-16 md:py-20">
            <p className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-neutral-500 uppercase">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
              Orçamento sem compromisso
            </p>

            <h2 className="font-display mt-6 max-w-3xl text-[1.9rem] text-black sm:text-5xl lg:text-[3.4rem]">
              Precisa de máquinas para sua obra?
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600 md:text-lg">
              Chama no WhatsApp e receba a resposta de quem entende de obra.
            </p>

            <div className="mt-10">
              <ButtonLink
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
              >
                <IconWhatsApp className="h-4.5 w-4.5 text-brand" />
                Chamar no WhatsApp
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <a
                href={site.phoneHref}
                className="font-bold text-black transition-opacity hover:opacity-70"
              >
                {site.phoneDisplay}
              </a>
              <span aria-hidden="true" className="hidden h-4 w-px bg-neutral-200 sm:block" />
              <p className="flex items-center gap-2 text-neutral-500">
                <IconGoogle className="h-4 w-4" />
                {site.googleReviewCount} avaliações no Google
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
