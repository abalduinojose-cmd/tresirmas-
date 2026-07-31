/**
 * Barra de credibilidade. Com `countTo`, o número anima de 0 até o valor;
 * sem ele, `value` é exibido como está.
 */
export type Stat = {
  value?: string
  countTo?: number
  suffix?: string
  label: string
}

export const stats: Stat[] = [
  { countTo: 18, suffix: '+', label: 'Anos de empresa' },
  { countTo: 100, suffix: '%', label: 'Frota própria' },
  { value: 'MG', label: 'Atendimento em todo o estado' },
  { value: 'Equipe', label: 'Operadores qualificados' },
]
