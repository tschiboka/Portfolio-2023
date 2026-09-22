import { Link, List } from '@common-ux'
import { MenuItem } from '../Nav.types'
import { isActive } from '../Nav.utils'

type MenuAccordionProps = {
    items?: MenuItem[]
    pageName: string
}

const MenuAccordion = ({ items, pageName }: MenuAccordionProps) => {
    return (
        items && (
            <List
                className="MenuAccordion"
                items={items.map((item) => ({
                    key: item.label,
                    content: (
                        <Link to={item?.path || ''}>
                            <span className={isActive(item.label, pageName)}>{item.label}</span>
                        </Link>
                    ),
                }))}
            />
        )
    )
}

export default MenuAccordion
