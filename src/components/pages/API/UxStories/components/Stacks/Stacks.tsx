import { Code, Pill, Stack } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Stacks.code'

type StacksProps = { path: string }

const box = (_label: string, height?: number): React.CSSProperties => ({
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

export const Stacks = ({ path }: StacksProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Stacks'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Projects"
            sideMenu={<PageSideMenu />}
        >
            <main>
                <StoryNav />
                <h1>Stack</h1>
                <p>
                    The <code>Stack</code> component is a flexbox layout primitive. Use{' '}
                    <code>Stack.Vertical</code> for column layouts and <code>Stack.Horizontal</code>{' '}
                    for row layouts. All styling is inline — no stylesheet required.
                </p>

                <section>
                    <h2>Direction</h2>
                    <p>
                        <code>Stack.Vertical</code> arranges children in a column,{' '}
                        <code>Stack.Horizontal</code> in a row. The bare <code>Stack</code> defaults
                        to vertical.
                    </p>

                    <h3>Vertical</h3>
                    <Stack.Vertical gap="8">
                        <span style={box('A')}>First</span>
                        <span style={box('B')}>Second</span>
                        <span style={box('C')}>Third</span>
                    </Stack.Vertical>
                    <Code language="tsx" content={Snippets.Basic.vertical} />

                    <h3>Horizontal</h3>
                    <Stack.Horizontal gap="8">
                        <span style={box('A')}>Left</span>
                        <span style={box('B')}>Centre</span>
                        <span style={box('C')}>Right</span>
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.Basic.horizontal} />

                    <Code language="tsx" content={Snippets.Basic.default} />
                </section>

                <section>
                    <h2>Gap</h2>
                    <p>
                        The <code>gap</code> prop accepts design-token string values:{' '}
                        <code>"2"</code>, <code>"4"</code>, <code>"8"</code>, <code>"12"</code>,{' '}
                        <code>"16"</code>, <code>"20"</code>, <code>"24"</code>, <code>"32"</code>,{' '}
                        <code>"40"</code>, <code>"48"</code>, <code>"56"</code>, <code>"64"</code>.
                    </p>
                    {(['4', '16', '48'] as const).map((gap) => (
                        <div key={gap} style={{ marginBottom: 16 }}>
                            <p>
                                <code>gap=&quot;{gap}&quot;</code>
                            </p>
                            <Stack.Horizontal gap={gap}>
                                <span style={box('A')}>A</span>
                                <span style={box('B')}>B</span>
                                <span style={box('C')}>C</span>
                            </Stack.Horizontal>
                        </div>
                    ))}
                    <Code language="tsx" content={Snippets.Gap.demo} />
                </section>

                <section>
                    <h2>Align</h2>
                    <p>
                        The <code>align</code> prop maps to <code>align-items</code>:{' '}
                        <code>start</code>, <code>center</code>, <code>end</code>,{' '}
                        <code>stretch</code>.
                    </p>
                    {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
                        <div key={align} style={{ marginBottom: 16 }}>
                            <p>
                                <code>align=&quot;{align}&quot;</code>
                            </p>
                            <Stack.Horizontal
                                align={align}
                                gap="8"
                                style={{
                                    minHeight: 80,
                                    border: '1px dashed var(--black-4)',
                                    padding: 8,
                                }}
                            >
                                <span style={box('A', 30)}>Short</span>
                                <span style={box('B', 60)}>Tall</span>
                                <span style={box('C', 40)}>Mid</span>
                            </Stack.Horizontal>
                        </div>
                    ))}
                    <Code language="tsx" content={Snippets.Align.demo} />
                </section>

                <section>
                    <h2>Justify</h2>
                    <p>
                        The <code>justify</code> prop maps to <code>justify-content</code>:{' '}
                        <code>start</code>, <code>center</code>, <code>end</code>,{' '}
                        <code>between</code>, <code>around</code>.
                    </p>
                    {(['start', 'center', 'end', 'between', 'around'] as const).map((justify) => (
                        <div key={justify} style={{ marginBottom: 16 }}>
                            <p>
                                <code>justify=&quot;{justify}&quot;</code>
                            </p>
                            <Stack.Horizontal
                                justify={justify}
                                gap="8"
                                style={{
                                    border: '1px dashed var(--black-4)',
                                    padding: 8,
                                }}
                            >
                                <span style={box('A')}>A</span>
                                <span style={box('B')}>B</span>
                                <span style={box('C')}>C</span>
                            </Stack.Horizontal>
                        </div>
                    ))}
                    <Code language="tsx" content={Snippets.Justify.demo} />
                </section>

                <section>
                    <h2>Wrap</h2>
                    <p>
                        Set <code>wrap</code> to allow children to flow onto the next line when they
                        overflow.
                    </p>
                    <Stack.Horizontal gap="8" wrap>
                        {wrapItems.map((item) => (
                            <Pill key={item} label={item} color="accent" />
                        ))}
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.Wrap.demo} />
                </section>

                <section>
                    <h2>Polymorphic Element</h2>
                    <p>
                        Use the <code>as</code> prop to change the rendered HTML element. Defaults
                        to <code>div</code>.
                    </p>
                    <Stack.Vertical as="ul" gap="4" style={{ paddingLeft: 20 }}>
                        <li>Item one</li>
                        <li>Item two</li>
                        <li>Item three</li>
                    </Stack.Vertical>
                    <Code language="tsx" content={Snippets.Polymorphic.demo} />
                </section>

                <section>
                    <h2>Nested Stacks</h2>
                    <p>Combine vertical and horizontal stacks to build complex layouts.</p>
                    <Stack.Vertical
                        gap="16"
                        style={{
                            border: '1px dashed var(--black-4)',
                            padding: 12,
                        }}
                    >
                        <Stack.Horizontal gap="12" align="center">
                            <span style={box('Logo')}>Logo</span>
                            <span style={{ ...box('Nav'), flex: 1 }}>Nav</span>
                        </Stack.Horizontal>
                        <Stack.Horizontal gap="24">
                            <aside style={{ ...box('Sidebar'), width: 120 }}>Sidebar</aside>
                            <main style={{ ...box('Content'), flex: 1 }}>Content</main>
                        </Stack.Horizontal>
                    </Stack.Vertical>
                    <Code language="tsx" content={Snippets.Nested.demo} />
                </section>
            </main>
        </Screen>
    )
}
