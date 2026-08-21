import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter, useLocation, useSearchParams } from 'react-router-dom'
import { useTableController } from '../useTableController'
import { Arrays } from '@common/utils'
import type { Filters } from './useTableController.spec.types'
import { filterDefs } from './useTableController.mocks'

/** Renders the controller without a router (URL persistence disabled). */
export const setup = (overrides?: Partial<Parameters<typeof useTableController<Filters>>[0]>) => {
    const toParams = vi.fn()
    const { result } = renderHook(() => useTableController<Filters>({ ...overrides, toParams }))
    return { result, toParams }
}

type UrlState = { search: string; setUrl: (search: string) => void }

/** Custom hook: exposes a `setUrl` to simulate external URL changes from inside the router. */
const useRouterProbe = (onSearch: (search: string) => void) => {
    const location = useLocation()
    const [, setSearchParams] = useSearchParams()
    onSearch(location.search)
    const setUrl = (search: string) =>
        setSearchParams(new URLSearchParams(search), { replace: true })
    return { setUrl }
}

/** Renders one or more controllers inside a single MemoryRouter, capturing the live URL and a
 * `setUrl` handle to simulate external navigation (back/forward, manual URL edits). */
export const setupWithUrl = (initialSearch = '', count: 1 | 2 = 1) => {
    const state: UrlState = { search: initialSearch, setUrl: () => undefined }

    const wrapper = ({ children }: { children: ReactNode }) => {
        const Probe = () => {
            const { setUrl } = useRouterProbe((search) => {
                state.search = search
            })
            state.setUrl = setUrl
            return null
        }
        return (
            <MemoryRouter initialEntries={[`/?${initialSearch}`]}>
                <Probe />
                {children}
            </MemoryRouter>
        )
    }

    const controllers = Arrays.times(count, (index) => {
        const namespace = count === 2 ? `table${index}` : undefined
        const { result } = renderHook(
            () =>
                useTableController<Filters>({
                    filters: filterDefs,
                    urlPersistence: namespace ? { namespace } : {},
                    toParams: vi.fn(),
                }),
            { wrapper },
        )
        return result
    })

    return { controllers, state }
}
