import { useEffect, useRef } from 'react'
import { Arrays } from '@common-utils'
import { Const } from '@common-ux'
import { XmasFormCanvasConstants } from './XmasFormCanvas.constants'
import { XmasFormCanvasDefaults } from './XmasFormCanvas.defaults'
import type { ReactNode } from 'react'

interface XmasFormCanvasProps {
    children: ReactNode
    lightCount?: number
    lightSize?: number
}

interface Light {
    x: number
    y: number
    color: string
    phase: number
    baseOpacity: number
}

export const XmasFormCanvas = ({
    children,
    lightCount = XmasFormCanvasDefaults.lightCount,
    lightSize = XmasFormCanvasDefaults.lightSize,
}: XmasFormCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number>(0)
    const lightsRef = useRef<Light[]>([])

    const { bottom, side, top } = XmasFormCanvasConstants.padding
    const containerPadding = `${top}px ${side}px ${bottom}px ${side}px`

    const getPositionOnBorder = (progress: number, width: number, height: number) => {
        const adjustedWidth = width - 2 * side
        const adjustedHeight = height - top - bottom
        const perimeter = 2 * (adjustedWidth + adjustedHeight)
        const distance = progress * perimeter

        if (distance < adjustedWidth) return { x: side + distance, y: top }
        else if (distance < adjustedWidth + adjustedHeight)
            return {
                x: width - side,
                y: top + (distance - adjustedWidth),
            }
        else if (distance < 2 * adjustedWidth + adjustedHeight)
            return {
                x: width - side - (distance - adjustedWidth - adjustedHeight),
                y: height - bottom,
            }
        else
            return {
                x: side,
                y: height - bottom - (distance - 2 * adjustedWidth - adjustedHeight),
            }
    }

    const createLights = (width: number, height: number): Light[] =>
        Arrays.times(lightCount, (i) => {
            const { initialOpacity, palette } = XmasFormCanvasConstants
            const colors = [palette.red, palette.green]
            const progress = i / lightCount
            const position = getPositionOnBorder(progress, width, height)

            return {
                x: position.x,
                y: position.y,
                color: colors[i % colors.length],
                phase: progress * Math.PI * 2,
                baseOpacity: initialOpacity.floor + Math.random() * initialOpacity.range,
            }
        })

    const drawLights = (time: number) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const {
            colorCycleMs,
            coreOpacity,
            glowScale,
            highlightOffsetScale,
            highlightOpacity,
            highlightScale,
            palette,
            twinkle,
        } = XmasFormCanvasConstants

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        lightsRef.current.forEach((light, index) => {
            const twinkleSpeed = twinkle.baseSpeed + (index % twinkle.speedCycle) * twinkle.speedStep
            const twinkleAmount =
                Math.sin(time * twinkleSpeed + light.phase) * twinkle.amplitude + twinkle.floor
            const opacity = light.baseOpacity * twinkleAmount

            const colorCycle = Math.floor(time / colorCycleMs) % 2
            const isInitiallyRed = index % 2 === 0
            const currentColor = (colorCycle === 0) === isInitiallyRed ? palette.red : palette.green

            ctx.globalAlpha = opacity

            const gradient = ctx.createRadialGradient(
                light.x,
                light.y,
                0,
                light.x,
                light.y,
                lightSize * glowScale,
            )
            gradient.addColorStop(0, currentColor)
            gradient.addColorStop(1, 'transparent')

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(light.x, light.y, lightSize * glowScale, 0, Math.PI * 2)
            ctx.fill()

            ctx.globalAlpha = opacity * coreOpacity
            ctx.fillStyle = currentColor
            ctx.beginPath()
            ctx.arc(light.x, light.y, lightSize, 0, Math.PI * 2)
            ctx.fill()

            ctx.globalAlpha = opacity * highlightOpacity
            ctx.fillStyle = palette.highlight
            ctx.beginPath()
            ctx.arc(
                light.x - lightSize * highlightOffsetScale,
                light.y - lightSize * highlightOffsetScale,
                lightSize * highlightScale,
                0,
                Math.PI * 2,
            )
            ctx.fill()
        })

        ctx.globalAlpha = 1
        animationRef.current = requestAnimationFrame(drawLights)
    }

    const resizeCanvas = () => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        // Get the content area (excluding padding)
        const contentDiv = container.querySelector('div:nth-child(2)') as HTMLElement
        if (!contentDiv) return

        const contentRect = contentDiv.getBoundingClientRect()

        // Canvas should cover the entire container (including padding space for lights)
        const containerRect = container.getBoundingClientRect()
        canvas.width = containerRect.width
        canvas.height = containerRect.height
        canvas.style.width = `${containerRect.width}px`
        canvas.style.height = `${containerRect.height}px`

        // But lights should be positioned around the content area
        const paddedWidth = contentRect.width + 2 * side
        const paddedHeight = contentRect.height + top + bottom

        lightsRef.current = createLights(paddedWidth, paddedHeight)
    }

    useEffect(() => {
        resizeCanvas()

        const handleResize = () => resizeCanvas()

        window.addEventListener('resize', handleResize)

        // Start animation
        animationRef.current = requestAnimationFrame(drawLights)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- the effect restarts on lightCount/lightSize by design; drawLights and resizeCanvas change identity every render, so listing them would tear down the listener and frame loop each pass
    }, [lightCount, lightSize])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                display: 'inline-block',
                padding: containerPadding,
            }}
        >
            {' '}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: Const.ZIndex.sticky,
                }}
            />
            <div style={{ position: 'relative', zIndex: Const.ZIndex.base }}>{children}</div>
        </div>
    )
}
