import {
    BlockQuote,
    Caption,
    Code,
    CodeText,
    Heading,
    InlineReference,
    List,
    Main,
    Overline,
    Paragraph,
    Section,
    Stack,
    Text,
} from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Typography.code'

type TypographyStoryProps = { path: string }

export const TypographyStory = ({ path }: TypographyStoryProps) => (
    <Screen
        title={'Tivadar Debnar | Typography'}
        path={path}
        recordVisit={false}
        loginRequired
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Typography</Heading>
            <Paragraph>
                A family of text components built on a shared <CodeText>Typography</CodeText> base.
                Each component pre-configures the HTML element and default props while exposing a
                consistent API for size, weight, alignment, tone, truncation, and wrapping.
            </Paragraph>
            <Section>
                <Heading as="h2" id="heading">
                    Heading
                </Heading>
                <Paragraph>
                    Renders <CodeText>h1</CodeText>–<CodeText>h6</CodeText> elements with sensible
                    default sizes and <CodeText>bold</CodeText> weight. Override with{' '}
                    <CodeText>size</CodeText> or <CodeText>weight</CodeText>.
                </Paragraph>

                <Heading as="h3">Levels</Heading>
                <Stack gap="8">
                    <Heading as="h1" includeInTableOfContents={false}>Heading 1</Heading>
                    <Heading as="h2" includeInTableOfContents={false}>Heading 2</Heading>
                    <Heading as="h3" includeInTableOfContents={false}>Heading 3</Heading>
                    <Heading as="h4" includeInTableOfContents={false}>Heading 4</Heading>
                    <Heading as="h5" includeInTableOfContents={false}>Heading 5</Heading>
                    <Heading as="h6" includeInTableOfContents={false}>Heading 6</Heading>
                </Stack>
                <Code language="tsx" content={Snippets.Heading.levels} />

                <Heading as="h3">Custom Size</Heading>
                <Heading as="h2" size="sm" includeInTableOfContents={false}>
                    An h2 element rendered at sm size.
                </Heading>
                <Code language="tsx" content={Snippets.Heading.customSize} />
            </Section>

            <Section>
                <Heading as="h2" id="paragraph">
                    Paragraph
                </Heading>
                <Paragraph>
                    Renders a <CodeText>p</CodeText> element. Defaults to <CodeText>md</CodeText>{' '}
                    size and <CodeText>regular</CodeText> weight.
                </Paragraph>

                <Heading as="h3">Basic</Heading>
                <Paragraph>The quick brown fox jumps over the lazy dog.</Paragraph>
                <Code language="tsx" content={Snippets.Paragraph.basic} />

                <Heading as="h3">Sizes</Heading>
                <Stack gap="4">
                    <Paragraph size="xs">Extra small paragraph.</Paragraph>
                    <Paragraph size="sm">Small paragraph.</Paragraph>
                    <Paragraph size="md">Medium paragraph (default).</Paragraph>
                    <Paragraph size="lg">Large paragraph.</Paragraph>
                </Stack>
                <Code language="tsx" content={Snippets.Paragraph.sizes} />
            </Section>

            <Section>
                <Heading as="h2" id="text">
                    Text
                </Heading>
                <Paragraph>
                    Renders a <CodeText>span</CodeText>. Use for inline text with prop-driven
                    styling.
                </Paragraph>

                <Stack gap="8">
                    <Text>Default inline text.</Text>
                    <Text weight="bold">Bold text.</Text>
                    <Text size="lg" tone="info">
                        Large info text.
                    </Text>
                </Stack>
                <Code language="tsx" content={Snippets.Text.basic} />
            </Section>

            <Section>
                <Heading as="h2" id="caption">
                    Caption
                </Heading>
                <Paragraph>
                    Small muted text, fixed at <CodeText>xs</CodeText> size. Can render as{' '}
                    <CodeText>span</CodeText>, <CodeText>p</CodeText>, or{' '}
                    <CodeText>figcaption</CodeText>.
                </Paragraph>

                <Stack gap="4">
                    <Caption>A small muted caption.</Caption>
                    <Caption as="figcaption">A figcaption element.</Caption>
                </Stack>
                <Code language="tsx" content={Snippets.Caption.basic} />
            </Section>

            <Section>
                <Heading as="h2" id="codetext">
                    CodeText
                </Heading>
                <Paragraph>
                    Renders a <CodeText>code</CodeText> element with monospace font and subtle
                    background.
                </Paragraph>

                <CodeText>const x = 42</CodeText>
                <Code language="tsx" content={Snippets.CodeText.basic} />
            </Section>

            <Section>
                <Heading as="h2" id="blockquote">
                    BlockQuote
                </Heading>
                <Paragraph>
                    Renders a <CodeText>blockquote</CodeText> with a left accent border and italic
                    style.
                </Paragraph>

                <BlockQuote>The only way to do great work is to love what you do.</BlockQuote>
                <Code language="tsx" content={Snippets.BlockQuote.basic} />
            </Section>

            <Section>
                <Heading as="h2" id="overline">
                    Overline
                </Heading>
                <Paragraph>
                    Uppercase, letter-spaced label text. Fixed at <CodeText>xs</CodeText> size with{' '}
                    <CodeText>semibold</CodeText> weight by default.
                </Paragraph>

                <Stack gap="8">
                    <Stack gap="4">
                        <Overline>Section Label</Overline>
                        <Paragraph>Normal paragraph text below an overline.</Paragraph>
                    </Stack>
                    <Stack gap="4">
                        <Overline weight="bold">Bold Overline</Overline>
                        <Paragraph>Normal paragraph text below a bold overline.</Paragraph>
                    </Stack>
                </Stack>
                <Code language="tsx" content={Snippets.Overline.basic} />
            </Section>

            <Section>
                <Heading as="h2" id="list">
                    List
                </Heading>
                <Paragraph>
                    Renders a <CodeText>ul</CodeText> or <CodeText>ol</CodeText> element from an
                    array of <CodeText>ReactNode</CodeText> items. Shares typography props like{' '}
                    <CodeText>size</CodeText>, <CodeText>tone</CodeText>, and{' '}
                    <CodeText>weight</CodeText>.
                </Paragraph>

                <Heading as="h3">Unordered (default)</Heading>
                <List items={['Apples', 'Bananas', 'Cherries']} />
                <Code language="tsx" content={Snippets.List.unordered} />

                <Heading as="h3">Ordered</Heading>
                <List as="ol" items={['First step', 'Second step', 'Third step']} />
                <Code language="tsx" content={Snippets.List.ordered} />

                <Heading as="h3">With Tone &amp; Size</Heading>
                <List
                    items={['Info-toned item', 'Another item', 'And one more']}
                    tone="info"
                    size="lg"
                />
                <Code language="tsx" content={Snippets.List.toneSize} />

                <Heading as="h3">ReactNode Items</Heading>
                <List
                    items={[
                        <>
                            <CodeText>npm install</CodeText> — install dependencies
                        </>,
                        <>
                            <CodeText>npm run dev</CodeText> — start dev server
                        </>,
                        <>
                            <CodeText>npm test</CodeText> — run tests
                        </>,
                    ]}
                />
                <Code language="tsx" content={Snippets.List.reactNode} />
            </Section>

            <Section>
                <Heading as="h2" id="inline-reference">
                    InlineReference
                </Heading>
                <Paragraph>
                    Renders a bracketed author link, pointing to an external URL or internal route.
                    Used inside article paragraphs to cite sources inline.
                </Paragraph>

                <Heading as="h3">External Link</Heading>
                <Paragraph>
                    IoT has the potential to play a significant role.
                    <InlineReference
                        reference={{
                            title: 'IoT for Sustainability',
                            author: 'Smith',
                            source: 'https://example.com',
                        }}
                    />
                </Paragraph>
                <Code language="tsx" content={Snippets.InlineReference.external} />

                <Heading as="h3">Internal Link</Heading>
                <Paragraph>
                    Read more about sorting algorithms.
                    <InlineReference
                        reference={{
                            title: 'JS Sorting',
                            author: 'Debnar',
                            source: '/blog/js-sorting',
                        }}
                    />
                </Paragraph>
                <Code language="tsx" content={Snippets.InlineReference.internal} />
            </Section>

            <Section>
                <Heading as="h2" id="shared-props">
                    Shared Props
                </Heading>
                <Paragraph>
                    All typography components share these props. Examples use{' '}
                    <CodeText>Text</CodeText> but they apply to every component.
                </Paragraph>

                <Heading as="h3">Size</Heading>
                <Paragraph>
                    Token values: <CodeText>xs</CodeText>, <CodeText>sm</CodeText>,{' '}
                    <CodeText>md</CodeText>, <CodeText>lg</CodeText>, <CodeText>xl</CodeText>,{' '}
                    <CodeText>2xl</CodeText>, <CodeText>3xl</CodeText>.
                </Paragraph>
                <Stack gap="4">
                    {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
                        <Text key={size} size={size}>
                            {size}
                        </Text>
                    ))}
                </Stack>
                <Code language="tsx" content={Snippets.Size.demo} />

                <Heading as="h3">Weight</Heading>
                <Stack gap="4">
                    {(['regular', 'medium', 'semibold', 'bold'] as const).map((weight) => (
                        <Text key={weight} weight={weight}>
                            {weight} (
                            {weight === 'regular'
                                ? '400'
                                : weight === 'medium'
                                  ? '500'
                                  : weight === 'semibold'
                                    ? '600'
                                    : '700'}
                            )
                        </Text>
                    ))}
                </Stack>
                <Code language="tsx" content={Snippets.Weight.demo} />

                <Heading as="h3">Alignment</Heading>
                <Stack gap="4">
                    {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                        <Paragraph key={align} align={align}>
                            {align.charAt(0).toUpperCase() + align.slice(1)} aligned text.
                            {align === 'justify' &&
                                ' This paragraph has extra words so the justification effect is visible across multiple lines of content.'}
                        </Paragraph>
                    ))}
                </Stack>
                <Code language="tsx" content={Snippets.Align.demo} />

                <Heading as="h3">Tone</Heading>
                <Stack gap="4">
                    {(['default', 'muted', 'info', 'success', 'warning', 'error'] as const).map(
                        (tone) => (
                            <Text key={tone} tone={tone} size="md">
                                {tone}
                            </Text>
                        ),
                    )}
                </Stack>
                <Code language="tsx" content={Snippets.Tone.demo} />

                <Heading as="h3">Truncate</Heading>
                <div style={{ maxWidth: 300, border: '1px dashed var(--black-4)', padding: 8 }}>
                    <Text truncate>
                        This text will be truncated with an ellipsis when it overflows its
                        container.
                    </Text>
                </div>
                <Code language="tsx" content={Snippets.Truncate.demo} />

                <Heading as="h3">Wrap</Heading>
                <Stack gap="8">
                    <div
                        style={{
                            maxWidth: 200,
                            border: '1px dashed var(--black-4)',
                            padding: 8,
                        }}
                    >
                        <Text wrap="nowrap">No wrapping — stays on one line.</Text>
                    </div>
                    <div
                        style={{
                            maxWidth: 200,
                            border: '1px dashed var(--black-4)',
                            padding: 8,
                        }}
                    >
                        <Text wrap="balance">
                            Balanced wrapping across lines for better readability.
                        </Text>
                    </div>
                </Stack>
                <Code language="tsx" content={Snippets.Wrap.demo} />

                <Heading as="h3">Family</Heading>
                <Paragraph>
                    The <CodeText>family</CodeText> prop sets the font family:{' '}
                    <CodeText>sans</CodeText>, <CodeText>serif</CodeText>, <CodeText>mono</CodeText>
                    .
                </Paragraph>
                <Stack gap="4">
                    {(['sans', 'serif', 'mono'] as const).map((family) => (
                        <Text key={family} family={family} size="md">
                            {family} — The quick brown fox jumps over the lazy dog.
                        </Text>
                    ))}
                </Stack>
                <Code language="tsx" content={Snippets.Family.demo} />

                <Heading as="h3">Decoration</Heading>
                <Paragraph>
                    The <CodeText>decoration</CodeText> prop sets text decoration:{' '}
                    <CodeText>underline</CodeText>, <CodeText>line-through</CodeText>,{' '}
                    <CodeText>none</CodeText>.
                </Paragraph>
                <Stack gap="4">
                    <Text decoration="underline" size="md">
                        Underlined text
                    </Text>
                    <Text decoration="line-through" size="md">
                        Struck-through text
                    </Text>
                    <Text decoration="none" size="md">
                        No decoration
                    </Text>
                </Stack>
                <Code language="tsx" content={Snippets.Decoration.demo} />

                <Heading as="h3">Transform</Heading>
                <Paragraph>
                    The <CodeText>transform</CodeText> prop sets text transformation:{' '}
                    <CodeText>uppercase</CodeText>, <CodeText>lowercase</CodeText>,{' '}
                    <CodeText>capitalize</CodeText>.
                </Paragraph>
                <Stack gap="4">
                    <Text transform="uppercase" size="md">
                        uppercase text
                    </Text>
                    <Text transform="lowercase" size="md">
                        LOWERCASE TEXT
                    </Text>
                    <Text transform="capitalize" size="md">
                        capitalize each word
                    </Text>
                </Stack>
                <Code language="tsx" content={Snippets.Transform.demo} />
            </Section>
        </Main>
    </Screen>
)
