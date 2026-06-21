import { ReactNode } from 'react'
import { BsSun, BsMoonStars } from 'react-icons/bs'
import Toggle from '../../../../src/components/sharedComponents/Toggle/Toggle'
import { useAppContext } from '../../../../src/context/AppContext/App.context'
import { Const } from '@common/ux'
import './SubNav.styles.css'

export type SubNavProps = {
    title?: ReactNode
    links?: ReactNode
}

export const SubNav = ({ title, links }: SubNavProps) => {
    const { themeMode, setThemeMode, subMenuVisible } = useAppContext()

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
