import { useState } from 'react'
import { Maybe } from 'monet'
import { Session, AppHooks } from '@shared-context'
import { MobileMenu } from '../MobileMenu/MobileMenu'
import { NavMenu } from './NavMenu'
import { MenuItem, SubmenuState } from '../Nav.types'
import { Submenu } from '../Submenu/Submenu'
import { SubNav } from '../SubNav/SubNav'
import { Logo } from './Logo'
import { SocialLinks, SubNavTitle } from './PersonalContent'
import { apiMenu, portfolioMenu, getMenuItemImage } from '../Nav.defaults'

export type PageVariant = 'portfolio' | 'app'

type PageNavProps = {
    variant: PageVariant
    pageName: string
}

export const PageNav = ({ variant, pageName }: PageNavProps) => {
    const { mainMenuVisible, subMenuVisible, setSubMenuVisible } = AppHooks.useContext()
    const [submenuStack, setSubmenuStack] = useState<SubmenuState[]>([])

    const isApp = variant === 'app'
    const items = isApp ? apiMenu : portfolioMenu

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
    const isAuthLoading = isApp ? sessionContext.isAuthLoading : false

    return (
        <>
            <NavMenu
                items={items}
                pageName={pageName}
                visible={isApp ? true : mainMenuVisible}
                isLoading={isApp ? isAuthLoading : false}
                submenu={submenuStack?.[0]}
                renderImage={getMenuItemImage}
                onItemClick={handleItemClick}
                onSubmenuToggle={() => setSubMenuVisible(!subMenuVisible)}
                logo={<Logo />}
            />
            {isApp && Boolean(submenuStack.length) && (
                <Submenu
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
    const isApp = variant === 'app'
    const items = isApp ? apiMenu : portfolioMenu

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
