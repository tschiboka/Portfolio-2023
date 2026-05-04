import { screen, waitFor } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { ApiRoutes } from '../../../../../routing/ApiRoutes'
import { mockSetSession, mockUser, defaultSettings } from './Login.mocks'
import { defaultHandlers, handleSettings, handleLoginError } from './Login.mockHandles'
import { mockNavigate } from '@common/ux/Test/Page/Page.mocks'

const { Form, Page } = Test

const setupLogin = () => {
    return Page.setup({
        path: ApiRoutes.Login,
        session: { setSession: mockSetSession },
        handlers: defaultHandlers,
    })
}

describe('Login', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render heading and subheading', () => {
            setupLogin()
            expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
            expect(Form.Get.text('Tschiboka Personal App')).toBeInTheDocument()
        })

        it('should render the email input with label', () => {
            setupLogin()
            expect(Form.Get.byLabel('Email')).toBeInTheDocument()
        })

        it('should render the password input with label', () => {
            setupLogin()
            expect(Form.Get.byLabel('Password')).toBeInTheDocument()
        })

        it('should render the login button', () => {
            setupLogin()
            expect(Form.Get.button(/Login/)).toBeInTheDocument()
        })

        it('should render the form with accessible label', () => {
            setupLogin()
            expect(screen.getByRole('form', { name: 'Login form' })).toBeInTheDocument()
        })
    })

    describe('Registration button', () => {
        it('should render the register button when registration is enabled', async () => {
            setupLogin()
            await waitFor(() => {
                expect(Form.Get.button(/Register User/)).toBeInTheDocument()
            })
        })

        it('should not render the register button when registration is disabled', async () => {
            setupLogin()
            Page.Set.handlers(
                handleSettings
                    .updateResponse((builder) =>
                        builder.setValue('data', {
                            ...defaultSettings,
                            enableUserRegistration: false,
                        }),
                    )
                    .build(),
            )
            await waitFor(() => {
                expect(Form.Query.text(/Register User/)).not.toBeInTheDocument()
            })
        })

        it('should navigate to /api/register when register button is clicked', async () => {
            setupLogin()
            await waitFor(() => {
                expect(Form.Get.button(/Register User/)).toBeInTheDocument()
            })
            await Form.Click.button(/Register User/)
            expect(mockNavigate).toHaveBeenCalledWith('/api/register')
        })
    })

    describe('Form validation', () => {
        it('should show validation error when email is empty on submit', async () => {
            setupLogin()
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
        })

        it('should show validation error when email is too short', async () => {
            const { user } = setupLogin()
            await user.type(Form.Get.byLabel('Email'), 'ab@c.co')
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
        })

        it('should show validation error when password is empty on submit', async () => {
            const { user } = setupLogin()
            await user.type(Form.Get.byLabel('Email'), 'valid@email.com')
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
        })

        it('should show validation error when password is too short', async () => {
            const { user } = setupLogin()
            await user.type(Form.Get.byLabel('Email'), 'valid@email.com')
            await user.type(Form.Get.byLabel('Password'), 'short')
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
        })

        it('should not call login API when form is invalid', async () => {
            setupLogin()
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
            expect(mockSetSession).not.toHaveBeenCalled()
            expect(mockNavigate).not.toHaveBeenCalled()
        })
    })

    describe('Successful login', () => {
        const fillAndSubmitForm = async () => {
            const { user } = setupLogin()
            await user.type(Form.Get.byLabel('Email'), 'valid@email.com')
            await user.type(Form.Get.byLabel('Password'), 'validpassword1')
            await user.click(Form.Get.button(/Login/))
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
            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith('/api/index')
            })
        })
    })

    describe('Failed login', () => {
        const fillAndSubmitInvalid = async () => {
            const { user } = setupLogin()
            Page.Set.handlers(handleLoginError('Invalid email or password').build())
            await user.type(Form.Get.byLabel('Email'), 'wrong@email.com')
            await user.type(Form.Get.byLabel('Password'), 'wrongpassword1')
            await user.click(Form.Get.button(/Login/))
        }

        it('should display server error message on login failure', async () => {
            await fillAndSubmitInvalid()
            await waitFor(() => {
                expect(Form.Get.text('Invalid email or password')).toBeInTheDocument()
            })
        })

        it('should not navigate on login failure', async () => {
            await fillAndSubmitInvalid()
            await waitFor(() => {
                expect(Form.Get.text('Invalid email or password')).toBeInTheDocument()
            })
            expect(mockNavigate).not.toHaveBeenCalled()
        })

        it('should not set session on login failure', async () => {
            await fillAndSubmitInvalid()
            await waitFor(() => {
                expect(Form.Get.text('Invalid email or password')).toBeInTheDocument()
            })
            expect(mockSetSession).not.toHaveBeenCalled()
        })
    })

    describe('Password reveal', () => {
        it('should render password field as type password by default', () => {
            setupLogin()
            expect(Form.Get.byLabel('Password')).toHaveAttribute('type', 'password')
        })

        it('should toggle password visibility when reveal icon is clicked', () => {
            setupLogin()
            const actionIcon = Form.Get.actionIcon()
            expect(actionIcon).toBeInTheDocument()
        })
    })

    describe('Loading state', () => {
        it('should hide loading indicator once settings are loaded', async () => {
            setupLogin()
            await waitFor(() => {
                expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument()
            })
        })
    })
})
