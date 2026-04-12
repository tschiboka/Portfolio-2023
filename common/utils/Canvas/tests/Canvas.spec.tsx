import { renderHook } from '@testing-library/react'
import { Canvas } from '..'
import { RefObject } from 'react'

// ── Mock Canvas Context ─────────────────────────────────────────────────────
type MockCtx = {
    beginPath: jest.Mock
    moveTo: jest.Mock
    lineTo: jest.Mock
    stroke: jest.Mock
    fill: jest.Mock
    arc: jest.Mock
    clearRect: jest.Mock
    strokeStyle: string
    fillStyle: string
    lineWidth: number
}

const createMockCtx = (): MockCtx => ({
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
    arc: jest.fn(),
    clearRect: jest.fn(),
    strokeStyle: '',
    fillStyle: '',
    lineWidth: 0,
})

// ── Mock HTMLCanvasElement ──────────────────────────────────────────────────
const createMockCanvas = (
    overrides: {
        parentWidth?: number
        parentHeight?: number
        ctx?: MockCtx | null
        noParent?: boolean
        noGrandparent?: boolean
    } = {},
) => {
    const {
        parentWidth = 400,
        parentHeight = 200,
        ctx = createMockCtx(),
        noParent = false,
        noGrandparent = false,
    } = overrides

    const grandparent = noGrandparent
        ? undefined
        : ({ clientWidth: parentWidth, clientHeight: parentHeight } as HTMLElement)

    const parent = noParent ? undefined : ({ parentElement: grandparent } as HTMLElement)

    const getContext = jest.fn().mockReturnValue(ctx)
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

// ═════════════════════════════════════════════════════════════════════════════
// Tests
// ═════════════════════════════════════════════════════════════════════════════

describe('Canvas.useCanvas', () => {
    // ── Null / Missing References ────────────────────────────────────────
    describe('when ref.current is null', () => {
        it('should return undefined ctx', () => {
            const ref = makeRef(null)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.ctx).toBeUndefined()
        })

        it('should return zero dimensions', () => {
            const ref = makeRef(null)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.width).toBe(0)
            expect(result.current.height).toBe(0)
        })

        it('should return zero radius', () => {
            const ref = makeRef(null)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.radius).toBe(0)
        })

        it('should return { x: 0, y: 0 } centre', () => {
            const ref = makeRef(null)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.centre).toEqual({ x: 0, y: 0 })
        })
    })

    describe('when parent element is missing', () => {
        it('should return undefined ctx when parentElement is null', () => {
            const { canvas } = createMockCanvas({ noParent: true })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.ctx).toBeUndefined()
        })

        it('should return undefined ctx when grandparent is null', () => {
            const { canvas } = createMockCanvas({ noGrandparent: true })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.ctx).toBeUndefined()
        })
    })

    describe('when getContext returns null', () => {
        it('should return undefined ctx', () => {
            const { canvas } = createMockCanvas({ ctx: null })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.ctx).toBeUndefined()
        })
    })

    // ── Successful Initialisation ────────────────────────────────────────
    describe('when canvas is fully available', () => {
        const parentWidth = 400
        const parentHeight = 200

        it('should call getContext with "2d"', () => {
            const { canvas, getContext } = createMockCanvas({ parentWidth, parentHeight })
            const ref = makeRef(canvas)
            renderHook(() => Canvas.useCanvas(ref))

            expect(getContext).toHaveBeenCalledWith('2d')
        })

        it('should set canvas dimensions to grandparent dimensions', () => {
            const { canvas } = createMockCanvas({ parentWidth, parentHeight })
            const ref = makeRef(canvas)
            renderHook(() => Canvas.useCanvas(ref))

            expect(canvas.width).toBe(parentWidth)
            expect(canvas.height).toBe(parentHeight)
        })

        it('should return correct width and height', () => {
            const { canvas } = createMockCanvas({ parentWidth, parentHeight })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.width).toBe(parentWidth)
            expect(result.current.height).toBe(parentHeight)
        })

        it('should return the ctx from getContext', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.ctx).toBe(mockCtx)
        })

        it('should compute radius as half of the shorter side', () => {
            const { canvas } = createMockCanvas({ parentWidth: 600, parentHeight: 300 })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.radius).toBe(150) // min(600,300)/2
        })

        it('should compute radius correctly when width < height', () => {
            const { canvas } = createMockCanvas({ parentWidth: 100, parentHeight: 500 })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.radius).toBe(50) // min(100,500)/2
        })

        it('should compute radius correctly for a square canvas', () => {
            const { canvas } = createMockCanvas({ parentWidth: 300, parentHeight: 300 })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.radius).toBe(150)
        })

        it('should compute centre as midpoint of dimensions', () => {
            const { canvas } = createMockCanvas({ parentWidth, parentHeight })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(result.current.centre).toEqual({
                x: parentWidth / 2,
                y: parentHeight / 2,
            })
        })
    })

    // ── line() ───────────────────────────────────────────────────────────
    describe('line()', () => {
        const parentWidth = 400
        const parentHeight = 200

        it('should not throw when ctx is undefined (no-op)', () => {
            const { canvas } = createMockCanvas({ ctx: null })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(() =>
                result.current.line({
                    start: { x: { value: 0 }, y: { value: 0 } },
                    end: { x: { value: 10 }, y: { value: 10 } },
                    config: { color: 'red' },
                }),
            ).not.toThrow()
        })

        it('should draw a line with px coordinates', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: { x: { value: 10 }, y: { value: 20 } },
                end: { x: { value: 100 }, y: { value: 150 } },
                config: { color: 'red', width: 3 },
            })

            expect(mockCtx.beginPath).toHaveBeenCalled()
            expect(mockCtx.moveTo).toHaveBeenCalledWith(10, 20)
            expect(mockCtx.lineTo).toHaveBeenCalledWith(100, 150)
            expect(mockCtx.strokeStyle).toBe('red')
            expect(mockCtx.lineWidth).toBe(3)
            expect(mockCtx.stroke).toHaveBeenCalled()
        })

        it('should draw a line with percentage coordinates', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: {
                    x: { value: 50, type: 'pc' },
                    y: { value: 50, type: 'pc' },
                },
                end: {
                    x: { value: 100, type: 'pc' },
                    y: { value: 100, type: 'pc' },
                },
                config: { color: 'blue' },
            })

            expect(mockCtx.moveTo).toHaveBeenCalledWith(parentWidth * 0.5, parentHeight * 0.5)
            expect(mockCtx.lineTo).toHaveBeenCalledWith(parentWidth, parentHeight)
        })

        it('should use default color "white" when config.color is undefined', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: { x: { value: 0 }, y: { value: 0 } },
                end: { x: { value: 10 }, y: { value: 10 } },
                config: {},
            })

            expect(mockCtx.strokeStyle).toBe('white')
        })

        it('should use default lineWidth 1 when config.width is undefined', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: { x: { value: 0 }, y: { value: 0 } },
                end: { x: { value: 10 }, y: { value: 10 } },
                config: {},
            })

            expect(mockCtx.lineWidth).toBe(1)
        })

        it('should default coordinates to 0 when start/end coords are undefined', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                config: { color: 'green' },
            })

            expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0)
            expect(mockCtx.lineTo).toHaveBeenCalledWith(0, 0)
        })

        it('should handle mixed px and pc coordinate types', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: {
                    x: { value: 50, type: 'pc' },
                    y: { value: 30 },
                },
                end: {
                    x: { value: 80 },
                    y: { value: 75, type: 'pc' },
                },
                config: { color: 'yellow' },
            })

            expect(mockCtx.moveTo).toHaveBeenCalledWith(parentWidth * 0.5, 30)
            expect(mockCtx.lineTo).toHaveBeenCalledWith(80, parentHeight * 0.75)
        })
    })

    // ── circle() ─────────────────────────────────────────────────────────
    describe('circle()', () => {
        const parentWidth = 400
        const parentHeight = 200

        it('should not throw when ctx is undefined (no-op)', () => {
            const { canvas } = createMockCanvas({ ctx: null })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(() =>
                result.current.circle({
                    start: { x: { value: 50 }, y: { value: 50 } },
                    radius: 25,
                    config: { color: 'red' },
                }),
            ).not.toThrow()
        })

        it('should draw a stroked circle by default (fill=false)', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.circle({
                start: { x: { value: 100 }, y: { value: 50 } },
                radius: 30,
                config: { color: '#ff0000', width: 2 },
            })

            expect(mockCtx.beginPath).toHaveBeenCalled()
            expect(mockCtx.arc).toHaveBeenCalledWith(100, 50, 30, 0, 2 * Math.PI, false)
            expect(mockCtx.strokeStyle).toBe('#ff0000')
            expect(mockCtx.fillStyle).toBe('#ff0000')
            expect(mockCtx.lineWidth).toBe(2)
            expect(mockCtx.stroke).toHaveBeenCalled()
            expect(mockCtx.fill).not.toHaveBeenCalled()
        })

        it('should draw a filled circle when fill=true', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.circle({
                start: { x: { value: 100 }, y: { value: 50 } },
                radius: 30,
                config: { color: 'green', fill: true, width: 5 },
            })

            expect(mockCtx.fill).toHaveBeenCalled()
            expect(mockCtx.stroke).not.toHaveBeenCalled()
        })

        it('should use default color "white" when config.color is undefined', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.circle({
                start: { x: { value: 0 }, y: { value: 0 } },
                radius: 10,
                config: {},
            })

            expect(mockCtx.strokeStyle).toBe('white')
            expect(mockCtx.fillStyle).toBe('white')
        })

        it('should use default lineWidth 1 when config.width is undefined', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.circle({
                start: { x: { value: 0 }, y: { value: 0 } },
                radius: 10,
                config: {},
            })

            expect(mockCtx.lineWidth).toBe(1)
        })

        it('should resolve percentage-based start coordinates', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.circle({
                start: {
                    x: { value: 50, type: 'pc' },
                    y: { value: 25, type: 'pc' },
                },
                radius: 20,
                config: { color: 'cyan' },
            })

            expect(mockCtx.arc).toHaveBeenCalledWith(
                parentWidth * 0.5,
                parentHeight * 0.25,
                20,
                0,
                2 * Math.PI,
                false,
            )
        })

        it('should default start coordinates to 0 when start is undefined', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.circle({
                radius: 15,
                config: { color: 'magenta' },
            })

            expect(mockCtx.arc).toHaveBeenCalledWith(0, 0, 15, 0, 2 * Math.PI, false)
        })
    })

    // ── getPoint (internal) via line/circle ──────────────────────────────
    describe('getPoint behaviour (tested via line/circle)', () => {
        const parentWidth = 500
        const parentHeight = 250

        it('should treat missing type as "px"', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: { x: { value: 42 }, y: { value: 99 } },
                end: { x: { value: 0 }, y: { value: 0 } },
                config: {},
            })

            expect(mockCtx.moveTo).toHaveBeenCalledWith(42, 99)
        })

        it('should return 0 for "pc" values outside 0–100 range', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: {
                    x: { value: 150, type: 'pc' },
                    y: { value: -10, type: 'pc' },
                },
                end: { x: { value: 0 }, y: { value: 0 } },
                config: {},
            })

            expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0)
        })

        it('should return 0 for "pc" at value 0', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: {
                    x: { value: 0, type: 'pc' },
                    y: { value: 0, type: 'pc' },
                },
                end: { x: { value: 0 }, y: { value: 0 } },
                config: {},
            })

            expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0)
        })

        it('should compute full length for "pc" at value 100', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: {
                    x: { value: 100, type: 'pc' },
                    y: { value: 100, type: 'pc' },
                },
                end: { x: { value: 0 }, y: { value: 0 } },
                config: {},
            })

            expect(mockCtx.moveTo).toHaveBeenCalledWith(parentWidth, parentHeight)
        })

        it('should default value to 0 when not provided', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({ parentWidth, parentHeight, ctx: mockCtx })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: { x: {}, y: {} },
                end: { x: { value: 0 }, y: { value: 0 } },
                config: {},
            })

            expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0)
        })
    })

    // ── Return shape ─────────────────────────────────────────────────────
    describe('return shape', () => {
        it('should return all expected properties', () => {
            const { canvas } = createMockCanvas()
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            const c = result.current
            expect(c.ctx).toBeDefined()
            expect(typeof c.width).toBe('number')
            expect(typeof c.height).toBe('number')
            expect(typeof c.radius).toBe('number')
            expect(typeof c.centre.x).toBe('number')
            expect(typeof c.centre.y).toBe('number')
            expect(typeof c.line).toBe('function')
            expect(typeof c.circle).toBe('function')
        })

        it('should return line and circle as callable functions', () => {
            const { canvas } = createMockCanvas()
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            expect(typeof result.current.line).toBe('function')
            expect(typeof result.current.circle).toBe('function')
        })
    })

    // ── Multiple calls ───────────────────────────────────────────────────
    describe('multiple drawing calls', () => {
        it('should call beginPath for each line call', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({
                parentWidth: 400,
                parentHeight: 200,
                ctx: mockCtx,
            })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.line({
                start: { x: { value: 0 }, y: { value: 0 } },
                end: { x: { value: 10 }, y: { value: 10 } },
                config: { color: 'red' },
            })
            result.current.line({
                start: { x: { value: 20 }, y: { value: 20 } },
                end: { x: { value: 30 }, y: { value: 30 } },
                config: { color: 'blue' },
            })

            expect(mockCtx.beginPath).toHaveBeenCalledTimes(2)
            expect(mockCtx.stroke).toHaveBeenCalledTimes(2)
        })

        it('should call beginPath for each circle call', () => {
            const mockCtx = createMockCtx()
            const { canvas } = createMockCanvas({
                parentWidth: 400,
                parentHeight: 200,
                ctx: mockCtx,
            })
            const ref = makeRef(canvas)
            const { result } = renderHook(() => Canvas.useCanvas(ref))

            result.current.circle({
                start: { x: { value: 50 }, y: { value: 50 } },
                radius: 10,
                config: { color: 'red' },
            })
            result.current.circle({
                start: { x: { value: 100 }, y: { value: 100 } },
                radius: 20,
                config: { color: 'blue', fill: true },
            })

            expect(mockCtx.beginPath).toHaveBeenCalledTimes(2)
            expect(mockCtx.arc).toHaveBeenCalledTimes(2)
        })
    })
})
