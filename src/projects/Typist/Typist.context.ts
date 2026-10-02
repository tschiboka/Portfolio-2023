import { ContextBuilder, Functions } from '@common-utils'
import { TypistDefaults } from './Typist.defaults'
import type { TypistContextValues } from './Typist.types'

const initialValues: TypistContextValues = {
    editorState: TypistDefaults.initialState,
    dispatch: Functions.noop,
    isLoading: false,
}

export const TypistContext = ContextBuilder.CreateContext<TypistContextValues>(
    'Typist',
    initialValues,
)
