import type { Mock } from 'vitest'

export type MockCtx = {
    beginPath: Mock
    moveTo: Mock
    lineTo: Mock
    stroke: Mock
    fill: Mock
    arc: Mock
    clearRect: Mock
    strokeStyle: string
    fillStyle: string
    lineWidth: number
}

export type CanvasOverrides = {
    parentWidth?: number
    parentHeight?: number
    ctx?: MockCtx | null
    noParent?: boolean
    noGrandparent?: boolean
}
