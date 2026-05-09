import { screen, waitFor } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import Contact from '../Contact'
import { defaultHandlers, handlePostMessageError } from './Contact.mockHandles'
import { ContactLabels } from './Contact.spec.utils'

const { form: FORM, fields, buttons, errors } = ContactLabels

const setupContact = () => {
    Test.Page.Do.render({
        path: '/contact',
        children: <Contact pageName="Contact" path="/contact" />,
        handlers: defaultHandlers,
    })

    return { form: Test.Form(FORM) }
}

describe('Contact', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render heading', () => {
            setupContact()
            expect(screen.getByRole('heading', { name: 'Get in Touch!' })).toBeInTheDocument()
        })

        it('should render the name input with label', () => {
            const { form } = setupContact()
            expect(form.Input(fields.name).Get.value()).toBeDefined()
        })

        it('should render the email input with label', () => {
            const { form } = setupContact()
            expect(form.Input(fields.email).Get.value()).toBeDefined()
        })

        it('should render the phone input with label', () => {
            const { form } = setupContact()
            expect(form.Input(fields.phone).Get.value()).toBeDefined()
        })

        it('should render the message textarea with label', () => {
            setupContact()
            expect(screen.getByLabelText(fields.message)).toBeInTheDocument()
        })

        it('should render the send button', () => {
            const { form } = setupContact()
            expect(form.Button(buttons.send).Get.textContent()).toMatch(buttons.send)
        })

        it('should render the form with accessible label', () => {
            const { form } = setupContact()
            expect(form).toBeDefined()
        })
    })

    describe('Form validation', () => {
        it('should show validation errors when form is empty on submit', async () => {
            const { form } = setupContact()
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error for invalid name characters', async () => {
            const { form } = setupContact()
            await form.Input(fields.name).Do.type('John@Doe')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.message).Do.type('This is a valid message text')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when email is invalid', async () => {
            const { form } = setupContact()
            await form.Input(fields.name).Do.type('John Doe')
            await form.Input(fields.email).Do.type('invalid')
            await form.Input(fields.message).Do.type('This is a valid message text')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should show validation error when message is too short', async () => {
            const { form } = setupContact()
            await form.Input(fields.name).Do.type('John Doe')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.message).Do.type('Short')
            await form.Do.submit()
            expect(await form.Wait.errorMsgs()).toBeDefined()
        })

        it('should allow empty phone field', async () => {
            const { form } = setupContact()
            await form.Input(fields.name).Do.type('John Doe')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.message).Do.type('This is a valid message text')
            await form.Do.submit()
            await waitFor(() => expect(form.Get.errorMsg()).toBeNull())
        })
    })

    describe('Successful submission', () => {
        const fillAndSubmitForm = async () => {
            const { form } = setupContact()
            await form.Input(fields.name).Do.type('John Doe')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.message).Do.type('This is a valid message text')
            await form.Do.submit()
            return form
        }

        it('should disable submit button after successful submission', async () => {
            const form = await fillAndSubmitForm()
            await waitFor(() => {
                expect(form.Button(buttons.send).Get.isDisabled()).toBe(true)
            })
        })
    })

    describe('Failed submission', () => {
        const fillAndSubmitInvalid = async () => {
            const { form } = setupContact()
            Test.Page.Set.handlers(handlePostMessageError(errors.sendFailed))
            await form.Input(fields.name).Do.type('John Doe')
            await form.Input(fields.email).Do.type('valid@email.com')
            await form.Input(fields.message).Do.type('This is a valid message text')
            await form.Do.submit()
            return form
        }

        it('should display server error message on submission failure', async () => {
            const form = await fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.sendFailed)).toBeInTheDocument()
        })

        it('should not disable submit button on failure', async () => {
            const form = await fillAndSubmitInvalid()
            expect(await form.Wait.byText(errors.sendFailed)).toBeInTheDocument()
            expect(form.Button(buttons.send).Get.isDisabled()).toBe(false)
        })
    })

    describe('Loading state', () => {
        it('should not show loading indicator initially', () => {
            setupContact()
            expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
        })
    })
})
