/**
 * Every path in the app, in one place.
 *
 * `Api` and `Projects` are server endpoints — their values are URL fragments,
 * resolved against the host by `apiPathBuilder`. `Client` holds page routes the
 * router serves; those URLs are used as-is and make no request. The `/api`
 * prefix is shared by both because the SPA is mounted under it, which is a
 * convention of this app, not a relationship between the two.
 */
export const Paths = {
    Server: {
        Api: {
            Like: 'api/like',
            Visit: 'api/visit',
            Message: 'api/message',
            Login: 'api/user/login',
            Settings: 'api/settings',
            RegisterUser: 'api/user/register',
            ConfirmRegistration: 'api/user/confirm',
            RehydrateSession: 'api/user/session',
            Categories: 'api/categories',
            Schedule: 'api/schedule',
            Breakdowns: 'api/breakdowns',
            Activity: 'api/activity',
        },
        Projects: {
            Xmas: 'projects/xmas_2025',
            Typist: 'projects/typist',
            WordDuelArena: 'projects/word_duel_arena',
            Gym: 'projects/gym',
        },
    },
    Client: {
        Login: '/api/login',
        Register: '/api/register',
        Home: '/api/home',
        EmailVerification: '/api/email-verification',
    },
} as const
