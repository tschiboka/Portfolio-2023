import type { Dictionary } from '../Generics'

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
        Activity: 'Activity',
    },
    Projects: {
        Xmas: 'Xmas',
        Typist: 'Typist',
        WordDuelArena: 'WordDuelArena',
        Gym: 'Gym',
    },
} as const

export const apiRoutes: Dictionary<string> = {
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
}

export const projectRoutes: Record<string, string> = {
    Xmas: 'projects/xmas_2025',
    Typist: 'projects/typist',
    WordDuelArena: 'projects/word_duel_arena',
    Gym: 'projects/gym',
}
