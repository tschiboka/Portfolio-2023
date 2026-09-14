import { MemoryRouterProps } from 'react-router-dom'
import { RenderOptions } from '@testing-library/react'
import type { Buildable } from '@common-ux/Test/Server/RequestBuilder'
import type { AppRoute } from '@app'
import type { AppContextValues, SessionContextValues } from '@shared-context'

export type ScreenRenderOptions = {
    route?: MemoryRouterProps['initialEntries']
    session?: Partial<SessionContextValues>
    appContext?: Partial<AppContextValues>
    renderOptions?: Omit<RenderOptions, 'wrapper'>
}

export type ScreenSetupOptions = ScreenRenderOptions & {
    path: string | AppRoute
    children?: React.ReactElement
    handlers?: Buildable[]
    beforeRender?: () => void
}
