import { useAppContext } from '../../../../context/AppContext'
import { Link } from 'react-router-dom'
import { Menu, menu } from '.'
import { HiMenuAlt3 } from 'react-icons/hi'
import { CgClose } from 'react-icons/cg'
import { BiChevronDown } from 'react-icons/bi'
import iconDark from '../../../../assets/images/icon.svg'
import './Nav.scss'

type NavProps = { pageName: string }

const Nav = ({ pageName }: NavProps) => {
    const { mobileMenuVisible, setMobileMenuVisible } = useAppContext()

    return (
        <header className="Header">
            <img
                className="t-logo"
                src={iconDark}
                alt="Logo"
                title="Home Page"
            />
            {!mobileMenuVisible ? (
                <HiMenuAlt3
                    className="burger"
                    title="Extend Mobile Menu"
                    onClick={() => setMobileMenuVisible(true)}
                />
            ) : (
                <CgClose
                    title="Close Mobile Menu"
                    className="burger"
                    onClick={() => setMobileMenuVisible(false)}
                />
            )}
            <ul className="nav_links">
                {menu.map((item: Menu) => (
                    <li
                        key={item.label}
                        className={pageName === item.label ? 'active' : ''}
                        onClick={() => {}}
                    >
                        <div className="active-dot"></div>
                        <Link className="link" to={item?.path || ''}>
                            {item.label}
                            {item.submenu && (
                                <BiChevronDown className="chevron" />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </header>
    )
}

export default Nav
