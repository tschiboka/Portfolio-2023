import { screen, waitFor } from '@testing-library/react'
import { ClientMessage } from '@common-utils'
import { EmailVerificationTestUtils } from './EmailVerification.spec.utils'
import { Test } from '@shared-components/Screen/tests'

const { labels, messages, rejectedHandlers, rejectedWithoutMessageHandlers } =
    EmailVerificationTestUtils

describe('EmailVerification', () => {
    describe('Layout', () => {
        it('should render the page heading', () => {
            EmailVerificationTestUtils.customRender()
            expect(screen.getByRole('heading', { name: labels.heading })).toBeDefined()
        })
    })

    describe('Verification', () => {
        it('should show the success message once the token is confirmed', async () => {
            EmailVerificationTestUtils.customRender()

            await waitFor(() =>
                expect(screen.getByText(ClientMessage.Success.Verified('email'))).toBeDefined(),
            )
        })

        it('should render the server message when the token is rejected', async () => {
            EmailVerificationTestUtils.customRender(rejectedHandlers)

            await waitFor(() => expect(screen.getByText(messages.rejected)).toBeDefined())
        })

        it('should fall back to the client message when the server sends none', async () => {
            EmailVerificationTestUtils.customRender(rejectedWithoutMessageHandlers)

            await waitFor(() =>
                expect(screen.getByText(ClientMessage.Failure.Verify('email'))).toBeDefined(),
            )
        })
    })

    describe('Routing', () => {
        it('should navigate to the login page after a success', async () => {
            EmailVerificationTestUtils.customRender()

            await Test.Screen.Wait.navigatedTo(EmailVerificationTestUtils.loginPath)
        })

        it('should not navigate when the token is rejected', async () => {
            EmailVerificationTestUtils.customRender(rejectedHandlers)

            await waitFor(() => expect(screen.getByText(messages.rejected)).toBeDefined())
            expect(Test.Screen.Get.navigatedTo()).not.toBe(EmailVerificationTestUtils.loginPath)
        })
    })
})
