import { SubmenuState } from '../Nav.types'
import { useEffect, useState } from 'react'
import { Coordinates, findParentMenuCoords } from './SubmenuPanel.utils'
import SubmenuBasis from './SubmenuBasis'

type SubmenuPanelProps = {
    submenu?: SubmenuState
    submenuStack: SubmenuState[]
    setSubmenuStack: (submenu: SubmenuState[]) => void
    pageName: string
}

const SubmenuPanel = ({ submenu, submenuStack, setSubmenuStack, pageName }: SubmenuPanelProps) => {
    const [_, setCoords] = useState<Coordinates>(() => findParentMenuCoords(submenu?.parentLabel))

    useEffect(() => {
        const updateCoords = () => setCoords(findParentMenuCoords(submenu?.parentLabel))
        window.addEventListener('resize', updateCoords)
        return () => window.removeEventListener('resize', updateCoords)
    }, [submenu?.parentLabel])

    return (
        <SubmenuBasis
            submenu={submenu}
            submenuStack={submenuStack}
            setSubmenuStack={setSubmenuStack}
            pageName={pageName}
        />
    )
}

export default SubmenuPanel
