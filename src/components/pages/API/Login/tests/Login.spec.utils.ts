export const LoginLabels = {
    form: 'Login form',
    fields: { email: 'Email', password: 'Password' },
    buttons: {
        login: /Login/,
        register: /Register/,
        togglePassword: /Toggle password visibility/,
    },
    errors: { invalidCredentials: 'Invalid email or password' },
} as const
