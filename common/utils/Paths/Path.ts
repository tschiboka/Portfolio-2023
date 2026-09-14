export const Paths = {
    Login: '/api/login',
    Register: '/api/register',
    Home: '/api/home',
    EmailVerification: '/api/email-verification',
} as const

export const apiRoutes = {
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
} as const

export const projectRoutes = {
    Xmas: 'projects/xmas_2025',
    Typist: 'projects/typist',
    WordDuelArena: 'projects/word_duel_arena',
    Gym: 'projects/gym',
} as const
