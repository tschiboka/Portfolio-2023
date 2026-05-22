export const Code = {
    Basic: {
        primary: `<Button onClick={() => alert('Clicked!')}>Submit</Button>`,
        secondary: `<Button variant="secondary" onClick={handleCancel}>Cancel</Button>`,
    },
    Variants: {
        side: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>`,
    },
    Sizes: {
        md: `{/* Default (md) */}
<Button>Standard Button</Button>`,
        sm: `{/* Small */}
<Button size="sm">Small Button</Button>`,
        both: `<Button size="md">Standard</Button>
<Button size="sm">Compact</Button>`,
    },
    Disabled: {
        disabled: `<Button disabled>Can't Touch This</Button>
<Button variant="secondary" disabled>Also Disabled</Button>`,
    },
    AsAnchor: {
        link: `<Button as="a" href="/projects">View Projects</Button>`,
        download: `<Button as="a" href="/report.pdf" download>
    Download Report
</Button>`,
        external: `<Button as="a" href="https://github.com" target="_blank" rel="noopener noreferrer">
    GitHub
</Button>`,
    },
    Accessibility: {
        ariaLabel: `<Button ariaLabel="Save current document" onClick={handleSave}>
    Save
</Button>`,
    },
}
