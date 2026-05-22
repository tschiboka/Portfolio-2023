export const Code = {
    Basic: {
        minimal: `<Code language="tsx" content={\`const x = 42\`} />`,
        withFileName: `<Code
    fileName="utils.ts"
    language="typescript"
    content={\`export const sum = (a: number, b: number) => a + b\`}
/>`,
    },
    Languages: {
        tsx: `<Code language="tsx" content={tsxSnippet} />`,
        css: `<Code language="css" content={cssSnippet} />`,
        json: `<Code language="json" content={jsonSnippet} />`,
        bash: `<Code language="bash" content={bashSnippet} />`,
    },
    CopyToClipboard: {
        demo: `// Click the save icon in the header to copy the snippet.
// A "Copied" message appears briefly to confirm the action.
<Code language="tsx" content={snippet} />`,
    },
    Accessibility: {
        ariaLabel: `<Code
    ariaLabel="Example of a greeting function"
    language="typescript"
    content={\`export const greet = (name: string) => \\\`Hello, \\\${name}!\\\`\`}
/>`,
    },
    CustomStyling: {
        className: `<Code
    className="my-custom-code"
    language="tsx"
    content={snippet}
/>`,
        style: `<Code
    language="tsx"
    content={snippet}
    style={{ maxWidth: 600, border: '2px solid var(--accent)' }}
/>`,
    },
    tsxExample: `import { useState } from 'react'
    
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
    }`,
    cssExample: `.card {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);
        padding: var(--space-16);
        border-radius: 8px;
        background: var(--bg);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }`,
    jsonExample: `{
        "name": "@common/ux",
        "version": "1.0.0",
        "main": "index.ts",
        "dependencies": {
            "react": "^18.2.0",
            "react-syntax-highlighter": "^15.5.0"
        }
    }`,
    bashExample: `#!/bin/bash
    echo "Building project..."
    npm run build
    echo "Running tests..."
    npm test -- --coverage`,
}
