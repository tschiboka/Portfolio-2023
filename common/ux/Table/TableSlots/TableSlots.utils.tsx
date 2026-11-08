import { isValidElement } from 'react'
import { isNonEmpty } from '@common-utils'
import type { FC, ReactElement, ReactNode } from 'react'

const FRAGMENT_TYPE = Symbol.for('react.fragment')

const createSlot = <P extends object>(displayName: string, Component: FC<P>) => {
    const Slot: FC<P> = (props) => <Component {...props} />
    Slot.displayName = displayName
    return Slot
}

/** Recursively flatten children, unwrapping fragments and arrays. */
const flattenChildren = (node: ReactNode): ReactNode[] => {
    if (
        node == null ||
        typeof node === 'string' ||
        typeof node === 'number' ||
        typeof node === 'boolean'
    )
        return [node]

    if (Array.isArray(node)) return node.flatMap(flattenChildren)

    if (isValidElement(node) && (node.type as unknown) === FRAGMENT_TYPE)
        return flattenChildren(((node as ReactElement).props as { children?: ReactNode }).children)

    return [node]
}

/** The display name a slot element carries, or `undefined` for anything that is not an element. */
const slotNameOf = (node: ReactNode): string | undefined => {
    if (!isValidElement(node)) return undefined

    return ((node as ReactElement).type as { displayName?: string }).displayName
}

const extractSlot = (
    children: ReactNode,
    slotName: string,
): { slot: ReactNode; rest: ReactNode[] } => {
    const flat = flattenChildren(children)
    const slots = flat.filter((child) => slotNameOf(child) === slotName)
    const rest = flat.filter((child) => slotNameOf(child) !== slotName)

    return { slot: isNonEmpty(slots) ? slots[0] : undefined, rest }
}

export const TableSlotsUtils = { createSlot, extractSlot }
