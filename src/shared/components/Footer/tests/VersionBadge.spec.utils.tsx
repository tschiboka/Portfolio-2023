import { waitFor } from '@testing-library/react'
import { Test } from '@shared-components/Screen/tests'
import { Version } from '@shared-context'
import { DateTime } from '@common-utils'
import { VersionTestUtils } from '@common-utils/Version/tests/Version.spec.utils'
import { VersionBadge } from '../components'
import type { GetVersionResponse } from '@common-types'

const version: GetVersionResponse = {
    version: '2.0.0',
    sha: VersionTestUtils.VALID_SHA,
    message: 'initial commit',
    date: '2026-01-01',
}

const upperSha = VersionTestUtils.VALID_SHA.toUpperCase()
const dateLabel = DateTime.Format.to('DisplayTimeStamp', version.date) ?? version.date

/** Stubs the clipboard so `copyToClipboard` resolves, returning the spy to assert on. */
const mockClipboard = () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    return writeText
}

/** Leaves the version fetch unsettled, so the badge never receives a build. */
const mockPendingVersion = () =>
    vi.stubGlobal(
        'fetch',
        vi.fn(() => new Promise(() => {})),
    )

const renderVersionBadge = () =>
    Test.Screen.Do.render({
        path: '/',
        children: (
            <Version.Provider>
                <VersionBadge />
            </Version.Provider>
        ),
    })

const renderLoadedBadge = async () => {
    VersionTestUtils.mockFetch(version)
    renderVersionBadge()
    await waitFor(() => Test.Button(`v${version.version}`))
}

const openVersionModal = async () => {
    await renderLoadedBadge()
    await Test.Button(`v${version.version}`).Do.click()
}

export const VersionBadgeTestUtils = {
    version,
    upperSha,
    dateLabel,
    mockClipboard,
    mockPendingVersion,
    renderVersionBadge,
    renderLoadedBadge,
    openVersionModal,
}
