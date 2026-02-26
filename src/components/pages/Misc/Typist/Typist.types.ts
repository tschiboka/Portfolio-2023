import { EditorWord } from './Editor/Character/Character.types'
import {
    Keystroke as SharedKeystroke,
    RoundResponse,
    TypingStats,
} from '@common/types/projects/typist'

export type { RoundResponse, TypingStats }

export type TypistStatus = 'idle' | 'playing' | 'paused'
export type TypistEvent = 'none' | 'started' | 'paused' | 'ended' | 'resumed' | 'error'

// FE extends shared Keystroke: actual is always present on the client
export type Keystroke = SharedKeystroke & { actual: string }

export type TypistEditorState = {
    status: TypistStatus
    text: string
    stats?: TypingStats
    cursorPosition: number
    lastEvent: TypistEvent
    words: EditorWord[]
    keystrokes: Keystroke[]
}

export type EditorAction =
    | { type: 'KEYSTROKE'; key: string }
    | { type: 'END' }
    | { type: 'PAUSE' }
    | { type: 'RESET'; text: string; stats?: TypingStats }

export type TypistContextValues = {
    editorState: TypistEditorState
    isLoading?: boolean
    dispatch: React.Dispatch<EditorAction>
}
