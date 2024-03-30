import Page from '../../../sharedComponents/Page/Page'
import { useForm } from 'react-hook-form'
import { WrappedInput } from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { useState } from 'react'
import './Register.scss'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { registrationSchema } from './Register.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegistrationFormData } from './Register.types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useRegisterUserRequest } from './Register.query'

interface IndexProps {
    path: string
}

const Register = ({ path }: IndexProps) => {
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

    const { mutate: registerUser, isPending } = useMutation<
        AxiosResponse<{ message: string }>,
        AxiosError,
        RegistrationFormData
    >({
        mutationFn: (data: RegistrationFormData) =>
            useRegisterUserRequest(data),
        onSuccess: (res) => {
            setRegistrationErrorMessage('')
            setSuccessfulRegistration(res.data.message)
        },
        onError: (error: AxiosError<any>) => {
            console.log(error.message)
            setRegistrationErrorMessage(
                error.response?.data?.message || error.message,
            )
        },
    })

    const submitHandler = async (
        data: RegistrationFormData,
        event?: React.BaseSyntheticEvent,
    ) => {
        event?.preventDefault()
        registerUser(data)
    }

    return (
        <Page
            className="Register"
            title={'Tivadar Debnar | Register'}
            path={path}
            recordVisit={false}
        >
            <div>
                <h1>Register</h1>
                <h2>Tschiboka Personal App</h2>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <fieldset>
                    <label htmlFor="fullName">Full name</label>
                    <WrappedInput
                        name="fullName"
                        control={control}
                        type="text"
                        autoComplete="name"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="userName">User name</label>
                    <WrappedInput
                        name="userName"
                        control={control}
                        type="text"
                    />
                </fieldset>
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
                <fieldset>
                    <label htmlFor="passwordConfirmation">Confirm</label>
                    <WrappedInput
                        name="passwordConfirmation"
                        control={control}
                        type="password"
                        addRevealPasswordIcon={true}
                        revealPassword={revealPassword}
                        setRevealPassword={setRevealPassword}
                    />
                </fieldset>
                <LoadingIndicator show={isPending} />
                {registrationErrorMessage && (
                    <p className="form-message submit-error-message">
                        {registrationErrorMessage}
                    </p>
                )}
                {successfulRegistration && (
                    <p className="form-message submit-success-message">
                        {successfulRegistration}
                    </p>
                )}
                <div className="button-box">
                    <button
                        disabled={Boolean(successfulRegistration)}
                        name="submit"
                    >
                        Register User
                    </button>
                </div>
            </form>
        </Page>
    )
}

export default Register
