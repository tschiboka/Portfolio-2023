import { Code } from '@common/ux'
import Page from '../../../../../sharedComponents/Page/Page'
import { Code as Snippets } from './CodeBlocks.code'

type CodeBlocksProps = { path: string }

const tsxExample = `import { useState } from 'react'

interface Props {
    initialCount?: number
}

export const Counter = ({ initialCount = 0 }: Props) => {
    const [count, setCount] = useState(initialCount)
    return (
        <button onClick={() => setCount((c) => c + 1)}>
            Count: {count}
        </button>
    )
}`

const cssExample = `.card {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
    padding: var(--space-16);
    border-radius: 8px;
    background: var(--bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}`

const jsonExample = `{
    "name": "@common/ux",
    "version": "1.0.0",
    "main": "index.ts",
    "dependencies": {
        "react": "^18.2.0",
        "react-syntax-highlighter": "^15.5.0"
    }
}`

const bashExample = `#!/bin/bash
echo "Building project..."
npm run build
echo "Running tests..."
npm test -- --coverage`

export const CodeBlocks = ({ path }: CodeBlocksProps) => {
    return (
        <Page title={'Tivadar Debnar | Code Blocks'} path={path} recordVisit={false} loginRequired>
            <main>
                <h1>Code</h1>
                <p>
                    The <code>Code</code> component renders syntax-highlighted code blocks using a
                    custom dark theme. It supports multiple languages, an optional file name header,
                    and a one-click copy-to-clipboard button.
                </p>

                <section>
                    <h2>Basic Usage</h2>
                    <p>
                        At minimum, pass <code>language</code> and <code>content</code>. The
                        component renders the snippet inside a styled container with the language
                        tag in the header.
                    </p>
                    <Code language="tsx" content={`const x = 42`} />
                    <Code language="tsx" content={Snippets.Basic.minimal} />
                </section>

                <section>
                    <h2>File Name</h2>
                    <p>
                        Pass <code>fileName</code> to display a file name in the header alongside
                        the language tag.
                    </p>
                    <Code
                        fileName="utils.ts"
                        language="typescript"
                        content={`export const sum = (a: number, b: number) => a + b`}
                    />
                    <Code language="tsx" content={Snippets.Basic.withFileName} />
                </section>

                <section>
                    <h2>Languages</h2>
                    <p>
                        Any language supported by <code>react-syntax-highlighter</code> works. Here
                        are a few common examples.
                    </p>

                    <h3>TSX</h3>
                    <Code fileName="Counter.tsx" language="tsx" content={tsxExample} />
                    <Code language="tsx" content={Snippets.Languages.tsx} />

                    <h3>CSS</h3>
                    <Code fileName="card.css" language="css" content={cssExample} />
                    <Code language="tsx" content={Snippets.Languages.css} />

                    <h3>JSON</h3>
                    <Code fileName="package.json" language="json" content={jsonExample} />
                    <Code language="tsx" content={Snippets.Languages.json} />

                    <h3>Bash</h3>
                    <Code fileName="build.sh" language="bash" content={bashExample} />
                    <Code language="tsx" content={Snippets.Languages.bash} />
                </section>

                <section>
                    <h2>Copy to Clipboard</h2>
                    <p>
                        Click the save icon in the top-right corner of any code block to copy its
                        content to the clipboard. A brief "Copied" confirmation appears in the
                        header.
                    </p>
                    <Code
                        fileName="clipboard-demo.ts"
                        language="typescript"
                        content={`const greeting = 'Try copying this snippet!'`}
                    />
                    <Code language="tsx" content={Snippets.CopyToClipboard.demo} />
                </section>

                <section>
                    <h2>Accessibility</h2>
                    <p>
                        Use <code>ariaLabel</code> to provide a descriptive label for screen
                        readers.
                    </p>
                    <Code
                        ariaLabel="Example of a greeting function"
                        language="typescript"
                        content={`export const greet = (name: string) => \`Hello, \${name}!\``}
                    />
                    <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
                </section>

                <section>
                    <h2>Custom Styling</h2>
                    <p>
                        Override the default look with <code>className</code> or inline{' '}
                        <code>style</code>.
                    </p>
                    <Code
                        language="tsx"
                        content={`<Code className="my-custom-code" ... />`}
                        style={{ maxWidth: 600, border: '2px solid var(--accent)' }}
                    />
                    <Code language="tsx" content={Snippets.CustomStyling.className} />
                    <Code language="tsx" content={Snippets.CustomStyling.style} />
                </section>
            </main>
        </Page>
    )
}
