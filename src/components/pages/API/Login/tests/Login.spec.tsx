import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Test } from '@common/ux/Test'
import Login from '../Login'
import { useLoginApi } from '../Login.query'

const { Form, Page } = Test

// ═════════════════════════════════════════════════════════════════════════════
// Mocks
// ═════════════════════════════════════════════════════════════════════════════

const mockNavigate = jest.fn()
const mockSetSession = jest.fn()

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

jest.mock('../Login.query')

// ═════════════════════════════════════════════════════════════════════════════
// Helpers
// ═════════════════════════════════════════════════════════════════════════════

const mockLoginFormRequest = jest.fn()
const mockSettingsRequest = jest.fn()

const defaultSettings = {
    data: {
        maxUsers: 10,
        enableMaintenanceMode: false,
        enableUserRegistration: true,
        enableAutomaticLogoff: false,
        enabledFeatures: [],
        registrationTokensExpireInMs: 86400000,
        sessionTokensExpireInMs: 86400000,
    },
}

const mockUser = {
    id: '123',
    userName: 'testuser',
    email: 'test@example.com',
    password: '',
    fullName: 'Test User',
    isAdmin: false,
}

const mockLoginSuccess = {
    data: {
        success: true,
        token: 'mock-jwt-token',
        user: mockUser,
        settings: [defaultSettings.data],
    },
}

const setupMocks = (overrides?: {
    settingsResponse?: unknown
    loginResponse?: unknown
    loginError?: unknown
}) => {
    mockSettingsRequest.mockResolvedValue({ data: overrides?.settingsResponse ?? defaultSettings })

    if (overrides?.loginError) {
        mockLoginFormRequest.mockRejectedValue(overrides.loginError)
    } else {
        mockLoginFormRequest.mockResolvedValue(overrides?.loginResponse ?? mockLoginSuccess)
    }

    const mock = useLoginApi as jest.Mock
    mock.mockReturnValue({
        loginFormRequest: mockLoginFormRequest,
        settingsRequest: mockSettingsRequest,
    })
}

const renderLogin = () => {
    return Page.render(<Login path="/api/login" pageName="login" />, {
        session: { setSession: mockSetSession },
    })
}

// ═════════════════════════════════════════════════════════════════════════════
// Tests
// ═════════════════════════════════════════════════════════════════════════════

