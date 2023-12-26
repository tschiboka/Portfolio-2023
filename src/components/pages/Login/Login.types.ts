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
    automaticLogOffTimeInMins: number,
    enableUserTheme: string,
    enableFeature: string,
}