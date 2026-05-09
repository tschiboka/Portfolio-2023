import { screen, waitFor } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { ApiRoutes } from '../../../../../routing/ApiRoutes'
import { mockRegisterSuccess } from './Register.mocks'
import { defaultHandlers, handlePostRegisterError } from './Register.mockHandles'
import { RegisterLabels } from './Register.spec.utils'

const { form: FORM, fields, buttons, errors } = RegisterLabels

const setupRegister = () => {
    Test.Page.Do.render({
        path: ApiRoutes.Register,
        handlers: defaultHandlers,
    })

    return { form: Test.Form(FORM) }
}

describe('Register', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render heading and subheading', () => {
            setupRegister()
            expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument()
            expect(screen.getByText('Tschiboka Personal App')).toBeInTheDocument()
        })

        it('should render the full name input with label', () => {
            const { form } = setupRegister()
            expect(form.Input(fields.fullName).Get.value()).toBeDefined()
        })

        it('should render the user name input with label', () => {
            const { form } = setupRegister()
            expect(form.Input(fields.userName).Get.value()).toBeDefined()
        })

        it('should render the email input with label', () => {
            const { form } = setupRegister()
            expect(form.Input(fields.email).Get.value()).toBeDefined()
        })

        it('should render the password input with label', () => {
            const { form } = setupRegister()
            expect(form.Input(fields.password).Get.value()).toBeDefined()
        })

        it('should render the confirm password input with label', () => {
            const { form } = setupRegister()
            expect(form.Input(fields.confirm).Get.value()).toBeDefined()
        })

        it('should render the register button', () => {
            const { form } = setupRegister()
            expect(form.Button(buttons.register).Get.textContent()).toMatch(buttons.register)
        })

        it('should render the login button', () => {
            const { form } = setupRegister()
            expect(form.Button(buttons.login).Get.textContent()).toMatch(buttons.login)
        })

        it('should render the form with accessible label', () => {
            const { form } = setupRegister()
            expect(form).toBeDefined()
        })
    })

    describe('Login button', () => {
        it('should navigate to /api/login when login button is clicked', async () => {
            const { form } = setupRegister()
            await form.Button(buttons.login).Do.click()
            expect(Test.Page.Get.navigatedTo()).toBe('/api/login')
        })
    })

    describe('Form validation', () => {
        it('should show validation error when full name is empty on submit', async () => {
            const { form } = setupRegister()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when full name is too short', async () => {
            const { form } = setupRegister()
            await form.Input(fields.fullName).Do.type('Ab')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when email is empty on submit', async () => {
            const { form } = setupRegister()
            await form.Input(fields.fullName).Do.type('Valid Name')
            await form.Input(fields.userName).Do.type('validuser')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when password is too short', async () => {
            const { form } = setupRegister()
            await form.Input(fields.fullName).Do.type('Valid Name')
            await form.Input(fields.userName).Do.type('validuser')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.password).Do.type('short')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when passwords do not match', async () => {
            const { form } = setupRegister()
            await form.Input(fields.fullName).Do.type('Valid Name')
            await form.Input(fields.userName).Do.type('validuser')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.password).Do.type('ValidPass1!')
            await form.Input(fields.confirm).Do.type('DifferentPass1!')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should not call register API when form is invalid', async () => {
            const { form } = setupRegister()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
            expect(Test.Page.Has.navigated()).toBe(false)
        })
    })

    describe('Successful registration', () => {
        const fillAndSubmitForm = async () => {
            const { form } = setupRegister()
            await form.Input(fields.fullName).Do.type('Valid Name')
            await form.Input(fields.userName).Do.type('validuser')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.password).Do.type('ValidPass1!')
            await form.Input(fields.confirm).Do.type('ValidPass1!')
            await form.Do.submit()
            return form
        }

        it('should display success message on successful registration', async () => {
            const form = await fillAndSubmitForm()
            expect(await form.Wait.byText(mockRegisterSuccess.message)).toBeInTheDocument()
        })

        it('should disable submit button after successful registration', async () => {
            const form = await fillAndSubmitForm()
            await waitFor(() => {
                expect(form.Button(buttons.register).Get.isDisabled()).toBe(true)
            })
        })
    })

    describe('Failed registration', () => {
        const fillAndSubmitInvalid = async () => {
            const { form } = setupRegister()
            Test.Page.Set.handlers(handlePostRegisterError(errors.registrationFailed))
            await form.Input(fields.fullName).Do.type('Valid Name')
            await form.Input(fields.userName).Do.type('validuser')
            await form.Input(fields.email).Do.type('taken@email.com')
            await form.Input(fields.password).Do.type('ValidPass1!')
            await form.Input(fields.confirm).Do.type('ValidPass1!')
            await form.Do.submit()
            return form
        }

        it('should display server error message on registration failure', async () => {
            const form = await fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.registrationFailed)).toBeInTheDocument()
        })

        it('should not disable submit button on registration failure', async () => {
            const form = await fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.registrationFailed)).toBeInTheDocument()
            expect(form.Button(buttons.register).Get.isDisabled()).toBe(false)
        })
    })

    describe('Password reveal', () => {
        it('should render password field as type password by default', () => {
            const { form } = setupRegister()
            expect(form.Input(fields.password).Get.type()).toBe('password')
        })

        it('should render toggle password buttons for both password fields', () => {
            setupRegister()
            const toggleButtons = screen.getAllByRole('button', { name: buttons.togglePassword })
            expect(toggleButtons).toHaveLength(2)
        })
    })

    describe('Loading state', () => {
        it('should not show loading indicator initially', () => {
            setupRegister()
            expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
        })
    })
})
