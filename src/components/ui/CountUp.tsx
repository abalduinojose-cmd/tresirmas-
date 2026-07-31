import { useEffect, useRef } from 'react'
import { animate } from 'motion/react'

type CountUpProps = {
  to: number
  suffix?: string
}

/** Contador que sobe de 0 até o valor ao entrar no viewport. */
export function CountUp({ to, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let controls: ReturnType<typeof animate> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = String(to)
          return
        }
        controls = animate(0, to, {
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (v) => {
            el.textContent = String(Math.round(v))
          },
        })
      },
      { threshold: 0.5 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      controls?.stop()
    }
  }, [to])

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}
