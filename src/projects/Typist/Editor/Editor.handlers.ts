import { EditorSelectors } from './Editor.selectors'
import type { EditorHandlerArgs } from './Editor.types'

const create =
    ({ editorState, dispatch }: EditorHandlerArgs) =>
    (event: KeyboardEvent) => {
        event.preventDefault()

        if (EditorSelectors.isControlKey(event)) {
            if (event.key === 'Enter' && editorState.status === 'playing') dispatch({ type: 'END' })

            if (event.key === 'Escape') dispatch({ type: 'PAUSE' })

            return
        }

        if (editorState.status === 'idle' || editorState.status === 'playing')
            dispatch({ type: 'KEYSTROKE', key: event.key })
    }

export const EditorHandlers = {
    create,
}
