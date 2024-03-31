import { Link } from 'react-router-dom'
import { BiChevronRight } from 'react-icons/bi'
import { menu } from '../Nav'
import './MobileMenu.scss'
import { Maybe } from 'monet'
import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import { Menu } from '../Nav/Nav.types'
import { append, dropLast } from 'ramda'

type MobileMenuProps = { pageName: string }
const MobileMenu = ({ pageName }: MobileMenuProps) => {
    const [menuStack, setMenuStack] = useState<Array<Menu[]>>([menu])
    const { setMobileMenuVisible } = useAppContext()

    const handleSubmenuClick = (menu: Menu[]) =>
        setMenuStack(append(menu)(menuStack))

    const handleBackClick = () => setMenuStack(dropLast(1, menuStack))

    console.log(menuStack)
    return (
        <menu className="Menu MobileMenu">
            {menuStack[menuStack.length - 1].map((item) => (
                <li
                    key={item.label}
                    className={pageName === item.label ? 'active' : ''}
                    onClick={() => {
                        Maybe.fromNull(item.submenu).forEach(handleSubmenuClick)
                        item.path && setMobileMenuVisible(false)
                    }}
                >
                    <div className="active-dot"></div>
                    <Link className="link" to={item?.path || ''}>
                        {item.label}
                        {item.submenu && (
                            <div className="chevron-wrapper">
                                <BiChevronRight className="chevron" />
                            </div>
                        )}
                    </Link>
                </li>
            ))}
            {menuStack.length > 1 && (
                <li key="back" onClick={handleBackClick}>
                    <div className="active-dot"></div>
                    <Link className="link" to="">
                        Back
                    </Link>
                </li>
            )}
        </menu>
    )
}

export default MobileMenu
