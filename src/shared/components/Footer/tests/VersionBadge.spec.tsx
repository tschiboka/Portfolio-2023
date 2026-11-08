import { screen } from '@testing-library/react'
import { Test } from '@shared-components/Screen/tests'
import { VersionBadgeTestUtils } from './VersionBadge.spec.utils'

const {
    version,
    upperSha,
    dateLabel,
    mockClipboard,
    mockPendingVersion,
    renderVersionBadge,
    renderLoadedBadge,
    openVersionModal,
} = VersionBadgeTestUtils

describe('VersionBadge', () => {
    beforeEach(() => mockClipboard())

    afterEach(() => vi.unstubAllGlobals())

    it('should render nothing until the build file is read', () => {
        mockPendingVersion()
        renderVersionBadge()

        expect(screen.queryByRole('button', { name: `v${version.version}` })).toBeNull()
    })

    it('should render the build version as a control', async () => {
        await renderLoadedBadge()
        expect(Test.Button(`v${version.version}`).Get.textContent()).toBe(`v${version.version}`)
    })

    it('should open the deployment modal on click', async () => {
        await openVersionModal()
        expect(Test.Overlay('App deployment info').Get.heading()).toHaveTextContent(
            'App deployment info',
        )
    })

    it('should list the version, date, message and sha in the modal', async () => {
        await openVersionModal()

        expect(screen.getByText(version.version!)).toBeInTheDocument()
        expect(screen.getByText(dateLabel)).toBeInTheDocument()
        expect(screen.getByText(version.message)).toBeInTheDocument()
        expect(screen.getByText(upperSha)).toBeInTheDocument()
    })

    it('should show when the version was last checked', async () => {
        await openVersionModal()

        expect(screen.getByText('Last checked')).toBeInTheDocument()
        expect(screen.queryByText('—')).toBeNull()
    })

    it('should offer a refresh action in the modal', async () => {
        await openVersionModal()

        expect(Test.Button('Refresh')).toBeTruthy()
    })

    it('should mark the build as up to date', async () => {
        await openVersionModal()
        expect(screen.getByLabelText('Up to date')).toBeInTheDocument()
    })

    it('should copy the sha when the copy control is pressed', async () => {
        const writeText = mockClipboard()
        await openVersionModal()
        await Test.Button('Copy commit SHA').Do.click()

        expect(writeText).toHaveBeenCalledWith(version.sha)
    })

    it('should show a success tick once the sha is copied', async () => {
        await openVersionModal()
        await Test.Button('Copy commit SHA').Do.click()

        expect(Test.Button('Copied').Get.textContent()).toBe('')
    })
})
