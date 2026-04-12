import { Link } from 'react-router-dom'
import { BiChevronRight } from 'react-icons/bi'
import { getMenuItemImage, isHighlighted, menu, menuGroups } from '../Nav'
import './MobileMenu.scss'
import { Maybe } from 'monet'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/AppContext/App.context'
import { Menu } from '../Nav/Nav.types'
import { append, dropLast } from 'ramda'
import { isTruthy } from '@common/utils/Predicate'
import Breadcrumbs from './Breadcrumbs/Breadcrumbs'
import moment from 'moment'
import { AccessGuard } from '@common/utils/AccessGuard'

type MobileMenuProps = { pageName: string }
const MobileMenu = ({ pageName }: MobileMenuProps) => {
    const [menuStack, setMenuStack] = useState<Array<Menu[]>>([menu])
    const [submenuStack, setSubmenuStack] = useState<Array<string>>([])
    const { setMobileMenuVisible } = useAppContext()
    const getDate = () => moment(new Date()).format('DD. MMMM YYYY, HH:mm:ss')
    const [date, setDate] = useState(getDate())

    useEffect(() => {
        const timer = setInterval(() => setDate(getDate()), 1000)
        return () => clearInterval(timer)
    }, [])

    const handleSubmenuClick = (menu: Menu[]) => setMenuStack(append(menu)(menuStack))

    const handleBackClick = () => {
        setMenuStack(dropLast(1, menuStack))
        setSubmenuStack(dropLast(1, submenuStack))
    }
    const handleItemClick = (item: Menu) => {
        Maybe.fromNull(item.submenu).forEach(handleSubmenuClick)
        item.path && setMobileMenuVisible(false)
        setSubmenuStack(append(item.label)(submenuStack))
    }

    const getMenuItemParent = (childLabel: string, parents: string[] = []): string[] => {
        if (!childLabel) return parents

        const parent = menuGroups
            .map((menuGroup) =>
                menuGroup.find((menu) => menu.label.toLowerCase() === childLabel?.toLowerCase()),
            )
            .filter(isTruthy)?.[0]?.parent

        if (parent) {
            parents.push(parent)
            return getMenuItemParent(parent, parents)
        }

        return parents.reverse()
    }

    const originPath = dropLast(1, [...getMenuItemParent(pageName), pageName]).join(' / ')
    return (
        <>
            <menu className="Menu MobileMenu">
                <Breadcrumbs
                    stack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    menuStack={menuStack}
                    setMenuStack={setMenuStack}
                    pageName={pageName}
                />
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
                            key={item.label}
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
                <footer>
                    <div>From: {originPath}</div>
                    <div className="date">{date}</div>
                </footer>
            </menu>
        </>
    )
}

export default MobileMenu
