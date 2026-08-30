import { ReactNode } from 'react'
import './Toggle.css'

export type ToggleProps = {
    children?: ReactNode
    handleClick: () => void
    active: boolean
    activeColor?: string
}

export const Toggle = ({ children, handleClick, active, activeColor }: ToggleProps) => {
    return (
        <div
            className={`Toggle${active ? ' Toggle--active' : ''}`}
            style={active && activeColor ? { backgroundColor: activeColor } : undefined}
            onClick={handleClick}
            role="switch"
            aria-checked={active}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick()
                }
            }}
        >
            {children && <span className="Toggle__icon">{children}</span>}
            <span className="Toggle__thumb"></span>
        </div>
    )
}
