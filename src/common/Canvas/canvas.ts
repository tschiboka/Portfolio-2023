import { RefObject } from "react"
import { Canvas, Circle, Line, Point } from "./canvas.types"

export const useCanvas = (ref: RefObject<HTMLCanvasElement>): Canvas => {
    const createCanvas = ()  => {
        const canvas = ref.current
        if (!canvas) return
  
        const parent = canvas.parentElement?.parentElement
        if (!parent) return

        const width =  parent.clientWidth  
        const height = parent.clientHeight
  
        canvas.width = width
        canvas.height = height
  
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null
        if (!ctx) return
      return ctx
    }

    const getPoint = ({value = 0, type = "px", direction}: Point): number => {
        const canvas = ref.current
        if (type === "px") return value

        const {width, height} = canvas ?? {width: 0, height: 0}
        if (type === "pc") {
            const length = direction === "horizontal" ? width : height

            if (value >= 0 && value <= 100) return (value / 100) * length
            return 0
        }
        return 0
    }

    const ctx = createCanvas()
    const width = ref.current?.width || 0
    const height = ref.current?.height || 0
    const radius = Math.min(width, height) / 2
    const centre = { x: width / 2, y: height / 2 }

    const line =  ({start, end, config }: Line) => {
        if (!ctx) return 
            
        const x1 = getPoint({...start?.x, direction: "horizontal"})
        const y1 = getPoint({...start?.y, direction: "vertical"})
        const x2 = getPoint({...end?.x, direction: "horizontal"})
        const y2 = getPoint({...end?.y, direction: "vertical"})

        ctx.beginPath();
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = config?.color || "white"
        ctx.lineWidth = config?.width || 1
        ctx.stroke()    
      }    


    const circle =  ({start, radius, config }: Circle) => {
        if (ctx) {
            const x = getPoint({...start?.x, direction: "horizontal"})
            const y = getPoint({...start?.y, direction: "vertical"})
            const { color = "white", fill = false, width = 1 } = config
    
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
            ctx.strokeStyle = color
            ctx.fillStyle = color
            ctx.lineWidth = width
            fill ? ctx.fill() : ctx.stroke()
        }
      }    
    return {
      ctx,
      width,
      height,
      radius,
      centre,
      circle,
      line,
    }
  }