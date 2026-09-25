import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { MenuItem, SubmenuState } from '../Nav.types'

type ChevronProps = {
    item: MenuItem
    submenu?: SubmenuState
}

export const Chevron = ({ item, submenu }: ChevronProps) => {
    return (
        item.submenu &&
        (submenu?.parentLabel === item.label ? (
            <BiChevronUp className="chevron" />
        ) : (
            <BiChevronDown className="chevron" />
        ))
    )
}
