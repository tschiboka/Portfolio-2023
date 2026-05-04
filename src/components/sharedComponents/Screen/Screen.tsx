import { ReactNode } from 'react'
import Page from '../../../../common/ux/Page/Page'
import { FullScreenOverlay } from '../Overlay/Overlay'
import { PageNav, PageMobileMenu, PageSubNav } from '../../Nav'
import type { PageVariant } from '../../Nav'

type ScreenProps = {
    children: ReactNode
    title: string
    path: string
    pageName?: string
    variant?: PageVariant
    className?: string
    recordVisit?: boolean
    loginRequired?: boolean
    sideMenu?: ReactNode
}

export const Screen = ({
    children,
    title,
    path,
    pageName,
    variant,
    className,
    recordVisit,
    loginRequired,
    sideMenu,
}: ScreenProps) => (
    <Page
        title={title}
        path={path}
        className={className}
        recordVisit={recordVisit}
        loginRequired={loginRequired}
    >
        {variant && pageName && <PageNav variant={variant} pageName={pageName} />}
        {variant && pageName && <PageMobileMenu variant={variant} pageName={pageName} />}
        <PageSubNav />
        {sideMenu}
        {children}
        <FullScreenOverlay />
    </Page>
)
