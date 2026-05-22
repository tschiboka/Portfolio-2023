export const Code = {
    // ── Heading ──────────────────────────────────────────
    Heading: {
        levels: `<Heading as="h1">Heading 1</Heading>
<Heading as="h2">Heading 2</Heading>
<Heading as="h3">Heading 3</Heading>
<Heading as="h4">Heading 4</Heading>
<Heading as="h5">Heading 5</Heading>
<Heading as="h6">Heading 6</Heading>`,
        customSize: `<Heading as="h2" size="sm">
    An h2 element rendered at sm size.
</Heading>`,
    },

    // ── Paragraph ────────────────────────────────────────
    Paragraph: {
        basic: `<Paragraph>
    The quick brown fox jumps over the lazy dog.
</Paragraph>`,
        sizes: `<Paragraph size="xs">Extra small paragraph.</Paragraph>
<Paragraph size="sm">Small paragraph.</Paragraph>
<Paragraph size="md">Medium paragraph (default).</Paragraph>
<Paragraph size="lg">Large paragraph.</Paragraph>`,
    },

    // ── Text ─────────────────────────────────────────────
    Text: {
        basic: `<Text>Default inline text.</Text>
<Text weight="bold">Bold text.</Text>
<Text size="lg" tone="info">Large info text.</Text>`,
    },

    // ── Caption ──────────────────────────────────────────
    Caption: {
        basic: `<Caption>A small muted caption.</Caption>
<Caption as="figcaption">A figcaption element.</Caption>`,
    },

    // ── CodeText ─────────────────────────────────────────
    CodeText: {
        basic: `<CodeText>const x = 42</CodeText>`,
    },

    // ── BlockQuote ───────────────────────────────────────
    BlockQuote: {
        basic: `<BlockQuote>
    The only way to do great work is to love what you do.
</BlockQuote>`,
    },

    // ── Overline ─────────────────────────────────────────
    Overline: {
        basic: `<Overline>Section Label</Overline>
<Overline weight="bold">Bold Overline</Overline>`,
    },

    // ── List ──────────────────────────────────────────────
    List: {
        unordered: `<List items={['Apples', 'Bananas', 'Cherries']} />`,
        ordered: `<List as="ol" items={['First step', 'Second step', 'Third step']} />`,
        toneSize: `<List
    items={['Info-toned item', 'Another item', 'And one more']}
    tone="info"
    size="lg"
/>`,
        reactNode: `<List
    items={[
        <><CodeText>npm install</CodeText> — install dependencies</>,
        <><CodeText>npm run dev</CodeText> — start dev server</>,
        <><CodeText>npm test</CodeText> — run tests</>,
    ]}
/>`,
    },

    // ── InlineReference ───────────────────────────────────
    InlineReference: {
        external: `<Paragraph>
    IoT has the potential to play a significant role.
    <InlineReference
        reference={{
            title: 'IoT for Sustainability',
            author: 'Smith',
            source: 'https://example.com',
        }}
    />
</Paragraph>`,
        internal: `<Paragraph>
    Read more about sorting algorithms.
    <InlineReference
        reference={{
            title: 'JS Sorting',
            author: 'Debnar',
            source: '/blog/js-sorting',
        }}
    />
</Paragraph>`,
    },

    // ── Shared Props ─────────────────────────────────────
    Size: {
        demo: `<Text size="xs">xs</Text>
<Text size="sm">sm</Text>
<Text size="md">md</Text>
<Text size="lg">lg</Text>
<Text size="xl">xl</Text>
<Text size="2xl">2xl</Text>
<Text size="3xl">3xl</Text>`,
    },
    Weight: {
        demo: `<Text weight="regular">Regular (400)</Text>
<Text weight="medium">Medium (500)</Text>
<Text weight="semibold">Semibold (600)</Text>
<Text weight="bold">Bold (700)</Text>`,
    },
    Align: {
        demo: `<Paragraph align="left">Left aligned text.</Paragraph>
<Paragraph align="center">Center aligned text.</Paragraph>
<Paragraph align="right">Right aligned text.</Paragraph>
<Paragraph align="justify">Justified text that spans multiple lines.</Paragraph>`,
    },
    Tone: {
        demo: `<Text tone="default">Default</Text>
<Text tone="muted">Muted</Text>
<Text tone="info">Info</Text>
<Text tone="success">Success</Text>
<Text tone="warning">Warning</Text>
<Text tone="error">Error</Text>`,
    },
    Truncate: {
        demo: `<Text truncate>
    This text will be truncated with an ellipsis when it overflows its container.
</Text>`,
    },
    Wrap: {
        demo: `<Text wrap="nowrap">No wrapping — stays on one line.</Text>
<Text wrap="balance">Balanced wrapping across lines.</Text>`,
    },
    Family: {
        demo: `<Text family="sans">Sans-serif (Roboto)</Text>
<Text family="serif">Serif (Georgia)</Text>
<Text family="mono">Monospace (Roboto Mono)</Text>`,
    },
    Decoration: {
        demo: `<Text decoration="underline">Underlined text</Text>
<Text decoration="line-through">Struck-through text</Text>
<Text decoration="none">No decoration</Text>`,
    },
    Transform: {
        demo: `<Text transform="uppercase">uppercase text</Text>
<Text transform="lowercase">LOWERCASE TEXT</Text>
<Text transform="capitalize">capitalize each word</Text>`,
    },
} as const
