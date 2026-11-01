import { Test } from '@shared-components/Screen/tests'
import { ContactMockHandlers } from './Contact.mockHandlers'
import { Contact } from '../Contact'

const labels = {
    form: 'Contact form',
    fields: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
    },
    buttons: {
        send: /Send Message/,
    },
    errors: { sendFailed: 'Failed to send message' },
} as const

const render = () => {
    Test.Screen.Do.render({
        path: '/contact',
        children: <Contact pageName="Contact" path="/contact" />,
        handlers: ContactMockHandlers.Defaults,
    })

    return { form: Test.Form(labels.form) }
}

const fillAndSubmit = async () => {
    const { form } = render()
    await form.Input(labels.fields.name).Do.type('John Doe')
    await form.Input(labels.fields.email).Do.type('valid@email.com')
    await form.Input(labels.fields.message).Do.type('This is a valid message text')
    await form.Do.submit()
    return form
}

const fillAndSubmitInvalid = async () => {
    const { form } = render()
    Test.Screen.Set.handlers(ContactMockHandlers.PostRejected)
    await form.Input(labels.fields.name).Do.type('John Doe')
    await form.Input(labels.fields.email).Do.type('valid@email.com')
    await form.Input(labels.fields.message).Do.type('This is a valid message text')
    await form.Do.submit()
    return form
}

export const ContactTestUtils = { labels, render, fillAndSubmit, fillAndSubmitInvalid }
