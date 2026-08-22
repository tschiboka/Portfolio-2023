import { RefObject } from 'react'
import { WebSocketRequest, WebSocketRequestType } from '../../Session.types'
import { LetterPosition, TouchState } from './LetterWheel.types'
import { MIN_WORD_LENGTH } from '../../../common/utils'
import type { Nullable } from '@common/utils'
import { isEmpty } from '@common/utils'

type CalculateLetterPositionsProps = {
    letters: string[]
    containerRef: RefObject<HTMLElement | null>
}

export const calculateLetterPositions = ({
    letters,
    containerRef,
}: CalculateLetterPositionsProps): LetterPosition[] => {
    if (!containerRef.current || isEmpty(letters)) return []

    // Get the wheel element (child of container) for accurate positioning
    const wheelEl = containerRef.current.querySelector('.letter-wheel')
    if (!wheelEl) return []

    const wheelRect = wheelEl.getBoundingClientRect()
    const size = wheelRect.width // width === height for circular wheel
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - size / 7 // Leave space for letter size
    const n = letters.length

    return letters.map((letter, index) => {
        const angle = (360 / n) * index
        const rad = (angle * Math.PI) / 180

        // Calculate position relative to wheel center
        const cx = centerX - radius * Math.cos(rad)
        const cy = centerY - radius * Math.sin(rad)

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

export const getLetterComponent = (target: Element | null): Nullable<HTMLElement> => {
    const isLetter = target instanceof HTMLElement && target.dataset.letterId !== undefined
    return isLetter ? target : null
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

export const isSubmitKeyStroke = (key: string) => key === 'Enter' || key === 'Return' || key === ' '

export const getTouchState = (
    prevIds: number[],
    prevLetters: string,
    letter: string,
    id: number,
): TouchState => {
    const indexInStack = prevIds.indexOf(id)

    if (indexInStack === -1) {
        return {
            touchedIds: [...prevIds, id],
            touchedLetters: prevLetters + letter,
        }
    } else if (indexInStack === prevIds.length - 2) {
        return {
            touchedIds: prevIds.slice(0, -1),
            touchedLetters: prevLetters.slice(0, -1),
        }
    }

    return { touchedIds: prevIds, touchedLetters: prevLetters }
}
