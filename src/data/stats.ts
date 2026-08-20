import { anosDeEmpresa } from './site'

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
  { countTo: anosDeEmpresa, suffix: '+', label: 'anos movendo terra' },
  { countTo: 9, suffix: '', label: 'equipamentos próprios' },
  { countTo: 100, suffix: '%', label: 'frota própria e operadores treinados' },
  { value: 'MG', label: 'atendimento em todo o estado' },
]
