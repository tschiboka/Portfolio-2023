import CandleLit from '../../../../assets/images/projects/xmas/candle_lit.png'
import CandleBlown from '../../../../assets/images/projects/xmas/candle_blown.png'
import { useEffect, useState } from 'react'
import { useGetCandles, usePutCandles } from './Xmas2025.queries'

export const CandlePanel = () => {
    const { data: candlesData, ...getCandlesResponse } = useGetCandles()
    const {
        mutate: setCandleData,
        data: putCandlesData,
        ...putCandlesResponse
    } = usePutCandles()
    const [candles, setCandles] = useState([false, false, false, false])

    useEffect(() => {
        if (candlesData && candlesData.data) {
            const candles = candlesData.data.data?.candles
            const newCandleState = [
                candles.candle1,
                candles.candle2,
                candles.candle3,
                candles.candle4,
            ]
            setCandles(newCandleState)
        }
    }, [candlesData])

    const handleCandleClick = (index: number) => {
        if (!putCandlesResponse.isIdle || !getCandlesResponse.isLoading) {
            const newCandleState = [...candles]
            newCandleState[index] = !newCandleState[index]
            setCandles(newCandleState)
            setCandleData({
                candle1: newCandleState[0],
                candle2: newCandleState[1],
                candle3: newCandleState[2],
                candle4: newCandleState[3],
            })
        }
    }

    return (
        <div className="candle-panel">
            {candles.map((state, index) => (
                <div key={index} className="candle">
                    {
                        <img
                            className={state ? 'candle-lit' : 'candle-blown'}
                            src={state ? CandleLit : CandleBlown}
                            alt="Candle"
                            onClick={() => handleCandleClick(index)}
                        />
                    }
                </div>
            ))}
        </div>
    )
}