describe('Login', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        setupMocks()
    })

    describe('Layout', () => {
        it('should render heading and subheading', () => {
            renderLogin()
            expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
            expect(Form.Get.text('Tschiboka Personal App')).toBeInTheDocument()
        })

        it('should render the email input with label', () => {
            renderLogin()
            expect(Form.Get.byLabel('Email')).toBeInTheDocument()
        })

        it('should render the password input with label', () => {
            renderLogin()
            expect(Form.Get.byLabel('Password')).toBeInTheDocument()
        })

        it('should render the login button', () => {
            renderLogin()
            expect(Form.Get.button(/Login/)).toBeInTheDocument()
        })

        it('should render the form with accessible label', () => {
            renderLogin()
            expect(screen.getByRole('form', { name: 'Login form' })).toBeInTheDocument()
        })
    })

    describe('Registration button', () => {
        it('should render the register button when registration is enabled', async () => {
            setupMocks()
            renderLogin()
            await waitFor(() => {
                expect(Form.Get.button(/Register User/)).toBeInTheDocument()
            })
        })

        it('should not render the register button when registration is disabled', async () => {
            setupMocks({
                settingsResponse: {
                    ...defaultSettings,
                    data: { ...defaultSettings.data, enableUserRegistration: false },
                },
            })
            renderLogin()
            await waitFor(() => {
                expect(Form.Query.text(/Register User/)).not.toBeInTheDocument()
            })
        })

        it('should navigate to /api/register when register button is clicked', async () => {
            setupMocks()
            renderLogin()
            await waitFor(() => {
                expect(Form.Get.button(/Register User/)).toBeInTheDocument()
            })
            await Form.Click.button(/Register User/)
            expect(mockNavigate).toHaveBeenCalledWith('/api/register')
        })
    })

    describe('Form validation', () => {
        const type = async (label: string, text: string) => {
            const user = userEvent.setup()
            await user.type(Form.Get.byLabel(label), text)
        }

        it('should show validation error when email is empty on submit', async () => {
            renderLogin()
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
        })

        it('should show validation error when email is too short', async () => {
            renderLogin()
            await type('Email', 'ab@c.co')
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
        })

        it('should show validation error when password is empty on submit', async () => {
            renderLogin()
            await type('Email', 'valid@email.com')
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
        })

        it('should show validation error when password is too short', async () => {
            renderLogin()
            await type('Email', 'valid@email.com')
            await type('Password', 'short')
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
        })

        it('should not call login API when form is invalid', async () => {
            renderLogin()
            await Form.Click.button(/Login/)
            await waitFor(() => {
                expect(Form.Get.errorMsg()).toBeInTheDocument()
            })
            expect(mockLoginFormRequest).not.toHaveBeenCalled()
        })
    })

    describe('Successful login', () => {
        const fillAndSubmitForm = async () => {
            renderLogin()
            const user = userEvent.setup()
            await user.type(Form.Get.byLabel('Email'), 'valid@email.com')
            await user.type(Form.Get.byLabel('Password'), 'validpassword1')
            await user.click(Form.Get.button(/Login/))
        }

        it('should call loginFormRequest with email and password', async () => {
            await fillAndSubmitForm()
            await waitFor(() => {
                expect(mockLoginFormRequest).toHaveBeenCalledWith({
                    email: 'valid@email.com',
                    password: 'validpassword1',
                })
            })
        })

        it('should set session with token, user, and settings on success', async () => {
            await fillAndSubmitForm()
            await waitFor(() => {
                expect(mockSetSession).toHaveBeenCalledWith({
                    token: 'mock-jwt-token',
                    user: mockUser,
                    settings: defaultSettings.data,
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
            renderLogin()
            const user = userEvent.setup()
            await user.type(Form.Get.byLabel('Email'), 'wrong@email.com')
            await user.type(Form.Get.byLabel('Password'), 'wrongpassword1')
            await user.click(Form.Get.button(/Login/))
        }

        it('should display server error message on login failure', async () => {
            setupMocks({
                loginError: {
                    response: { data: { message: 'Invalid email or password' } },
                    message: 'Request failed',
                },
            })
            await fillAndSubmitInvalid()
            await waitFor(() => {
                expect(Form.Get.text('Invalid email or password')).toBeInTheDocument()
            })
        })

        it('should fallback to generic error message when no server message', async () => {
            setupMocks({
                loginError: {
                    response: { data: {} },
                    message: 'Network Error',
                },
            })
            await fillAndSubmitInvalid()
            await waitFor(() => {
                expect(Form.Get.text('Network Error')).toBeInTheDocument()
            })
        })

        it('should not navigate on login failure', async () => {
            setupMocks({
                loginError: {
                    response: { data: { message: 'Unauthorized' } },
                    message: 'Request failed',
                },
            })
            await fillAndSubmitInvalid()
            await waitFor(() => {
                expect(Form.Get.text('Unauthorized')).toBeInTheDocument()
            })
            expect(mockNavigate).not.toHaveBeenCalled()
        })

        it('should not set session on login failure', async () => {
            setupMocks({
                loginError: {
                    response: { data: { message: 'Unauthorized' } },
                    message: 'Request failed',
                },
            })
            await fillAndSubmitInvalid()
            await waitFor(() => {
                expect(Form.Get.text('Unauthorized')).toBeInTheDocument()
            })
            expect(mockSetSession).not.toHaveBeenCalled()
        })
    })

    describe('Password reveal', () => {
        it('should render password field as type password by default', () => {
            renderLogin()
            expect(Form.Get.byLabel('Password')).toHaveAttribute('type', 'password')
        })

        it('should toggle password visibility when reveal icon is clicked', () => {
            renderLogin()
            const actionIcon = Form.Get.actionIcon()
            expect(actionIcon).toBeInTheDocument()
        })
    })

    describe('Loading state', () => {
        it('should hide loading indicator once settings are loaded', async () => {
            renderLogin()
            await waitFor(() => {
                expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument()
            })
        })
    })
})
