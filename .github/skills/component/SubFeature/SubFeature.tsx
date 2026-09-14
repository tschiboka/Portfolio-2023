// @ts-nocheck — skill example, outside the tsconfig include.

import { FeatureQueries } from '../Feature.queries'

export const SubFeature = () => (
    <component aria-label="aria-label" role="role">
        {FeatureQueries.useGet()}
    </component>
)
