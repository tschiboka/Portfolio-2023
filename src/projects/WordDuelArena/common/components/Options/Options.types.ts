import { OptionButton } from './components'
import type { FC, ReactNode } from 'react'

export type OptionsProps = {
    children?: ReactNode
}

export type OptionsComponent = FC<OptionsProps> & {
    Button: typeof OptionButton
}
