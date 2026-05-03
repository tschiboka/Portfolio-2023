import { Code, Pill, Stack } from '@common/ux'
import Page from '../../../../../../../common/ux/Page/Page'
import { Code as Snippets } from './Pills.code'

type PillsProps = { path: string }

const colors = ['accent', 'error', 'success', 'yellow', 'orange', 'purple', 'gray'] as const

export const Pills = ({ path }: PillsProps) => {
    return (
        <Page title={'Tivadar Debnar | Pills'} path={path} recordVisit={false} loginRequired>
            <main>
                <h1>Pill</h1>
                <p>
                    The <code>Pill</code> component renders a small inline badge with coloured text,
                    border and background. It is typically used for status indicators, tags and
                    legend labels.
                </p>

                <section>
                    <h2>Basic Usage</h2>
                    <p>
                        Pass a <code>label</code> to render a pill. The default colour is{' '}
                        <code>accent</code>.
                    </p>
                    <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                        <Pill label="Active" />
                        <Pill label="ERROR" color="error" />
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.Basic.minimal} />
                    <Code language="tsx" content={Snippets.Basic.withColor} />
                </section>

                <section>
                    <h2>Colours</h2>
                    <p>
                        Seven colour variants are available: <code>accent</code> (default),{' '}
                        <code>error</code>, <code>success</code>, <code>yellow</code>,{' '}
                        <code>orange</code>, <code>purple</code> and <code>gray</code>.
                    </p>
                    <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                        {colors.map((c) => (
                            <Pill key={c} label={c.toUpperCase()} color={c} />
                        ))}
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.Colors.allColors} />
                </section>

                <section>
                    <h2>Use Cases</h2>

                    <h3>Status Badge</h3>
                    <p>Map a data value to a colour to display row-level status.</p>
                    <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                        <Pill label="ACTIVE" color="success" />
                        <Pill label="PENDING" color="orange" />
                        <Pill label="INACTIVE" color="error" />
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.UseCases.statusBadge} />

                    <h3>Tags</h3>
                    <p>Render a list of labels as pills.</p>
                    <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                        <Pill label="React" color="purple" />
                        <Pill label="TypeScript" color="purple" />
                        <Pill label="CSS" color="purple" />
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.UseCases.tags} />

                    <h3>Legend</h3>
                    <p>Combine pills with counts for chart or table legends.</p>
                    <Stack.Horizontal gap="12" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                        <span>
                            <Pill label="ACTIVE" color="success" /> = 21
                        </span>
                        <span>
                            <Pill label="PENDING" color="orange" /> = 8
                        </span>
                        <span>
                            <Pill label="INACTIVE" color="error" /> = 3
                        </span>
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.UseCases.legend} />
                </section>

                <section>
                    <h2>Accessibility</h2>
                    <p>
                        Use <code>ariaLabel</code> when the visible label alone doesn{"'"}t convey
                        enough context for screen readers.
                    </p>
                    <Pill label="3 errors" color="error" ariaLabel="3 validation errors found" />
                    <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
                </section>

                <section>
                    <h2>Custom Styling</h2>
                    <p>
                        Override the default appearance with <code>className</code> or inline{' '}
                        <code>style</code>.
                    </p>
                    <Stack.Horizontal gap="8" style={{ flexWrap: 'wrap' }}>
                        <Pill label="Default" color="accent" />
                        <Pill
                            label="Wide"
                            color="accent"
                            style={{ padding: '6px 24px', fontSize: '1rem' }}
                        />
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.CustomStyling.className} />
                    <Code language="tsx" content={Snippets.CustomStyling.style} />
                </section>
            </main>
        </Page>
    )
}
