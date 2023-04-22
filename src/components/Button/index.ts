import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from 'react'
import { Primary } from './Primary'
import { Secondary } from './Secondary'
import { Terciary } from './Terciary'

export type ButtonProps = PropsWithChildren<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>

export const Button = {
  Primary,
  Secondary,
  Terciary,
}
