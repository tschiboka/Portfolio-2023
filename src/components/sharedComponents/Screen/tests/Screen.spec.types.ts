import { MemoryRouterProps } from 'react-router-dom'
import { RenderOptions } from '@testing-library/react'
import type { Buildable } from '@ux/Test/Server/RequestBuilder'
import { ApiRoute } from '../../../../routing/ApiRoutes'
import { SessionContextValues } from '../../../../context/SessionContext/SessionContext.types'
import { AppContextValues } from '../../../../context/AppContext/AppContext.types'

export type ScreenRenderOptions = {
    route?: MemoryRouterProps['initialEntries']
    session?: Partial<SessionContextValues>
    appContext?: Partial<AppContextValues>
    renderOptions?: Omit<RenderOptions, 'wrapper'>
}

export type ScreenSetupOptions = ScreenRenderOptions & {
    path: string | ApiRoute
    children?: React.ReactElement
    handlers?: Buildable[]
    beforeRender?: () => void
}
