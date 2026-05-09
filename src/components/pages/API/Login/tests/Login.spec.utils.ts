export const LoginLabels = {
    form: 'Login form',
    fields: { email: 'Email', password: 'Password' },
    buttons: {
        login: /Login/,
        register: /Register User/,
        togglePassword: /Toggle password visibility/,
    },
    errors: { invalidCredentials: 'Invalid email or password' },
} as const
