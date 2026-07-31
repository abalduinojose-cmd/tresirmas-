import { site } from '../../data/site'
import { IconWhatsApp } from '../ui/Icons'

/** Botão flutuante de WhatsApp com pulso discreto. */
export function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar com a ${site.name} no WhatsApp`}
      className="group fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition-transform duration-200 ease-out hover:scale-110 motion-safe:animate-none md:right-7 md:bottom-7"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366]/60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]"
      />
      <IconWhatsApp className="relative h-7 w-7" />
    </a>
  )
}
