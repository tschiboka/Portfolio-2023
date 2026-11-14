import type { Dispatch } from 'react'
import type { EditorAction, TypistEditorState } from '../Typist.types'

/** What a handler factory is handed: the state it reads and the dispatch it writes through. */
export type EditorHandlerArgs = {
    editorState: TypistEditorState
    dispatch: Dispatch<EditorAction>
}
