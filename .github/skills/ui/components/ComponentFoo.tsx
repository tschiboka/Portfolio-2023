// @ts-nocheck — skill example, outside the tsconfig include.

import { Card, Heading, Stack, Typography } from '@common-ux'
import { FeatureStyles } from '../Feature.styles'

type ComponentFooProps = {
    label: string
}

export const ComponentFoo = ({ label }: ComponentFooProps) => (
    <Card title={label}>
        <Stack direction="column" gap={8}>
            <Heading as="h2">{label}</Heading>
            <Typography as="p" size="sm" tone="muted">
                A presentational part: takes props, holds no data of its own.
            </Typography>
            <Typography as="p" style={FeatureStyles.cell}>
                Static values come from the styles object.
            </Typography>
        </Stack>
    </Card>
)
