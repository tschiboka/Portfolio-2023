import Page from '../../sharedComponents/Page/Page'
import { useForm } from 'react-hook-form'
import { loginSchema } from './Login.schema'
import { yupResolver } from '@hookform/resolvers/yup'

import './Login.scss'
import { WrappedInput } from '../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { LoginFormData } from './Login.types'
import { useLoginForm } from './Login.query'

const Login = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    })

    const submitHandler = (
        data: LoginFormData,
        event?: React.BaseSyntheticEvent,
    ) => {
        event?.preventDefault()
        useLoginForm(data)
    }

    return (
        <Page className="Login" title="Tivadar Debnar | Login" path="/login">
            <div>
                <h1>Login</h1>
                <h2>Tschiboka Personal App</h2>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <WrappedInput name="email" control={control} type="text" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <WrappedInput
                        name="password"
                        control={control}
                        type="password"
                    />
                </fieldset>
                <button className="submit-message" name="submit">
                    Login
                </button>
            </form>
        </Page>
    )
}

export default Login
