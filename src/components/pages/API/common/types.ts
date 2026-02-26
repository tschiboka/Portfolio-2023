// This file contains all the types that are sent or recieved from the API

export type CategoryResource = {
    name: string
    isParent: boolean
    parentId?: string
    status?: string
    description: string
    icon: string
    color?: string
}

export type CategoryRequestResource = CategoryResource & { _id: string }

export type XmasMessageResponseResource = {
    _id: string
    name: string
    message: string
    userId: string
    createdAt: Date
}

export type XmasCandlesResponseResource = {
    candles: {
        _id: string
        candle1: boolean
        candle2: boolean
        candle3: boolean
        candle4: boolean
        __v?: number
    }
}

// Matches server ISetting (server/models/setting.ts)
export type SettingsResource = {
    maxUsers: number
    enableMaintenanceMode: boolean
    enableUserRegistration: boolean
    enableAutomaticLogoff: boolean
    enabledFeatures: string[]
    registrationTokensExpireInMs: number
    sessionTokensExpireInMs: number
}

export type User = {
    id: string
    userName: string
    email: string
    password: string
    fullName: string
    isAdmin?: boolean
    avatarId?: string
    created?: Date
    updated?: Date
    lastLogin?: Date
}

// Server response from POST /api/login
export type LoginResponse = {
    success: boolean
    token: string
    user: User
    settings: SettingsResource[]
}

// Server response from GET /api/settings
export type SettingsGetResponse = {
    success: boolean
    data: SettingsResource
}

// Common server error response shape
export type ErrorResponse = {
    success: boolean
    message: string
}
