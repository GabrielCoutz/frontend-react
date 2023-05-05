import { Primary } from './Primary'
import { Secondary } from './Secondary'
import { Terciary } from './Terciary'
import { Danger } from './Danger'

export interface ButtonProps {
  children: string
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit'
  'data-testid'?: string
}

export const Button = {
  Primary,
  Secondary,
  Terciary,
  Danger,
}
