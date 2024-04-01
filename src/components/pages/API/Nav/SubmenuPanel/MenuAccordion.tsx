import { Link } from 'react-router-dom'
import { Menu } from '..'

type MenuAccordionProps = {
    items?: Menu[]
    pageName: string
}
const MenuAccordion = ({ items, pageName }: MenuAccordionProps) => {
    return (
        items && (
            <ul className="MenuAccordion">
                {items.map((item) => (
                    <li key={item.label}>
                        <Link className="link" to={item?.path || ''}>
                            <span
                                className={
                                    item.label === pageName ? 'active' : ''
                                }
                            >
                                {item.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    )
}

export default MenuAccordion
