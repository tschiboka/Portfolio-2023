import { Button, Code, CodeText, Heading, Main, Paragraph, Section, Stack } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Buttons.code'

type ButtonsProps = { path: string }

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export const Buttons = ({ path }: ButtonsProps) => (
    <Screen
        title={'Tivadar Debnar | Buttons'}
        path={path}
        recordVisit={false}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Button</Heading>
            <Paragraph>
                The <CodeText>Button</CodeText> component renders a clickable action element. It
                supports two visual variants, two sizes, a disabled state, and can render as a{' '}
                <CodeText>{'<button>'}</CodeText>, <CodeText>{'<a>'}</CodeText>, or a custom
                component.
            </Paragraph>
            <Section>
                <Heading as="h2" id="basic-usage">
                    Basic Usage
                </Heading>
                <Paragraph>
                    Pass <CodeText>children</CodeText> to render the button label. The default
                    variant is <CodeText>primary</CodeText> and the default size is{' '}
                    <CodeText>md</CodeText>.
                </Paragraph>
                <Stack.Horizontal gap="12" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button onClick={noop}>Submit</Button>
                    <Button variant="secondary" onClick={noop}>
                        Cancel
                    </Button>
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Basic.primary} />
                <Code language="tsx" content={Snippets.Basic.secondary} />
            </Section>

            <Section>
                <Heading as="h2" id="variants">
                    Variants
                </Heading>
                <Paragraph>
                    Two variants: <CodeText>primary</CodeText> (accent background) and{' '}
                    <CodeText>secondary</CodeText> (dark background with accent border).
                </Paragraph>
                <Stack.Horizontal gap="12" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button onClick={noop}>Primary</Button>
                    <Button variant="secondary" onClick={noop}>
                        Secondary
                    </Button>
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Variants.side} />
            </Section>

            <Section>
                <Heading as="h2" id="sizes">
                    Sizes
                </Heading>
                <Paragraph>
                    Two sizes: <CodeText>md</CodeText> (default, generous padding) and{' '}
                    <CodeText>sm</CodeText> (compact, suitable for inline actions and toolbars).
                </Paragraph>
                <Stack.Horizontal gap="12" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button onClick={noop}>Standard</Button>
                    <Button size="sm" onClick={noop}>
                        Compact
                    </Button>
                </Stack.Horizontal>
                <Stack.Horizontal gap="12" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button variant="secondary" onClick={noop}>
                        Standard
                    </Button>
                    <Button variant="secondary" size="sm" onClick={noop}>
                        Compact
                    </Button>
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Sizes.both} />
            </Section>

            <Section>
                <Heading as="h2" id="disabled">
                    Disabled
                </Heading>
                <Paragraph>
                    Pass <CodeText>disabled</CodeText> to prevent interaction. Works with both
                    variants.
                </Paragraph>
                <Stack.Horizontal gap="12" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button disabled>Can{"'"}t Touch This</Button>
                    <Button variant="secondary" disabled>
                        Also Disabled
                    </Button>
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Disabled.disabled} />
            </Section>

            <Section>
                <Heading as="h2" id="as-anchor">
                    As Anchor
                </Heading>
                <Paragraph>
                    Pass <CodeText>as=&quot;a&quot;</CodeText> with an <CodeText>href</CodeText> to
                    render a link styled as a button. Supports <CodeText>download</CodeText>,{' '}
                    <CodeText>target</CodeText>, and <CodeText>rel</CodeText>.
                </Paragraph>
                <Stack.Horizontal gap="12" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button as="a" href="/projects">
                        View Projects
                    </Button>
                    <Button
                        as="a"
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </Button>
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.AsAnchor.link} />
                <Code language="tsx" content={Snippets.AsAnchor.external} />
            </Section>

            <Section>
                <Heading as="h2" id="accessibility">
                    Accessibility
                </Heading>
                <Paragraph>
                    Use <CodeText>ariaLabel</CodeText> when the visible label alone doesn
                    {"'"}t convey enough context for screen readers.
                </Paragraph>
                <Button ariaLabel="Save current document" onClick={noop}>
                    Save
                </Button>
                <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
            </Section>
        </Main>
    </Screen>
)
