import { useEffect, useState } from 'react'
import { ClockData, ClockFaceCanvas, ClockUtils } from '.'
import type { Nullable } from '@common-utils'
import './Clock.scss'

export const Clock = () => {
    const [clock, setClock] = useState<Nullable<ClockData>>(null)

    useEffect(() => {
        ClockUtils.startLoop({ setClock })
    }, [])

    return (
        <div className="ClockWidget">
            <div className="ClockContainer">
                <div className="ClockFace">{clock && <ClockFaceCanvas clock={clock} />}</div>
            </div>
            <footer></footer>
        </div>
    )
}
