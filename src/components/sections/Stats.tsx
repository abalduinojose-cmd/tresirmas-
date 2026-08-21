import { stats } from '../../data/stats'
import { CountUp } from '../ui/CountUp'
import { Reveal } from '../ui/Reveal'

/**
 * Barra de credibilidade: números grandes em dourado, separados por fios
 * verticais finos. Sem molduras, para os dados falarem sozinhos.
 */
export function Stats() {
  return (
    <section
      aria-label="Números da empresa"
      className="border-b border-white/10 bg-black py-10 md:py-14"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-3 px-5 md:px-8">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.06}
            className={`px-3 sm:px-6 ${i > 0 ? 'border-l border-white/10' : ''} ${
              i === 0 ? 'pl-0' : ''
            }`}
          >
            <p className="font-display text-brand text-[1.6rem] leading-none sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              {stat.countTo != null ? (
                <CountUp to={stat.countTo} suffix={stat.suffix ?? ''} />
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-2.5 text-[11px] leading-snug text-white/55 sm:mt-3 sm:text-sm">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
