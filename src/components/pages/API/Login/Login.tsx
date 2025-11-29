import Page from '../../../sharedComponents/Page/Page'
import { useForm } from 'react-hook-form'
import { loginSchema } from './Login.schema'
import { AxiosError, AxiosResponse } from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { WrappedInput } from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { LoginFormData } from './Login.types'
import { useLoginFormResources, useSettingsResources } from './Login.query'
import { useAppContext } from '../../../../context/AppContext/App.context'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { QUERY_KEYS } from '../../../../common/queryKeys'
import '../common/Form.scss'
import './Login.scss'
import Nav from '../../../sharedComponents/Nav/Nav'
import Menu from '../../../sharedComponents/Menu/Menu'
import SubNav from '../../../sharedComponents/SubNav/SubNav'
import { useSessionContext } from '../../../../context/SessionContext/Session.context'

type LoginProps = {
    path: string
    pageName: string
}

const Login = ({ path, pageName }: LoginProps) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext()
    const { setSession } = useSessionContext()
    const navigate = useNavigate()

    const [revealPassword, setRevealPassword] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    })

    const { data: settingsData, isLoading: settingIsLoading } = useQuery<
        AxiosResponse<any, any>
    >({
        queryKey: QUERY_KEYS.GET_APP_SETTINGS,
        queryFn: useSettingsResources,
    })

    const loginRequest = useMutation<
        AxiosResponse<any, any>,
        AxiosError,
        LoginFormData
    >({
        mutationFn: (data: LoginFormData) => useLoginFormResources(data),
        onSuccess: (response) => {
            setLoginErrorMessage('')
            const { token, user, settings } = response.data || {}
            const session = { token, user, settings }
            setSession(session)
            navigate('/api/index')
        },
        onError: (error: AxiosError<any>) => {
            setLoginErrorMessage(error.response?.data?.message || error.message)
        },
    })

    const submitHandler = async (
        data: LoginFormData,
        event?: React.BaseSyntheticEvent,
    ) => {
        event?.preventDefault()
        loginRequest.mutate(data)
    }

    const enableRegistration = settingsData?.data?.data?.enableUserRegistration
    const isLoading = settingIsLoading || loginRequest.isPending

    return (
        <Page
            className="Login"
            title="Tivadar Debnar | Login"
            path={path}
            recordVisit={false}
        >
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="home" />}
            {subMenuVisible && <SubNav />}
            <main>
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
                            autoComplete="email"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Password</label>
                        <WrappedInput
                            name="password"
                            control={control}
                            type="password"
                            addRevealPasswordIcon={true}
                            revealPassword={revealPassword}
                            setRevealPassword={setRevealPassword}
                        />
                    </fieldset>
                    <LoadingIndicator show={isLoading} />
                    {loginErrorMessage && (
                        <p className="submit-error-message">
                            {loginErrorMessage}
                        </p>
                    )}
                    <div className="button-box">
                        <button name="submit">Login</button>
                        {enableRegistration && (
                            <button onClick={() => navigate('/api/register')}>
                                Register User
                            </button>
                        )}
                    </div>
                </form>
            </main>
        </Page>
    )
}

export default Login
