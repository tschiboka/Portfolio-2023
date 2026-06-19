import { copyToClipboard } from './copyToClipboard'
import { isLocalhost } from './isLocalhost'
import { slugify } from './slugify'
import { useFullScreen } from './useFullScreen'
import { useIsVisible } from './useIsVisible'
import { useOrientation } from './useOrientation'

export { useFullScreen, useOrientation }
export const Browser = {
    copyToClipboard,
    isLocalhost,
    slugify,
    useFullScreen,
    useIsVisible,
    useOrientation,
}
