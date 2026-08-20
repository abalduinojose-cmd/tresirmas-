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
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-9 px-5 md:px-8 lg:grid-cols-4 lg:gap-x-12">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <p className="font-display text-brand text-[2rem] leading-none sm:text-5xl lg:text-[3.2rem]">
              {stat.countTo != null ? (
                <CountUp to={stat.countTo} suffix={stat.suffix ?? ''} />
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-2.5 text-sm leading-snug text-white/55">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
