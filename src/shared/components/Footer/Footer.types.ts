import type { ReactNode } from 'react'

export interface FooterProps {
    path: string
    visitsPreLoaded?: boolean
    visitCount?: number
    info?: ReactNode
}
