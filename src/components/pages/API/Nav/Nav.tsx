import { Link } from 'react-router-dom'
import './Nav.scss'
import { Maybe } from 'monet'
import Burger from './Burger'
import Chevron from './Chevron'
import Logo from './Logo'
import { Menu, Submenu, isHighlighted, menu } from '.'
import { AccessGuard } from '../../../../common/AccessGuard/AccessGuard'

type NavProps = {
    pageName: string
    submenuStack: Submenu[]
    setSubmenuStack: (submenu: Submenu[]) => void
}

const Nav = ({ pageName, submenuStack, setSubmenuStack }: NavProps) => {
    const handleItemClick = (item: Menu) => {
        Maybe.fromNull(item.submenu).cata(
            () => setSubmenuStack([]),
            (sub) => {
                if (submenuStack[0]?.parentLabel === item.label)
                    setSubmenuStack([])
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

    return (
        <header className="Header">
            <Logo />
            <Burger />
            <ul className="nav_links">
                {menu.map((item: Menu) => (
                    <AccessGuard
                        allowedRoles={item.allowRoles}
                        allowedFeatures={item.allowedFeatures}
                        key={item.label}
                    >
                        <li
                            id={item.label}
                            onClick={() => handleItemClick(item)}
                        >
                            <Link className="link" to={item?.path || ''}>
                                <span
                                    className={isHighlighted(
                                        item,
                                        pageName,
                                        submenuStack?.[0],
                                    )}
                                >
                                    {item.label}
                                </span>
                                <Chevron
                                    item={item}
                                    submenu={submenuStack?.[0]}
                                />
                            </Link>
                        </li>
                    </AccessGuard>
                ))}
            </ul>
        </header>
    )
}

export default Nav
