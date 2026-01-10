import { RefObject } from 'react'
import { WebSocketRequest, WebSocketRequestType } from '../Session.types'
import { LetterPosition, TouchState } from './LetterWheel.types'
import { MIN_WORD_LENGTH } from '../../common/utils'

type CalculateLetterPositionsProps = {
    letters: string[]
    containerRef: RefObject<HTMLElement>
}

export const calculateLetterPositions = ({
    letters,
    containerRef,
}: CalculateLetterPositionsProps): LetterPosition[] => {
    if (!containerRef.current || letters.length === 0) return []

    const { width, height } = containerRef.current.getBoundingClientRect()
    const radius = Math.min(width, height) / 2 - height / 6
    const centerX = width / 2
    const centerY = height / 2
    const n = letters.length

    return letters.map((letter, index) => {
        const angle = (360 / n) * index
        const rad = (angle * Math.PI) / 180

        const letterEl = containerRef.current?.querySelector(
            `[data-letter-id="${index}"]`,
        )
        const letterRect = letterEl?.getBoundingClientRect()

        let cx = centerX - radius * Math.cos(rad)
        let cy = centerY - radius * Math.sin(rad)

        if (letterRect) {
            cx -= letterRect.width / 6
            cy -= letterRect.height / 6
        }

        const transform = `
            rotate(${angle}deg)
            translate(${-radius}px)
            rotate(${-angle}deg)
            translate(-50%, -50%)
        `

        return { letter, transform, cx, cy }
    })
}

type RecalculatePositionsProps = CalculateLetterPositionsProps & {
    setPositions: (positions: LetterPosition[]) => void
}

export const recalculatePositions = ({
    letters,
    containerRef,
    setPositions,
}: RecalculatePositionsProps) => {
    if (!containerRef.current) return

    const newPositions = calculateLetterPositions({ letters, containerRef })
    setPositions(newPositions)
}

export const getLetterComponent = (
    target: Element | null,
): HTMLElement | null => {
    const isLetter =
        target instanceof HTMLElement && target.dataset.letterId !== undefined
    return isLetter ? (target as HTMLElement) : null
}

type SubmitMoveParams = {
    letters: string
    send: (msg: WebSocketRequest) => void
    setTouchState: (state: TouchState) => void
}

export const submitMove = ({ letters, send, setTouchState }: SubmitMoveParams) => {
    if (letters.length >= MIN_WORD_LENGTH) {
        send({
            type: WebSocketRequestType.ATTEMPT_MOVE,
            payload: { attempt: letters },
        })
    }
    setTouchState({ touchedIds: [], touchedLetters: '' })
}

export const isSubmitKeyStroke = (key: string) =>
    key === 'Enter' || key === 'Return' || key === ' '

export const getTouchState = (
    prevIds: number[],
    prevLetters: string,
    letter: string,
    id: number
): TouchState => {
    const indexInStack = prevIds.indexOf(id)
    
    if (indexInStack === -1) {
        return {
            touchedIds: [...prevIds, id],
            touchedLetters: prevLetters + letter
        }
    } else if (indexInStack === prevIds.length - 2) {
        return {
            touchedIds: prevIds.slice(0, -1),
            touchedLetters: prevLetters.slice(0, -1)
        }
    }
    
    return { touchedIds: prevIds, touchedLetters: prevLetters }
}