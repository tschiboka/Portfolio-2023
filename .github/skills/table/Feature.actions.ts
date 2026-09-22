// @ts-nocheck — skill example, outside the tsconfig include.

import type { TableAction } from '@common-ux'
import { isTruthy } from '@common-utils'
import type { FeatureRow } from './Feature.types'
type FeatureActionHandlers = {
    onAct: (row: FeatureRow) => void
}

/** Built, not declared — handlers arrive from the component. */
export const FeatureActions = {
    create: ({ onAct }: FeatureActionHandlers): TableAction<FeatureRow>[] => [
        {
            id: 'action1',
            label: 'Action 1',
            onClick: onAct,
        },
        {
            id: 'action2',
            label: 'Action 2',
            onClick: onAct,
            filter: (meta) => isTruthy(meta.row.prop1),
        },
    ],
}
