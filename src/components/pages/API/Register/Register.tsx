import Page from '../../../sharedComponents/Page/Page'
import { useForm } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { WrappedInput } from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { useAppContext } from '../../../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Register.scss'

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
            confirm: '',
        },
    })

    const submitHandler = () => {
        console.log('Submit')
    }

    return (
        <Page
            className="Register"
            title={'Tivadar Debnar | Register'}
            path={path}
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
                    <WrappedInput name="email" control={control} type="text" />
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
                    <label htmlFor="confirm">Confirm</label>
                    <WrappedInput
                        name="confirm"
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
