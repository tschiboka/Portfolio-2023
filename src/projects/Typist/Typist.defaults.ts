import { TypistEditorState } from './Typist.types'
import { TypistUtils } from './Typist.utils'

const initialState: TypistEditorState = {
    status: 'idle',
    lastEvent: 'none',
    text: '',
    stats: {
        practiceMode: 'error',
        errorCombinations: [],
        speed: { wpm: 0, cpm: 0 },
        accuracy: 0,
        score: 0,
    },
    cursorPosition: 0,
    words: TypistUtils.textToWords(''),
    keystrokes: [],
}

export const TypistDefaults = { initialState }
