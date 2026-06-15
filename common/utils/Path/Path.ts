export const Paths = {
    Api: {
        Like: 'Like',
        Visit: 'Visit',
        Message: 'Message',
        Login: 'Login',
        Settings: 'Settings',
        RegisterUser: 'RegisterUser',
        ConfirmRegistration: 'ConfirmRegistration',
        RehydrateSession: 'RehydrateSession',
        Categories: 'Categories',
        Schedule: 'Schedule',
        Breakdowns: 'Breakdowns',
    },
    Projects: {
        Xmas: 'Xmas',
        Typist: 'Typist',
        WordDuelArena: 'WordDuelArena',
        Gym: 'Gym',
    },
} as const

export const apiRoutes: Record<string, string> = {
    Like: 'api/like',
    Visit: 'api/visit',
    Message: 'api/message',
    Login: 'api/login',
    Settings: 'api/settings',
    RegisterUser: 'api/user',
    ConfirmRegistration: 'api/confirm',
    RehydrateSession: 'api/session',
    Categories: 'api/categories',
    Schedule: 'api/schedule',
    Breakdowns: 'api/breakdowns',
}

export const projectRoutes: Record<string, string> = {
    Xmas: 'projects/xmas_2025',
    Typist: 'projects/typist',
    WordDuelArena: 'projects/word_duel_arena',
    Gym: 'projects/gym',
}
