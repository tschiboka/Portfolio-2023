export const Paths = {
    Api: {
        Login: 'Login',
        Settings: 'Settings',
        RegisterUser: 'RegisterUser',
        ConfirmRegistration: 'ConfirmRegistration',
        RehydrateSession: 'RehydrateSession',
        Categories: 'Categories',
    },
    Projects: {
        Xmas: 'Xmas',
        Typist: 'Typist',
        WordDuelArena: 'WordDuelArena',
    },
} as const

export const apiRoutes: Record<string, string> = {
    Login: 'login',
    Settings: 'settings',
    RegisterUser: 'user',
    ConfirmRegistration: 'confirm',
    RehydrateSession: 'session',
    Categories: 'categories',
}

export const projectRoutes: Record<string, string> = {
    Xmas: 'projects/xmas_2025',
    Typist: 'projects/typist',
    WordDuelArena: 'projects/word_duel_arena',
}
