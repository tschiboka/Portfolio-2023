// @ts-nocheck — skill example, outside the tsconfig include.

import type { CSSProperties } from 'react'
import { Const } from '@common-ux'

const cell: CSSProperties = {
    padding: `${Const.Spacing[8]}px 0`,
    color: Const.Color.White[4],
    borderBottom: `1px solid ${Const.Color.Black[3]}`,
}

/** Static values, keyed like the markup. */
export const FeatureStyles = {
    shell: {
        background: Const.Color.Black[1],
        padding: `${Const.Spacing[24]}px ${Const.Spacing[12]}px`,
        color: Const.Color.White[1],
        maxWidth: '600px',
    },
    header: {
        cell,
        title: {
            fontFamily: 'Roboto, Arial, sans-serif',
            fontWeight: 300,
        },
    },
}
