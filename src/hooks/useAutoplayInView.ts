import { useEffect, useRef } from 'react'

/** Toca o vídeo apenas quando visível no viewport e pausa fora dele. */
export function useAutoplayInView<T extends HTMLVideoElement>(threshold = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
