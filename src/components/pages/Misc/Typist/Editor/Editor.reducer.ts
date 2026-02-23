import { TypistEditorState, EditorAction, Keystroke } from '../Typist.types'
import { EditorWord, CharStatus } from './Character/Character.types'
import { textToWords } from '../Typist.utils'

const updateCharStatus = (
    words: EditorWord[],
    charIndex: number,
    status: CharStatus,
    nextPendingIndex?: number,
): EditorWord[] =>
    words.map((word) => ({
        ...word,
        chars: word.chars.map((ch) => {
            if (ch.index === charIndex) return { ...ch, status }
            if (nextPendingIndex !== undefined && ch.index === nextPendingIndex)
                return { ...ch, status: 'pending' as const }
            if (ch.status === 'pending') return { ...ch, status: undefined }
            return ch
        }),
    }))

const getCurrentCharStatus = (
    state: TypistEditorState,
): CharStatus | undefined =>
    state.words
        .flatMap((w) => w.chars)
        .find((ch) => ch.index === state.cursorPosition)?.status

const handleKeystroke = (
    state: TypistEditorState,
    key: string,
): TypistEditorState => {
    const expected = state.text[state.cursorPosition]
    const correct = key === expected
    const isLastChar = state.cursorPosition === state.text.length - 1
    const isStarting = state.status === 'idle'

    const keystroke: Keystroke = {
        charIndex: state.cursorPosition,
        expected,
        actual: key,
        correct,
        timestamp: Math.round(performance.now()),
    }

    if (correct) {
        const currentStatus = getCurrentCharStatus(state)
        const newPos = state.cursorPosition + 1
        return {
            ...state,
            status: isLastChar ? 'idle' : 'playing',
            lastEvent: isLastChar
                ? 'ended'
                : isStarting
                  ? 'started'
                  : 'resumed',
            cursorPosition: newPos,
            words: updateCharStatus(
                state.words,
                state.cursorPosition,
                currentStatus === 'incorrect' ? 'incorrect' : 'correct',
                newPos,
            ),
            keystrokes: [...state.keystrokes, keystroke],
        }
    }

    return {
        ...state,
        status: 'playing',
        lastEvent: isStarting ? 'started' : 'error',
        words: updateCharStatus(state.words, state.cursorPosition, 'incorrect'),
        keystrokes: [...state.keystrokes, keystroke],
    }
}

export const editorReducer = (
    state: TypistEditorState,
    action: EditorAction,
): TypistEditorState => {
    switch (action.type) {
        case 'KEYSTROKE':
            return handleKeystroke(state, action.key)

        case 'END':
            return {
                ...state,
                status: 'idle',
                lastEvent: 'ended',
            }

        case 'PAUSE':
            return state.status === 'paused'
                ? { ...state, status: 'playing', lastEvent: 'resumed' }
                : state.status === 'playing'
                  ? { ...state, status: 'paused', lastEvent: 'paused' }
                  : state

        case 'RESET':
            return {
                status: 'idle',
                lastEvent: 'none',
                text: action.text,
                stats: action.stats,
                cursorPosition: 0,
                words: textToWords(action.text),
                keystrokes: [],
            }

        default:
            return state
    }
}
