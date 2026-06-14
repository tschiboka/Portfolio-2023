import { Code, CodeText, Heading, Inline, Link, Main, Paragraph, Section, Stack } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Links.code'

type LinksProps = { path: string }

export const Links = ({ path }: LinksProps) => (
    <Screen
        title={'Tivadar Debnar | Links'}
        path={path}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Link</Heading>
            <Paragraph>
                The <CodeText>Link</CodeText> component provides a polymorphic link that renders as
                a React Router <CodeText>{'<Link>'}</CodeText> for internal routes or a native{' '}
                <CodeText>{'<a>'}</CodeText> tag for external URLs. External links automatically
                open in a new tab with <CodeText>rel=&quot;noopener noreferrer&quot;</CodeText>.
            </Paragraph>
            <Section>
                <Heading as="h2" id="basic-usage">
                    Basic Usage
                </Heading>
                <Paragraph>
                    Use <CodeText>to</CodeText> for internal routes and <CodeText>href</CodeText>{' '}
                    for external URLs.
                </Paragraph>
                <Stack.Vertical gap="8">
                    <Inline gap="16">
                        <Link to="#">Internal route link</Link>
                        <Link href="https://github.com">External anchor link</Link>
                    </Inline>
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Basic.asRoute} />
                <Code language="tsx" content={Snippets.Basic.asAnchor} />
            </Section>

            <Section>
                <Heading as="h2" id="internal-vs-external">
                    Internal vs External
                </Heading>
                <Paragraph>
                    Links with <CodeText>to</CodeText> use React Router for client-side navigation.
                    Links with <CodeText>href</CodeText> render a standard anchor and automatically
                    set <CodeText>target=&quot;_blank&quot;</CodeText> and{' '}
                    <CodeText>rel=&quot;noopener noreferrer&quot;</CodeText>.
                </Paragraph>
                <Code language="tsx" content={Snippets.Behaviour.external} />
                <Code language="tsx" content={Snippets.Behaviour.internal} />
            </Section>

            <Section>
                <Heading as="h2" id="download">
                    Download
                </Heading>
                <Paragraph>
                    Pass <CodeText>download</CodeText> on anchor links to trigger a file download. A
                    string value overrides the filename.
                </Paragraph>
                <Code language="tsx" content={Snippets.Download.file} />
            </Section>

            <Section>
                <Heading as="h2" id="accessibility">
                    Accessibility
                </Heading>
                <Paragraph>
                    Use <CodeText>ariaLabel</CodeText> when the link text alone doesn{"'"}t describe
                    the destination.
                </Paragraph>
                <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
            </Section>
        </Main>
    </Screen>
)
