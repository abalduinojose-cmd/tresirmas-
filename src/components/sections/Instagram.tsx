import { useRef, useState } from 'react'
import { site } from '../../data/site'
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

/** Vitrine do Instagram: vídeos reais do perfil, com convite para seguir. */
export function Instagram() {
  return (
    <section id="instagram" className="bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTag tone="light">Instagram</SectionTag>
          <h2 className="font-display max-w-3xl text-[1.9rem] text-white sm:text-5xl lg:text-6xl">
            Acompanhe a obra <span className="text-brand">de perto</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Máquinas em ação, obras entregues e o dia a dia da equipe direto do nosso perfil.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.video} delay={i * 0.08}>
              <InstagramCard {...post} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
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
            <p className="text-sm text-white/40">{site.instagramHandle}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
