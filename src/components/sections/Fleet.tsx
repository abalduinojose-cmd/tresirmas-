import { machines, type Machine } from '../../data/machines'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { useAutoplayInView } from '../../hooks/useAutoplayInView'

/** Card com vídeo da máquina em ação (lazy: só toca quando visível). */
function MachineVideoCard({ machine }: { machine: Machine & { video: string } }) {
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

/** Card placeholder claramente marcado, pronto para receber a foto. */
function MachinePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center bg-neutral-950"
      style={{
        backgroundImage:
          'repeating-linear-gradient(-55deg, rgba(255,255,255,0.03) 0 18px, transparent 18px 36px)',
      }}
    >
      <span className="rounded-md bg-brand px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-black uppercase">
        Foto em breve
      </span>
    </div>
  )
}

export function Fleet() {
  return (
    <section id="frota" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTag>Nossa frota</SectionTag>
          <h2 className="font-display max-w-3xl text-[1.9rem] text-black sm:text-5xl lg:text-6xl">
            Máquinas prontas para o serviço
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Frota própria, revisada e operada por profissionais treinados. Veja as máquinas em
            ação.
          </p>
        </Reveal>

        {/* Mobile: lista compacta, nomes grandes e legíveis (vídeos viram cards) */}
        <Reveal delay={0.08}>
          <ol className="mt-10 sm:hidden">
            {machines.map((machine, i) =>
              machine.video ? (
                <li key={machine.name} className="py-3">
                  <article className="group relative aspect-video overflow-hidden rounded-xl bg-black">
                    <MachineVideoCard machine={{ ...machine, video: machine.video }} />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-xl text-white">{machine.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/65">
                        {machine.description}
                      </p>
                    </div>
                  </article>
                </li>
              ) : (
                <li
                  key={machine.name}
                  className="flex items-baseline gap-4 border-b border-neutral-200 py-4"
                >
                  <span aria-hidden="true" className="font-display shrink-0 text-sm text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-black">{machine.name}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
                      {machine.description}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ol>
        </Reveal>

        {/* Desktop: grade com vídeos e placeholders */}
        <div className="mt-14 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine, i) => (
            <Reveal key={machine.name} delay={(i % 3) * 0.08}>
              <article className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
                {machine.video ? (
                  <MachineVideoCard machine={{ ...machine, video: machine.video }} />
                ) : (
                  <MachinePlaceholder />
                )}

                {/* Traço no hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-full z-10 h-[3px] w-full bg-brand transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg text-white xl:text-xl">{machine.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">
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
