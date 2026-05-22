export const Code = {
    Basic: {
        asRoute: `<Link to="/blog">Go to Blog</Link>`,
        asAnchor: `<Link href="https://github.com">GitHub</Link>`,
    },
    Behaviour: {
        external: `{/* External links auto-open in a new tab */}
<Link href="https://example.com">Opens in new tab</Link>
{/* Renders: <a href="..." target="_blank" rel="noopener noreferrer"> */}`,
        internal: `{/* Internal links use React Router */}
<Link to="/about">About page</Link>
{/* Renders: <RouterLink to="/about"> */}`,
    },
    Download: {
        file: `<Link href="/files/cv.pdf" download>
    Download CV
</Link>

<Link href="/files/cv.pdf" download="my-cv.pdf">
    Download with custom filename
</Link>`,
    },
    Accessibility: {
        ariaLabel: `<Link to="/settings" ariaLabel="Open user settings">
    ⚙️
</Link>`,
    },
}
