import { Screen } from '../../../sharedComponents/Screen/Screen'
import { useForm } from 'react-hook-form'
import { loginSchema } from './Login.schema'
import { AxiosError } from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Form, Heading, LoadingIndicator, Main, Section, Spacer } from '@common/ux'
import { PostLoginResponse, PostLoginRequest, ErrorResponse } from '@common/types'
import { useLoginApi } from './Login.query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Session } from '../../../../context/SessionContext'
import { QueryKey } from '@common/utils'

type LoginProps = {
    path: string
    pageName: string
}

const Login = ({ path, pageName }: LoginProps) => {
    const { setSession } = Session.useContext()
    const navigate = useNavigate()
    const { loginFormRequest, settingsRequest } = useLoginApi()

    const [revealPassword, setRevealPassword] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    })

    const { data: settingsData, isLoading: settingIsLoading } = useQuery({
        queryKey: QueryKey.AppSettings.build(),
        queryFn: async () => {
            const res = await settingsRequest()
            return res.data
        },
    })

    const loginRequest = useMutation<
        PostLoginResponse,
        AxiosError<ErrorResponse>,
        PostLoginRequest
    >({
        mutationFn: async (data: PostLoginRequest) => {
            const res = await loginFormRequest(data)
            return res.data
        },
        onSuccess: (response) => {
            setLoginErrorMessage('')
            const { token, user, settings } = response
            const session = { token, user, settings: settings[0] }
            setSession(session)
            navigate('/api/index')
        },
        onError: (error) => {
            setLoginErrorMessage(error.response?.data?.message ?? error.message)
        },
    })

    const submitHandler = (data: PostLoginRequest, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        loginRequest.mutate(data)
    }

    const enableRegistration = settingsData?.data?.enableUserRegistration
    const isLoading = settingIsLoading || loginRequest.isPending

    return (
        <Screen
            className="Login"
            title="Tivadar Debnar | Login"
            path={path}
            recordVisit={false}
            variant="portfolio"
            pageName={pageName}
        >
            <Main>
                <Section>
                    <Heading as="h1" align="center">
                        Login
                    </Heading>
                    <Heading align="center">Tschiboka Personal App</Heading>
                    <Spacer size="24" />
                    <Form onSubmit={handleSubmit(submitHandler)} ariaLabel="Login form">
                        <Form.Fieldset>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={control}
                                type="text"
                                autoComplete="email"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Input
                                name="password"
                                control={control}
                                type="password"
                                addRevealPasswordIcon={true}
                                revealPassword={revealPassword}
                                setRevealPassword={setRevealPassword}
                            />
                        </Form.Fieldset>
                        <LoadingIndicator show={isLoading} />
                        <Form.SubmitErrorMessage text={loginErrorMessage} />
                        <Form.ButtonGroup>
                            {enableRegistration && (
                                <Form.Button
                                    variant="secondary"
                                    onClick={() => navigate('/api/register')}
                                >
                                    Register
                                </Form.Button>
                            )}
                            <Form.Button type="submit">Login</Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                </Section>
            </Main>
        </Screen>
    )
}

export default Login
