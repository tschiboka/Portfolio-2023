import { screen, waitFor } from '@testing-library/react'
import { Paragraph } from '@common-ux'
import { Test } from '@shared-components/Screen/tests'
import { VersionTestUtils } from '@common-utils/Version/tests/Version.spec.utils'
import { FooterTestUtils } from './Footer.spec.utils'

const { renderFooter } = FooterTestUtils

describe('Footer', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('should link the current year to the clock', () => {
        const year = String(new Date().getFullYear())
        renderFooter()

        expect(Test.Link(year).Get.href()).toBe('#/clock')
    })

    it('should render the owner line', () => {
        renderFooter()

        expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
    })

    it('should render the supplied additional info', () => {
        renderFooter(<Paragraph>Xmas edition - 2025</Paragraph>)

        expect(screen.getByText('Xmas edition - 2025')).toBeInTheDocument()
    })

    it.each(['Facebook Link', 'Github Link', 'LinkedIn Link'])('should render the %s', (name) => {
        renderFooter()

        expect(Test.Link(name)).toBeTruthy()
    })

    it('should render the build version once it is read', async () => {
        VersionTestUtils.mockFetch(VersionTestUtils.mockVersion({ version: '2.0.0' }))
        renderFooter()

        await waitFor(() => Test.Button('v2.0.0'))
    })
})
