import { Submenu } from '../Nav.types'
import './SubmenuPanel.scss'
import { useEffect, useState } from 'react'
import { Coordinates, findParentMenuCoords } from './SubmenuPanel.utils'
import { Link } from 'react-router-dom'

type SubmenuPanelProps = {
    submenu?: Submenu
    submenuStack: Submenu[]
    setSubmenuStack: (submenu: Submenu[]) => void
    pageName: string
}

const SubmenuPanel = ({
    submenu,
    setSubmenuStack,
    pageName,
}: SubmenuPanelProps) => {
    const [coords, setCoords] = useState<Coordinates>(() =>
        findParentMenuCoords(submenu?.parentLabel),
    )

    useEffect(() => {
        const updateCoords = () =>
            setCoords(findParentMenuCoords(submenu?.parentLabel))
        window.addEventListener('resize', updateCoords)
        return () => window.removeEventListener('resize', updateCoords)
    }, [submenu?.parentLabel])

    const handleItemClick = () => {
        setSubmenuStack([])
    }

    return (
        <div className="SubmenuPanel" style={{ top: coords.y, left: coords.x }}>
            {submenu?.options.map((item) => (
                <li key={item.label} id={item.label} onClick={handleItemClick}>
                    <Link className="link" to={item?.path || ''}>
                        <span
                            className={item.label === pageName ? 'active' : ''}
                        >
                            {item.label}
                        </span>
                    </Link>
                </li>
            ))}
        </div>
    )
}

export default SubmenuPanel
