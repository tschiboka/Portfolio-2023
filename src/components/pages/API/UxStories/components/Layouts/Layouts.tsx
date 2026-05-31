import {
    Box,
    Code,
    CodeText,
    Grid,
    Heading,
    Hide,
    Inline,
    Main,
    Paragraph,
    Pill,
    Section,
    Show,
    Spacer,
    Split,
    Stack,
} from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Layouts.code'

type LayoutsProps = { path: string }

const cell = (height?: number): React.CSSProperties => ({
    padding: '8px 16px',
    background: 'var(--black-3)',
    border: '1px solid var(--accent-dark-3)',
    borderRadius: 6,
    minHeight: height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const wrapItems = [
    'React',
    'TypeScript',
    'CSS',
    'Node',
    'Jest',
    'Vite',
    'ESLint',
    'Prettier',
    'Git',
    'Docker',
]

export const Layouts = ({ path }: LayoutsProps) => (
    <Screen
        title={'Tivadar Debnar | Layouts'}
        path={path}
        recordVisit={false}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Layout</Heading>
            <Paragraph>
                Layout primitives for composing page structure. All styling is inline — no
                stylesheet required.
            </Paragraph>
            <Section>
                <Heading as="h2" id="box">
                    Box
                </Heading>
                <Paragraph>
                    A generic container with spacing, background, border-radius, and display props.
                    Renders a <CodeText>div</CodeText> by default.
                </Paragraph>

                <Heading as="h3">Basic Usage</Heading>
                <Box padding="16" background="surface" borderRadius="md">
                    <p style={{ margin: 0 }}>A padded container with surface background.</p>
                </Box>
                <Code language="tsx" content={Snippets.Box.basic} />

                <Heading as="h3">Padding</Heading>
                <Paragraph>
                    Use <CodeText>padding</CodeText> for uniform spacing, or{' '}
                    <CodeText>paddingX</CodeText> / <CodeText>paddingY</CodeText> for axis-specific
                    control.
                </Paragraph>
                <Stack gap="12">
                    <Box padding="24" background="raised" borderRadius="sm">
                        Uniform 24px on all sides.
                    </Box>
                    <Box paddingX="32" paddingY="8" background="raised" borderRadius="sm">
                        Horizontal 32px, vertical 8px.
                    </Box>
                </Stack>
                <Code language="tsx" content={Snippets.Box.padding} />

                <Heading as="h3">Background</Heading>
                <Stack gap="8">
                    {(['transparent', 'sunken', 'surface', 'raised', 'accent'] as const).map(
                        (bg) => (
                            <Box key={bg} padding="16" background={bg} borderRadius="sm">
                                <CodeText size="xs" tone="muted">
                                    {bg}
                                </CodeText>
                            </Box>
                        ),
                    )}
                </Stack>
                <Code language="tsx" content={Snippets.Box.background} />

                <Heading as="h3">Border Radius</Heading>
                <Inline gap="8" wrap>
                    {(['none', 'sm', 'md', 'lg', 'full'] as const).map((br) => (
                        <Box key={br} padding="16" background="raised" borderRadius={br}>
                            <CodeText size="xs" tone="muted">
                                {br}
                            </CodeText>
                        </Box>
                    ))}
                </Inline>
                <Code language="tsx" content={Snippets.Box.borderRadius} />

                <Heading as="h3">Display</Heading>
                <Box
                    display="flex"
                    padding="12"
                    background="surface"
                    borderRadius="sm"
                    style={{ gap: 12 }}
                >
                    <Box padding="8" background="raised" borderRadius="sm">
                        Flex child A
                    </Box>
                    <Box padding="8" background="raised" borderRadius="sm">
                        Flex child B
                    </Box>
                </Box>
                <Code language="tsx" content={Snippets.Box.display} />

                <Heading as="h3">Polymorphic Element</Heading>
                <Stack gap="8">
                    <Box as="section" padding="16" background="surface" borderRadius="md">
                        Rendered as a <CodeText>&lt;section&gt;</CodeText> element.
                    </Box>
                    <Box as="aside" padding="16" background="sunken" borderRadius="sm">
                        Rendered as an <CodeText>&lt;aside&gt;</CodeText> element.
                    </Box>
                </Stack>
                <Code language="tsx" content={Snippets.Box.polymorphic} />
            </Section>

            <Section>
                <Heading as="h2" id="stack">
                    Stack
                </Heading>
                <Paragraph>
                    Flexbox layout primitive. <CodeText>Stack.Vertical</CodeText> for columns,{' '}
                    <CodeText>Stack.Horizontal</CodeText> for rows. Bare <CodeText>Stack</CodeText>{' '}
                    defaults to vertical.
                </Paragraph>

                <Heading as="h3">Direction</Heading>
                <Heading as="h4">Vertical</Heading>
                <Stack.Vertical gap="8">
                    <span style={cell()}>First</span>
                    <span style={cell()}>Second</span>
                    <span style={cell()}>Third</span>
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Stack.vertical} />

                <Heading as="h4">Horizontal</Heading>
                <Stack.Horizontal gap="8">
                    <span style={cell()}>Left</span>
                    <span style={cell()}>Centre</span>
                    <span style={cell()}>Right</span>
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Stack.horizontal} />
                <Code language="tsx" content={Snippets.Stack.default} />

                <Heading as="h3">Gap</Heading>
                {(['4', '16', '48'] as const).map((gap) => (
                    <div key={gap} style={{ marginBottom: 16 }}>
                        <Paragraph>
                            <CodeText>gap=&quot;{gap}&quot;</CodeText>
                        </Paragraph>
                        <Stack.Horizontal gap={gap}>
                            <span style={cell()}>A</span>
                            <span style={cell()}>B</span>
                            <span style={cell()}>C</span>
                        </Stack.Horizontal>
                    </div>
                ))}
                <Code language="tsx" content={Snippets.Stack.gap} />

                <Heading as="h3">Align</Heading>
                {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
                    <div key={align} style={{ marginBottom: 16 }}>
                        <Paragraph>
                            <CodeText>align=&quot;{align}&quot;</CodeText>
                        </Paragraph>
                        <Stack.Horizontal
                            align={align}
                            gap="8"
                            style={{
                                minHeight: 80,
                                border: '1px dashed var(--black-4)',
                                padding: 8,
                            }}
                        >
                            <span style={cell(30)}>Short</span>
                            <span style={cell(60)}>Tall</span>
                            <span style={cell(40)}>Mid</span>
                        </Stack.Horizontal>
                    </div>
                ))}
                <Code language="tsx" content={Snippets.Stack.align} />

                <Heading as="h3">Justify</Heading>
                {(['start', 'center', 'end', 'between', 'around'] as const).map((justify) => (
                    <div key={justify} style={{ marginBottom: 16 }}>
                        <Paragraph>
                            <CodeText>justify=&quot;{justify}&quot;</CodeText>
                        </Paragraph>
                        <Stack.Horizontal
                            justify={justify}
                            gap="8"
                            style={{
                                border: '1px dashed var(--black-4)',
                                padding: 8,
                            }}
                        >
                            <span style={cell()}>A</span>
                            <span style={cell()}>B</span>
                            <span style={cell()}>C</span>
                        </Stack.Horizontal>
                    </div>
                ))}
                <Code language="tsx" content={Snippets.Stack.justify} />

                <Heading as="h3">Wrap</Heading>
                <Stack.Horizontal gap="8" wrap>
                    {wrapItems.map((item) => (
                        <Pill key={item} label={item} color="accent" />
                    ))}
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Stack.wrap} />

                <Heading as="h3">Polymorphic Element</Heading>
                <Stack.Vertical as="ul" gap="4" style={{ paddingLeft: 20 }}>
                    <li>Item one</li>
                    <li>Item two</li>
                    <li>Item three</li>
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Stack.polymorphic} />

                <Heading as="h3">Nested Stacks</Heading>
                <Stack.Vertical
                    gap="16"
                    style={{ border: '1px dashed var(--black-4)', padding: 12 }}
                >
                    <Stack.Horizontal gap="12" align="center">
                        <span style={cell()}>Logo</span>
                        <span style={{ ...cell(), flex: 1 }}>Nav</span>
                    </Stack.Horizontal>
                    <Stack.Horizontal gap="24">
                        <aside style={{ ...cell(), width: 120 }}>Sidebar</aside>
                        <main style={{ ...cell(), flex: 1 }}>Content</main>
                    </Stack.Horizontal>
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Stack.nested} />
            </Section>

            <Section>
                <Heading as="h2" id="inline">
                    Inline
                </Heading>
                <Paragraph>
                    A row-only flex wrapper — shorthand for <CodeText>Stack.Horizontal</CodeText>.
                    Shares the same <CodeText>gap</CodeText>, <CodeText>align</CodeText>,{' '}
                    <CodeText>justify</CodeText>, and <CodeText>wrap</CodeText> props.
                </Paragraph>

                <Heading as="h3">Basic</Heading>
                <Inline gap="8">
                    <span style={cell()}>One</span>
                    <span style={cell()}>Two</span>
                    <span style={cell()}>Three</span>
                </Inline>
                <Code language="tsx" content={Snippets.Inline.basic} />

                <Heading as="h3">Wrap</Heading>
                <Inline gap="8" wrap>
                    <Pill label="React" color="accent" />
                    <Pill label="TypeScript" color="purple" />
                    <Pill label="CSS" color="success" />
                    <Pill label="Node" color="yellow" />
                </Inline>
                <Code language="tsx" content={Snippets.Inline.wrap} />

                <Heading as="h3">Align</Heading>
                <Inline
                    gap="8"
                    align="center"
                    style={{ border: '1px dashed var(--black-4)', padding: 8 }}
                >
                    <span style={{ ...cell(), fontSize: 24 }}>Big</span>
                    <span style={{ ...cell(), fontSize: 12 }}>Small</span>
                </Inline>
                <Code language="tsx" content={Snippets.Inline.align} />
            </Section>

            <Section>
                <Heading as="h2" id="grid">
                    Grid
                </Heading>
                <Paragraph>
                    CSS Grid wrapper. Use <CodeText>columns</CodeText> for equal-width columns and{' '}
                    <CodeText>gap</CodeText> / <CodeText>rowGap</CodeText> /{' '}
                    <CodeText>columnGap</CodeText> for spacing.
                </Paragraph>

                <Heading as="h3">Basic</Heading>
                <Grid columns={3} gap="8">
                    {['A', 'B', 'C', 'D', 'E', 'F'].map((item) => (
                        <span key={item} style={cell()}>
                            {item}
                        </span>
                    ))}
                </Grid>
                <Code language="tsx" content={Snippets.Grid.basic} />

                <Heading as="h3">Column Counts</Heading>
                {([2, 3, 4] as const).map((cols) => (
                    <div key={cols} style={{ marginBottom: 16 }}>
                        <Paragraph>
                            <CodeText>columns={`{${cols}}`}</CodeText>
                        </Paragraph>
                        <Grid columns={cols} gap="8">
                            {Array.from({ length: 6 }, (_, i) => (
                                <span key={i} style={cell()}>
                                    {i + 1}
                                </span>
                            ))}
                        </Grid>
                    </div>
                ))}
                <Code language="tsx" content={Snippets.Grid.columns} />

                <Heading as="h3">Row &amp; Column Gap</Heading>
                <Grid columns={3} rowGap="16" columnGap="4">
                    {Array.from({ length: 6 }, (_, i) => (
                        <span key={i} style={cell()}>
                            {i + 1}
                        </span>
                    ))}
                </Grid>
                <Code language="tsx" content={Snippets.Grid.rowColumnGap} />

                <Heading as="h3">Responsive Columns</Heading>
                <Paragraph>
                    Pass an object to <CodeText>columns</CodeText> for responsive breakpoints. The{' '}
                    <CodeText>base</CodeText> key sets the mobile-first default; other keys (
                    <CodeText>xs</CodeText>, <CodeText>sm</CodeText>, <CodeText>md</CodeText>,{' '}
                    <CodeText>lg</CodeText>, <CodeText>xl</CodeText>, <CodeText>2xl</CodeText>)
                    override at their min-width.
                </Paragraph>
                <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="8">
                    {Array.from({ length: 8 }, (_, i) => (
                        <span key={i} style={cell()}>
                            {i + 1}
                        </span>
                    ))}
                </Grid>
                <Code language="tsx" content={Snippets.Grid.responsive} />
            </Section>

            <Section>
                <Heading as="h2" id="split">
                    Split
                </Heading>
                <Paragraph>
                    Two-pane grid layout with a <CodeText>ratio</CodeText> prop:{' '}
                    <CodeText>"1/1"</CodeText>, <CodeText>"1/2"</CodeText>,{' '}
                    <CodeText>"2/1"</CodeText>, <CodeText>"1/3"</CodeText>,{' '}
                    <CodeText>"3/1"</CodeText>, <CodeText>"1/4"</CodeText>,{' '}
                    <CodeText>"4/1"</CodeText>.
                </Paragraph>

                <Heading as="h3">Basic</Heading>
                <Split
                    gap="16"
                    left={<div style={cell()}>Left pane</div>}
                    right={<div style={cell()}>Right pane</div>}
                />
                <Code language="tsx" content={Snippets.Split.basic} />

                <Heading as="h3">Ratios</Heading>
                {(['1/3', '1/1', '3/1'] as const).map((ratio) => (
                    <div key={ratio} style={{ marginBottom: 16 }}>
                        <Paragraph>
                            <CodeText>ratio=&quot;{ratio}&quot;</CodeText>
                        </Paragraph>
                        <Split
                            ratio={ratio}
                            gap="16"
                            left={<div style={cell()}>Left</div>}
                            right={<div style={cell()}>Right</div>}
                        />
                    </div>
                ))}
                <Code language="tsx" content={Snippets.Split.ratio} />
            </Section>

            <Section>
                <Heading as="h2" id="spacer">
                    Spacer
                </Heading>
                <Paragraph>
                    Explicit spacing primitive for non-Stack contexts. Prefer Stack{' '}
                    <CodeText>gap</CodeText> where possible.
                </Paragraph>

                <Heading as="h3">Vertical</Heading>
                <div style={cell()}>Above</div>
                <Spacer size="24" />
                <div style={cell()}>Below — 24px gap</div>
                <Code language="tsx" content={Snippets.Spacer.vertical} />

                <Heading as="h3">Horizontal</Heading>
                <div style={{ display: 'flex' }}>
                    <span style={cell()}>Left</span>
                    <Spacer size="32" axis="horizontal" />
                    <span style={cell()}>Right — 32px gap</span>
                </div>
                <Code language="tsx" content={Snippets.Spacer.horizontal} />
            </Section>

            <Section>
                <Heading as="h2" id="show-hide">
                    Show &amp; Hide
                </Heading>
                <Paragraph>
                    Responsive visibility primitives. <CodeText>Show</CodeText> hides its children
                    by default and reveals them at a breakpoint. <CodeText>Hide</CodeText> does the
                    opposite — visible by default, hidden at a breakpoint. Both accept{' '}
                    <CodeText>above</CodeText> and <CodeText>below</CodeText> props.
                </Paragraph>
                <Paragraph>
                    Breakpoints: <CodeText>2xs</CodeText> (375), <CodeText>xs</CodeText> (420),{' '}
                    <CodeText>sm</CodeText> (576), <CodeText>mx</CodeText> (670),{' '}
                    <CodeText>md</CodeText> (768), <CodeText>lg</CodeText> (992),{' '}
                    <CodeText>xl</CodeText> (1200), <CodeText>2xl</CodeText> (1580).
                </Paragraph>

                <Heading as="h3">Show</Heading>
                <Paragraph>
                    Resize the browser to see elements appear at their breakpoints.
                </Paragraph>
                <Stack.Vertical gap="8">
                    <Show above="sm">
                        <Pill label="Visible above sm (576px)" color="success" />
                    </Show>
                    <Show above="md">
                        <Pill label="Visible above md (768px)" color="accent" />
                    </Show>
                    <Show above="lg">
                        <Pill label="Visible above lg (992px)" color="purple" />
                    </Show>
                    <Show below="md">
                        <Pill label="Visible below md (768px)" color="orange" />
                    </Show>
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Visibility.show} />

                <Heading as="h3">Hide</Heading>
                <Paragraph>
                    Resize the browser to see elements disappear at their breakpoints.
                </Paragraph>
                <Stack.Vertical gap="8">
                    <Hide above="lg">
                        <Pill label="Hidden above lg (992px)" color="error" />
                    </Hide>
                    <Hide below="sm">
                        <Pill label="Hidden below sm (576px)" color="yellow" />
                    </Hide>
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Visibility.hide} />
            </Section>
        </Main>
    </Screen>
)
