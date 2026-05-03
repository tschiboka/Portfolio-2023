import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiChevronRight } from 'react-icons/bi'
import { FaFacebookF } from 'react-icons/fa'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { TfiLinkedin } from 'react-icons/tfi'
import { BsSun, BsMoonStars } from 'react-icons/bs'
import { append, dropLast } from 'ramda'
import moment from 'moment'
import { useAppContext } from '../../../../src/context/AppContext/App.context'
import { AccessGuard } from '../../../utils/AccessGuard'
import { isTruthy } from '../../../utils/Predicate'
import Toggle from '../../../../src/components/sharedComponents/Toggle/Toggle'
import { MenuItem, PageVariant } from '../Nav.types'
import {
    isHighlighted,
    apiMenu,
    portfolioMenu,
    apiMenuGroups,
    portfolioMenuGroups,
    getMenuItemImage,
} from '../Nav.utils'
import { Breadcrumbs } from '../Components/Breadcrumbs'
import './MobileMenu.styles.css'

type MobileMenuProps = {
    pageName: string
    variant: PageVariant
}

export const MobileMenu = ({ pageName, variant }: MobileMenuProps) => {
    const { mobileMenuVisible, setMobileMenuVisible, themeMode, setThemeMode } = useAppContext()

    const rootMenu =
        variant === 'portfolio'
            ? portfolioMenu.filter((item) => !item.showSubmenuToggle)
            : apiMenu.filter((item) => !item.showSubmenuToggle)

    const menuGroups = variant === 'portfolio' ? portfolioMenuGroups : apiMenuGroups

    const [menuStack, setMenuStack] = useState<Array<MenuItem[]>>([rootMenu])
    const [submenuStack, setSubmenuStack] = useState<Array<string>>([])
    const [date, setDate] = useState(() => moment(new Date()).format('DD. MMMM YYYY, HH:mm:ss'))

    useEffect(() => {
        if (variant !== 'api') return
        const timer = setInterval(
            () => setDate(moment(new Date()).format('DD. MMMM YYYY, HH:mm:ss')),
            1000,
        )
        return () => clearInterval(timer)
    }, [variant])

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

    const getMenuItemParent = (childLabel: string, parents: string[] = []): string[] => {
        if (!childLabel) return parents
        const parent = menuGroups
            .map((group) => group.find((m) => m.label.toLowerCase() === childLabel?.toLowerCase()))
            .filter(isTruthy)?.[0]?.parent
        if (parent) {
            parents.push(parent)
            return getMenuItemParent(parent, parents)
        }
        return parents.reverse()
    }

    const originPath = dropLast(1, [...getMenuItemParent(pageName), pageName]).join(' / ')
    const isApi = variant === 'api'

    return (
        <menu className={`MobileMenu MobileMenu--${variant}`}>
            {isApi && (
                <Breadcrumbs
                    stack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    menuStack={menuStack}
                    setMenuStack={setMenuStack}
                    pageName={pageName}
                />
            )}
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
                            <div className="active-dot"></div>
                            <Link className="link" to={item?.path || ''}>
                                {item.image && getMenuItemImage(item.image)}
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
                        <div className="active-dot"></div>
                        <Link className="link" to="">
                            Back
                        </Link>
                    </li>
                )}
            </div>

            {!isApi && (
                <div className="MobileMenu__extras">
                    <div className="theme-toggle" title="Toggle Colour Theme">
                        <Toggle
                            handleClick={() =>
                                setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
                            }
                            active={themeMode === 'dark'}
                        >
                            {themeMode === 'dark' ? (
                                <BsSun className="theme-icon" />
                            ) : (
                                <BsMoonStars className="theme-icon" />
                            )}
                        </Toggle>
                    </div>
                    <div className="social-links">
                        <a href="https://www.facebook.com/tschiboka/">
                            <FaFacebookF title="Facebook Link" />
                        </a>
                        <a href="https://github.com/tschiboka">
                            <TbBrandGithubFilled title="Github Link" />
                        </a>
                        <a href="https://www.linkedin.com/in/tivadar-debnar/">
                            <TfiLinkedin title="LinkedIn Link" />
                        </a>
                    </div>
                </div>
            )}

            {isApi && (
                <div className="MobileMenu__extras">
                    <div className="theme-toggle" title="Toggle Colour Theme">
                        <Toggle
                            handleClick={() =>
                                setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
                            }
                            active={themeMode === 'dark'}
                        >
                            {themeMode === 'dark' ? (
                                <BsSun className="theme-icon" />
                            ) : (
                                <BsMoonStars className="theme-icon" />
                            )}
                        </Toggle>
                    </div>
                </div>
            )}

            {isApi && (
                <footer>
                    <div>From: {originPath}</div>
                    <div className="date">{date}</div>
                </footer>
            )}
        </menu>
    )
}
