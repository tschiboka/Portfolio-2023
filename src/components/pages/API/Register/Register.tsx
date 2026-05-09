import { Screen } from '../../../sharedComponents/Screen/Screen'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import './Register.scss'
import { Form, LoadingIndicator } from '@common/ux'
import { registrationSchema } from './Register.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegistrationFormData } from './Register.types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRegisterApi } from './Register.query'
import { useNavigate } from 'react-router-dom'
import { ErrorResponse, PostUserResponse } from '@common/types'

type RegisterProps = {
    path: string
    pageName: string
}

const Register = ({ path, pageName }: RegisterProps) => {
    const navigate = useNavigate()
    const { registerFormRequest } = useRegisterApi()

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

    const registerRequest = useMutation<
        PostUserResponse,
        AxiosError<ErrorResponse>,
        RegistrationFormData
    >({
        mutationFn: async (data: RegistrationFormData) => {
            const res = await registerFormRequest(data)
            return res.data
        },
        onSuccess: (response) => {
            setRegistrationErrorMessage('')
            setSuccessfulRegistration(response.message)
        },
        onError: (error) => {
            setRegistrationErrorMessage(error.response?.data?.message ?? error.message)
        },
    })

    const submitHandler = (data: RegistrationFormData, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        registerRequest.mutate(data)
    }

    const isLoading = registerRequest.isPending

    return (
        <Screen
            className="Register"
            title="Tivadar Debnar | Register"
            path={path}
            recordVisit={false}
            variant="portfolio"
            pageName={pageName}
        >
            <main>
                <div>
                    <h1>Register</h1>
                    <h2>Tschiboka Personal App</h2>
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
                        <p className="submit-error-message">{registrationErrorMessage}</p>
                    )}
                    {successfulRegistration && (
                        <p className="submit-success-message">{successfulRegistration}</p>
                    )}
                    <Form.ButtonGroup>
                        <Form.Button variant="secondary" onClick={() => navigate('/api/login')}>
                            Login
                        </Form.Button>
                        <Form.Button type="submit" disabled={Boolean(successfulRegistration)}>
                            Register
                        </Form.Button>
                    </Form.ButtonGroup>
                </Form>
            </main>
        </Screen>
    )
}

export default Register
