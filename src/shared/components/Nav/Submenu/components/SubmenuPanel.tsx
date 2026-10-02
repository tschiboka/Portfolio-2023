import { Coordinates, SubmenuState } from '../../Nav.types'
import { useEffect, useState } from 'react'
import { SubmenuUtils } from '../Submenu.utils'
import { Submenu } from '../Submenu'

type SubmenuPanelProps = {
    submenu?: SubmenuState
    submenuStack: SubmenuState[]
    setSubmenuStack: (submenu: SubmenuState[]) => void
    pageName: string
}

export const SubmenuPanel = ({
    submenu,
    submenuStack,
    setSubmenuStack,
    pageName,
}: SubmenuPanelProps) => {
    const [, setCoords] = useState<Coordinates>(() =>
        SubmenuUtils.findParentMenuCoords(submenu?.parentLabel),
    )

    useEffect(() => {
        const updateCoords = () =>
            setCoords(SubmenuUtils.findParentMenuCoords(submenu?.parentLabel))
        window.addEventListener('resize', updateCoords)
        return () => window.removeEventListener('resize', updateCoords)
    }, [submenu?.parentLabel])

    return (
        <Submenu
            submenu={submenu}
            submenuStack={submenuStack}
            setSubmenuStack={setSubmenuStack}
            pageName={pageName}
        />
    )
}
