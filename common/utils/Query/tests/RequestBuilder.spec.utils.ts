import * as apiPathBuilderModule from '../../Paths/apiPathBuilder'
import axios from 'axios'
import type { AxiosMethodMock } from './RequestBuilder.spec.types'

const mockedAxios = axios as unknown as {
    get: AxiosMethodMock
    post: AxiosMethodMock
    put: AxiosMethodMock
    patch: AxiosMethodMock
    delete: AxiosMethodMock
    head: AxiosMethodMock
    options: AxiosMethodMock
}

const TEST_TOKEN = 'test-session-token'

const mockApiPathBuilder = () => {
    const apiRoutes: Record<string, string> = {
        Login: 'login',
        Message: 'message',
    }
    const projectRoutes: Record<string, string> = {
        Gym: 'projects/gym',
    }
    vi.spyOn(apiPathBuilderModule, 'apiPathBuilder').mockImplementation((pathName: string) => {
        if (pathName in projectRoutes) return `http://localhost:5000/${projectRoutes[pathName]}`
        return `http://localhost:5000/api/${apiRoutes[pathName]}`
    })
}

export const RequestBuilderTestUtils = { mockedAxios, TEST_TOKEN, mockApiPathBuilder }
