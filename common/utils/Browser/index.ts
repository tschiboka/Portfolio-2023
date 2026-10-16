import { copyToClipboard } from './copyToClipboard'
import { isLocalhost } from './isLocalhost'
import { slugify } from './slugify'

export const Browser = {
    copyToClipboard,
    isLocalhost,
    slugify,
}

export { BrowserHooks } from './Browser.hooks'
