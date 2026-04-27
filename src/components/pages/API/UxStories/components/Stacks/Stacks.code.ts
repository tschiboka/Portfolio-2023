export const Code = {
    Basic: {
        vertical: `<Stack.Vertical gap="12">
    <span>First</span>
    <span>Second</span>
    <span>Third</span>
</Stack.Vertical>`,
        horizontal: `<Stack.Horizontal gap="12">
    <span>Left</span>
    <span>Centre</span>
    <span>Right</span>
</Stack.Horizontal>`,
        default: `// Stack defaults to Vertical
<Stack gap="8">
    <span>One</span>
    <span>Two</span>
</Stack>`,
    },
    Gap: {
        demo: `<Stack.Horizontal gap="4">  ...small gap  </Stack.Horizontal>
<Stack.Horizontal gap="16"> ...medium gap </Stack.Horizontal>
<Stack.Horizontal gap="48"> ...large gap  </Stack.Horizontal>`,
    },
    Align: {
        demo: `<Stack.Horizontal align="start"   gap="8">...</Stack.Horizontal>
<Stack.Horizontal align="center"  gap="8">...</Stack.Horizontal>
<Stack.Horizontal align="end"     gap="8">...</Stack.Horizontal>
<Stack.Horizontal align="stretch" gap="8">...</Stack.Horizontal>`,
    },
    Justify: {
        demo: `<Stack.Horizontal justify="start"   gap="8">...</Stack.Horizontal>
<Stack.Horizontal justify="center"  gap="8">...</Stack.Horizontal>
<Stack.Horizontal justify="end"     gap="8">...</Stack.Horizontal>
<Stack.Horizontal justify="between" gap="8">...</Stack.Horizontal>
<Stack.Horizontal justify="around"  gap="8">...</Stack.Horizontal>`,
    },
    Wrap: {
        demo: `<Stack.Horizontal gap="8" wrap>
    {items.map((item) => (
        <Pill key={item} label={item} color="accent" />
    ))}
</Stack.Horizontal>`,
    },
    Polymorphic: {
        demo: `<Stack.Vertical as="ul" gap="4">
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
</Stack.Vertical>

<Stack.Vertical as="section" gap="12" ariaLabel="card">
    <h3>Title</h3>
    <p>Content</p>
</Stack.Vertical>`,
    },
    Nested: {
        demo: `<Stack.Vertical gap="16">
    <Stack.Horizontal gap="12" align="center">
        <span>Logo</span>
        <nav>Nav</nav>
    </Stack.Horizontal>
    <Stack.Horizontal gap="24">
        <aside style={{ width: 200 }}>Sidebar</aside>
        <main style={{ flex: 1 }}>Content</main>
    </Stack.Horizontal>
</Stack.Vertical>`,
    },
}
