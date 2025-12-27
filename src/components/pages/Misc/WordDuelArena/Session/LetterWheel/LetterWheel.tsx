import { useEffect, useState } from 'react'
import { useSession } from '../Session.context'
import { useSessionWS } from '../SessionWebSocket'
import { WebSocketRequestType } from '../Session.types'

export const LetterWheel = () => {
    const { allowKeyboardInput } = useSession()
    const { send } = useSessionWS()
    const [value, setValue] = useState('')
    const MAX_LETTERS = 7

    useEffect(() => {
        if (!allowKeyboardInput) return

        const handleKey = (e: KeyboardEvent) => {
            const isLetter = e.key.length === 1 && e.key.match(/[a-z]/i)

            if (isLetter && value.length < MAX_LETTERS) {
                setValue(value + e.key.toUpperCase())
            }
            if (e.key === 'Backspace') {
                setValue(value.slice(0, -1))
            }
            if (e.key === 'Enter' || e.key === 'Return' || e.key === ' ') {
                send({
                    type: WebSocketRequestType.ATTEMPT_MOVE,
                    payload: { attempt: value },
                })
                setValue('')
            }
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [allowKeyboardInput, value])

    return <div className="letter-wheel">{value}</div>
}
