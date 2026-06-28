import { extractAxiosData } from '../extractAxiosData'
import type { AxiosResponse } from 'axios'

describe('extractAxiosData', () => {
    it('should extract data from a successful Axios response', () => {
        const response = { data: { id: 1, name: 'test' } } as AxiosResponse<{
            id: number
            name: string
        }>
        const result = extractAxiosData(response)
        expect(result).toEqual({ id: 1, name: 'test' })
    })

    it('should extract an array from response data', () => {
        const response = { data: [1, 2, 3] } as AxiosResponse<number[]>
        const result = extractAxiosData(response)
        expect(result).toEqual([1, 2, 3])
    })

    it('should extract a string from response data', () => {
        const response = { data: 'hello' } as AxiosResponse<string>
        const result = extractAxiosData(response)
        expect(result).toBe('hello')
    })

    it('should extract null from response data', () => {
        const response = { data: null } as AxiosResponse<null>
        const result = extractAxiosData(response)
        expect(result).toBeNull()
    })

    it('should extract undefined from response data', () => {
        const response = { data: undefined } as AxiosResponse<undefined>
        const result = extractAxiosData(response)
        expect(result).toBeUndefined()
    })

    it('should preserve the response type through the generic', () => {
        interface User {
            id: number
            email: string
        }

        const response = {
            data: { id: 1, email: 'a@b.com' },
            status: 200,
            statusText: 'OK',
        } as AxiosResponse<User>

        const result: User = extractAxiosData(response)
        expect(result.id).toBe(1)
        expect(result.email).toBe('a@b.com')
    })

    it('should be usable as a .then callback', async () => {
        const promise = Promise.resolve({
            data: { value: 42 },
        } as AxiosResponse<{ value: number }>)

        const result = await promise.then(extractAxiosData)
        expect(result).toEqual({ value: 42 })
    })

    it('should work with nested data structures', () => {
        const response = {
            data: {
                items: ['a', 'b'],
                meta: { total: 2 },
            },
        } as AxiosResponse<{ items: string[]; meta: { total: number } }>

        const result = extractAxiosData(response)
        expect(result.items).toHaveLength(2)
        expect(result.meta.total).toBe(2)
    })
})
