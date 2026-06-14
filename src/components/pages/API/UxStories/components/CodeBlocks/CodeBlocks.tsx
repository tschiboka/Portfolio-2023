import { Code, CodeText, Heading, Main, Paragraph, Section } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './CodeBlocks.code'

type CodeBlocksProps = { path: string }

export const CodeBlocks = ({ path }: CodeBlocksProps) => (
    <Screen
        title={'Tivadar Debnar | Code Blocks'}
        path={path}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Code</Heading>
            <Paragraph>
                The <CodeText>Code</CodeText> component renders syntax-highlighted code blocks using
                a custom dark theme. It supports multiple languages, an optional file name header,
                and a one-click copy-to-clipboard button.
            </Paragraph>
            <Section>
                <Heading as="h2" id="basic-usage">
                    Basic Usage
                </Heading>
                <Paragraph>
                    At minimum, pass <CodeText>language</CodeText> and <CodeText>content</CodeText>.
                    The component renders the snippet inside a styled container with the language
                    tag in the header.
                </Paragraph>
                <Code language="tsx" content={`const x = 42`} />
                <Code language="tsx" content={Snippets.Basic.minimal} />
            </Section>

            <Section>
                <Heading as="h2" id="file-name">
                    File Name
                </Heading>
                <Paragraph>
                    Pass <CodeText>fileName</CodeText> to display a file name in the header
                    alongside the language tag.
                </Paragraph>
                <Code
                    fileName="utils.ts"
                    language="typescript"
                    content={`export const sum = (a: number, b: number) => a + b`}
                />
                <Code language="tsx" content={Snippets.Basic.withFileName} />
            </Section>

            <Section>
                <Heading as="h2" id="languages">
                    Languages
                </Heading>
                <Paragraph>
                    Any language supported by <CodeText>react-syntax-highlighter</CodeText> works.
                    Here are a few common examples.
                </Paragraph>

                <Heading as="h3">TSX</Heading>
                <Code fileName="Counter.tsx" language="tsx" content={Snippets.tsxExample} />
                <Code language="tsx" content={Snippets.Languages.tsx} />

                <Heading as="h3">CSS</Heading>
                <Code fileName="card.css" language="css" content={Snippets.cssExample} />
                <Code language="tsx" content={Snippets.Languages.css} />

                <Heading as="h3">JSON</Heading>
                <Code fileName="package.json" language="json" content={Snippets.jsonExample} />
                <Code language="tsx" content={Snippets.Languages.json} />

                <Heading as="h3">Bash</Heading>
                <Code fileName="build.sh" language="bash" content={Snippets.bashExample} />
                <Code language="tsx" content={Snippets.Languages.bash} />
            </Section>

            <Section>
                <Heading as="h2" id="copy-to-clipboard">
                    Copy to Clipboard
                </Heading>
                <Paragraph>
                    Click the save icon in the top-right corner of any code block to copy its
                    content to the clipboard. A brief "Copied" confirmation appears in the header.
                </Paragraph>
                <Code
                    fileName="clipboard-demo.ts"
                    language="typescript"
                    content={`const greeting = 'Try copying this snippet!'`}
                />
                <Code language="tsx" content={Snippets.CopyToClipboard.demo} />
            </Section>

            <Section>
                <Heading as="h2" id="accessibility">
                    Accessibility
                </Heading>
                <Paragraph>
                    Use <CodeText>ariaLabel</CodeText> to provide a descriptive label for screen
                    readers.
                </Paragraph>
                <Code
                    ariaLabel="Example of a greeting function"
                    language="typescript"
                    content={`export const greet = (name: string) => \`Hello, \${name}!\``}
                />
                <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
            </Section>

            <Section>
                <Heading as="h2" id="custom-styling">
                    Custom Styling
                </Heading>
                <Paragraph>
                    Override the default look with <CodeText>className</CodeText> or inline{' '}
                    <CodeText>style</CodeText>.
                </Paragraph>
                <Code
                    language="tsx"
                    content={`<Code className="my-custom-code" ... />`}
                    style={{ maxWidth: 600, border: '2px solid var(--accent)' }}
                />
                <Code language="tsx" content={Snippets.CustomStyling.className} />
                <Code language="tsx" content={Snippets.CustomStyling.style} />
            </Section>
        </Main>
    </Screen>
)
