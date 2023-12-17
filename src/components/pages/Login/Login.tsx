import { useForm } from 'react-hook-form'

// Components
import Page from '../../sharedComponents/Page/Page'

// Styles
import './Login.scss'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitHandler = () => {
        console.log('HERE')
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
                    <input {...register('email')} />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input type="password" {...register('password')} />
                </fieldset>
                <button className="submit-message" name="submit">
                    Login
                </button>
            </form>
        </Page>
    )
}

export default Login
