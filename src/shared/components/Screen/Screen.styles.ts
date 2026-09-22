import type { CSSProperties } from 'react'
import { Const } from '@common-ux'

/** `Screen` shell. The custom property carries values CSS cannot read from `Const`. */
export const ScreenStyles = {
    shell: {
        '--z-sticky': Const.ZIndex.sticky,
    } as CSSProperties,
}
