import { Maybe } from "monet";

export type Coordinates = { x: number; y: number }

export const findParentMenuCoords = (parentLabel?: string): Coordinates =>
    Maybe.fromNull(parentLabel)
        .map((label) => {
            const elem = document.getElementById(label)
            const rect = elem?.getBoundingClientRect()
            return rect ? { x: rect.x, y: rect.y } : { x: 0, y: 0 }
        })
        .orSome({ x: 0, y: 0 })
