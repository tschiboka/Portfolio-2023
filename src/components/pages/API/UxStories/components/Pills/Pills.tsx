import { Code, CodeText, Heading, Main, Paragraph, Pill, Section, Stack } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Pills.code'

type PillsProps = { path: string }

const colors = ['accent', 'error', 'success', 'yellow', 'orange', 'purple', 'gray'] as const

export const Pills = ({ path }: PillsProps) => (
    <Screen
        title={'Tivadar Debnar | Pills'}
        path={path}
        recordVisit={false}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Pill</Heading>
            <Paragraph>
                The <CodeText>Pill</CodeText> component renders a small inline badge with coloured
                text, border and background. It is typically used for status indicators, tags and
                legend labels.
            </Paragraph>
            <Section>
                <Heading as="h2" id="basic-usage">
                    Basic Usage
                </Heading>
                <Paragraph>
                    Pass a <CodeText>label</CodeText> to render a pill. The default colour is{' '}
                    <CodeText>accent</CodeText>.
                </Paragraph>
                <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                    <Pill label="Active" />
                    <Pill label="ERROR" color="error" />
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Basic.minimal} />
                <Code language="tsx" content={Snippets.Basic.withColor} />
            </Section>

            <Section>
                <Heading as="h2" id="colours">
                    Colours
                </Heading>
                <Paragraph>
                    Seven colour variants are available: <CodeText>accent</CodeText> (default),{' '}
                    <CodeText>error</CodeText>, <CodeText>success</CodeText>,{' '}
                    <CodeText>yellow</CodeText>, <CodeText>orange</CodeText>,{' '}
                    <CodeText>purple</CodeText> and <CodeText>gray</CodeText>.
                </Paragraph>
                <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                    {colors.map((c) => (
                        <Pill key={c} label={c.toUpperCase()} color={c} />
                    ))}
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Colors.allColors} />
            </Section>

            <Section>
                <Heading as="h2" id="variants">
                    Variants
                </Heading>
                <Paragraph>
                    Two variants are available: <CodeText>outlined</CodeText> (default) and{' '}
                    <CodeText>solid</CodeText>. The outlined variant uses a dark background with
                    coloured text and border; solid uses a fully coloured background with dark text.
                </Paragraph>
                <Heading as="h3">Outlined (default)</Heading>
                <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                    {colors.map((c) => (
                        <Pill key={c} label={c.toUpperCase()} color={c} variant="outlined" />
                    ))}
                </Stack.Horizontal>
                <Heading as="h3">Solid</Heading>
                <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                    {colors.map((c) => (
                        <Pill key={c} label={c.toUpperCase()} color={c} variant="solid" />
                    ))}
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Variants.outlined} />
                <Code language="tsx" content={Snippets.Variants.solid} />
            </Section>

            <Section>
                <Heading as="h2" id="use-cases">
                    Use Cases
                </Heading>

                <Heading as="h3">Status Badge</Heading>
                <Paragraph>Map a data value to a colour to display row-level status.</Paragraph>
                <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                    <Pill label="ACTIVE" color="success" />
                    <Pill label="PENDING" color="orange" />
                    <Pill label="INACTIVE" color="error" />
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.UseCases.statusBadge} />

                <Heading as="h3">Tags</Heading>
                <Paragraph>Render a list of labels as pills.</Paragraph>
                <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                    <Pill label="React" color="purple" />
                    <Pill label="TypeScript" color="purple" />
                    <Pill label="CSS" color="purple" />
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.UseCases.tags} />

                <Heading as="h3">Legend</Heading>
                <Paragraph>Combine pills with counts for chart or table legends.</Paragraph>
                <Stack.Horizontal gap="12" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <span>
                        <Pill label="ACTIVE" color="success" /> = 21
                    </span>
                    <span>
                        <Pill label="PENDING" color="orange" /> = 8
                    </span>
                    <span>
                        <Pill label="INACTIVE" color="error" /> = 3
                    </span>
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.UseCases.legend} />
            </Section>

            <Section>
                <Heading as="h2" id="accessibility">
                    Accessibility
                </Heading>
                <Paragraph>
                    Use <CodeText>ariaLabel</CodeText> when the visible label alone doesn{"'"}t
                    convey enough context for screen readers.
                </Paragraph>
                <Pill label="3 errors" color="error" ariaLabel="3 validation errors found" />
                <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
            </Section>

            <Section>
                <Heading as="h2" id="custom-styling">
                    Custom Styling
                </Heading>
                <Paragraph>
                    Override the default appearance with <CodeText>className</CodeText> or inline{' '}
                    <CodeText>style</CodeText>.
                </Paragraph>
                <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                    <Pill label="Default" color="accent" />
                    <Pill
                        label="Wide"
                        color="accent"
                        style={{ padding: '6px 24px', fontSize: '1rem' }}
                    />
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.CustomStyling.className} />
                <Code language="tsx" content={Snippets.CustomStyling.style} />
            </Section>
        </Main>
    </Screen>
)
