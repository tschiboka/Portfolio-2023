import React, { useEffect, useReducer, useRef } from 'react'
import { TypistContext } from './Typist.context'
import { TypistDefaults } from './Typist.defaults'
import { TypistQueries } from './Typist.queries'
import { editorReducer } from './Editor/Editor.reducer'
import type { RoundResponse, TypistContextValues } from './Typist.types'

export const TypistContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [editorState, dispatch] = useReducer(editorReducer, TypistDefaults.initialState)
    const prevStatusRef = useRef(editorState.status)
    const editorStateRef = useRef(editorState)
    editorStateRef.current = editorState
    const { mutate: postRound, isPending } = TypistQueries.usePost()

    useEffect(() => {
        const prevStatus = prevStatusRef.current
        prevStatusRef.current = editorState.status

        const { lastEvent, keystrokes } = editorStateRef.current
        const isFreshlyLoaded = editorState.status === 'idle' && lastEvent === 'none'
        const justEnded =
            editorState.status === 'idle' && lastEvent === 'ended' && prevStatus !== 'idle'

        if (isFreshlyLoaded || justEnded) {
            postRound(
                { keystrokes },
                {
                    onSuccess: (data: RoundResponse) => {
                        dispatch({
                            type: 'RESET',
                            text: data.text,
                            stats: data.stats,
                        })
                    },
                },
            )
        }
    }, [editorState.status, postRound])

    const contextValue: TypistContextValues = {
        editorState,
        dispatch,
        isLoading: isPending,
    }
    return <TypistContext.Provider value={contextValue}>{children}</TypistContext.Provider>
}
