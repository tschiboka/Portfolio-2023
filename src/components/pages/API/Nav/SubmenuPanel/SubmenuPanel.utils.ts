import { Maybe } from "monet";
import { Submenu } from "..";

export type Coordinates = { x: number; y: number }

export const findParentMenuCoords = (parentLabel?: string): Coordinates =>
    Maybe.fromNull(parentLabel)
        .map((label) => {
            const elem = document.getElementById(label)
            const rect = elem?.getBoundingClientRect()
            return rect ? { x: rect.x, y: 0 } : { x: 0, y: 0 }
        })
        .orSome({ x: 0, y: 0 })

export const isParentMenu = (label: string, stack: Submenu[]) => stack[1]?.parentLabel === label
