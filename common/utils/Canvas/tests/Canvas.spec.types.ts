import type { Mock } from 'vitest'
import type { Nullable } from '@common-utils'

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
    ctx?: Nullable<MockCtx>
    noParent?: boolean
    noGrandparent?: boolean
}
