import { Maybe } from 'monet'
import { useEffect, useState } from 'react'
import { Link } from '../../Link'
import { MenuItem, SubmenuState } from '../Nav.types'
import { find } from 'ramda'
import { Coordinates, findParentMenuCoords, isParentMenu } from './SubmenuPanel.utils'
import { isActive } from '../Nav.utils'
import './SubmenuPanel.styles.css'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { AccessGuard } from '../../../utils/AccessGuard'
import MenuAccordion from './MenuAccordion'

type SubmenuProps = {
    submenu?: SubmenuState
    submenuStack: SubmenuState[]
    setSubmenuStack: (submenu: SubmenuState[]) => void
    pageName: string
}

const SubmenuBasis = ({ submenu, submenuStack, setSubmenuStack, pageName }: SubmenuProps) => {
    const handleItemClick = (item: MenuItem) => {
        Maybe.fromNull(item.submenu).cata(
            () => setSubmenuStack([]),
            (sub) => {
                if (submenuStack[0]?.parentLabel === item.label) setSubmenuStack([])
                else if (submenuStack.length >= 1) {
                    const newSubmenuItem = {
                        parentLabel: item.label,
                        options: sub,
                        extended: true,
                    }
                    setSubmenuStack([submenuStack[0], newSubmenuItem])
                }
            },
        )

        const parentItem = find((sub: SubmenuState) => sub.parentLabel === item.label)(submenuStack)
        if (parentItem) {
            parentItem.extended = !parentItem.extended
            setSubmenuStack([submenuStack[0], parentItem])
        }
    }

    const [coords, setCoords] = useState<Coordinates>(() =>
        findParentMenuCoords(submenu?.parentLabel),
    )

    useEffect(() => {
        const updateCoords = () => setCoords(findParentMenuCoords(submenu?.parentLabel))
        window.addEventListener('resize', updateCoords)
        return () => window.removeEventListener('resize', updateCoords)
    }, [submenu?.parentLabel])

    const isExtended = (label: string) =>
        submenuStack[1]?.extended && submenuStack[1].parentLabel === label

    return (
        <div className="SubmenuBasis" style={{ left: coords.x }}>
            {submenu?.options.map((item) => (
                <AccessGuard
                    guards={[
                        {
                            when: { type: 'capability', capabilities: item.allowCapabilities },
                            then: { mode: 'hidden' },
                        },
                        {
                            when: { type: 'feature', features: item.allowedFeatures },
                            then: { mode: 'hidden' },
                        },
                    ]}
                    key={item.label}
                >
                    <li
                        id={item.label}
                        className={
                            isParentMenu(item.label, submenuStack) || isActive(item.label, pageName)
                                ? 'active'
                                : ''
                        }
                        onClick={() => handleItemClick(item)}
                    >
                        <Link to={item?.path || ''}>
                            <span>
                                {item.label}
                                {item.submenu &&
                                    (isExtended(item.label) ? (
                                        <BiChevronUp className="chevron" />
                                    ) : (
                                        <BiChevronDown className="chevron" />
                                    ))}
                            </span>
                        </Link>
                        {isExtended(item.label) && (
                            <MenuAccordion items={item.submenu} pageName={pageName} />
                        )}
                    </li>
                </AccessGuard>
            ))}
        </div>
    )
}

export default SubmenuBasis
