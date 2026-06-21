import { ReactNode, useEffect, useState } from 'react'
import { Link } from '../../Link'
import { BiChevronRight } from 'react-icons/bi'
import { BsSun, BsMoonStars } from 'react-icons/bs'
import { append, dropLast } from 'ramda'
import { useAppContext } from '../../../../src/context/AppContext/App.context'
import { AccessGuard } from '../../../utils/AccessGuard'
import Toggle from '../../../../src/components/sharedComponents/Toggle/Toggle'
import { MenuItem } from '../Nav.types'
import { isHighlighted } from '../Nav.utils'
import { Const } from '@common/ux'
import './MobileMenu.styles.css'

export type MobileMenuProps = {
    items: MenuItem[]
    pageName: string
    className?: string
    renderImage?: (imageName: string) => ReactNode
    extras?: ReactNode
}

export const MobileMenu = ({
    items,
    pageName,
    className,
    renderImage,
    extras,
}: MobileMenuProps) => {
    const { mobileMenuVisible, setMobileMenuVisible, themeMode, setThemeMode } = useAppContext()

    const rootMenu = items.filter((item) => !item.showSubmenuToggle)

    const [menuStack, setMenuStack] = useState<Array<MenuItem[]>>([rootMenu])
    const [submenuStack, setSubmenuStack] = useState<Array<string>>([])

    useEffect(() => {
        if (mobileMenuVisible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuVisible])

    if (!mobileMenuVisible) return null

    const handleSubmenuClick = (menu: MenuItem[]) => setMenuStack(append(menu)(menuStack))

    const handleBackClick = () => {
        setMenuStack(dropLast(1, menuStack))
        setSubmenuStack(dropLast(1, submenuStack))
    }

    const handleItemClick = (item: MenuItem) => {
        if (item.submenu) handleSubmenuClick(item.submenu)
        if (item.path) setMobileMenuVisible(false)
        setSubmenuStack(append(item.label)(submenuStack))
    }

    return (
        <menu className={`MobileMenu${className ? ` ${className}` : ''}`} style={{ zIndex: Const.ZIndex.dropdown }}>
            <div className="MobileMenu__items">
                {menuStack[menuStack.length - 1].map((item) => (
                    <AccessGuard
                        guards={[
                            {
                                when: { type: 'capability', capabilities: item.allowCapabilities },
                                then: { mode: 'hidden' },
                            },
                            {
                                when: { type: 'feature', features: item.allowedFeatures },
                                then: { mode: 'hidden' },
                            },
                        ]}
                        key={item.label}
                    >
                        <li
                            className={isHighlighted(item, pageName)}
                            onClick={() => handleItemClick(item)}
                        >
                            <Link to={item?.path || ''}>
                                {item.image && renderImage?.(item.image)}
                                {item.label}
                                {item.submenu && (
                                    <div className="chevron-wrapper">
                                        <BiChevronRight className="chevron" />
                                    </div>
                                )}
                            </Link>
                        </li>
                    </AccessGuard>
                ))}
                {menuStack.length > 1 && (
                    <li key="back" onClick={handleBackClick}>
                        <Link to="">Back</Link>
                    </li>
                )}
            </div>

            <div className="MobileMenu__extras">
                <div className="theme-toggle" title="Toggle Colour Theme">
                    <Toggle
                        handleClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                        active={themeMode === 'dark'}
                    >
                        {themeMode === 'dark' ? (
                            <BsSun className="theme-icon" />
                        ) : (
                            <BsMoonStars className="theme-icon" />
                        )}
                    </Toggle>
                </div>
                {extras}
            </div>
        </menu>
    )
}
