import { TypistEditorState, Keystroke } from '../Typist.types'

export const editorSelectors = {
    isControlKey: (event: KeyboardEvent) =>
        event.key === 'Escape' || event.key === 'Tab' || event.key === 'Enter',

    keystrokeInfo: (event: KeyboardEvent, editorState: TypistEditorState) => {
        const expected = editorState.text[editorState.cursorPosition]
        const correct = event.key === expected
        const isLastChar =
            editorState.cursorPosition === editorState.text.length - 1
        return { expected, correct, isLastChar }
    },

    /** List of charIndex positions where mistakes happened */
    mistypeIndices: (keystrokes: Keystroke[]) =>
        keystrokes.filter((k) => !k.correct).map((k) => k.charIndex),

    /** Elapsed time in ms from first to last keystroke */
    elapsedMs: (keystrokes: Keystroke[]) => {
        if (keystrokes.length < 2) return 0
        return (
            keystrokes[keystrokes.length - 1].timestamp -
            keystrokes[0].timestamp
        )
    },
}
