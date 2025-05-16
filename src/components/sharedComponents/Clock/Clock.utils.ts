import moment from "moment"
import { ClockData } from "."
import { SECOND_IN_MILLIS } from "../../../common/dateTime"
import { Canvas, Centre, Line } from "../../../common/Canvas"

export const getDateTime = (): ClockData => {
    const dateTime = Date.now()
    return ({
        dayOfWeek: moment(dateTime).format('ddd'),
        day: moment(dateTime).format('DD'),
        month: moment(dateTime).format('MMM'),
        year: moment(dateTime).format('YYYY'),
        hour: parseInt(moment(dateTime).format('HH')),
        min: parseInt(moment(dateTime).format('mm')),
        sec: parseInt(moment(dateTime).format('ss')),
        formatted: moment(dateTime).format('ddd, MM YYYY @HH:mm:ss')
    })
}

type StartLoopProps = { setClock: (clock: ClockData | null) => void}
export const startLoop = ({ setClock }: StartLoopProps) => setInterval(() => {
    const updatedDateTime = getDateTime()
    setClock(updatedDateTime)
}, SECOND_IN_MILLIS)

const getHands = ({sec, min, hour}: ClockData) => [
    { 
        radiusFactor: 0.9, 
        color: "#444", 
        value: sec, 
        degrees: 60,
        width: 1
    },
    { 
        radiusFactor: 0.8, 
        color: "#555", 
        value: min, 
        degrees: 60,
        width: 2
    },
    { 
        radiusFactor: 0.7, 
        color: "#666", 
        value: hour % 12 + min * 60, 
        degrees: 12,
        width: 4
    }
]

export const drawHands = (
    clock: ClockData, 
    canvasObj: Canvas) => {
    const { radius, centre, line } = canvasObj

    const hands = getHands(clock)
    hands.map(({radiusFactor, color, value, width, degrees}) => {
        const angle = getAngle(value || 0, degrees)
        drawLineFromCentre(centre, angle, radius * radiusFactor, width, color, line)
    })
} 

const getAngle = ( unit:  number, degrees: number,) => {
    const secAngleDegrees = (unit / degrees) * 360
    return (secAngleDegrees * Math.PI) / 180
}

const drawLineFromCentre = (
    centre: Centre, 
    angle: number, 
    radius: number, 
    width: number, 
    color: string, 
    line: (line: Line) => void
) => {
    const x = centre.x + radius * Math.sin(angle) - width / 2
    const y = centre.y - radius * Math.cos(angle) - width / 2
    
    const props = {
        start: {
            x: { value: 50, type: 'pc' as 'pc' },
            y: { value: 50, type: 'pc' as 'pc' },
        },
        end: {
            x: { value: x },
            y: { value: y },
        },
        config: { color, width },
    }
    line(props)
}

const drawFromCentre = (
    canvasObj: Canvas,
    radius: number, 
    width: number, 
    color: string, 
    fill: boolean
) => {    
    const { circle, centre } = canvasObj    
    const props = {
        start: {
            x: { value: centre.x, type: 'px' as 'px' },
            y: { value: centre.y, type: 'px' as 'px' },
        },
        radius,
        config: { color, width, fill },
    }
    circle(props)
}

export const drawGrooves = (canvasObj: Canvas) => {
    const { radius, centre, line } = canvasObj

    const degreesMin = [...Array(60).keys()]
    degreesMin.map(degree => drawLineFromCentre(centre, getAngle(degree, 60), radius, 1, "#333", line))

    const degreesHour = [...Array(12).keys()].map(d => d * 5)
    degreesHour.map(degree => drawLineFromCentre(centre, getAngle(degree, 60), radius, 3, "#333", line))

    drawFromCentre(canvasObj, radius * 0.95, 1, "#0a0a0a", true)

}