import type { ReactNode, MouseEventHandler } from 'react'
import type { AccessibleProps } from '../index.types'

type SharedProps = AccessibleProps & {
    children: ReactNode
    title?: string
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export type LinkAsRoute = SharedProps & {
    to: string
    href?: never
    download?: never
    target?: string
    rel?: string
}

export type LinkAsAnchor = SharedProps & {
    href: string
    to?: never
    download?: boolean | string
}

export type LinkProps = LinkAsRoute | LinkAsAnchor
