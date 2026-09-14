// @ts-nocheck — skill example, outside the tsconfig include.

import { FeatureStyles } from '../Feature.styles'

import './Feature.styles.scss'

type ComponentFooProps = {
    prop1: string
}

export const ComponentFoo = ({ prop1 }: ComponentFooProps) => (
    <component
        className="feature-shell"
        style={FeatureStyles.shell}
        aria-label="aria-label"
        role="role"
    >
        <component style={FeatureStyles.header.title}>{prop1}</component>
    </component>
)
