import { Link } from 'react-router-dom'
import { MenuItem } from '../Nav.types'
import { isActive } from '../Nav.utils'

type MenuAccordionProps = {
    items?: MenuItem[]
    pageName: string
}

const MenuAccordion = ({ items, pageName }: MenuAccordionProps) => {
    return (
        items && (
            <ul className="MenuAccordion">
                {items.map((item) => (
                    <li key={item.label}>
                        <Link className="link" to={item?.path || ''}>
                            <span className={isActive(item.label, pageName)}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    )
}

export default MenuAccordion
