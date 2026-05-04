import { ReactNode } from 'react'
import './Toggle.scss'

interface Props {
    children: ReactNode
    handleClick: () => void
    active: boolean
}

const Toggle = ({ children, handleClick, active }: Props) => {
    return (
        <div
            className={`Toggle${active ? ' Toggle--active' : ''}`}
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
            <span className="Toggle__icon">{children}</span>
            <span className="Toggle__thumb"></span>
        </div>
    )
}

export default Toggle
