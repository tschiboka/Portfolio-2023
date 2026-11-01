import { waitFor } from '@testing-library/react'
import { Test } from '@shared-components/Screen/tests'
import { RegisterMockHandlers } from './Register.mockHandlers'
import { AppRoutes } from '../../../app'

const labels = {
    form: 'Register form',
    fields: {
        fullName: 'Full name',
        userName: 'User name',
        email: 'Email',
        password: 'Password',
        confirm: 'Confirm',
    },
    buttons: {
        register: /Register/,
        login: /Login/,
        togglePassword: /Toggle password visibility/,
    },
    errors: { registrationFailed: 'Registration failed' },
} as const

const render = async () => {
    Test.Screen.Do.render({
        path: AppRoutes.Register,
        handlers: RegisterMockHandlers.Defaults,
    })

    await waitFor(() => expect(Test.LoadingIndicator.Has.isLoading()).toBe(false))

    return { form: Test.Form(labels.form) }
}

const fillAndSubmit = async () => {
    const { form } = await render()
    await form.Input(labels.fields.fullName).Do.type('Valid Name')
    await form.Input(labels.fields.userName).Do.type('validuser')
    await form.Input(labels.fields.email).Do.type('valid@email.com')
    await form.Input(labels.fields.password).Do.type('ValidPass1!')
    await form.Input(labels.fields.confirm).Do.type('ValidPass1!')
    await form.Do.submit()
    await waitFor(() => expect(Test.LoadingIndicator.Has.isLoading()).toBe(false))
    return form
}

const fillAndSubmitInvalid = async () => {
    const { form } = await render()
    Test.Screen.Set.handlers(RegisterMockHandlers.PostRejected)
    await form.Input(labels.fields.fullName).Do.type('Valid Name')
    await form.Input(labels.fields.userName).Do.type('validuser')
    await form.Input(labels.fields.email).Do.type('taken@email.com')
    await form.Input(labels.fields.password).Do.type('ValidPass1!')
    await form.Input(labels.fields.confirm).Do.type('ValidPass1!')
    await form.Do.submit()
    await waitFor(() => expect(Test.LoadingIndicator.Has.isLoading()).toBe(false))
    return form
}

export const RegisterTestUtils = { labels, render, fillAndSubmit, fillAndSubmitInvalid }
