import { EditorWord } from './Editor/Character/Character.types'

export type TypistStatus = 'idle' | 'playing' | 'paused'
export type TypistEvent =
    | 'none'
    | 'started'
    | 'paused'
    | 'ended'
    | 'resumed'
    | 'error'

export type Keystroke = {
    charIndex: number
    expected: string
    actual: string
    correct: boolean
    timestamp: number
}

export type RoundResponse = {
    text: string
}

export type TypistEditorState = {
    text: string
    status: TypistStatus
    cursorPosition: number
    lastEvent: TypistEvent
    words: EditorWord[]
    keystrokes: Keystroke[]
}

export type EditorAction =
    | { type: 'KEYSTROKE'; key: string }
    | { type: 'END' }
    | { type: 'PAUSE' }
    | { type: 'RESET'; text: string }

export type TypistContextValues = {
    editorState: TypistEditorState
    isLoading?: boolean
    dispatch: React.Dispatch<EditorAction>
}
