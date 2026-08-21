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
  return (
    <section id="frota" className="bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTag>Nossa frota</SectionTag>
          <h2 className="font-display max-w-3xl text-[1.9rem] text-black sm:text-5xl lg:text-6xl">
            Máquinas prontas para o serviço
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Frota própria, revisada e operada por profissionais treinados, pronta para qualquer
            volume de obra.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 md:mt-11 lg:grid-cols-3 lg:gap-5">
          {machines.map((machine, i) => (
            <Reveal key={machine.name} delay={(i % 3) * 0.05}>
              <article className="group relative aspect-[5/4] overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-neutral-900/20">
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
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/45 to-transparent transition-opacity duration-500 group-hover:opacity-95"
                />

                {/* Fio dourado que cresce na base ao passar o mouse */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 z-10 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
                />

                <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-5">
                  <h3 className="font-display text-[12px] leading-[1.15] text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:text-lg lg:text-xl">
                    <span className="sm:hidden">{comQuebraSuave(machine.name)}</span>
                    <span className="hidden sm:inline">{machine.name}</span>
                  </h3>
                  <p className="mt-1.5 hidden text-[13px] leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/80 sm:block">
                    {machine.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-sm text-neutral-500">
            Procurando outro equipamento? A frota é ampla.{' '}
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
