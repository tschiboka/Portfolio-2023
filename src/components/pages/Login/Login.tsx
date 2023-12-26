import Page from '../../sharedComponents/Page/Page'
import { useForm } from 'react-hook-form'
import { loginSchema } from './Login.schema'
import { AxiosResponse } from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { WrappedInput } from '../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { LoginFormData } from './Login.types'
import { useLoginForm, useSettingsResources } from './Login.query'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useAppContext } from '../../../context/AppContext'
import { useNavigate } from 'react-router-dom'

import './Login.scss'

const Login = () => {
    const { setToken } = useAppContext()
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    })

    const { data: settingsData, isLoading: settingsLoading } = useQuery<
        AxiosResponse<any, any>
    >({
        queryKey: ['settings'],
        queryFn: useSettingsResources,
    })

    const submitHandler = async (
        data: LoginFormData,
        event?: React.BaseSyntheticEvent,
    ) => {
        event?.preventDefault()
        const response: AxiosResponse = await useLoginForm(data)

        if (response) {
            const token = response?.data.token
            setToken(token)
            navigate('/')
        }
    }

    const enableRegistration = settingsData?.data?.data?.enableUserRegistration

    return (
        <Page className="Login" title="Tivadar Debnar | Login" path="/login">
            <div>
                <h1>Login</h1>
                <h2>Tschiboka Personal App</h2>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <WrappedInput
                        name="email"
                        control={control}
                        type="text"
                        autoComplete="true"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <WrappedInput
                        name="password"
                        control={control}
                        type="password"
                    />
                </fieldset>
                {settingsLoading && (
                    <AiOutlineLoading3Quarters className="loading-indicator" />
                )}
                <div className="button-box">
                    <button name="submit">Login</button>
                    {enableRegistration && <button>Register User</button>}
                </div>
            </form>
        </Page>
    )
}

export default Login
