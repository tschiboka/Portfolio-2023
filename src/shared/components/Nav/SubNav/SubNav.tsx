import { BsSun, BsMoonStars } from 'react-icons/bs'
import { AppHooks } from '@shared-context'
import { Const, Toggle } from '@common-ux'
import type { SubNavProps } from './SubNav.types'
import './SubNav.styles.css'

export const SubNav = ({ title, links }: SubNavProps) => {
    const { themeMode, setThemeMode, subMenuVisible } = AppHooks.useContext()

    if (!subMenuVisible) return null
    return (
        <div className="SubNav" style={{ zIndex: Const.ZIndex.sticky }}>
            <div className="sublogo">{title && <span className="sublogo-text">{title}</span>}</div>
            <div className="social-links">
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
                {links}
            </div>
        </div>
    )
}
