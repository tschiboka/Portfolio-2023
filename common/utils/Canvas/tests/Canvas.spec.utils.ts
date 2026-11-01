import type { RefObject } from 'react'
import type { CanvasOverrides, MockCtx } from './Canvas.spec.types'

const defaultParentWidth = 400
const defaultParentHeight = 200

const createMockCtx = (): MockCtx => ({
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    arc: vi.fn(),
    clearRect: vi.fn(),
    strokeStyle: '',
    fillStyle: '',
    lineWidth: 0,
})

const createMockCanvas = (overrides: CanvasOverrides = {}) => {
    const {
        parentWidth = defaultParentWidth,
        parentHeight = defaultParentHeight,
        ctx = createMockCtx(),
        noParent = false,
        noGrandparent = false,
    } = overrides

    const grandparent = noGrandparent
        ? undefined
        : ({ clientWidth: parentWidth, clientHeight: parentHeight } as HTMLElement)

    const parent = noParent ? undefined : ({ parentElement: grandparent } as HTMLElement)

    const getContext = vi.fn().mockReturnValue(ctx)
    const canvas = {
        width: 0,
        height: 0,
        parentElement: parent,
        getContext,
    } as unknown as HTMLCanvasElement

    return { canvas, getContext, ctx }
}

const makeRef = (canvas: HTMLCanvasElement | null): RefObject<HTMLCanvasElement> =>
    ({ current: canvas }) as RefObject<HTMLCanvasElement>

export const CanvasTestUtils = {
    createMockCtx,
    createMockCanvas,
    makeRef,
    defaultParentWidth,
    defaultParentHeight,
}
