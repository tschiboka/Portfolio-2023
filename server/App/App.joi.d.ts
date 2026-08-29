import type { Schema } from 'joi'

declare module 'joi' {
    interface Root {
        objectId(message?: string): Schema
    }
}

export {}
