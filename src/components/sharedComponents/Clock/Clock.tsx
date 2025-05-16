import { useEffect, useState } from 'react'
import { ClockData, ClockFaceCanvas, startLoop } from '.'
import './Clock.scss'

export const Clock = () => {
    const [clock, setClock] = useState<ClockData | null>(null)

    useEffect(() => {
        startLoop({ setClock })
    }, [])

    return (
        <div className="ClockWidget">
            <header></header>
            <div className="ClockContainer">
                <div className="ClockFace">
                    {clock && <ClockFaceCanvas clock={clock} />}
                </div>
            </div>
            <footer></footer>
        </div>
    )
}
