import Page from '../../../sharedComponents/Page/Page'
import { useForm } from 'react-hook-form'
import { WrappedInput } from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { useState } from 'react'
import './Register.scss'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { registrationSchema } from './Register.schema'
import { yupResolver } from '@hookform/resolvers/yup'

interface IndexProps {
    path: string
}

const Register = ({ path }: IndexProps) => {
    const [revealPassword, setRevealPassword] = useState(false)

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

    const submitHandler = () => {
        console.log('Submit')
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
                {/* <LoadingIndicator show={isLoading} /> */}
                <div className="button-box">
                    <button name="submit">Register User</button>
                </div>
            </form>
        </Page>
    )
}

export default Register
