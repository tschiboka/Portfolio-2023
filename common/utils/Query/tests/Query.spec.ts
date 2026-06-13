import type { MockInstance } from 'vitest'
/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment */
import axios from 'axios'
import * as apiPathBuilderModule from '../../Path/apiPathBuilder'
import { RequestBuilder } from '../Query'
import { LocalSession } from '../../../../src/context/SessionContext'

const mockedAxios = axios as unknown as {
    get: MockInstance
    post: MockInstance
    put: MockInstance
    patch: MockInstance
    delete: MockInstance
    head: MockInstance
    options: MockInstance
}

const TEST_TOKEN = 'test-session-token'

function mockApiPathBuilder() {
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

function mockLocalSession(token: string | null) {
    vi.spyOn(LocalSession, 'getInstance').mockReturnValue({
        get: () => (token ? { token } : null),
    } as unknown as LocalSession)
}

describe('RequestBuilder', () => {
    beforeEach(() => {
        vi.spyOn(axios, 'get').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'post').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'put').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'patch').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'delete').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'head').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'options').mockResolvedValue({ data: {} })
        mockApiPathBuilder()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('constructor', () => {
        it('should throw when pathName is falsy', () => {
            expect(() => new RequestBuilder('' as never)).toThrow(
                'RequestBuilder: pathName is required',
            )
        })
    })

    describe('build', () => {
        it('should return all HTTP method helpers', () => {
            const api = new RequestBuilder('Login').build()
            expect(typeof api.get).toBe('function')
            expect(typeof api.post).toBe('function')
            expect(typeof api.put).toBe('function')
            expect(typeof api.patch).toBe('function')
            expect(typeof api.delete).toBe('function')
            expect(typeof api.head).toBe('function')
            expect(typeof api.options).toBe('function')
        })
    })

    describe('URL resolution', () => {
        it('should build URL with /api prefix by default', async () => {
            await new RequestBuilder('Login').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/login',
                expect.any(Object),
            )
        })

        it('should auto-detect project paths and use no /api prefix', async () => {
            await new RequestBuilder('Gym').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/projects/gym',
                expect.any(Object),
            )
        })

        it('should throw when pathName is falsy', () => {
            expect(() => new RequestBuilder(undefined as never)).toThrow(
                'RequestBuilder: pathName is required',
            )
        })
    })

    describe('setSubpath', () => {
        it('should append a subpath segment to the URL', async () => {
            await new RequestBuilder('Gym').setSubpath('/message').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/projects/gym/message',
                expect.any(Object),
            )
        })

        it('should allow chaining multiple setSubpath calls', async () => {
            await new RequestBuilder('Gym').setSubpath('/level').setSubpath('/name').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/projects/gym/level/name',
                expect.any(Object),
            )
        })

        it('should return this early when subpath is empty', () => {
            const builder = new RequestBuilder('Gym')
            const result = builder.setSubpath('')
            expect(result).toBe(builder)
        })

        it('should normalize leading and trailing slashes', async () => {
            await new RequestBuilder('Gym').setSubpath('message/').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/projects/gym/message',
                expect.any(Object),
            )
        })
    })

    describe('setQuery', () => {
        it('should pass query params in axios config', async () => {
            await new RequestBuilder('Gym')
                .setSubpath('/message')
                .setQuery({ userId: '123' })
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ params: { userId: '123' } }),
            )
        })

        it('should not include params when setQuery is not called', async () => {
            await new RequestBuilder('Login').build().get()
            const config = mockedAxios.get.mock.calls[0][1]
            expect(config).not.toHaveProperty('params')
        })

        it('should strip null and undefined values', async () => {
            await new RequestBuilder('Login')
                .setQuery({ a: 'keep', b: null, c: undefined })
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ params: { a: 'keep' } }),
            )
        })
    })

    describe('appendQuery', () => {
        it('should merge additional query params into existing ones', async () => {
            await new RequestBuilder('Login')
                .setQuery({ a: '1' })
                .appendQuery({ b: '2' })
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ params: { a: '1', b: '2' } }),
            )
        })

        it('should overwrite existing keys with new values', async () => {
            await new RequestBuilder('Login')
                .setQuery({ a: 'old' })
                .appendQuery({ a: 'new' })
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ params: { a: 'new' } }),
            )
        })
    })

    describe('removeQuery', () => {
        it('should remove specified query params by key', async () => {
            await new RequestBuilder('Login')
                .setQuery({ a: '1', b: '2', c: '3' })
                .removeQuery('a', 'c')
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ params: { b: '2' } }),
            )
        })
    })

    describe('resetQuery', () => {
        it('should clear all query params', async () => {
            await new RequestBuilder('Login')
                .setQuery({ a: '1', b: '2' })
                .resetQuery()
                .build()
                .get()
            const config = mockedAxios.get.mock.calls[0][1]
            expect(config).not.toHaveProperty('params')
        })
    })

    describe('withAuthToken', () => {
        beforeEach(() => {
            mockLocalSession(TEST_TOKEN)
        })

        it('should set x-auth-token header from LocalSession token', async () => {
            await new RequestBuilder('Message').withAuthToken().build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: { 'x-auth-token': TEST_TOKEN },
                }),
            )
        })

        it('should prefer an explicit token override over LocalSession', async () => {
            await new RequestBuilder('Message').withAuthToken('explicit-token').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: { 'x-auth-token': 'explicit-token' },
                }),
            )
        })

        it('should not set header when no token is available', async () => {
            mockLocalSession(null)
            await new RequestBuilder('Login').withAuthToken().build().get()
            const config = mockedAxios.get.mock.calls[0][1]
            expect(config).not.toHaveProperty('headers')
        })

        it('should not include headers when withAuthToken is not called', async () => {
            await new RequestBuilder('Login').build().get()
            const config = mockedAxios.get.mock.calls[0][1]
            expect(config).not.toHaveProperty('headers')
        })
    })

    describe('withHeader', () => {
        it('should set a custom header on the request', async () => {
            await new RequestBuilder('Login').withHeader('x-custom', 'my-value').build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: { 'x-custom': 'my-value' },
                }),
            )
        })

        it('should allow setting multiple custom headers', async () => {
            await new RequestBuilder('Login')
                .withHeader('x-one', '1')
                .withHeader('x-two', '2')
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: { 'x-one': '1', 'x-two': '2' },
                }),
            )
        })
    })

    describe('removeHeader', () => {
        it('should remove a previously set header', async () => {
            await new RequestBuilder('Login')
                .withHeader('x-one', '1')
                .withHeader('x-two', '2')
                .removeHeader('x-one')
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: { 'x-two': '2' },
                }),
            )
        })
    })

    describe('resetHeaders', () => {
        it('should clear all custom headers', async () => {
            await new RequestBuilder('Login').withHeader('x-one', '1').resetHeaders().build().get()
            const config = mockedAxios.get.mock.calls[0][1]
            expect(config).not.toHaveProperty('headers')
        })
    })

    describe('setParams', () => {
        it('should replace :key placeholders in the URL', async () => {
            const mockBuilder = apiPathBuilderModule as { apiPathBuilder: ReturnType<typeof vi.fn> }
            mockBuilder.apiPathBuilder.mockReturnValueOnce(
                'http://localhost:5000/api/users/:userId',
            )

            await new RequestBuilder('Login').setParams({ userId: '42' }).build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/users/42',
                expect.any(Object),
            )
        })

        it('should encode special characters in param values', async () => {
            const mockBuilder = apiPathBuilderModule as { apiPathBuilder: ReturnType<typeof vi.fn> }
            mockBuilder.apiPathBuilder.mockReturnValueOnce('http://localhost:5000/api/items/:name')

            await new RequestBuilder('Login').setParams({ name: 'hello world' }).build().get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/items/hello%20world',
                expect.any(Object),
            )
        })

        it('should strip null and undefined param values', async () => {
            const mockBuilder = apiPathBuilderModule as { apiPathBuilder: ReturnType<typeof vi.fn> }
            mockBuilder.apiPathBuilder.mockReturnValueOnce(
                'http://localhost:5000/api/users/:userId/:org',
            )

            await new RequestBuilder('Login')
                .setParams({ userId: '42', org: null as never })
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/users/42/:org',
                expect.any(Object),
            )
        })
    })

    describe('appendParams', () => {
        it('should merge additional path params into existing ones', async () => {
            const mockBuilder = apiPathBuilderModule as { apiPathBuilder: ReturnType<typeof vi.fn> }
            mockBuilder.apiPathBuilder.mockReturnValueOnce(
                'http://localhost:5000/api/users/:userId/posts/:postId',
            )

            await new RequestBuilder('Login')
                .setParams({ userId: '1' })
                .appendParams({ postId: '99' })
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/users/1/posts/99',
                expect.any(Object),
            )
        })

        it('should overwrite existing keys', async () => {
            const mockBuilder = apiPathBuilderModule as { apiPathBuilder: ReturnType<typeof vi.fn> }
            mockBuilder.apiPathBuilder.mockReturnValueOnce(
                'http://localhost:5000/api/users/:userId',
            )

            await new RequestBuilder('Login')
                .setParams({ userId: 'old' })
                .appendParams({ userId: 'new' })
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/users/new',
                expect.any(Object),
            )
        })
    })

    describe('removeParams', () => {
        it('should remove specified path params by key', async () => {
            const mockBuilder = apiPathBuilderModule as { apiPathBuilder: ReturnType<typeof vi.fn> }
            mockBuilder.apiPathBuilder.mockReturnValueOnce('http://localhost:5000/api/:a/:b/:c')

            await new RequestBuilder('Login')
                .setParams({ a: '1', b: '2', c: '3' })
                .removeParams('a', 'c')
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/:a/2/:c',
                expect.any(Object),
            )
        })
    })

    describe('resetParams', () => {
        it('should clear all path params', async () => {
            const mockBuilder = apiPathBuilderModule as { apiPathBuilder: ReturnType<typeof vi.fn> }
            mockBuilder.apiPathBuilder.mockReturnValueOnce(
                'http://localhost:5000/api/users/:userId',
            )

            await new RequestBuilder('Login')
                .setParams({ userId: '42' })
                .resetParams()
                .build()
                .get()
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/users/:userId',
                expect.any(Object),
            )
        })
    })

    describe('HTTP methods', () => {
        it('get should call axios.get with url and config', async () => {
            await new RequestBuilder('Login').build().get()
            expect(mockedAxios.get).toHaveBeenCalledTimes(1)
        })

        it('post should call axios.post with url, payload, and config', async () => {
            const payload = { email: 'a@b.com', password: '123' }
            await new RequestBuilder('Login').build().post(payload)
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'http://localhost:5000/api/login',
                payload,
                expect.any(Object),
            )
        })

        it('put should call axios.put with url, payload, and config', async () => {
            const payload = { candle1: true }
            mockLocalSession('tok')
            await new RequestBuilder('Gym')
                .setSubpath('/candles')
                .withAuthToken()
                .build()
                .put(payload)
            expect(mockedAxios.put).toHaveBeenCalledWith(
                'http://localhost:5000/projects/gym/candles',
                payload,
                expect.objectContaining({
                    headers: { 'x-auth-token': 'tok' },
                }),
            )
        })

        it('patch should call axios.patch with url, payload, and config', async () => {
            const payload = { name: 'updated' }
            await new RequestBuilder('Login').build().patch(payload)
            expect(mockedAxios.patch).toHaveBeenCalledWith(
                'http://localhost:5000/api/login',
                payload,
                expect.any(Object),
            )
        })

        it('delete should call axios.delete with url and config', async () => {
            await new RequestBuilder('Login').build().delete()
            expect(mockedAxios.delete).toHaveBeenCalledWith(
                'http://localhost:5000/api/login',
                expect.any(Object),
            )
        })

        it('head should call axios.head with url and config', async () => {
            await new RequestBuilder('Login').build().head()
            expect(mockedAxios.head).toHaveBeenCalledWith(
                'http://localhost:5000/api/login',
                expect.any(Object),
            )
        })

        it('options should call axios.options with url and config', async () => {
            await new RequestBuilder('Login').build().options()
            expect(mockedAxios.options).toHaveBeenCalledWith(
                'http://localhost:5000/api/login',
                expect.any(Object),
            )
        })
    })

    describe('full builder chain', () => {
        it('should combine setSubpath, setQuery, setParams, withAuthToken, and withHeader', async () => {
            mockLocalSession('my-token')
            const mockBuilder = apiPathBuilderModule as { apiPathBuilder: ReturnType<typeof vi.fn> }
            mockBuilder.apiPathBuilder.mockReturnValueOnce(
                'http://localhost:5000/api/messages/:orgId',
            )

            await new RequestBuilder('Login')
                .setSubpath('/inbox')
                .setParams({ orgId: 'acme' })
                .setQuery({ userId: '42' })
                .withAuthToken()
                .withHeader('x-correlation-id', 'abc-123')
                .build()
                .get()

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:5000/api/messages/acme/inbox',
                {
                    headers: {
                        'x-auth-token': 'my-token',
                        'x-correlation-id': 'abc-123',
                    },
                    params: { userId: '42' },
                },
            )
        })

        it('should return this from every builder method for chaining', () => {
            const builder = new RequestBuilder('Login')
            expect(builder.setSubpath('/x')).toBe(builder)
            expect(builder.setParams({})).toBe(builder)
            expect(builder.appendParams({})).toBe(builder)
            expect(builder.removeParams()).toBe(builder)
            expect(builder.resetParams()).toBe(builder)
            expect(builder.setQuery({})).toBe(builder)
            expect(builder.appendQuery({})).toBe(builder)
            expect(builder.removeQuery()).toBe(builder)
            expect(builder.resetQuery()).toBe(builder)
            expect(builder.withAuthToken()).toBe(builder)
            expect(builder.withHeader('k', 'v')).toBe(builder)
            expect(builder.removeHeader('k')).toBe(builder)
            expect(builder.resetHeaders()).toBe(builder)
        })
    })
})
