import { stats } from '../../data/stats'
import { CountUp } from '../ui/CountUp'
import { Reveal } from '../ui/Reveal'

/**
 * Barra de credibilidade: linha fina no topo de cada célula com um
 * tique amarelo, número em branco e label discreta. Limpo e uniforme.
 */
export function Stats() {
  return (
    <section aria-label="Números da empresa" className="border-b border-white/10 bg-black py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-5 md:px-8 lg:grid-cols-4 lg:gap-x-12">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="relative border-t border-white/15 pt-6 md:pt-7">
              <span
                aria-hidden="true"
                className="absolute -top-[2px] left-0 h-[3px] w-9 -skew-x-[20deg] bg-brand"
              />
              <p className="font-display text-[1.6rem] text-white sm:text-4xl lg:text-[2.6rem] xl:text-5xl">
                {stat.countTo != null ? (
                  <CountUp to={stat.countTo} suffix={stat.suffix ?? ''} />
                ) : (
                  stat.value
                )}
              </p>
              <p className="mt-3 text-[11px] font-semibold tracking-[0.25em] text-white/45 uppercase">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
