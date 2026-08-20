import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { reviews } from '../../data/reviews'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { IconArrowUpRight, IconChevronDown, IconGoogle, IconStar } from '../ui/Icons'

/**
 * Carrossel de avaliações do Google: arrasta para o lado (touch e mouse)
 * com scroll-snap, além das setas no desktop.
 */
export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0 })

  if (reviews.length === 0) return null

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('article')
    const step = card ? card.getBoundingClientRect().width + 20 : 360
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  // Arrastar com o mouse (no touch o scroll horizontal já é nativo)
  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return
    drag.current = { down: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft }
  }
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!drag.current.down || !trackRef.current) return
    trackRef.current.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX)
  }
  const endDrag = () => {
    drag.current.down = false
  }

  return (
    <section id="avaliacoes" className="bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTag>Avaliações</SectionTag>
              <h2 className="font-display max-w-3xl text-[1.9rem] text-black sm:text-5xl lg:text-6xl">
                Quem contrata, recomenda
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <p className="flex items-center gap-2.5 text-base font-semibold text-neutral-800">
                  <IconGoogle className="h-5 w-5" />
                  {site.googleReviewCount} avaliações no Google
                </p>
                <a
                  href={site.googleProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-black underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand-deep"
                >
                  Ver perfil no Google
                  <IconArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Setas (desktop) */}
            <div className="hidden gap-2.5 md:flex">
              <button
                type="button"
                aria-label="Avaliações anteriores"
                onClick={() => scrollByCard(-1)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/15 text-black/60 transition-colors hover:border-brand hover:bg-brand hover:text-black"
              >
                <IconChevronDown className="h-5 w-5 rotate-90" />
              </button>
              <button
                type="button"
                aria-label="Próximas avaliações"
                onClick={() => scrollByCard(1)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/15 text-black/60 transition-colors hover:border-brand hover:bg-brand hover:text-black"
              >
                <IconChevronDown className="h-5 w-5 -rotate-90" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={trackRef}
            role="region"
            aria-label="Avaliações de clientes, arraste para o lado"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className="mt-9 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-4 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review) => (
              <article
                key={review.name}
                className="relative w-[85%] shrink-0 snap-start rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:w-[400px]"
              >
                <IconGoogle className="absolute top-6 right-6 h-5 w-5 opacity-80" />

                <div className="flex items-center gap-3.5 pr-8">
                  <img
                    src={review.avatar}
                    alt={`Foto de ${review.name}`}
                    width={48}
                    height={48}
                    draggable={false}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-black">{review.name}</h3>
                    <p className="text-xs text-neutral-500">
                      {review.badge} · {review.timeAgo}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-4 flex gap-0.5"
                  role="img"
                  aria-label={`Nota ${review.rating} de 5 estrelas`}
                >
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <IconStar key={s} className="h-4 w-4 text-brand" />
                  ))}
                </div>

                <blockquote className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                  “{review.text}”
                </blockquote>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-xs text-neutral-400">
            Avaliações públicas do perfil da {site.name} no Google. Arraste para o lado para ver
            mais.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
