// @ts-nocheck — skill example, outside the tsconfig include.

// Every endpoint in the app, grouped by the server that serves it. Values are
// fragments only — no scheme, no host, no leading slash. The host is joined on
// by `apiPathBuilder`.
export const Paths = {
    Server: {
        Api: {
            Login: 'api/user/login',
            RegisterUser: 'api/user/register',
            Message: 'api/message',
            Categories: 'api/categories',
        },
        Projects: {
            Xmas: 'projects/xmas_2025',
            Gym: 'projects/gym',
        },
    },
    Client: {
        Login: '/api/login',
        Home: '/api/home',
    },
} as const
