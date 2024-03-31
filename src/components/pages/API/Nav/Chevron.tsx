import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { Menu, Submenu } from '.'

type ChevronProps = {
    item: Menu
    submenu?: Submenu
}

const Chevron = ({ item, submenu }: ChevronProps) => {
    return (
        item.submenu &&
        (submenu?.parentLabel === item.label ? (
            <BiChevronUp className="chevron" />
        ) : (
            <BiChevronDown className="chevron" />
        ))
    )
}

export default Chevron
