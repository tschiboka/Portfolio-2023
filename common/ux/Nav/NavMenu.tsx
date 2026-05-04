import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AccessGuard } from '../../utils/AccessGuard'
import { Nav } from './Nav'
import { MenuItem, NavProps, SubmenuState } from './Nav.types'
import { isHighlighted } from './Nav.utils'
import { Chevron } from './Components/Chevron'

export type NavMenuProps = Pick<
    NavProps,
    'visible' | 'className' | 'ariaLabel' | 'style' | 'logo' | 'burger'
> & {
    items: MenuItem[]
    pageName: string
    isLoading?: boolean
    submenu?: SubmenuState
    renderImage?: (imageName: string) => ReactNode
    onItemClick?: (item: MenuItem) => void
    onSubmenuToggle?: () => void
}

export const NavMenu = ({
    items,
    pageName,
    isLoading,
    submenu,
    renderImage,
    onItemClick,
    onSubmenuToggle,
    ...navProps
}: NavMenuProps) => {
    // Render empty nav while loading to prevent items popping in
    if (isLoading) return <Nav {...navProps}>{null}</Nav>

    return (
        <Nav {...navProps}>
            {items.map((item) =>
                item.showSubmenuToggle ? (
                    <li key="submenu-toggle" onClick={onSubmenuToggle}>
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
                            className={isHighlighted(item, pageName, submenu)}
                            onClick={() => onItemClick?.(item)}
                        >
                            <Link className="link" to={item?.path || ''}>
                                {item.image && renderImage?.(item.image)}
                                <span>{item.label}</span>
                                <Chevron item={item} submenu={submenu} />
                            </Link>
                        </li>
                    </AccessGuard>
                ),
            )}
        </Nav>
    )
}
