import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { site } from '../../data/site'
import { obras } from '../../data/obras'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { IconArrowUpRight, IconInstagram, IconPlay } from '../ui/Icons'

const posts = [
  {
    video: './videos/insta-1.mp4',
    poster: './videos/insta-1.jpg',
    caption: 'Carga e transporte de terra',
  },
  {
    video: './videos/insta-2.mp4',
    poster: './videos/insta-2.jpg',
    caption: 'Escavação e movimentação de solo',
  },
  {
    video: './videos/insta-3.mp4',
    poster: './videos/insta-3.jpg',
    caption: 'Frota própria em operação',
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
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-950">
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
            className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/25"
          />
          <button
            type="button"
            onClick={play}
            aria-label={`Assistir vídeo: ${caption}`}
            className="absolute inset-0 flex cursor-pointer items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-black shadow-lg shadow-black/30 transition-transform duration-300 ease-out group-hover:scale-110">
              <IconPlay className="ml-0.5 h-6 w-6" />
            </span>
          </button>

          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-10">
            <span className="text-sm font-semibold text-white">{caption}</span>
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

        {/* Obras realizadas */}
        {obras.map((obra) => (
          <Reveal key={obra.titulo} delay={0.08}>
            <div className="mt-10">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="font-display text-xl text-white sm:text-2xl">{obra.titulo}</h3>
                <span className="rounded-full border border-brand/40 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-brand uppercase">
                  {obra.local}
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3">
                {obra.fotos.map((foto, i) => (
                  <figure
                    key={foto.src}
                    className={`overflow-hidden rounded-xl bg-neutral-950 ${
                      i === 0 ? 'col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      loading="lazy"
                      className={`h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.04] ${
                        i === 0 ? 'aspect-video lg:aspect-[4/3]' : 'aspect-[4/3]'
                      }`}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

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
            className="mt-10 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-2 select-none active:cursor-grabbing lg:cursor-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post) => (
              <div
                key={post.video}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]"
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
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex min-h-13 cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-white/70 py-2 pr-2 pl-7 text-sm font-bold tracking-widest text-white uppercase italic transition-all duration-200 ease-out hover:border-white hover:bg-white/10 active:scale-[0.97]"
            >
              <span className="relative z-10 inline-flex items-center gap-2.5">
                <IconInstagram className="h-4.5 w-4.5" />
                Visite nosso Instagram
              </span>
              <span
                aria-hidden="true"
                className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 ease-out group-hover:scale-110"
              >
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            <p className="text-sm text-white/60">{site.instagramHandle}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
