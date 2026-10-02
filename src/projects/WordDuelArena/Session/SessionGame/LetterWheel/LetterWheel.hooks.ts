import { useEffect, RefObject, Dispatch, SetStateAction } from 'react'
import { LetterWheelHandlers } from './LetterWheel.handlers'
import { LetterWheelUtils } from './LetterWheel.utils'
import { WebSocketRequest } from '../../Session.types'
import { LetterPosition, TouchState } from './LetterWheel.types'
import type { Dictionary } from '@common-utils'

type UseLetterWheelListenersProps = {
    containerRef: RefObject<HTMLDivElement | null>
    wheelRef: RefObject<HTMLDivElement | null>
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
}: UseLetterWheelListenersProps) => {
    // Keyboard
    useEffect(() => {
        if (!allowKeyboardInput) return
        const handler = LetterWheelHandlers.createHandleKeyPress({
            touchState,
            setTouchState,
            send,
        })
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }, [allowKeyboardInput, touchState, send, setTouchState])

    // Resize
    useEffect(() => {
        const updatePositions = () =>
            LetterWheelUtils.recalculatePositions({
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

        const handlers: Dictionary<EventListener> = {
            touchstart: LetterWheelHandlers.createHandleTouchStart({ setTouchState }),
            touchmove: LetterWheelHandlers.createHandleTouchMove({ setTouchState }),
            touchend: LetterWheelHandlers.createHandleTouchEnd({ touchState, setTouchState, send }),
        }

        Object.entries(handlers).forEach(([event, handler]) =>
            wheel.addEventListener(event, handler),
        )

        return () =>
            Object.entries(handlers).forEach(([event, handler]) =>
                wheel.removeEventListener(event, handler),
            )
    }, [touchState, setTouchState, send, wheelRef])
}
