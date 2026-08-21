import { useEffect, useRef, useState } from 'react'
import { anosDeEmpresa, site } from '../../data/site'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { Trace } from '../ui/Trace'
import { ButtonLink } from '../ui/Button'
import { IconWhatsApp } from '../ui/Icons'

/** Fotos reais da operação, alternadas em looping ao lado do texto. */
const fotos = [
  {
    src: './sobre/2.jpg',
    alt: 'Pá carregadeira movimentando terra em área aberta',
  },
  {
    src: './sobre/3.jpg',
    alt: 'Escavadeira hidráulica escavando o solo em obra da Três Irmãs',
  },
  {
    src: './sobre/4.jpg',
    alt: 'Motoniveladora e caminhões basculantes da frota prontos para o serviço',
  },
  {
    src: './sobre/1.jpg',
    alt: 'Pá carregadeira Komatsu preparando terreno em obra urbana de Uberlândia',
  },
  {
    src: './sobre/5.jpg',
    alt: 'Entrada da sede da Terraplanagem Três Irmãs, em Uberlândia',
  },
]

const INTERVALO = 2000

/**
 * Alterna as fotos da operação a cada 2 segundos, em looping. Quem pede menos
 * movimento continua vendo todas as fotos, só sem a dissolvência.
 */
function CarrosselFotos() {
  const [atual, setAtual] = useState(0)
  const reduzido = usePrefersReducedMotion()
  const caixaRef = useRef<HTMLDivElement>(null)

  // Só troca de foto enquanto a seção está na tela: sem isso o intervalo
  // roda a página inteira à toa.
  useEffect(() => {
    const el = caixaRef.current
    if (!el) return

    let id: ReturnType<typeof setInterval> | undefined
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && id === undefined) {
          id = setInterval(() => setAtual((i) => (i + 1) % fotos.length), INTERVALO)
        } else if (!entrada.isIntersecting && id !== undefined) {
          clearInterval(id)
          id = undefined
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (id !== undefined) clearInterval(id)
    }
  }, [])

  return (
    <div
      ref={caixaRef}
      role="img"
      aria-label="Máquinas da Terraplanagem Três Irmãs em operação"
      className="relative aspect-[4/5] w-full sm:aspect-[16/12] lg:aspect-[4/5]"
    >
      {fotos.map((foto, i) => (
        <img
          key={foto.src}
          src={foto.src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-out ${
            reduzido ? 'duration-300' : 'duration-1000'
          } ${i === atual ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* Traços indicando em qual foto o carrossel está */}
      <div aria-hidden="true" className="absolute right-5 bottom-6 z-10 flex gap-1.5">
        {fotos.map((foto, i) => (
          <span
            key={foto.src}
            className={`h-[3px] rounded-full transition-all duration-500 ease-out ${
              i === atual ? 'w-6 bg-brand' : 'w-2.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

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
  return (
    <section id="sobre" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-white pt-14 pb-16 md:rounded-t-[3.5rem] md:pt-20 md:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Texto institucional */}
        <div>
          <Reveal>
            <SectionTag>A empresa</SectionTag>
            <h2 className="font-display text-[1.75rem] text-black sm:text-5xl lg:text-6xl">
              Toda grande obra começa por uma <span className="text-brand">base sólida</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
              A Terraplanagem Três Irmãs oferece soluções completas para que sua obra comece com
              a máxima segurança e precisão. Cuidamos de cada etapa do solo: do nivelamento e
              compactação à escavação, limpeza de lotes e abertura de valas e fossas.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
              São {anosDeEmpresa} anos de excelência técnica, maquinário próprio de ponta e equipe
              qualificada para atender desde obras residenciais até grandes empreendimentos
              industriais, sempre com rigor no cumprimento dos prazos.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-7 flex flex-wrap gap-2">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-neutral-700 ring-1 ring-neutral-200/90 transition-colors duration-200 hover:ring-brand/60 sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-3 shrink-0 -skew-x-[20deg] bg-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8">
              <ButtonLink href={site.whatsapp} target="_blank" rel="noopener noreferrer" variant="dark">
                <IconWhatsApp className="h-4.5 w-4.5 text-brand" />
                Fale com a gente
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Mídia com o selo dos 18 anos */}
        <Reveal delay={0.15} className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-black">
            <CarrosselFotos />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />

            {/* Selo discreto: só o número em dourado e uma linha de texto */}
            <div className="absolute bottom-5 left-5 flex items-baseline gap-2.5">
              <span className="font-display text-brand text-3xl leading-none sm:text-4xl">
                {anosDeEmpresa}
              </span>
              <span className="text-[13px] leading-tight font-medium text-white/90">
                anos movendo
                <br />
                terra em Minas
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-5 md:mt-18 md:px-8">
        <Trace />
      </div>
    </section>
  )
}
