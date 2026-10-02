import { Maybe } from 'monet'
import { Coordinates, SubmenuState } from '../Nav.types'

const findParentMenuCoords = (parentLabel?: string): Coordinates =>
    Maybe.fromNull(parentLabel)
        .map((label) => {
            const elem = document.getElementById(label)
            const rect = elem?.getBoundingClientRect()
            return rect ? { x: rect.x, y: 0 } : { x: 0, y: 0 }
        })
        .orSome({ x: 0, y: 0 })

const isParentMenu = (label: string, stack: SubmenuState[]) => stack[1]?.parentLabel === label

export const SubmenuUtils = { findParentMenuCoords, isParentMenu }
