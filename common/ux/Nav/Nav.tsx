import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { CgClose } from 'react-icons/cg'
import { useAppContext } from '../../../src/context/AppContext/App.context'
import { NavProps } from './Nav.types'
import './Nav.styles.css'

const DefaultBurger = () => {
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

export const Nav = ({
    visible = true,
    children,
    className,
    ariaLabel,
    style,
    logo,
    burger,
}: NavProps) => {
    if (!visible) return null

    return (
        <header
            className={`Header${className ? ` ${className}` : ''}`}
            aria-label={ariaLabel}
            style={style}
        >
            {logo ?? null}
            {burger ?? <DefaultBurger />}
            <ul className="nav_links">{children}</ul>
        </header>
    )
}
