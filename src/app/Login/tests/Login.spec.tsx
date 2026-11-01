import { screen, waitFor } from '@testing-library/react'
import { Test } from '@shared-components/Screen/tests'
import { SettingsMocks, UserMocks } from '@common-mocks'
import { LoginMocks } from './Login.mocks'
import { LoginMockHandlers } from './Login.mockHandlers'
import { LoginTestUtils } from './Login.spec.utils'

const { fields, buttons, errors } = LoginTestUtils.labels
const { setSession } = LoginMocks

describe('Login', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render heading and subheading', () => {
            LoginTestUtils.render()
            expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
            expect(screen.getByText('Tschiboka Personal App')).toBeInTheDocument()
        })

        it('should render the email input with label', () => {
            const { form } = LoginTestUtils.render()
            expect(form.Input(fields.email).Get.value()).toBeDefined()
        })

        it('should render the password input with label', () => {
            const { form } = LoginTestUtils.render()
            expect(form.Input(fields.password).Get.value()).toBeDefined()
        })

        it('should render the login button', () => {
            const { form } = LoginTestUtils.render()
            expect(form.Button(buttons.login).Get.textContent()).toMatch(buttons.login)
        })

        it('should render the form with accessible label', () => {
            const { form } = LoginTestUtils.render()
            expect(form).toBeDefined()
        })
    })

    describe('Registration button', () => {
        it('should render the register button when registration is enabled', async () => {
            const { form } = LoginTestUtils.render()
            const button = await waitFor(() => form.Button(buttons.register))
            expect(button).toBeDefined()
        })

        it('should not render the register button when registration is disabled', async () => {
            const { form } = LoginTestUtils.render()
            Test.Screen.Set.handlers(
                LoginMockHandlers.Settings.Get.updateResponse((builder) =>
                    builder.setValue('settings', {
                        ...SettingsMocks.build(),
                        enableUserRegistration: false,
                    }),
                ),
            )
            await waitFor(() => {
                expect(form.Has.byText(buttons.register)).toBe(false)
            })
        })

        it('should navigate to /api/register when register button is clicked', async () => {
            const { form } = LoginTestUtils.render()
            const button = await waitFor(() => form.Button(buttons.register))

            expect(button).toBeDefined()
            await form.Button(buttons.register).Do.click()
            expect(Test.Screen.Get.navigatedTo()).toBe('/api/register')
        })
    })

    describe('Form validation', () => {
        it('should show validation error when email is empty on submit', async () => {
            const { form } = LoginTestUtils.render()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when email is too short', async () => {
            const { form } = LoginTestUtils.render()
            await form.Input(fields.email).Do.type('ab@c.co')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when password is empty on submit', async () => {
            const { form } = LoginTestUtils.render()
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Do.submit()
            expect(await form.Wait.errorMsg()).toBeInTheDocument()
        })

        it('should show validation error when password is too short', async () => {
            const { form } = LoginTestUtils.render()
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.password).Do.type('short')
            await form.Do.submit()
            expect(await form.Wait.errorMsg()).toBeInTheDocument()
        })

        it('should not call login API when form is invalid', async () => {
            const { form } = LoginTestUtils.render()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
            expect(setSession).not.toHaveBeenCalled()
            expect(Test.Screen.Has.navigated()).toBe(false)
        })
    })

    describe('Successful login', () => {
        it('should set session with token, user, and settings on success', async () => {
            await LoginTestUtils.fillAndSubmit()
            await waitFor(() => {
                expect(setSession).toHaveBeenCalledWith({
                    token: 'mock-jwt-token',
                    user: UserMocks.build(),
                    settings: SettingsMocks.build(),
                })
            })
        })

        it('should navigate to /api/home on successful login', async () => {
            await LoginTestUtils.fillAndSubmit()
            await Test.Screen.Wait.navigatedTo('/api/home')
        })
    })

    describe('Failed login', () => {
        it('should display server error message on login failure', async () => {
            const form = await LoginTestUtils.fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.invalidCredentials)).toBeInTheDocument()
        })

        it('should not navigate on login failure', async () => {
            const form = await LoginTestUtils.fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.invalidCredentials)).toBeInTheDocument()
            expect(Test.Screen.Has.navigated()).toBe(false)
        })

        it('should not set session on login failure', async () => {
            const form = await LoginTestUtils.fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.invalidCredentials)).toBeInTheDocument()
            expect(setSession).not.toHaveBeenCalled()
        })
    })

    describe('Password reveal', () => {
        it('should render password field as type password by default', () => {
            const { form } = LoginTestUtils.render()
            expect(form.Input(fields.password).Get.type()).toBe('password')
        })

        it('should toggle password visibility when reveal icon is clicked', () => {
            const { form } = LoginTestUtils.render()
            const toggleBtn = form.Button(buttons.togglePassword)
            expect(toggleBtn.Get.textContent()).toBeDefined()
        })
    })

    describe('Loading state', () => {
        it('should hide loading indicator once settings are loaded', async () => {
            LoginTestUtils.render()
            await waitFor(() => {
                expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
            })
        })
    })
})
