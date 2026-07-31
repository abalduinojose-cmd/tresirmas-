type SectionTagProps = {
  children: string
  tone?: 'light' | 'dark'
}

/** Etiqueta de seção: fio dourado + label espaçada em caps. */
export function SectionTag({ children, tone = 'dark' }: SectionTagProps) {
  return (
    <p
      className={`mb-5 flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.32em] uppercase ${
        tone === 'light' ? 'text-white/45' : 'text-black/45'
      }`}
    >
      <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
      {children}
    </p>
  )
}
