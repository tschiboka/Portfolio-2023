import { Screen } from '@shared-components/Screen/Screen'
import { useForm } from 'react-hook-form'
import { loginSchema } from './Login.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Heading, LoadingIndicator, Main, Section, Spacer } from '@common-ux'
import { ClientMessage, Paths, errorMessage } from '@common-utils'
import { LoginQueries } from './Login.queries'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Session } from '@shared-context'
import type { PostLoginRequest } from '@common-types'

type LoginProps = {
    path: string
    pageName: string
}

export const Login = ({ path, pageName }: LoginProps) => {
    const { setSession } = Session.useContext()
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

    const { data: settingsData, isLoading: settingIsLoading } = LoginQueries.Settings.useGet()

    const loginRequest = LoginQueries.usePost({
        onSuccess: (response) => {
            setLoginErrorMessage('')
            const { token, user, settings } = response
            setSession({ token, user, settings: settings[0] })
            navigate(Paths.Client.Home)
        },
        onError: (error) =>
            setLoginErrorMessage(errorMessage(error, ClientMessage.Failure.Login())),
    })

    const submitHandler = (data: PostLoginRequest, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        loginRequest.mutate(data)
    }

    const enableRegistration = settingsData?.settings?.enableUserRegistration
    const isLoading = settingIsLoading || loginRequest.isPending

    return (
        <Screen
            className="Login"
            title="tschiboka | Login"
            path={path}
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
