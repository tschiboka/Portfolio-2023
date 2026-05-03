import { MemoryRouterProps } from 'react-router-dom'
import { SessionContextValues } from '../../../../src/context/SessionContext/SessionContext.types'
import { AppContextValues } from '../../../../src/context/AppContext/AppContext.types'
import { RenderOptions } from '@testing-library/react'

export type PageRenderOptions = {
    route?: MemoryRouterProps['initialEntries']
    session?: Partial<SessionContextValues>
    appContext?: Partial<AppContextValues>
    renderOptions?: Omit<RenderOptions, 'wrapper'>
}
