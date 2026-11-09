import axios from 'axios'
import { isFunction } from '@common-utils'
import type { AxiosRequestConfig } from 'axios'
import type { MockInstance } from 'vitest'
import type { FeatureQueryBuilt } from '../FeatureQuery.types'
import type { CacheKey } from '../QueryKey'
import type { PathKey } from '../../Paths/Path.types'

const mockedAxios = axios as unknown as {
    get: MockInstance
    post: MockInstance
    put: MockInstance
    patch: MockInstance
    delete: MockInstance
}

const TEST_TOKEN = 'test-session-token'
const TEST_PATH: PathKey = 'Login'
const TEST_URL = 'http://localhost:5000/api/login'
const TEST_QUERY_KEY: CacheKey = ['login']

/** The axios config of the nth call, typed so header assertions stay safe. */
const callConfig = (verb: 'get' | 'post' | 'put' | 'patch' | 'delete', index = 0) =>
    mockedAxios[verb].mock.calls[index] as [string, AxiosRequestConfig?, AxiosRequestConfig?]

/** Runs the query function of a built `Get` and returns the promise. */
const runGet = (query: FeatureQueryBuilt) => {
    const { queryFn } = query.Get<string>(TEST_QUERY_KEY)
    if (!isFunction(queryFn)) throw new Error('FeatureQuery: Get has no queryFn')

    return queryFn({} as never)
}

/** Runs the mutation function of a built verb and returns the promise. */
const runMutation = <TPayload>(options: { mutationFn?: unknown }, payload: TPayload) => {
    const { mutationFn } = options
    if (!isFunction(mutationFn)) throw new Error('FeatureQuery: verb has no mutationFn')

    return (mutationFn as (variables: TPayload) => Promise<unknown>)(payload)
}

const AxiosVerbs = { Post: 'post', Put: 'put', Patch: 'patch' } as const

/** The axios method a mutation verb calls. */
const axiosVerbOf = (verb: keyof typeof AxiosVerbs) => AxiosVerbs[verb]

export const FeatureQueryTestUtils = {
    mockedAxios,
    TEST_TOKEN,
    TEST_PATH,
    TEST_URL,
    TEST_QUERY_KEY,
    callConfig,
    runGet,
    runMutation,
    axiosVerbOf,
}
