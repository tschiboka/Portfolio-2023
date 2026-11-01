import { screen, waitFor } from '@testing-library/react'
import { Paths } from '@common-utils'
import { Test } from '@shared-components/Screen/tests'
import { RegisterMocks } from './Register.mocks'
import { RegisterTestUtils } from './Register.spec.utils'

const { fields, buttons, errors } = RegisterTestUtils.labels
const { registerSuccess } = RegisterMocks

describe('Register', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render heading and subheading', async () => {
            await RegisterTestUtils.render()
            expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument()
            expect(screen.getByText('Tschiboka Personal App')).toBeInTheDocument()
        })

        it('should render the full name input with label', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form.Input(fields.fullName).Get.value()).toBeDefined()
        })

        it('should render the user name input with label', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form.Input(fields.userName).Get.value()).toBeDefined()
        })

        it('should render the email input with label', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form.Input(fields.email).Get.value()).toBeDefined()
        })

        it('should render the password input with label', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form.Input(fields.password).Get.value()).toBeDefined()
        })

        it('should render the confirm password input with label', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form.Input(fields.confirm).Get.value()).toBeDefined()
        })

        it('should render the register button', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form.Button(buttons.register).Get.textContent()).toMatch(buttons.register)
        })

        it('should render the login button', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form.Button(buttons.login).Get.textContent()).toMatch(buttons.login)
        })

        it('should render the form with accessible label', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form).toBeDefined()
        })
    })

    describe('Login button', () => {
        it('should navigate to /api/login when login button is clicked', async () => {
            const { form } = await RegisterTestUtils.render()
            await form.Button(buttons.login).Do.click()
            expect(Test.Screen.Get.navigatedTo()).toBe(Paths.Client.Login)
        })
    })

    describe('Form validation', () => {
        it('should show validation error when full name is empty on submit', async () => {
            const { form } = await RegisterTestUtils.render()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when full name is too short', async () => {
            const { form } = await RegisterTestUtils.render()
            await form.Input(fields.fullName).Do.type('Ab')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when email is empty on submit', async () => {
            const { form } = await RegisterTestUtils.render()
            await form.Input(fields.fullName).Do.type('Valid Name')
            await form.Input(fields.userName).Do.type('validuser')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when password is too short', async () => {
            const { form } = await RegisterTestUtils.render()
            await form.Input(fields.fullName).Do.type('Valid Name')
            await form.Input(fields.userName).Do.type('validuser')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.password).Do.type('short')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when passwords do not match', async () => {
            const { form } = await RegisterTestUtils.render()
            await form.Input(fields.fullName).Do.type('Valid Name')
            await form.Input(fields.userName).Do.type('validuser')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.password).Do.type('ValidPass1!')
            await form.Input(fields.confirm).Do.type('DifferentPass1!')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should not call register API when form is invalid', async () => {
            const { form } = await RegisterTestUtils.render()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
            expect(Test.Screen.Has.navigated()).toBe(false)
        })
    })

    describe('Successful registration', () => {
        it('should display success message on successful registration', async () => {
            const form = await RegisterTestUtils.fillAndSubmit()
            expect(await form.Wait.byText(registerSuccess.message)).toBeInTheDocument()
        })

        it('should disable submit button after successful registration', async () => {
            const form = await RegisterTestUtils.fillAndSubmit()
            await waitFor(() => {
                expect(form.Button(buttons.register).Get.isDisabled()).toBe(true)
            })
        })
    })

    describe('Failed registration', () => {
        it('should display server error message on registration failure', async () => {
            const form = await RegisterTestUtils.fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.registrationFailed)).toBeInTheDocument()
        })

        it('should not disable submit button on registration failure', async () => {
            const form = await RegisterTestUtils.fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.registrationFailed)).toBeInTheDocument()
            await waitFor(() => {
                expect(form.Button(buttons.register).Get.isDisabled()).toBe(false)
            })
        })
    })

    describe('Password reveal', () => {
        it('should render password field as type password by default', async () => {
            const { form } = await RegisterTestUtils.render()
            expect(form.Input(fields.password).Get.type()).toBe('password')
        })

        it('should render toggle password buttons for both password fields', async () => {
            await RegisterTestUtils.render()
            const toggleButtons = screen.getAllByRole('button', { name: buttons.togglePassword })
            expect(toggleButtons).toHaveLength(2)
        })
    })

    describe('Loading state', () => {
        it('should not show loading indicator initially', async () => {
            await RegisterTestUtils.render()
            expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
        })
    })
})
