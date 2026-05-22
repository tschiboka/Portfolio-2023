export const Code = {
    // ── Box ──────────────────────────────────────────────
    Box: {
        basic: `<Box padding="16" background="surface" borderRadius="md">
    <p>A padded container with surface background.</p>
</Box>`,
        padding: `<Box padding="24" background="raised" borderRadius="sm">
    Uniform padding of 24px on all sides.
</Box>

<Box paddingX="32" paddingY="8" background="raised" borderRadius="sm">
    Horizontal 32px, vertical 8px.
</Box>`,
        background: `<Box padding="16" background="transparent">transparent</Box>
<Box padding="16" background="sunken">sunken</Box>
<Box padding="16" background="surface">surface</Box>
<Box padding="16" background="raised">raised</Box>
<Box padding="16" background="accent">accent</Box>`,
        borderRadius: `<Box padding="16" background="raised" borderRadius="none">none</Box>
<Box padding="16" background="raised" borderRadius="sm">sm</Box>
<Box padding="16" background="raised" borderRadius="md">md</Box>
<Box padding="16" background="raised" borderRadius="lg">lg</Box>
<Box padding="16" background="raised" borderRadius="full">full</Box>`,
        display: `<Box display="flex" padding="12" background="surface" borderRadius="sm">
    <span>Flex child A</span>
    <span>Flex child B</span>
</Box>`,
        polymorphic: `<Box as="section" padding="16" background="surface" borderRadius="md">
    Rendered as a <section> element.
</Box>`,
    },

    // ── Stack ────────────────────────────────────────────
    Stack: {
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
        gap: `<Stack.Horizontal gap="4">  ...small gap  </Stack.Horizontal>
<Stack.Horizontal gap="16"> ...medium gap </Stack.Horizontal>
<Stack.Horizontal gap="48"> ...large gap  </Stack.Horizontal>`,
        align: `<Stack.Horizontal align="start"   gap="8">...</Stack.Horizontal>
<Stack.Horizontal align="center"  gap="8">...</Stack.Horizontal>
<Stack.Horizontal align="end"     gap="8">...</Stack.Horizontal>
<Stack.Horizontal align="stretch" gap="8">...</Stack.Horizontal>`,
        justify: `<Stack.Horizontal justify="start"   gap="8">...</Stack.Horizontal>
<Stack.Horizontal justify="center"  gap="8">...</Stack.Horizontal>
<Stack.Horizontal justify="end"     gap="8">...</Stack.Horizontal>
<Stack.Horizontal justify="between" gap="8">...</Stack.Horizontal>
<Stack.Horizontal justify="around"  gap="8">...</Stack.Horizontal>`,
        wrap: `<Stack.Horizontal gap="8" wrap>
    {items.map((item) => (
        <Pill key={item} label={item} color="accent" />
    ))}
</Stack.Horizontal>`,
        polymorphic: `<Stack.Vertical as="ul" gap="4">
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
</Stack.Vertical>`,
        nested: `<Stack.Vertical gap="16">
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

    // ── Inline ───────────────────────────────────────────
    Inline: {
        basic: `<Inline gap="8">
    <span>One</span>
    <span>Two</span>
    <span>Three</span>
</Inline>`,
        wrap: `<Inline gap="8" wrap>
    <Pill label="React" color="accent" />
    <Pill label="TypeScript" color="purple" />
    <Pill label="CSS" color="success" />
    <Pill label="Node" color="yellow" />
</Inline>`,
        align: `<Inline gap="8" align="center">
    <span style={{ fontSize: 24 }}>Big</span>
    <span style={{ fontSize: 12 }}>Small</span>
</Inline>`,
    },

    // ── Grid ─────────────────────────────────────────────
    Grid: {
        basic: `<Grid columns={3} gap="8">
    <span>A</span>
    <span>B</span>
    <span>C</span>
    <span>D</span>
    <span>E</span>
    <span>F</span>
</Grid>`,
        columns: `<Grid columns={2} gap="8">...</Grid>
<Grid columns={3} gap="8">...</Grid>
<Grid columns={4} gap="8">...</Grid>`,
        rowColumnGap: `<Grid columns={3} rowGap="16" columnGap="4">
    ...independent row and column gaps
</Grid>`,
        responsive: `<Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="8">
    {/* 1 col on mobile, 2 on sm, 3 on md, 4 on lg+ */}
    <span>1</span>
    <span>2</span>
    ...
</Grid>`,
    },

    // ── Split ────────────────────────────────────────────
    Split: {
        basic: `<Split
    left={<div>Left pane</div>}
    right={<div>Right pane</div>}
    gap="16"
/>`,
        ratio: `<Split ratio="1/3" gap="16" left={<aside>Sidebar</aside>} right={<main>Content</main>} />
<Split ratio="1/1" gap="16" left={<div>Left</div>} right={<div>Right</div>} />
<Split ratio="3/1" gap="16" left={<main>Content</main>} right={<aside>Sidebar</aside>} />`,
    },

    // ── Spacer ───────────────────────────────────────────
    Spacer: {
        vertical: `<div>Above</div>
<Spacer size="24" />
<div>Below — 24px gap</div>`,
        horizontal: `<div style={{ display: 'flex' }}>
    <span>Left</span>
    <Spacer size="32" axis="horizontal" />
    <span>Right — 32px gap</span>
</div>`,
    },

    // ── Visibility ───────────────────────────────────────
    Visibility: {
        show: `{/* Hidden by default, shown above the breakpoint */}
<Show above="sm">
    <p>Visible above 576px</p>
</Show>

<Show above="md">
    <p>Visible above 768px</p>
</Show>

{/* Hidden by default, shown below the breakpoint */}
<Show below="md">
    <p>Visible below 768px</p>
</Show>`,
        hide: `{/* Visible by default, hidden above the breakpoint */}
<Hide above="lg">
    <p>Hidden above 992px</p>
</Hide>

{/* Visible by default, hidden below the breakpoint */}
<Hide below="sm">
    <p>Hidden below 576px</p>
</Hide>`,
    },
}
