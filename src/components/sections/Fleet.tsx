import { machines, type Machine } from '../../data/machines'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { useAutoplayInView } from '../../hooks/useAutoplayInView'

/** Vídeo da máquina em ação (lazy: só toca quando visível). */
function MachineVideo({ machine }: { machine: Machine & { video: string } }) {
  const videoRef = useAutoplayInView()

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      src={machine.video}
      poster={machine.poster ?? undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Vídeo: ${machine.name} em operação`}
    />
  )
}

/** Área de mídia enquanto a foto real não chega. */
function MachinePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center bg-neutral-100"
      style={{
        backgroundImage:
          'repeating-linear-gradient(-55deg, rgba(0,0,0,0.03) 0 16px, transparent 16px 32px)',
      }}
    >
      <span className="rounded-md bg-brand px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-black uppercase">
        Foto em breve
      </span>
    </div>
  )
}

/**
 * Catálogo da frota: cartões claros com a mídia em cima e o nome embaixo.
 * Máquinas com vídeo ganham largura dupla no celular; as demais mostram
 * o selo "foto em breve" até a foto real chegar.
 */
export function Fleet() {
  return (
    <section id="frota" className="bg-neutral-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTag>Nossa frota</SectionTag>
          <h2 className="font-display max-w-3xl text-[1.9rem] text-black sm:text-5xl lg:text-6xl">
            Máquinas prontas para o serviço
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Frota própria, revisada e operada por profissionais treinados, pronta para qualquer
            volume de obra.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 md:mt-14 lg:grid-cols-3">
          {machines.map((machine, i) => (
            <Reveal
              key={machine.name}
              delay={(i % 3) * 0.06}
              className={machine.video ? 'col-span-2 lg:col-span-1' : ''}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/60 hover:shadow-xl hover:shadow-neutral-900/10">
                <div
                  className={`relative overflow-hidden ${
                    machine.video ? 'aspect-video bg-neutral-950 lg:aspect-[4/3]' : 'aspect-[4/3]'
                  }`}
                >
                  {machine.video ? (
                    <MachineVideo machine={{ ...machine, video: machine.video }} />
                  ) : (
                    <MachinePlaceholder />
                  )}

                  {/* Número de catálogo */}
                  <span
                    aria-hidden="true"
                    className="font-display absolute top-3 left-3 z-10 rounded-md bg-black/60 px-2 py-0.5 text-[11px] text-brand backdrop-blur-sm"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Traço no hover */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 -left-full z-10 h-[3px] w-full bg-brand transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center px-4 py-3.5 sm:px-5 sm:py-4">
                  <h3 className="font-display text-[15px] leading-snug text-black sm:text-lg">
                    {machine.name}
                  </h3>
                  <p className="mt-1 hidden text-[13px] leading-relaxed text-neutral-500 sm:block">
                    {machine.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-sm text-neutral-500">
            Procurando outra máquina? A frota é ampla.{' '}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-black underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand"
            >
              Chama no WhatsApp
            </a>{' '}
            que a gente resolve.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
