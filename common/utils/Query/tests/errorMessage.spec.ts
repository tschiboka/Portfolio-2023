import type { AxiosError } from 'axios'
import { errorMessage } from '../errorMessage'
import type { ErrorResponse } from '../mergeStatus'

const FALLBACK = 'Something went wrong'

const axiosError = (data?: ErrorResponse): AxiosError<ErrorResponse> =>
    ({
        response: data === undefined ? undefined : { data },
    }) as AxiosError<ErrorResponse>

describe('errorMessage', () => {
    it('should return the server message when the response carries one', () => {
        expect(errorMessage(axiosError({ message: 'Token expired' }), FALLBACK)).toBe(
            'Token expired',
        )
    })

    it('should return the fallback when the server sends no message', () => {
        expect(errorMessage(axiosError({}), FALLBACK)).toBe(FALLBACK)
    })

    it('should return the fallback when the response body is missing', () => {
        expect(errorMessage(axiosError(), FALLBACK)).toBe(FALLBACK)
    })

    it('should prefer the server message over the fallback', () => {
        expect(errorMessage(axiosError({ message: 'Server wins' }), 'Fallback loses')).toBe(
            'Server wins',
        )
    })

    it('should return the empty server message rather than the fallback', () => {
        expect(errorMessage(axiosError({ message: '' }), FALLBACK)).toBe('')
    })
})
