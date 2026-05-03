import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { CgClose } from 'react-icons/cg'
import { useAppContext } from '../../../src/context/AppContext/App.context'
import iconDark from '../../../src/assets/images/icon.svg'
import iconLight from '../../../src/assets/images/icon-light.svg'
import { NavProps } from './Nav.types'
import './Nav.styles.css'

const Logo = () => {
    const { themeMode } = useAppContext()
    const icon = themeMode === 'dark' ? iconDark : iconLight

    return <img className="t-logo" src={icon} alt="Logo" title="Home Page" />
}

const Burger = () => {
    const { mobileMenuVisible, setMobileMenuVisible } = useAppContext()

    return !mobileMenuVisible ? (
        <HiOutlineMenuAlt3
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
    )
}

export const Nav = ({ visible = true, children, className, ariaLabel, style }: NavProps) => {
    if (!visible) return null

    return (
        <header
            className={`Header${className ? ` ${className}` : ''}`}
            aria-label={ariaLabel}
            style={style}
        >
            <Logo />
            <Burger />
            <ul className="nav_links">{children}</ul>
        </header>
    )
}
