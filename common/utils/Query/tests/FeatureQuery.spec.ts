import type { MockInstance } from 'vitest'
/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import * as apiPathBuilderModule from '../../Paths/apiPathBuilder'
import { FeatureQuery } from '../FeatureQuery'
import type { CacheKey } from '../Key'

const mockedAxios = axios as unknown as {
    get: MockInstance
    post: MockInstance
    put: MockInstance
    patch: MockInstance
    delete: MockInstance
}

const TEST_TOKEN = 'test-session-token'
const TEST_PATH = 'Login'
const TEST_URL = 'http://localhost:5000/api/login'
const TEST_QUERY_KEY: CacheKey = ['login']

type BuiltQuery = ReturnType<ReturnType<typeof FeatureQuery>['build']>

/** The axios config of the nth call, typed so header assertions stay safe. */
const callConfig = (verb: 'get' | 'post' | 'put' | 'patch' | 'delete', index = 0) =>
    mockedAxios[verb].mock.calls[index] as [string, AxiosRequestConfig?, AxiosRequestConfig?]

/** Runs the query function of a built `Get` and returns the promise. */
const runGet = (query: BuiltQuery) => {
    const { queryFn } = query.Get<string>(TEST_QUERY_KEY)
    if (typeof queryFn !== 'function') throw new Error('FeatureQuery: Get has no queryFn')

    return queryFn({} as never)
}

/** Runs the mutation function of a built verb and returns the promise. */
const runMutation = <TPayload>(options: { mutationFn?: unknown }, payload: TPayload) => {
    const { mutationFn } = options
    if (typeof mutationFn !== 'function') throw new Error('FeatureQuery: verb has no mutationFn')

    return (mutationFn as (variables: TPayload) => Promise<unknown>)(payload)
}

