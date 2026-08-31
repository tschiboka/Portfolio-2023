import { TypistEditorState, EditorAction } from '../Typist.types'
import { editorSelectors } from './Editor.selectors'

type EditorHandlerArgs = {
    editorState: TypistEditorState
    dispatch: React.Dispatch<EditorAction>
}

export const createEditorHandler =
    ({ editorState, dispatch }: EditorHandlerArgs) =>
    (event: KeyboardEvent) => {
        event.preventDefault()

        if (editorSelectors.isControlKey(event)) {
            if (event.key === 'Enter' && editorState.status === 'playing') {
                dispatch({ type: 'END' })
            }
            if (event.key === 'Escape') {
                dispatch({ type: 'PAUSE' })
            }
            return
        }

        if (editorState.status === 'idle' || editorState.status === 'playing') {
            dispatch({ type: 'KEYSTROKE', key: event.key })
        }
    }
