import { Test } from '@shared-components/Screen/tests'
import { LoginMocks } from './Login.mocks'
import { LoginMockHandlers } from './Login.mockHandlers'
import { AppRoutes } from '../../../app'

const labels = {
    form: 'Login form',
    fields: { email: 'Email', password: 'Password' },
    buttons: {
        login: /Login/,
        register: /Register/,
        togglePassword: /Toggle password visibility/,
    },
    errors: { invalidCredentials: 'Invalid email or password' },
} as const

const render = () => {
    Test.Screen.Do.render({
        path: AppRoutes.Login,
        session: { setSession: LoginMocks.setSession },
        handlers: LoginMockHandlers.Defaults,
    })

    return { form: Test.Form(labels.form) }
}

const fillAndSubmit = async () => {
    const { form } = render()
    await form.Input(labels.fields.email).Do.type('valid@email.com')
    await form.Input(labels.fields.password).Do.type('validpassword1')
    await form.Do.submit()
}

const fillAndSubmitInvalid = async () => {
    const { form } = render()
    Test.Screen.Set.handlers(LoginMockHandlers.Login.PostRejected)
    await form.Input(labels.fields.email).Do.type('wrong@email.com')
    await form.Input(labels.fields.password).Do.type('wrongpassword1')
    await form.Do.submit()
    return form
}

export const LoginTestUtils = { labels, render, fillAndSubmit, fillAndSubmitInvalid }
