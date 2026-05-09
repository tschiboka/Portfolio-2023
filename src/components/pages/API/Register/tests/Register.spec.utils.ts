export const RegisterLabels = {
    form: 'Register form',
    fields: {
        fullName: 'Full name',
        userName: 'User name',
        email: 'Email',
        password: 'Password',
        confirm: 'Confirm',
    },
    buttons: {
        register: /Register/,
        login: /Login/,
        togglePassword: /Toggle password visibility/,
    },
    errors: { registrationFailed: 'Registration failed' },
} as const
