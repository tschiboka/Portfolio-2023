import { type ReactNode, isValidElement } from 'react'

const FRAGMENT_TYPE = Symbol.for('react.fragment')

export const createSlot = <P extends object>(displayName: string, Component: React.FC<P>) => {
    const Slot: React.FC<P> = (props) => <Component {...props} />
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
    ) {
        return [node]
    }
    if (Array.isArray(node)) {
        return node.flatMap(flattenChildren)
    }
    if (isValidElement(node) && (node.type as any) === FRAGMENT_TYPE) {
        return flattenChildren((node as React.ReactElement).props.children)
    }
    return [node]
}

export const extractSlot = (
    children: ReactNode,
    slotName: string,
): { slot: ReactNode; rest: ReactNode[] } => {
    const slots: ReactNode[] = []
    const rest: ReactNode[] = []

    const flat = flattenChildren(children)

    for (const child of flat) {
        if (isValidElement(child)) {
            const el = child as React.ReactElement
            if (el.type && (el.type as any).displayName === slotName) {
                slots.push(child)
            } else {
                rest.push(child)
            }
        } else {
            rest.push(child)
        }
    }

    return { slot: slots.length > 0 ? slots[0] : undefined, rest }
}
