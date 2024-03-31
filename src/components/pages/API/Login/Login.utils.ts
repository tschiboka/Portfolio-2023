import { assoc, dissoc } from "ramda"

export const setToken = (token: string) => {
    const storage = JSON.parse(localStorage.getItem("tschiboka") || "{}")
    const newStorage = assoc("token", token)(storage)
    localStorage.setItem("tschiboka", JSON.stringify(newStorage))
}

export const getToken = () => {
    const storage = JSON.parse(localStorage.getItem("tschiboka") || "{}")
    return storage.token
}

export const dropToken = () => {
    const storage = JSON.parse(localStorage.getItem('tschiboka') || '{}')
    const newStorage = dissoc('token')(storage)
    localStorage.setItem('tschiboka', JSON.stringify(newStorage))
}