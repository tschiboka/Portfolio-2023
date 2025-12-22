import { nanoid } from 'nanoid'
import { getBaseUrl } from './'

const generateUuid = (): string => {
    return nanoid()
}

export const generateSessionPath = (): string => {
    const uuid = generateUuid()
    const base = getBaseUrl()
    const path = `/projects/word-duel-arena/session/${uuid}`
    return `${base}/#${path}`
}