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
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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

/**
 * Archivo Black é largo e o Chrome não hifeniza português sozinho: inserimos
 * hífens condicionais (só aparecem se a palavra precisar quebrar) para os
 * nomes longos não vazarem do cartão nas telas estreitas.
 */
function comQuebraSuave(nome: string) {
  return nome.replace(/(\S{7})(?=\S{3})/g, '$1­')
}

/** Fundo enquanto a foto real não chega: hachura sutil e selo dourado. */
function MachinePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
      style={{
        backgroundImage:
          'repeating-linear-gradient(-55deg, rgba(255,255,255,0.045) 0 14px, transparent 14px 28px)',
      }}
    >
      <span className="rounded-full border border-brand/40 px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-brand uppercase">
        Foto em breve
      </span>
    </div>
  )
}

/**
 * Catálogo da frota: todas as máquinas no mesmo formato 4:3, cartão escuro
 * com o nome sobre a imagem. A uniformidade é o que dá o ar de catálogo,
 * mesmo com máquinas em vídeo, foto ou ainda sem registro.
 */
export function Fleet() {
  const comRegistro = machines.filter((m) => m.video || m.photo).length

  return (
    <section id="frota" className="bg-neutral-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <div>
              <SectionTag>Nossa frota</SectionTag>
              <h2 className="font-display max-w-3xl text-[1.9rem] text-black sm:text-5xl lg:text-6xl">
                Máquinas prontas para o serviço
              </h2>
            </div>
            <p className="font-display shrink-0 text-sm text-neutral-400">
              <span className="text-brand-deep">{String(machines.length).padStart(2, '0')}</span>{' '}
              equipamentos
            </p>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Frota própria, revisada e operada por profissionais treinados, pronta para qualquer
            volume de obra.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 lg:grid-cols-3 lg:gap-5">
          {machines.map((machine, i) => (
            <Reveal key={machine.name} delay={(i % 3) * 0.05}>
              <article className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-neutral-900/25 sm:rounded-2xl">
                {machine.video ? (
                  <MachineVideo machine={{ ...machine, video: machine.video }} />
                ) : machine.photo ? (
                  <img
                    src={machine.photo}
                    alt={`${machine.name} da frota em operação`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <MachinePlaceholder />
                )}

                {/* Véu que garante a leitura do nome sobre qualquer imagem */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/55 to-transparent"
                />

                {/* Traço dourado corre no topo ao passar o mouse */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-full z-10 h-[3px] w-full bg-brand transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
                />

                <span
                  aria-hidden="true"
                  className="font-display absolute top-3 left-3.5 z-10 text-[11px] text-brand/80 sm:text-xs"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-5">
                  <h3 className="font-display text-[12px] leading-[1.15] text-white sm:text-lg lg:text-xl">
                    <span className="sm:hidden">{comQuebraSuave(machine.name)}</span>
                    <span className="hidden sm:inline">{machine.name}</span>
                  </h3>
                  <p className="mt-1.5 hidden text-[13px] leading-relaxed text-white/60 sm:block">
                    {machine.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-sm text-neutral-500">
            {comRegistro} das {machines.length} máquinas já estão registradas aqui. Procurando
            outro equipamento?{' '}
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
