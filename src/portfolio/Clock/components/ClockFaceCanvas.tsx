import { useRef, useEffect } from 'react'
import { ClockData, ClockUtils } from '..'
import { CanvasHooks } from '@common-utils'

type ClockFaceCanvasProps = { clock: ClockData }

export const ClockFaceCanvas = ({ clock }: ClockFaceCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvas = CanvasHooks.useCanvas(canvasRef)
    const { ctx, width, height } = canvas
    ctx?.clearRect(0, 0, width, height)

    useEffect(() => {
        if (ctx) {
            ClockUtils.drawGrooves(canvas)
            ClockUtils.drawHands(clock, canvas)
        }
    }, [clock, ctx, canvas])

    return <canvas className="ClockFaceCanvas" ref={canvasRef} width={300} height={150} />
}
