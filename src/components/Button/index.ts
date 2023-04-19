import { ButtonHTMLAttributes } from 'react'
import { Primary } from './Primary'
import { Secondary } from './Secondary'
import { Terciary } from './Terciary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
}

export const Button = {
  Primary,
  Secondary,
  Terciary
}