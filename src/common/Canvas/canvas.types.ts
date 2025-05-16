export type Canvas = {
    ctx?: CanvasRenderingContext2D
    width: number,
    height: number,
    radius: number,
    centre: Centre,
    line: (line: Line) => void
    circle: (circle: Circle) => void
}

export type Coord = { value?: number, type?: "px" | "pc" }
export type Direction = { direction: "horizontal" | "vertical" }
export type Point = Coord & Direction
export type Centre = { x: number, y:number }

export type StyleConfig = {
    color?: string
    fill?: boolean
    width?: number
}

export type Line = {
    start?: {x?: Coord, y?: Coord}
    end?: {x?: Coord, y?: Coord}
    config: StyleConfig
}

export type Circle = {
    start?: {x?: Coord, y?: Coord}
    radius: number
    config: StyleConfig
}
