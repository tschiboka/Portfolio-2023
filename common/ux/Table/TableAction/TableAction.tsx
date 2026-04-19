import { ReactNode, useEffect, useId, useRef, useState } from 'react'
import type { CellMeta, TableAction } from '../Table.types'
import './TableAction.styles.css'

type TableActionsProps<TData extends Record<string, ReactNode>, TContext> = {
    actions: TableAction<TData, TContext>[]
    meta: CellMeta<TData, TContext>
    disabled?: boolean
}

export const TableActions = <TData extends Record<string, ReactNode>, TContext>({
    actions,
    meta,
    disabled = false,
}: TableActionsProps<TData, TContext>) => {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const menuId = useId()

    useEffect(() => {
        if (!isOpen) return
        const handleClickOutside = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) setIsOpen(false)
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    const visibleActions = actions.filter((action) => action.filter?.(meta) ?? true)
    const noActions = visibleActions.length === 0
    const isDisabled = disabled || noActions

    return (
        <td className="action-col">
            <div className="action-wrapper" ref={wrapperRef}>
                <button
                    className={`action-btn${isDisabled ? ' disabled' : ''}`}
                    type="button"
                    aria-label="Row actions"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    disabled={isDisabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    &#x22EE;
                </button>
                {isOpen && (
                    <ul
                        id={menuId}
                        className="action-dropdown"
                        role="menu"
                        aria-label="Row actions menu"
                    >
                        {visibleActions.map((action) => (
                            <li key={action.id} role="none">
                                <button
                                    className={`action-item ${action.variant || ''}`}
                                    type="button"
                                    role="menuitem"
                                    aria-label={action.label}
                                    disabled={action.isDisabled?.(meta) ?? false}
                                    onClick={() => {
                                        if (action.href) {
                                            window.location.href = action.href(meta)
                                        } else {
                                            action.onClick?.(meta)
                                        }
                                        setIsOpen(false)
                                    }}
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </td>
    )
}
