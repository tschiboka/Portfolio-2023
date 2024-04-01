import { Maybe } from 'monet'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Submenu } from '..'
import {
    append,
    equals,
    evolve,
    find,
    lensProp,
    map,
    not,
    over,
    pipe,
    propEq,
    when,
} from 'ramda'
import {
    Coordinates,
    findParentMenuCoords,
    isParentMenu,
} from './SubmenuPanel.utils'
import './SubmenuPanel.scss'
import Accordion from './MenuAccordion'
import Chevron from '../Chevron'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

type SubmenuProps = {
    submenu?: Submenu
    submenuStack: Submenu[]
    setSubmenuStack: (submenu: Submenu[]) => void
    pageName: string
}

const SubmenuBasis = ({
    submenu,
    submenuStack,
    setSubmenuStack,
    pageName,
}: SubmenuProps) => {
    const handleItemClick = (item: Menu) => {
        Maybe.fromNull(item.submenu).cata(
            () => setSubmenuStack([]),
            (sub) => {
                if (submenuStack[0]?.parentLabel === item.label)
                    setSubmenuStack([])
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

        const parentItem = find(
            (sub: Submenu) => sub.parentLabel === item.label,
        )(submenuStack)
        if (parentItem) {
            parentItem.extended = !parentItem.extended
            setSubmenuStack([submenuStack[0], parentItem])
        }
    }

    const [coords, _] = useState<Coordinates>(() =>
        findParentMenuCoords(submenu?.parentLabel),
    )

    const isExtended = (label: string) =>
        submenuStack[1]?.extended && submenuStack[1].parentLabel === label

    return (
        <div className="SubmenuBasis" style={{ top: '2.5rem', left: coords.x }}>
            {submenu?.options.map((item) => (
                <li
                    key={item.label}
                    id={item.label}
                    onClick={() => handleItemClick(item)}
                >
                    <Link className="link" to={item?.path || ''}>
                        <span
                            className={
                                isParentMenu(item.label, submenuStack)
                                    ? 'active'
                                    : ''
                            }
                        >
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
                        <Accordion items={item.submenu} pageName={pageName} />
                    )}
                </li>
            ))}
        </div>
    )
}

export default SubmenuBasis
