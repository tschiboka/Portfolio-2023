import { Dispatch, SetStateAction, TouchEvent } from 'react'
import { WebSocketRequest } from '../Session.types'
import { MAX_WORD_LENGTH } from '../../common/utils'
import {
    getLetterComponent,
    getTouchState,
    isSubmitKeyStroke,
    submitMove,
} from './LetterWheel.utils'
import { TouchState } from './LetterWheel.types'

type HandleKeyPressDepsProps = {
    touchState: TouchState
    setTouchState: Dispatch<SetStateAction<TouchState>>
    send: (msg: WebSocketRequest) => void
}

export const createHandleKeyPress = ({
    touchState,
    setTouchState,
    send,
}: HandleKeyPressDepsProps) => (e: KeyboardEvent) => {
        const isLetter = e.key.length === 1 && e.key.match(/[a-z]/i)
        if (isLetter && touchState.touchedLetters.length < MAX_WORD_LENGTH)
            setTouchState(prev => ({ ...prev, touchedLetters: prev.touchedLetters + e.key.toUpperCase() }))
        if (e.key === 'Backspace') 
            setTouchState(prev => ({ ...prev, touchedLetters: prev.touchedLetters.slice(0, -1) }))
        if (isSubmitKeyStroke(e.key)) {
            submitMove({ letters: touchState.touchedLetters, send, setTouchState })
        }
    }


type CreateHandleTouchProps = {
    setTouchState: Dispatch<SetStateAction<TouchState>>
}

export const createHandleTouchStart =
    ({ setTouchState }: CreateHandleTouchProps): EventListener =>
    (event: Event) => {
        const touchEvent = event as unknown as TouchEvent
        const touch = touchEvent.touches[0]
        const target = document.elementFromPoint(touch.clientX, touch.clientY)
        const letterComponent = getLetterComponent(target)
        
        if (letterComponent) {
            event.preventDefault()
            const ids = parseInt(letterComponent.dataset.letterId!)
            const letter = letterComponent.dataset.letter!
            setTouchState({ touchedIds: [ids], touchedLetters: letter })
        }
    }

export const createHandleTouchMove = ({ 
    setTouchState
}: CreateHandleTouchProps): EventListener => (event: Event) => {
    const touchEvent = event as unknown as TouchEvent
    const touch = touchEvent.touches[0]
    const target = document.elementFromPoint(touch.clientX, touch.clientY)
    const letterComponent = getLetterComponent(target)

    if (letterComponent) {
        event.preventDefault()
        const id = parseInt(letterComponent.dataset.letterId!)
        const letter = letterComponent.dataset.letter!
        
        setTouchState(prev => getTouchState(prev.touchedIds, prev.touchedLetters, letter, id))
    }
}

type CreateHandleTouchEndProps = {
    setTouchState: Dispatch<SetStateAction<TouchState>>
    send: (msg: WebSocketRequest) => void
}

export const createHandleTouchEnd =
    ({ setTouchState, send }: CreateHandleTouchEndProps): EventListener =>
    () => {
        setTouchState(prev => {
            submitMove({ letters: prev.touchedLetters, send, setTouchState })
            return { touchedIds: [], touchedLetters: '' }
        })
    }
