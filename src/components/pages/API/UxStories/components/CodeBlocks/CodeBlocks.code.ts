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
}
