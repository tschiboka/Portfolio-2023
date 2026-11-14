import { isValidElement } from 'react'
import { isArray, isBoolean, isNonEmpty, isNullish, isNumber, isString } from '@common-utils'
import type { FC, ReactElement, ReactNode } from 'react'
import type { Optional } from '@common-utils'

const FRAGMENT_TYPE = Symbol.for('react.fragment')

const createSlot = <P extends object>(displayName: string, Component: FC<P>) => {
    const Slot: FC<P> = (props) => <Component {...props} />
    Slot.displayName = displayName
    return Slot
}

/** Recursively flatten children, unwrapping fragments and arrays. */
const flattenChildren = (node: ReactNode): ReactNode[] => {
    if (isNullish(node) || isString(node) || isNumber(node) || isBoolean(node)) return [node]
    if (isArray(node)) return (node as ReactNode[]).flatMap(flattenChildren)
    if (isValidElement(node) && (node.type as unknown) === FRAGMENT_TYPE)
        return flattenChildren(((node as ReactElement).props as { children?: ReactNode }).children)

    return [node]
}

/** The display name a slot element carries, or `undefined` for anything that is not an element. */
const slotNameOf = (node: ReactNode): Optional<string> => {
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
