// @ts-nocheck — skill example, outside the tsconfig include.

import { ComponentFoo } from './components/ComponentFoo'
import { SubFeature } from './SubFeature/SubFeature'
import type { FeatureResponse } from '@common-types'

type FeatureProps = {
    prop1: FeatureResponse[]
    prop2?: (prop1: string) => void
}

export const Feature = ({ prop1, prop2 }: FeatureProps) => (
    <component aria-label="aria-label" role="role">
        <SubFeature />
        {prop1.map((prop3) => (
            <ComponentFoo key={prop3.id} prop1={prop3.id} />
        ))}
    </component>
)