describe('FeatureQuery', () => {
    beforeEach(() => {
        vi.spyOn(axios, 'get').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'post').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'put').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'patch').mockResolvedValue({ data: {} })
        vi.spyOn(axios, 'delete').mockResolvedValue({ data: {} })
        vi.spyOn(apiPathBuilderModule, 'apiPathBuilder').mockReturnValue(TEST_URL)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('chaining', () => {
        it.each([
            ['path', (query: ReturnType<typeof FeatureQuery>) => query.path(TEST_PATH)],
            ['subpath', (query: ReturnType<typeof FeatureQuery>) => query.subpath('nested')],
            ['token', (query: ReturnType<typeof FeatureQuery>) => query.token(TEST_TOKEN)],
            ['token with undefined', (query: ReturnType<typeof FeatureQuery>) => query.token()],
        ])('should return the builder from %s', (_name, chain) => {
            const query = FeatureQuery()
            expect(chain(query)).toBe(query)
        })

        it('should allow chaining in any order', () => {
            const query = FeatureQuery()
            expect(query.path(TEST_PATH).subpath('nested').token(TEST_TOKEN)).toBe(query)
            expect(query.token(TEST_TOKEN).subpath('nested').path(TEST_PATH)).toBe(query)
        })
    })

    describe('build', () => {
        it('should throw when path is not set', () => {
            expect(() => FeatureQuery().build()).toThrow('FeatureQuery: path is required')
        })

        it('should still throw when only subpath and token are set', () => {
            expect(() => FeatureQuery().subpath('nested').token(TEST_TOKEN).build()).toThrow(
                'FeatureQuery: path is required',
            )
        })

        it.each(['Get', 'Post', 'Put', 'Patch', 'Delete'] as const)(
            'should expose a %s verb',
            (verb) => {
                const query = FeatureQuery().path(TEST_PATH).build()
                expect(typeof query[verb]).toBe('function')
            },
        )

        it('should return an independent built query per call', () => {
            expect(FeatureQuery().path(TEST_PATH).build()).not.toBe(
                FeatureQuery().path(TEST_PATH).build(),
            )
        })
    })

    describe('Get', () => {
        it('should carry the cache key as queryKey', () => {
            const query = FeatureQuery().path(TEST_PATH).build()
            expect(query.Get<string>(TEST_QUERY_KEY).queryKey).toEqual(TEST_QUERY_KEY)
        })

        it('should resolve the request URL through the path builder', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).build())
            expect(apiPathBuilderModule.apiPathBuilder).toHaveBeenCalledWith(TEST_PATH, 'Api')
        })

        it('should forward the group to the path builder', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).group('Projects').build())
            expect(apiPathBuilderModule.apiPathBuilder).toHaveBeenCalledWith(TEST_PATH, 'Projects')
        })

        it('should call the resolved URL', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).build())
            expect(mockedAxios.get).toHaveBeenCalledWith(TEST_URL, expect.any(Object))
        })

        it('should unwrap the axios response data', async () => {
            mockedAxios.get.mockResolvedValue({ data: { name: 'categories' } })
            await expect(runGet(FeatureQuery().path(TEST_PATH).build())).resolves.toEqual({
                name: 'categories',
            })
        })

        it('should merge caller options over the defaults', () => {
            const query = FeatureQuery().path(TEST_PATH).build()
            const options = query.Get<string>(TEST_QUERY_KEY, { staleTime: 5000 })

            expect(options.staleTime).toBe(5000)
            expect(options.queryKey).toEqual(TEST_QUERY_KEY)
        })

        it('should reject when the request fails', async () => {
            mockedAxios.get.mockRejectedValue(new Error('network down'))
            await expect(runGet(FeatureQuery().path(TEST_PATH).build())).rejects.toThrow(
                'network down',
            )
        })
    })

    describe('subpath', () => {
        it('should append the subpath to the resolved URL', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).subpath('nested').build())
            expect(mockedAxios.get).toHaveBeenCalledWith(`${TEST_URL}/nested`, expect.any(Object))
        })

        it('should normalize leading and trailing slashes', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).subpath('/nested/').build())
            expect(mockedAxios.get).toHaveBeenCalledWith(`${TEST_URL}/nested`, expect.any(Object))
        })

        it('should not append anything when the subpath is empty', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).subpath('').build())
            expect(mockedAxios.get).toHaveBeenCalledWith(TEST_URL, expect.any(Object))
        })
    })

    describe('token', () => {
        it('should send the token as the x-auth-token header', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).token(TEST_TOKEN).build())
            expect(mockedAxios.get).toHaveBeenCalledWith(
                TEST_URL,
                expect.objectContaining({ headers: { 'x-auth-token': TEST_TOKEN } }),
            )
        })

        it('should not send a header when the token is omitted', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).build())
            expect(callConfig('get')[1]).not.toHaveProperty('headers')
        })

        it('should not send a header when the token is undefined', async () => {
            await runGet(FeatureQuery().path(TEST_PATH).token(undefined).build())
            expect(callConfig('get')[1]).not.toHaveProperty('headers')
        })

        it('should send the token on a mutation too', async () => {
            const query = FeatureQuery().path(TEST_PATH).token(TEST_TOKEN).build()
            await runMutation(query.Post<{ name: string }>({}), { name: 'legs' })

            expect(mockedAxios.post).toHaveBeenCalledWith(
                TEST_URL,
                { name: 'legs' },
                expect.objectContaining({ headers: { 'x-auth-token': TEST_TOKEN } }),
            )
        })
    })

    describe.each(['Post', 'Put', 'Patch'] as const)('%s', (verb) => {
        const axiosVerb = verb.toLowerCase() as 'post' | 'put' | 'patch'

        it('should send the payload to the resolved URL', async () => {
            const query = FeatureQuery().path(TEST_PATH).build()
            await runMutation(query[verb]<{ name: string }>({}), { name: 'legs' })

            expect(mockedAxios[axiosVerb]).toHaveBeenCalledWith(
                TEST_URL,
                { name: 'legs' },
                expect.any(Object),
            )
        })

        it('should unwrap the axios response data', async () => {
            mockedAxios[axiosVerb].mockResolvedValue({ data: { id: '1' } })
            const query = FeatureQuery().path(TEST_PATH).build()

            await expect(
                runMutation(query[verb]<{ name: string }>({}), { name: 'legs' }),
            ).resolves.toEqual({ id: '1' })
        })

        it('should reject when the request fails', async () => {
            mockedAxios[axiosVerb].mockRejectedValue(new Error('network down'))
            const query = FeatureQuery().path(TEST_PATH).build()

            await expect(
                runMutation(query[verb]<{ name: string }>({}), { name: 'legs' }),
            ).rejects.toThrow('network down')
        })

        it('should pass caller options through without dropping the mutationFn', () => {
            const onSuccess = vi.fn()
            const query = FeatureQuery().path(TEST_PATH).build()
            const options = query[verb]({ onSuccess })

            expect(options.onSuccess).toBe(onSuccess)
            expect(typeof options.mutationFn).toBe('function')
        })
    })

    describe('Delete', () => {
        it('should issue a delete against the resolved URL', async () => {
            const query = FeatureQuery().path(TEST_PATH).build()
            await runMutation(query.Delete({}), undefined)

            expect(mockedAxios.delete).toHaveBeenCalledWith(TEST_URL, expect.any(Object))
        })

        it('should unwrap the axios response data', async () => {
            mockedAxios.delete.mockResolvedValue({ data: { removed: true } })
            const query = FeatureQuery().path(TEST_PATH).build()

            await expect(runMutation(query.Delete({}), undefined)).resolves.toEqual({
                removed: true,
            })
        })

        it('should reject when the request fails', async () => {
            mockedAxios.delete.mockRejectedValue(new Error('network down'))
            const query = FeatureQuery().path(TEST_PATH).build()

            await expect(runMutation(query.Delete({}), undefined)).rejects.toThrow('network down')
        })

        it('should pass caller options through without dropping the mutationFn', () => {
            const onSuccess = vi.fn()
            const query = FeatureQuery().path(TEST_PATH).build()
            const options = query.Delete({ onSuccess })

            expect(options.onSuccess).toBe(onSuccess)
            expect(typeof options.mutationFn).toBe('function')
        })
    })
})
