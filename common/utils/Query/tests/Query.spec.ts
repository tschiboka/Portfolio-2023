/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'axios'
import { RequestBuilder } from '../Query'

jest.mock('axios')
jest.mock('../../Path/apiPathBuilder', () => ({
    apiPathBuilder: (pathName: string) => {
        const apiRoutes: Record<string, string> = {
            ApiRouteA: 'route-a',
            ApiRouteB: 'route-b',
        }
        const projectRoutes: Record<string, string> = {
            ProjectA: 'projects/project-a',
        }
        if (pathName in projectRoutes) return `http://localhost:5000/${projectRoutes[pathName]}`
        return `http://localhost:5000/api/${apiRoutes[pathName]}`
    },
}))

const mockedAxios = axios as jest.Mocked<typeof axios>

// ── RequestBuilder ───────────────────────────────────────────────────────────

describe('RequestBuilder', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockedAxios.get.mockResolvedValue({ data: {} })
        mockedAxios.post.mockResolvedValue({ data: {} })
        mockedAxios.put.mockResolvedValue({ data: {} })
    })

    describe('build', () => {
        it('should return get, post, and put methods', () => {
            const api = new RequestBuilder('ApiRouteA').build()
            expect(typeof api.get).toBe('function')
            expect(typeof api.post).toBe('function')
            expect(typeof api.put).toBe('function')
        })
    })

    describe('URL resolution', () => {
        it('should build URL with /api prefix by default', async () => {
            await new RequestBuilder('ApiRouteA').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/route-a',
                expect.any(Object),
            )
        })

        it('should auto-detect project paths and use no /api prefix', async () => {
            await new RequestBuilder('ProjectA').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/projects/project-a',
                expect.any(Object),
            )
        })
    })

    describe('setPath', () => {
        it('should append sub-path to the URL', async () => {
            await new RequestBuilder('ProjectA').setPath('/message').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/projects/project-a/message',
                expect.any(Object),
            )
        })

        it('should allow chaining multiple setPath calls', async () => {
            await new RequestBuilder('ProjectA').setPath('/level').setPath('/name').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/projects/project-a/level/name',
                expect.any(Object),
            )
        })
    })

    describe('setQuery', () => {
        it('should pass query params in axios config', async () => {
            await new RequestBuilder('ProjectA')
                .setPath('/message')
                .setQuery({ userId: '123' })
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ params: { userId: '123' } }),
            )
        })

        it('should not include params when setQuery is not called', async () => {
            await new RequestBuilder('ApiRouteA').build().get()
            const config = mockedAxios.get.mock.calls[0][1]
            expect(config).not.toHaveProperty('params')
        })
    })

    describe('setToken', () => {
        it('should set x-auth-token header from session token', async () => {
            await new RequestBuilder('ApiRouteB', 'session-token').setToken().build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: { 'x-auth-token': 'session-token' },
                }),
            )
        })

        it('should accept an explicit token override', async () => {
            await new RequestBuilder('ApiRouteB', 'session-token')
                .setToken('explicit-token')
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: { 'x-auth-token': 'explicit-token' },
                }),
            )
        })

        it('should not set header when no token is available', async () => {
            await new RequestBuilder('ApiRouteA').setToken().build().get()
            const config = mockedAxios.get.mock.calls[0][1]
            expect(config).not.toHaveProperty('headers')
        })

        it('should not include headers when setToken is not called', async () => {
            await new RequestBuilder('ApiRouteA').build().get()
            const config = mockedAxios.get.mock.calls[0][1]
            expect(config).not.toHaveProperty('headers')
        })
    })

    describe('HTTP methods', () => {
        it('get should call axios.get with url and config', async () => {
            await new RequestBuilder('ApiRouteA').build().get()
            expect(mockedAxios.get).toHaveBeenCalledTimes(1)
        })

        it('post should call axios.post with url, payload, and config', async () => {
            const payload = { email: 'a@b.com', password: '123' }
            await new RequestBuilder('ApiRouteA').build().post(payload)
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'http://localhost:5000/api/route-a',
                payload,
                expect.any(Object),
            )
        })

        it('put should call axios.put with url, payload, and config', async () => {
            const payload = { candle1: true }
            await new RequestBuilder('ProjectA', 'tok')
                .setPath('/candles')
                .setToken()
                .build()
                .put(payload)
            expect(mockedAxios.put).toHaveBeenCalledWith(
                'http://localhost:5000/projects/project-a/candles',
                payload,
                expect.objectContaining({
                    headers: { 'x-auth-token': 'tok' },
                }),
            )
        })
    })

    describe('full builder chain', () => {
        it('should combine setPath, setQuery, and setToken', async () => {
            await new RequestBuilder('ProjectA', 'my-token')
                .setPath('/message')
                .setQuery({ userId: '42' })
                .setToken()
                .build()
                .get()

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/projects/project-a/message',
                {
                    headers: { 'x-auth-token': 'my-token' },
                    params: { userId: '42' },
                },
            )
        })
    })
})
