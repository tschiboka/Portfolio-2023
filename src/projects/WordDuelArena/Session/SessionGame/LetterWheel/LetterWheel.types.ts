import type { Dispatch, SetStateAction } from 'react'
import type { WebSocketRequest } from '../../Session.types'

export type LetterPosition = {
    letter: string
    transform: string
    cx: number
    cy: number
}

export type TouchState = {
    touchedIds: number[]
    touchedLetters: string
}

/** What both touch handlers are handed: the one writer they share. */
export type CreateHandleTouchProps = {
    setTouchState: Dispatch<SetStateAction<TouchState>>
}

export type SubmitMoveParams = {
    letters: string
    send: (msg: WebSocketRequest) => void
    setTouchState: (state: TouchState) => void
}
