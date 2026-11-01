import type { GetVersionResponse } from '../../../types'

const VALID_SHA = 'a'.repeat(40)
const OTHER_SHA = 'b'.repeat(40)

const mockVersion = (overrides: Partial<GetVersionResponse> = {}): GetVersionResponse => ({
    sha: VALID_SHA,
    message: 'initial commit',
    date: '2026-01-01',
    ...overrides,
})

const mockFetch = (body: GetVersionResponse, ok = true) => {
    global.fetch = vi.fn().mockResolvedValue({
        ok,
        json: () => Promise.resolve(body),
    })
}

export const VersionTestUtils = { VALID_SHA, OTHER_SHA, mockVersion, mockFetch }
