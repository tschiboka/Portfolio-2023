import type { ReactNode } from 'react'

export type Breakpoint = '2xs' | 'xs' | 'sm' | 'mx' | 'md' | 'lg' | 'xl' | '2xl'

export type ShowProps = {
    above?: Breakpoint
    below?: Breakpoint
    children: ReactNode
}

export type HideProps = ShowProps
