import { useState } from 'react'
import { Maybe } from 'monet'
import { useAppContext } from '../../context/AppContext/App.context'
import { Session } from '../../context/SessionContext'
import { NavMenu } from '@common/ux/Nav/NavMenu'
import { MobileMenu } from '@common/ux/Nav/MobileMenu/MobileMenu'
import { SubNav } from '@common/ux/Nav/SubNav/SubNav'
import SubmenuPanel from '@common/ux/Nav/Submenu/SubmenuPanel'
import { MenuItem, SubmenuState } from '@common/ux/Nav/Nav.types'
import { Logo } from './Logo'
import { SocialLinks, SubNavTitle } from './PersonalContent'
import { apiMenu, portfolioMenu, getMenuItemImage } from './menuData'

export type PageVariant = 'portfolio' | 'api'

type PageNavProps = {
    variant: PageVariant
    pageName: string
}

export const PageNav = ({ variant, pageName }: PageNavProps) => {
    const { mainMenuVisible, subMenuVisible, setSubMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<SubmenuState[]>([])

    const isApi = variant === 'api'
    const items = isApi ? apiMenu : portfolioMenu

    const handleItemClick = (item: MenuItem) => {
        Maybe.fromNull(item.submenu).cata(
            () => setSubmenuStack([]),
            (sub) => {
                if (submenuStack[0]?.parentLabel === item.label) setSubmenuStack([])
                else
                    setSubmenuStack([
                        {
                            parentLabel: item.label,
                            options: sub,
                            extended: false,
                        },
                    ])
            },
        )
    }

    const sessionContext = Session.useContext()
    const isAuthLoading = isApi ? sessionContext.isAuthLoading : false

    return (
        <>
            <NavMenu
                items={items}
                pageName={pageName}
                visible={isApi ? true : mainMenuVisible}
                isLoading={isApi ? isAuthLoading : false}
                submenu={submenuStack?.[0]}
                renderImage={getMenuItemImage}
                onItemClick={handleItemClick}
                onSubmenuToggle={() => setSubMenuVisible(!subMenuVisible)}
                logo={<Logo />}
            />
            {isApi && Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName={pageName}
                />
            )}
        </>
    )
}

export const PageMobileMenu = ({ variant, pageName }: PageNavProps) => {
    const isApi = variant === 'api'
    const items = isApi ? apiMenu : portfolioMenu

    return (
        <MobileMenu
            items={items}
            pageName={pageName}
            className={`MobileMenu--${variant}`}
            renderImage={getMenuItemImage}
            extras={
                <div className="social-links">
                    <SocialLinks />
                </div>
            }
        />
    )
}

export const PageSubNav = () => <SubNav title={<SubNavTitle />} links={<SocialLinks />} />
