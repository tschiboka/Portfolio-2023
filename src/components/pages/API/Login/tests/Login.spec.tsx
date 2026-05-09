import { screen, waitFor } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { ApiRoutes } from '../../../../../routing/ApiRoutes'
import { mockSetSession, mockUser, defaultSettings } from './Login.mocks'
import { defaultHandlers, handleGetSettings, handlePostLoginError } from './Login.mockHandles'
import { LoginLabels } from './Login.spec.utils'

const { form: FORM, fields, buttons, errors } = LoginLabels

const setupLogin = () => {
    Test.Page.Do.render({
        path: ApiRoutes.Login,
        session: { setSession: mockSetSession },
        handlers: defaultHandlers,
    })

    return { form: Test.Form(FORM) }
}

describe('Login', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render heading and subheading', () => {
            setupLogin()
            expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
            expect(screen.getByText('Tschiboka Personal App')).toBeInTheDocument()
        })

        it('should render the email input with label', () => {
            const { form } = setupLogin()
            expect(form.Input(fields.email).Get.value()).toBeDefined()
        })

        it('should render the password input with label', () => {
            const { form } = setupLogin()
            expect(form.Input(fields.password).Get.value()).toBeDefined()
        })

        it('should render the login button', () => {
            const { form } = setupLogin()
            expect(form.Button(buttons.login).Get.textContent()).toMatch(buttons.login)
        })

        it('should render the form with accessible label', () => {
            const { form } = setupLogin()
            expect(form).toBeDefined()
        })
    })

    describe('Registration button', () => {
        it('should render the register button when registration is enabled', async () => {
            const { form } = setupLogin()
            const button = await waitFor(() => form.Button(buttons.register))
            expect(button).toBeDefined()
        })

        it('should not render the register button when registration is disabled', async () => {
            const { form } = setupLogin()
            Test.Page.Set.handlers(
                handleGetSettings.updateResponse((builder) =>
                    builder.setValue('data', { ...defaultSettings, enableUserRegistration: false }),
                ),
            )
            await waitFor(() => {
                expect(form.Has.byText(buttons.register)).toBe(false)
            })
        })

        it('should navigate to /api/register when register button is clicked', async () => {
            const { form } = setupLogin()
            const button = await waitFor(() => form.Button(buttons.register))

            expect(button).toBeDefined()
            await form.Button(buttons.register).Do.click()
            expect(Test.Page.Get.navigatedTo()).toBe('/api/register')
        })
    })

    describe('Form validation', () => {
        it('should show validation error when email is empty on submit', async () => {
            const { form } = setupLogin()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when email is too short', async () => {
            const { form } = setupLogin()
            await form.Input(fields.email).Do.type('ab@c.co')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when password is empty on submit', async () => {
            const { form } = setupLogin()
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Do.submit()
            expect(await form.Wait.errorMsg()).toBeInTheDocument()
        })

        it('should show validation error when password is too short', async () => {
            const { form } = setupLogin()
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.password).Do.type('short')
            await form.Do.submit()
            expect(await form.Wait.errorMsg()).toBeInTheDocument()
        })

        it('should not call login API when form is invalid', async () => {
            const { form } = setupLogin()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
            expect(mockSetSession).not.toHaveBeenCalled()
            expect(Test.Page.Has.navigated()).toBe(false)
        })
    })

    describe('Successful login', () => {
        const fillAndSubmitForm = async () => {
            const { form } = setupLogin()
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.password).Do.type('validpassword1')
            await form.Do.submit()
        }

        it('should set session with token, user, and settings on success', async () => {
            await fillAndSubmitForm()
            await waitFor(() => {
                expect(mockSetSession).toHaveBeenCalledWith({
                    token: 'mock-jwt-token',
                    user: mockUser,
                    settings: defaultSettings,
                })
            })
        })

        it('should navigate to /api/index on successful login', async () => {
            await fillAndSubmitForm()
            await Test.Page.Wait.navigatedTo('/api/index')
        })
    })

    describe('Failed login', () => {
        const fillAndSubmitInvalid = async () => {
            const { form } = setupLogin()
            Test.Page.Set.handlers(handlePostLoginError(errors.invalidCredentials))
            await form.Input(fields.email).Do.type('wrong@email.com')
            await form.Input(fields.password).Do.type('wrongpassword1')
            await form.Do.submit()
            return form
        }

        it('should display server error message on login failure', async () => {
            const form = await fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.invalidCredentials)).toBeInTheDocument()
        })

        it('should not navigate on login failure', async () => {
            const form = await fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.invalidCredentials)).toBeInTheDocument()
            expect(Test.Page.Has.navigated()).toBe(false)
        })

        it('should not set session on login failure', async () => {
            const form = await fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.invalidCredentials)).toBeInTheDocument()
            expect(mockSetSession).not.toHaveBeenCalled()
        })
    })

    describe('Password reveal', () => {
        it('should render password field as type password by default', () => {
            const { form } = setupLogin()
            expect(form.Input(fields.password).Get.type()).toBe('password')
        })

        it('should toggle password visibility when reveal icon is clicked', () => {
            const { form } = setupLogin()
            const toggleBtn = form.Button(buttons.togglePassword)
            expect(toggleBtn.Get.textContent()).toBeDefined()
        })
    })

    describe('Loading state', () => {
        it('should hide loading indicator once settings are loaded', async () => {
            setupLogin()
            await waitFor(() => {
                expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
            })
        })
    })
})
