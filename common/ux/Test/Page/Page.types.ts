import { MemoryRouterProps } from 'react-router-dom'
import { SessionContextValues } from '../../../../src/context/SessionContext/SessionContext.types'
import { AppContextValues } from '../../../../src/context/AppContext/AppContext.types'
import { RenderOptions } from '@testing-library/react'
import { ApiRoute } from '../../../../src/routing/ApiRoutes'
import type { Buildable } from '../Server/RequestBuilder'

export type PageRenderOptions = {
    route?: MemoryRouterProps['initialEntries']
    session?: Partial<SessionContextValues>
    appContext?: Partial<AppContextValues>
    renderOptions?: Omit<RenderOptions, 'wrapper'>
}

export type PageSetupOptions = PageRenderOptions & {
    path: string | ApiRoute
    children?: React.ReactElement
    handlers?: Buildable[]
    beforeRender?: () => void
}
