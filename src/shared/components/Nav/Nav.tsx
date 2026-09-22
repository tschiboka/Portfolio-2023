import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { CgClose } from 'react-icons/cg'
import { AppHooks } from '@shared-context'
import { NavProps } from './Nav.types'
import './Nav.styles.css'

const DefaultBurger = () => {
    const { mobileMenuVisible, setMobileMenuVisible } = AppHooks.useContext()

    return !mobileMenuVisible ? (
        <HiOutlineMenuAlt3
            className="burger"
            aria-label="Extend Mobile Menu"
            onClick={() => setMobileMenuVisible(true)}
        />
    ) : (
        <CgClose
            className="burger"
            aria-label="Close Mobile Menu"
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
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onFocus,
    onBlur,
}: NavProps) => {
    if (!visible) return null

    return (
        // Region's Header wraps children, breaking this header's flex layout.
        // eslint-disable-next-line standards/no-raw-semantic-jsx
        <header
            className={`Header${className ? ` ${className}` : ''}`}
            aria-label={ariaLabel}
            style={style}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {logo ?? null}
            {burger ?? <DefaultBurger />}
            {/* List wraps every item in an <li>, but NavMenu needs per-item onClick. */}
            {/* eslint-disable-next-line standards/no-raw-semantic-jsx */}
            <ul className="nav_links">{children}</ul>
        </header>
    )
}
