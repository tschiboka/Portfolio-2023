import { useEffect } from 'react'
import { TypistContext } from '../Typist.context'
import { Character } from './Character/Character'
import { createEditorHandler } from './Editor.handlers'
import './Editor.styles.scss'
import LoadingIndicator from '../../../../sharedComponents/LoadingIndicator/LoadingIndicator'

export const Editor = () => {
    const { editorState, dispatch, isLoading } = TypistContext.Use()
    const { words } = editorState

    useEffect(() => {
        const handler = createEditorHandler({ editorState, dispatch })
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [editorState, dispatch])

    const showOverlay = isLoading || editorState.status === 'paused'

    return (
        <div className="Editor">
            <div className="Editor__content">
                {showOverlay && (
                    <div className="Editor__overlay">
                        <LoadingIndicator
                            show={Boolean(isLoading)}
                            color="aqua"
                        />
                        {editorState.status === 'paused' && (
                            <span>Paused — press Esc to resume</span>
                        )}
                    </div>
                )}
                {words.map((word, wordIndex) => (
                    <span className="Editor__word" key={wordIndex}>
                        {word.chars.map((ch) => {
                            const isActive =
                                ch.index === editorState.cursorPosition
                            const classes = [
                                isActive ? 'active' : '',
                                ch.status && ch.status !== 'pending'
                                    ? ch.status
                                    : '',
                            ]
                                .filter(Boolean)
                                .join(' ')
                            return (
                                <Character
                                    key={ch.index}
                                    className={classes}
                                    char={ch.char}
                                />
                            )
                        })}
                    </span>
                ))}
            </div>
        </div>
    )
}
