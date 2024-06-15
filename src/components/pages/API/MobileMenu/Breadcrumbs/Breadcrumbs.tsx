import { take } from 'ramda'
import { Menu } from '../../Nav'
import './Breadcrumbs.scss'
import { FaHome } from 'react-icons/fa'

type BreadcrumbsProps = {
    stack: string[]
    setSubmenuStack: (items: string[]) => void
    menuStack: Menu[][]
    setMenuStack: (items: Array<Menu[]>) => void
    pageName: string
}

const Breadcrumbs = ({
    stack,
    setSubmenuStack,
    menuStack,
    setMenuStack,
    pageName,
}: BreadcrumbsProps) => {
    const handleClick = (item: string) => {
        const index = stack.reverse().findIndex((i) => i === item)
        stack.reverse()
        const newSubmenuStack = take(stack.length - index)(stack)
        setSubmenuStack(newSubmenuStack)
        const newMenuStack = take(menuStack.length - index)(menuStack)
        setMenuStack(newMenuStack)
    }

    const handleClickHome = () => {
        setSubmenuStack([])
        setMenuStack(take(1)(menuStack))
    }

    return (
        <div className="Breadcrumbs">
            {stack.length === 0 ? (
                <span className="crumb path">At: {pageName}</span>
            ) : (
                <>
                    <FaHome className="home-icon" onClick={handleClickHome} />
                    {stack.map((item) => (
                        <div key={item} className="breadcrumb">
                            <span className="slash">/</span>
                            <span
                                className="crumb"
                                onClick={() => handleClick(item)}
                            >
                                {item}
                            </span>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Breadcrumbs
