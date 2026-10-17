import type { ReactNode } from 'react'
import type { PageVariant } from '@shared-components/Nav'
import type { FooterProps } from '../Footer'

export type ScreenProps = {
    children: ReactNode
    title: string
    path: string
    pageName?: string
    variant?: PageVariant
    className?: string
    loginRequired?: boolean
    sideMenu?: ReactNode
    hideFooter?: boolean
    footerProps?: Omit<FooterProps, 'path'>
    hasContentNavigator?: boolean
    contentNavigatorDepth?: number
}
