import { renderHook, waitFor } from '@testing-library/react'
import { useVersionCheck } from '../Version'
import { GetVersionResponse } from '../../../types'

const VALID_SHA = 'a'.repeat(40)
const OTHER_SHA = 'b'.repeat(40)

const mockVersion = (overrides: Partial<GetVersionResponse> = {}): GetVersionResponse => ({
    sha: VALID_SHA,
    message: 'initial commit',
    date: '2026-01-01',
    ...overrides,
})

const mockFetch = (body: GetVersionResponse, ok = true) => {
    global.fetch = jest.fn().mockResolvedValue({
        ok,
        json: () => Promise.resolve(body),
    })
}

describe('useVersionCheck', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        jest.spyOn(console, 'log').mockImplementation()
        jest.spyOn(console, 'warn').mockImplementation()
        jest.spyOn(console, 'info').mockImplementation()
        jest.spyOn(console, 'error').mockImplementation()
    })

    afterEach(() => {
        jest.useRealTimers()
        jest.restoreAllMocks()
    })

    it('should return isStale as false initially', () => {
        mockFetch(mockVersion())
        const { result } = renderHook(() => useVersionCheck())
        expect(result.current.isStale).toBe(false)
    })

    it('should fetch /version.json with no-store cache', async () => {
        mockFetch(mockVersion())
        renderHook(() => useVersionCheck())

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/version.json', { cache: 'no-store' })
        })
    })

    it('should log version info on first successful fetch', async () => {
        const version = mockVersion()
        mockFetch(version)
        renderHook(() => useVersionCheck())

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('✅ App is up to date.')
            expect(console.log).toHaveBeenCalledWith('📌 Version:', VALID_SHA)
            expect(console.log).toHaveBeenCalledWith('📝 Message:', version.message)
            expect(console.log).toHaveBeenCalledWith('📅 Date:', version.date)
        })
    })

    it('should not set isStale when version stays the same', async () => {
        mockFetch(mockVersion())
        const { result } = renderHook(() => useVersionCheck())

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('✅ App is up to date.')
        })

        // Advance interval — same sha returned
        jest.advanceTimersByTime(600_000)

        await waitFor(() => {
            expect(result.current.isStale).toBe(false)
        })
    })

    it('should set isStale when version changes', async () => {
        mockFetch(mockVersion())
        const { result } = renderHook(() => useVersionCheck())

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('✅ App is up to date.')
        })

        // Return different sha on next poll
        mockFetch(mockVersion({ sha: OTHER_SHA }))
        jest.advanceTimersByTime(600_000)

        await waitFor(() => {
            expect(result.current.isStale).toBe(true)
        })
        expect(console.warn).toHaveBeenCalledWith('🔄 New version available!')
        expect(console.info).toHaveBeenCalledWith('Please refresh the page to update.')
    })

    describe('should not update state for invalid responses', () => {
        it('when fetch is not ok', async () => {
            mockFetch(mockVersion(), false)
            const { result } = renderHook(() => useVersionCheck())

            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalled()
            })
            expect(result.current.isStale).toBe(false)
        })

        it.each([
            ['empty sha', ''],
            ['short sha', 'abc123'],
            ['invalid chars', 'z'.repeat(40)],
        ])('when sha is %s', async (_label: string, sha: string) => {
            mockFetch(mockVersion({ sha }))
            const { result } = renderHook(() => useVersionCheck())

            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalled()
            })
            expect(result.current.isStale).toBe(false)
            expect(console.log).not.toHaveBeenCalledWith('✅ App is up to date.')
        })
    })

    it('should handle fetch errors gracefully', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))
        const { result } = renderHook(() => useVersionCheck())

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                'Error checking app version:',
                expect.any(Error),
            )
        })
        expect(result.current.isStale).toBe(false)
    })

    it('should poll every 10 minutes', async () => {
        mockFetch(mockVersion())
        renderHook(() => useVersionCheck())

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1)
        })

        jest.advanceTimersByTime(600_000)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(2)
        })

        jest.advanceTimersByTime(600_000)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(3)
        })
    })

    it('should clear interval on unmount', async () => {
        mockFetch(mockVersion())
        const { unmount } = renderHook(() => useVersionCheck())

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1)
        })

        unmount()
        jest.advanceTimersByTime(600_000)
        // No additional fetch after unmount
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })
})
