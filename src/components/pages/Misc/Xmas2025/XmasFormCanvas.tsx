import React, { useEffect, useRef, ReactNode } from 'react'

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

const XmasFormCanvas: React.FC<XmasFormCanvasProps> = ({
    children,
    lightCount = 50,
    lightSize = 8,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number>()
    const lightsRef = useRef<Light[]>([])

    const getPositionOnBorder = (
        progress: number,
        width: number,
        height: number,
    ) => {
        const topPadding = 20
        const sidePadding = 20
        const bottomPadding = 10

        const adjustedWidth = width - 2 * sidePadding
        const adjustedHeight = height - topPadding - bottomPadding
        const perimeter = 2 * (adjustedWidth + adjustedHeight)
        const distance = progress * perimeter

        if (distance < adjustedWidth) {
            return { x: sidePadding + distance, y: topPadding }
        } else if (distance < adjustedWidth + adjustedHeight) {
            return {
                x: width - sidePadding,
                y: topPadding + (distance - adjustedWidth),
            }
        } else if (distance < 2 * adjustedWidth + adjustedHeight) {
            return {
                x:
                    width -
                    sidePadding -
                    (distance - adjustedWidth - adjustedHeight),
                y: height - bottomPadding,
            }
        } else {
            return {
                x: sidePadding,
                y:
                    height -
                    bottomPadding -
                    (distance - 2 * adjustedWidth - adjustedHeight),
            }
        }
    }

    const initializeLights = (width: number, height: number) => {
        const lights: Light[] = []

        for (let i = 0; i < lightCount; i++) {
            const progress = i / lightCount
            const position = getPositionOnBorder(progress, width, height)
            lights.push({
                x: position.x,
                y: position.y,
                color: i % 2 === 0 ? '#ff0000' : '#00ff00', // Initial alternating red and green
                phase: (i / lightCount) * Math.PI * 2, // Stagger the twinkling
                baseOpacity: 0.1 + Math.random() * 0.9, // Random base brightness
            })
        }

        lightsRef.current = lights
    }

    const drawLights = (time: number) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        lightsRef.current.forEach((light, index) => {
            // Create twinkling effect with different speeds for each light
            const twinkleSpeed = 0.003 + (index % 3) * 0.001
            const twinkle =
                Math.sin(time * twinkleSpeed + light.phase) * 0.3 + 0.7
            const opacity = light.baseOpacity * twinkle

            // Alternate colors every 1 second (1000ms)
            const colorCycleTime = Math.floor(time / 1000) % 2
            const isInitiallyRed = index % 2 === 0
            const currentColor =
                (colorCycleTime === 0) === isInitiallyRed
                    ? '#ff0000'
                    : '#00ff00'

            // Draw the light with glow effect
            ctx.globalAlpha = opacity

            // Outer glow
            const gradient = ctx.createRadialGradient(
                light.x,
                light.y,
                0,
                light.x,
                light.y,
                lightSize * 2,
            )
            gradient.addColorStop(0, currentColor)
            gradient.addColorStop(1, 'transparent')

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(light.x, light.y, lightSize * 2, 0, Math.PI * 2)
            ctx.fill()

            // Inner bright core
            ctx.globalAlpha = opacity * 1.5
            ctx.fillStyle = currentColor
            ctx.beginPath()
            ctx.arc(light.x, light.y, lightSize, 0, Math.PI * 2)
            ctx.fill()

            // Highlight spot
            ctx.globalAlpha = opacity * 0.8
            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.arc(
                light.x - lightSize * 0.3,
                light.y - lightSize * 0.3,
                lightSize * 0.4,
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
        const contentDiv = container.querySelector(
            'div:nth-child(2)',
        ) as HTMLElement
        if (!contentDiv) return

        const contentRect = contentDiv.getBoundingClientRect()

        // Canvas should cover the entire container (including padding space for lights)
        const containerRect = container.getBoundingClientRect()
        canvas.width = containerRect.width
        canvas.height = containerRect.height
        canvas.style.width = `${containerRect.width}px`
        canvas.style.height = `${containerRect.height}px`

        // But lights should be positioned around the content area
        const paddedWidth = contentRect.width + 40 // 20px left + 20px right
        const paddedHeight = contentRect.height + 30 // 20px top + 10px bottom

        initializeLights(paddedWidth, paddedHeight)
    }

    useEffect(() => {
        resizeCanvas()

        const handleResize = () => {
            resizeCanvas()
        }

        window.addEventListener('resize', handleResize)

        // Start animation
        animationRef.current = requestAnimationFrame(drawLights)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [lightCount, lightSize])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                display: 'inline-block',
                padding: '20px 20px 10px 20px', // top right bottom left
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
                    zIndex: 5,
                }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
        </div>
    )
}

export default XmasFormCanvas
