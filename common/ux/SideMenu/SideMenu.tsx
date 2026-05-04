import { IoMdClose } from 'react-icons/io'
import { SideMenuProps } from './SideMenu.types'
import './SideMenu.styles.css'

export const SideMenu = ({
    items,
    visible = true,
    onClose,
    className,
    ariaLabel,
    style,
}: SideMenuProps) => {
    if (!visible) return null

    return (
        <aside
            className={`SideMenu${className ? ` ${className}` : ''}`}
            aria-label={ariaLabel ?? 'Side menu'}
            style={style}
        >
            <div className="SideMenu__line" />
            {items.map((item) => (
                <div
                    key={item.label}
                    className={`SideMenu__item${item.highlighted ? ' SideMenu__item--highlighted' : ''}`}
                    title={item.label}
                    onClick={item.onClick}
                >
                    {item.icon}
                    {item.badge && <span className="SideMenu__badge">{item.badge}</span>}
                </div>
            ))}
            {onClose && (
                <div className="SideMenu__item" title="Close Menu" onClick={onClose}>
                    <IoMdClose />
                </div>
            )}
        </aside>
    )
}
