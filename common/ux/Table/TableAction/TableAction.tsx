import { ReactNode, useRef, useState } from 'react'
import type { CellMeta, TableAction } from '../Table.types'
import { Overlay } from '../../Overlay'
import type { ActionMenuItem } from '../../Overlay'
import './TableAction.styles.css'
import { hasLength } from '@common/utils'

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
    const btnRef = useRef<HTMLButtonElement>(null)

    const visibleActions = actions.filter((action) => action.filter?.(meta) ?? true)
    const noActions = !hasLength(visibleActions)
    const isDisabled = disabled || noActions

    const menuItems: ActionMenuItem[] = visibleActions.map((action) => ({
        id: action.id,
        label: action.label,
        icon: action.icon,
        variant: action.variant,
        disabled: action.isDisabled?.(meta) ?? false,
        onClick: () => {
            if (action.href) window.location.href = action.href(meta)
            else action.onClick?.(meta)
        },
    }))

    return (
        <td className="action-col">
            <div className="action-wrapper">
                <button
                    ref={btnRef}
                    className={`action-btn${isDisabled ? ' disabled' : ''}`}
                    type="button"
                    aria-label="Row actions"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    disabled={isDisabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    &#x22EE;
                </button>
                {isOpen && (
                    <Overlay.ActionMenu
                        anchorRef={btnRef}
                        items={menuItems}
                        align="end"
                        ariaLabel="Row actions menu"
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </div>
        </td>
    )
}
