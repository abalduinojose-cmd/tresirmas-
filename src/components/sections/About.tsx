import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { Trace } from '../ui/Trace'
import { ButtonLink } from '../ui/Button'
import { IconWhatsApp } from '../ui/Icons'
import { useAutoplayInView } from '../../hooks/useAutoplayInView'

const bullets = [
  'Nivelamento de terrenos',
  'Escavação e movimentação de terra',
  'Limpeza de lotes',
  'Abertura de valas e fossas',
  'Compactação de solo',
]

/**
 * Segunda dobra: "folha" branca com cantos arredondados que sobe
 * por cima do vídeo do hero, criando a transição suave entre as duas partes.
 */
export function About() {
  const videoRef = useAutoplayInView()

  return (
    <section id="sobre" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-white pt-20 pb-24 md:rounded-t-[3.5rem] md:pt-28 md:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Texto institucional */}
        <div>
          <Reveal>
            <SectionTag>A empresa</SectionTag>
            <h2 className="font-display text-[1.9rem] text-black sm:text-5xl lg:text-6xl">
              Sua obra começa no chão certo
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
              A Terraplanagem Três Irmãs oferece soluções completas para que sua obra comece com
              a máxima segurança e precisão. Cuidamos de cada etapa do solo: do nivelamento e
              compactação à escavação, limpeza de lotes e abertura de valas e fossas.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
              São 18 anos de excelência técnica, maquinário próprio de ponta e equipe qualificada
              para atender desde obras residenciais até grandes empreendimentos industriais,
              sempre com rigor no cumprimento dos prazos.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-neutral-800">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] inline-block h-2 w-3.5 shrink-0 -skew-x-[20deg] bg-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10">
              <ButtonLink href={site.whatsapp} target="_blank" rel="noopener noreferrer" variant="dark">
                <IconWhatsApp className="h-4.5 w-4.5 text-brand" />
                Fale com a gente
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Mídia com selo "Desde 2006" */}
        <Reveal delay={0.15} className="relative">
          <div className="relative overflow-hidden rounded-2xl bg-black">
            <video
              ref={videoRef}
              className="aspect-[4/5] w-full object-cover sm:aspect-[16/12] lg:aspect-[4/5]"
              src="./videos/sobre.mp4"
              poster="./videos/sobre.jpg"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Máquina em operação"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />

            {/* Selo integrado ao vídeo, em vidro */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full border border-white/15 bg-black/45 px-5 py-2.5 backdrop-blur-md">
              <span aria-hidden="true" className="inline-block h-2 w-5 -skew-x-[20deg] bg-brand" />
              <p className="font-display text-lg text-white">Há 18 anos</p>
              <span aria-hidden="true" className="hidden h-4 w-px bg-white/25 sm:block" />
              <p className="hidden text-[11px] font-bold tracking-[0.2em] text-white/70 uppercase sm:block">
                De Uberlândia para toda Minas
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-5 md:mt-28 md:px-8">
        <Trace />
      </div>
    </section>
  )
}
