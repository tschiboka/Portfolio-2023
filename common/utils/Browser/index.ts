import { copyToClipboard } from './copyToClipboard'
import { isLocalhost } from './isLocalhost'
import { slugify } from './slugify'

export { BrowserHooks } from './Browser.hooks'

export const Browser = {
    copyToClipboard,
    isLocalhost,
    slugify,
}

export type { Orientation, VisibilityEntry } from './Browser.types'
