import { useRef, useEffect } from 'react'
import { ClockData, drawGrooves, drawHands } from '.'
import { Canvas } from '@common/utils'

type ClockFaceCanvasProps = { clock: ClockData }

export const ClockFaceCanvas = ({ clock }: ClockFaceCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvas = Canvas.useCanvas(canvasRef)
    const { ctx, width, height } = canvas
    ctx?.clearRect(0, 0, width, height)

    useEffect(() => {
        if (ctx) {
            drawGrooves(canvas)
            drawHands(clock, canvas)
        }
    }, [clock, ctx, canvas])

    return <canvas className="ClockFaceCanvas" ref={canvasRef} width={300} height={150} />
}
