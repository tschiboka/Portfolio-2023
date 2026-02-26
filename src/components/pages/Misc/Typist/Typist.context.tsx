import React, { useEffect, useReducer, useRef } from 'react'
import { RoundResponse, TypistContextValues, TypistEditorState } from './Typist.types'
import { ContextBuilder } from '../../../../common/Context/ContextBuilder'
import { textToWords } from './Typist.utils'
import { usePostRound } from './Typist.queries'
import { editorReducer } from './Editor/Editor.reducer'

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
    words: textToWords(''),
    keystrokes: [],
}

const initialValues: TypistContextValues = {
    editorState: initialState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: () => {},
    isLoading: false,
}

export const TypistContext = ContextBuilder.CreateContext<TypistContextValues>(
    'Typist',
    initialValues,
)

export const TypistContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [editorState, dispatch] = useReducer(editorReducer, initialState)
    const prevStatusRef = useRef(editorState.status)
    const editorStateRef = useRef(editorState)
    editorStateRef.current = editorState
    const { mutate: postRound, isPending } = usePostRound()

    useEffect(() => {
        const prevStatus = prevStatusRef.current
        prevStatusRef.current = editorState.status

        const { lastEvent, keystrokes } = editorStateRef.current
        const isFreshlyLoaded = editorState.status === 'idle' && lastEvent === 'none'
        const justEnded =
            editorState.status === 'idle' && lastEvent === 'ended' && prevStatus !== 'idle'

        if (isFreshlyLoaded || justEnded) {
            postRound(keystrokes, {
                onSuccess: (data: RoundResponse) => {
                    dispatch({
                        type: 'RESET',
                        text: data.text,
                        stats: data.stats,
                    })
                },
            })
        }
    }, [editorState.status, postRound])

    const contextValue: TypistContextValues = {
        editorState,
        dispatch,
        isLoading: isPending,
    }
    return <TypistContext.Provider value={contextValue}>{children}</TypistContext.Provider>
}
