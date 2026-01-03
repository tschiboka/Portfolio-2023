import { useEffect, RefObject, Dispatch, SetStateAction } from 'react'
import {
    createHandleKeyPress,
    createHandleTouchStart,
    createHandleTouchMove,
    createHandleTouchEnd,
} from './LetterWheel.handlers'
import {  recalculatePositions } from './LetterWheel.utils'
import { WebSocketRequest } from '../Session.types'
import { LetterPosition, TouchState } from './LetterWheel.types'

type UseLetterWheelListenersProps = {
    containerRef: RefObject<HTMLDivElement>
    wheelRef: RefObject<HTMLDivElement>
    inputLetters: string
    allowKeyboardInput: boolean
    touchState: TouchState
    setTouchState: Dispatch<SetStateAction<TouchState>>
    setPositions: Dispatch<SetStateAction<LetterPosition[]>>
    send: (msg: WebSocketRequest) => void
}

export const useLetterWheelListeners = ({
    containerRef,
    wheelRef,
    inputLetters,
    touchState,
    allowKeyboardInput,
    setPositions,
    setTouchState,
    send,
}: UseLetterWheelListenersProps
) => {
    // Keyboard
    useEffect(() => {
        if (!allowKeyboardInput) return
        const handler = createHandleKeyPress({ touchState, setTouchState, send })
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }, [allowKeyboardInput, touchState, send, setTouchState])

    // Resize
    useEffect(() => {
        const updatePositions = () => recalculatePositions({
            letters: inputLetters.split(''),
            containerRef,
            setPositions,
        })
        updatePositions()
        window.addEventListener('resize', updatePositions)

        return () => window.removeEventListener('resize', updatePositions)
    }, [inputLetters, containerRef, setPositions])

    // Touch
    useEffect(() => {
        const wheel = wheelRef.current
        if (!wheel) return

        const handlers: Record<string, EventListener> = {
            touchstart: createHandleTouchStart({ setTouchState }),
            touchmove: createHandleTouchMove({ setTouchState }),
            touchend: createHandleTouchEnd({ setTouchState, send }),
        }

        Object.entries(handlers).forEach(([event, handler]) =>
            wheel.addEventListener(event, handler)
        )

        return () =>
            Object.entries(handlers).forEach(([event, handler]) =>
                wheel.removeEventListener(event, handler)
            )
    }, [setTouchState, send, wheelRef])
}