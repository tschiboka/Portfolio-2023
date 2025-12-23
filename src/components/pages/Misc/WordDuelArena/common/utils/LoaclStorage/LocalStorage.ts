import { nanoid } from "nanoid"
import { LocalStorageState } from "./LocalStorage.types"

export class LocalStorage {
    static readonly LOCAL_STORAGE_APP_KEY = 'word-duel-arena'

    static getLocalStorage = (): LocalStorageState => {
        const key = LocalStorage.LOCAL_STORAGE_APP_KEY
        const storage: LocalStorageState = JSON.parse(localStorage.getItem(key) || '{}')
        if (storage.deviceId) return {deviceId: storage.deviceId}
        
        const deviceId = nanoid()
        localStorage.setItem(key, JSON.stringify({ deviceId }))
        return {deviceId}
    }
}