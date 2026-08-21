import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { site } from '../../data/site'
import { obras } from '../../data/obras'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { IconArrowUpRight, IconInstagram, IconPlay } from '../ui/Icons'

const posts = [
  {
    video: './videos/obra-1.mp4',
    poster: './videos/obra-1.webp',
    caption: 'Nivelamento de terreno para construção',
  },
  {
    video: './videos/obra-2.mp4',
    poster: './videos/obra-2.webp',
    caption: 'Demolição e remoção de entulho',
  },
  {
    video: './videos/obra-3.mp4',
    poster: './videos/obra-3.webp',
    caption: 'Escavação e movimentação de solo',
  },
]

/** Card de vídeo: mostra a capa e só toca quando o cliente dá play. */
function InstagramCard({
  video,
  poster,
  caption,
}: {
  video: string
  poster: string
  caption: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const play = async () => {
    const el = videoRef.current
    setStarted(true)
    if (!el) return
    // preload="none": garante o carregamento antes de tocar
    if (el.readyState === 0) el.load()
    el.muted = false // o play é uma ação do usuário, então pode ter som
    try {
      await el.play()
    } catch {
      // se o navegador bloquear com som, toca sem som
      el.muted = true
      el.play().catch(() => {})
    }
  }

  return (
    <figure className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-white/10">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={video}
        poster={poster}
        controls={started}
        muted
        playsInline
        preload="none"
      />

      {!started && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20 transition-opacity duration-500 group-hover:opacity-90"
          />
          <button
            type="button"
            onClick={play}
            aria-label={`Assistir vídeo: ${caption}`}
            className="absolute inset-0 flex cursor-pointer items-center justify-center"
          >
            {/* Play em vidro: discreto parado, dourado no hover */}
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-brand group-hover:bg-brand group-hover:text-black">
              <IconPlay className="ml-0.5 h-5 w-5" />
            </span>
          </button>

          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <span className="block text-[13px] leading-snug font-semibold text-white sm:text-sm">
              {caption}
            </span>
          </figcaption>
        </>
      )}
    </figure>
  )
}

/** Vitrine do Instagram: vídeos reais do perfil em carrossel arrastável. */
export function Instagram() {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moveu: false })

  // Arrastar com o mouse (no touch o scroll horizontal já é nativo)
  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
      moveu: false,
    }
  }
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!drag.current.down || !trackRef.current) return
    const percorrido = e.clientX - drag.current.startX
    if (Math.abs(percorrido) > 5) drag.current.moveu = true
    trackRef.current.scrollLeft = drag.current.startScroll - percorrido
  }
  const endDrag = () => {
    drag.current.down = false
  }
  // Sem isto, arrastar por cima de um card dispara o play e baixa o vídeo
  const onClickCapture = (e: React.MouseEvent) => {
    if (!drag.current.moveu) return
    e.preventDefault()
    e.stopPropagation()
    drag.current.moveu = false
  }

  return (
    <section id="obras" className="bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTag tone="light">Serviços feitos</SectionTag>
          <h2 className="font-display max-w-3xl text-[1.9rem] text-white sm:text-5xl lg:text-6xl">
            Obra entregue, <span className="text-brand">de perto</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Obras executadas pela nossa equipe e o dia a dia das máquinas no nosso perfil.
          </p>
        </Reveal>

        {/* Obras realizadas, com a foto de abertura em destaque */}
        <div className="mt-12 space-y-12 md:mt-14 md:space-y-16">
          {obras.map((obra) => (
            <Reveal key={obra.titulo} delay={0.06}>
              <article className="border-t border-white/10 pt-7">
                <div>
                  <h3 className="font-display text-xl leading-tight text-white sm:text-2xl lg:text-3xl">
                    {obra.titulo}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-white/50 uppercase">
                    <span aria-hidden="true" className="inline-block h-px w-5 bg-brand" />
                    {obra.local}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
                  {obra.fotos.map((foto, i) => (
                    <figure
                      key={foto.src}
                      className={`group relative overflow-hidden rounded-xl bg-neutral-950 ${
                        i === 0 ? 'col-span-2 lg:row-span-2' : ''
                      }`}
                    >
                      <img
                        src={foto.src}
                        alt={foto.alt}
                        loading="lazy"
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                          i === 0 ? 'aspect-[4/3] lg:aspect-square' : 'aspect-[4/3] lg:aspect-square'
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/10"
                      />
                    </figure>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bastidores em vídeo, no formato vertical do perfil */}
        <Reveal delay={0.08}>
          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-7 md:mt-16">
            <h3 className="font-display text-xl text-white sm:text-2xl">Máquinas em ação</h3>
            <p className="text-xs text-white/50">Direto do nosso Instagram</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={trackRef}
            role="region"
            aria-label="Vídeos do Instagram, arraste para o lado"
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            className="mt-6 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-2 select-none active:cursor-grabbing sm:gap-5 lg:cursor-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post) => (
              <div
                key={post.video}
                className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <InstagramCard {...post} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-5 text-xs text-white/60 lg:hidden">
            Arraste para o lado para ver os vídeos.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:border-brand hover:bg-brand hover:text-black active:scale-[0.98]"
            >
              <IconInstagram className="h-4.5 w-4.5" />
              Visite nosso Instagram
              <IconArrowUpRight className="h-4 w-4 opacity-70 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
            <p className="text-sm text-white/50">{site.instagramHandle}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
