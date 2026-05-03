import { Link } from 'react-router-dom'
import { Maybe } from 'monet'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useAppContext } from '../../../../src/context/AppContext/App.context'
import { Session } from '../../../../src/context/SessionContext'
import { AccessGuard } from '../../../utils/AccessGuard'
import { Nav } from '../Nav'
import { MenuItem, SubmenuState } from '../Nav.types'
import { apiMenu, isHighlighted } from '../Nav.utils'
import { Chevron } from './Chevron'
import SantaHat from '../../../../src/assets/images/projects/xmas/santa_hat.png'

export type ApiNavProps = {
    pageName: string
    submenuStack: SubmenuState[]
    setSubmenuStack: (submenu: SubmenuState[]) => void
}

const getMenuItemImage = (imageName: string) => {
    switch (imageName) {
        case 'xmas_hat':
            return <img className="xmas-hat" src={SantaHat} alt="Xmas Hat" />
        default:
            return null
    }
}

export const ApiNav = ({ pageName, submenuStack, setSubmenuStack }: ApiNavProps) => {
    const { subMenuVisible, setSubMenuVisible } = useAppContext()
    const { isAuthLoading } = Session.useContext()

    const handleItemClick = (item: MenuItem) => {
        Maybe.fromNull(item.submenu).cata(
            () => setSubmenuStack([]),
            (sub) => {
                if (submenuStack[0]?.parentLabel === item.label) setSubmenuStack([])
                else
                    setSubmenuStack([
                        {
                            parentLabel: item.label,
                            options: sub,
                            extended: false,
                        },
                    ])
            },
        )
    }

    // Render empty nav while session loads to prevent menu items popping in
    if (isAuthLoading) return <Nav>{null}</Nav>

    return (
        <Nav>
            {apiMenu.map((item) =>
                item.showSubmenuToggle ? (
                    <li key="submenu-toggle" onClick={() => setSubMenuVisible(!subMenuVisible)}>
                        <BsThreeDotsVertical title="Toggle Submenu Visibility" />
                    </li>
                ) : (
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
                            className={isHighlighted(item, pageName, submenuStack?.[0])}
                            onClick={() => handleItemClick(item)}
                        >
                            <Link className="link" to={item?.path || ''}>
                                {item.image && getMenuItemImage(item.image)}
                                <span>{item.label}</span>
                                <Chevron item={item} submenu={submenuStack?.[0]} />
                            </Link>
                        </li>
                    </AccessGuard>
                ),
            )}
        </Nav>
    )
}
