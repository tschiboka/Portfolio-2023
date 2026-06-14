import {
    Code,
    CodeText,
    Heading,
    Inline,
    LoadingIndicator,
    Main,
    Paragraph,
    Section,
} from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './LoadingIndicators.code'

type LoadingIndicatorsProps = { path: string }

export const LoadingIndicators = ({ path }: LoadingIndicatorsProps) => (
    <Screen
        title={'Tivadar Debnar | Loading Indicators'}
        path={path}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Loading Indicator</Heading>
            <Paragraph>
                The <CodeText>LoadingIndicator</CodeText> component renders a three-dot animated
                spinner. It only mounts when <CodeText>show</CodeText> is true and renders with{' '}
                <CodeText>role=&quot;progressbar&quot;</CodeText> for accessibility.
            </Paragraph>
            <Section>
                <Heading as="h2" id="basic-usage">
                    Basic Usage
                </Heading>
                <Paragraph>
                    Toggle visibility with the <CodeText>show</CodeText> prop. When false, the
                    component returns null.
                </Paragraph>
                <Inline gap="32">
                    <LoadingIndicator show />
                </Inline>
                <Code language="tsx" content={Snippets.Basic.show} />
                <Code language="tsx" content={Snippets.Basic.conditional} />
            </Section>

            <Section>
                <Heading as="h2" id="custom-color">
                    Custom Color
                </Heading>
                <Paragraph>
                    Override the dot color with the <CodeText>color</CodeText> prop. Accepts any
                    valid CSS color value.
                </Paragraph>
                <Inline gap="32">
                    <LoadingIndicator show color="var(--accent)" />
                    <LoadingIndicator show color="#ff6b6b" />
                    <LoadingIndicator show color="white" />
                </Inline>
                <Code language="tsx" content={Snippets.Color.custom} />
            </Section>

            <Section>
                <Heading as="h2" id="accessibility">
                    Accessibility
                </Heading>
                <Paragraph>
                    The default <CodeText>ariaLabel</CodeText> is{' '}
                    <CodeText>&quot;Loading&quot;</CodeText>. Override it to describe what is
                    loading for screen readers.
                </Paragraph>
                <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
            </Section>
        </Main>
    </Screen>
)
