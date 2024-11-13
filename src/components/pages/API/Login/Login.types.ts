export type LoginFormData = {
    email: string,
    password: string
}

export type SettingsResources = {
    isAdmin: boolean,
    maxUsers: number,
    enable_maintenance_mode: boolean,
    enableUserRegistrantion: boolean,
    enableAutomaticLogoff: boolean,
    enableUserTheme: string,
    enableFeature: string,
}

export type User = {
    userName: string,
    email: string,
    password: string,
    fullName: string,
    isAdmin?: boolean,
    avatarId?: string,
    created?: Date,
    updated?: Date,
    lastLogin?: Date,
}