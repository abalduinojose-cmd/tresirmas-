import { services } from '../../data/services'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionTag } from '../ui/SectionTag'
import { IconArrowUpRight } from '../ui/Icons'

/** Link de orçamento no WhatsApp com o serviço já preenchido. */
function serviceWhatsApp(title: string) {
  const message = `Olá! Vim pelo site da ${site.name} e tenho interesse em ${title}.`
  return `${site.whatsapp.split('?')[0]}?text=${encodeURIComponent(message)}`
}

/**
 * Lista editorial: linhas numeradas clicáveis (cada uma abre o WhatsApp
 * com o serviço preenchido), números vazados e chip de seta no hover.
 */
export function Services() {
  return (
    <section id="servicos" className="bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTag tone="light">O que fazemos</SectionTag>
          <h2 className="font-display max-w-3xl text-[1.9rem] text-white sm:text-5xl lg:text-6xl">
            Serviços de <span className="text-brand">peso</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Máquina certa, operador certo e execução no prazo. Cuidamos do ciclo completo para a
            sua obra não parar. Toque em um serviço para pedir orçamento.
          </p>
        </Reveal>

        <div className="mt-14 border-b border-white/10">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <a
                href={serviceWhatsApp(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Solicitar orçamento de ${service.title} pelo WhatsApp`}
                className="group relative grid gap-3 overflow-hidden border-t border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1fr)_3rem] md:items-center md:gap-6 md:py-10 lg:grid-cols-[4.5rem_minmax(0,1.15fr)_minmax(0,1fr)_3.5rem] lg:gap-8"
              >
                {/* Traço que atravessa a linha no hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-full h-[2px] w-full bg-brand transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
                />
                <span
                  aria-hidden="true"
                  className="font-display text-2xl text-transparent transition-colors duration-300 group-hover:text-brand lg:text-4xl"
                  style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.3)' }}
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl text-white transition-transform duration-300 ease-out group-hover:translate-x-1.5 sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55 md:text-[15px]">
                  {service.description}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden h-12 w-12 items-center justify-center justify-self-end rounded-full border border-white/15 text-white/50 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-black md:flex"
                >
                  <IconArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
