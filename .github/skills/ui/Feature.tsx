// @ts-nocheck — skill example, outside the tsconfig include.

import { Screen } from '@shared-components/Screen/Screen'
import { Heading, Main, Paragraph, Section, Stack } from '@common-ux'
import { ComponentFoo } from './components/ComponentFoo'
import { FeatureStyles } from './Feature.styles'

type FeatureProps = {
    title: string
    body: string
}

export const Feature = ({ title, body }: FeatureProps) => (
    <Screen title={title} path="/feature" pageName="Feature" variant="portfolio">
        <Main style={FeatureStyles.shell}>
            <Section ariaLabel="Feature">
                <Heading as="h1" align="center">
                    {title}
                </Heading>
                <Stack direction="column" gap={8}>
                    <Paragraph>{body}</Paragraph>
                    <ComponentFoo prop1="A presentational part" />
                </Stack>
            </Section>
        </Main>
    </Screen>
)
