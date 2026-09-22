import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Screen } from '@shared-components/Screen/Screen'
import { Form, Heading, LoadingIndicator, Main, Paragraph } from '@common-ux'
import { registrationSchema } from './Register.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegistrationFormData } from './Register.types'
import { ClientMessage, Paths, errorMessage } from '@common-utils'
import { RegisterQueries } from './Register.queries'
import { useNavigate } from 'react-router-dom'
import './Register.scss'

type RegisterProps = {
    path: string
    pageName: string
}

export const Register = ({ path, pageName }: RegisterProps) => {
    const navigate = useNavigate()

    const [revealPassword, setRevealPassword] = useState(false)
    const [registrationErrorMessage, setRegistrationErrorMessage] = useState('')
    const [successfulRegistration, setSuccessfulRegistration] = useState('')

    const { control, handleSubmit } = useForm({
        defaultValues: {
            fullName: '',
            userName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        resolver: yupResolver(registrationSchema),
    })

    const registerRequest = RegisterQueries.usePost({
        onSuccess: (response) => {
            setRegistrationErrorMessage('')
            setSuccessfulRegistration(response.message)
        },
        onError: (error) =>
            setRegistrationErrorMessage(
                errorMessage(error, ClientMessage.Failure.Create('account')),
            ),
    })

    const submitHandler = (data: RegistrationFormData, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        registerRequest.mutate(data)
    }

    const isLoading = registerRequest.isPending

    return (
        <Screen
            className="Register"
            title="tschiboka | Register"
            path={path}
            variant="portfolio"
            pageName={pageName}
        >
            <Main>
                <div>
                    <Heading as="h1">Register</Heading>
                    <Heading as="h2">Tschiboka Personal App</Heading>
                </div>
                <Form onSubmit={handleSubmit(submitHandler)} ariaLabel="Register form">
                    <Form.Fieldset>
                        <Form.Label for="fullName">Full name</Form.Label>
                        <Form.Input
                            name="fullName"
                            control={control}
                            type="text"
                            autoComplete="name"
                        />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="userName">User name</Form.Label>
                        <Form.Input name="userName" control={control} type="text" />
                    </Form.Fieldset>
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
                    <Form.Fieldset>
                        <Form.Label for="passwordConfirmation">Confirm</Form.Label>
                        <Form.Input
                            name="passwordConfirmation"
                            control={control}
                            type="password"
                            addRevealPasswordIcon={true}
                            revealPassword={revealPassword}
                            setRevealPassword={setRevealPassword}
                        />
                    </Form.Fieldset>
                    <LoadingIndicator show={isLoading} />
                    {registrationErrorMessage && (
                        <Paragraph className="submit-error-message">
                            {registrationErrorMessage}
                        </Paragraph>
                    )}
                    {successfulRegistration && (
                        <Paragraph className="submit-success-message">
                            {successfulRegistration}
                        </Paragraph>
                    )}
                    <Form.ButtonGroup>
                        <Form.Button
                            variant="secondary"
                            onClick={() => navigate(Paths.Client.Login)}
                        >
                            Login
                        </Form.Button>
                        <Form.Button type="submit" disabled={Boolean(successfulRegistration)}>
                            Register
                        </Form.Button>
                    </Form.ButtonGroup>
                </Form>
            </Main>
        </Screen>
    )
}
