import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useAppContext } from '../../../../src/context/AppContext/App.context'
import { Nav } from '../Nav'
import { isHighlighted, portfolioMenu } from '../Nav.utils'

export type PortfolioNavProps = {
    pageName: string
}

export const PortfolioNav = ({ pageName }: PortfolioNavProps) => {
    const { mainMenuVisible, subMenuVisible, setSubMenuVisible } = useAppContext()

    return (
        <Nav visible={mainMenuVisible}>
            {portfolioMenu.map((item) =>
                item.showSubmenuToggle ? (
                    <li key="submenu-toggle" onClick={() => setSubMenuVisible(!subMenuVisible)}>
                        <BsThreeDotsVertical title="Toggle Submenu Visibility" />
                    </li>
                ) : (
                    <li key={item.label} className={isHighlighted(item, pageName)}>
                        <Link className="link" to={item.path || ''}>
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ),
            )}
        </Nav>
    )
}
