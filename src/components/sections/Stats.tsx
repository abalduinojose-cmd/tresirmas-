import { stats } from '../../data/stats'
import { CountUp } from '../ui/CountUp'
import { Reveal } from '../ui/Reveal'

/**
 * Barra de credibilidade: o número domina em dourado e a legenda vem
 * discreta embaixo. Sem molduras, para os dados falarem sozinhos.
 */
export function Stats() {
  return (
    <section
      aria-label="Números da empresa"
      className="border-b border-white/10 bg-black py-12 md:py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-x-4 gap-y-9 px-5 sm:gap-x-8 md:px-8 lg:gap-x-12">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <p className="font-display text-brand text-[1.5rem] leading-none sm:text-4xl md:text-5xl lg:text-[3.2rem]">
              {stat.countTo != null ? (
                <CountUp to={stat.countTo} suffix={stat.suffix ?? ''} />
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-2 text-[11px] leading-snug text-white/60 sm:mt-2.5 sm:text-sm">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
