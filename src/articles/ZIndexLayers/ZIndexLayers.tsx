import Article from '../../components/sharedComponents/Article/Article'
import { Code, CodeText, Heading, Paragraph, Pill, PillColor, Section, Table } from '@common/ux'
import Figure from '../../components/sharedComponents/Figure/Figure'
import { codeSnippets } from './codeSnippets'
import InlineReference from '../../components/sharedComponents/InlineReference/InlineReference'
import { getReferenceList } from '../references'
import uiLayersImg from '../../assets/images/blog/z_index/ui_layers.png'

interface Props {
    pageName: string
    path: string
}

const ZIndexLayers = ({ pageName, path }: Props) => {
    const references = getReferenceList(path)
    return (
        <Article
            pageName={pageName}
            path={path}
            title="De-scrambling z-index hell with Layer-Based Design"
        >
            <Heading as="h1">De-scrambling z-index with Layer-Based Design</Heading>
            <Section>
                <Heading as="h2" id="the-problem">
                    The Problem
                </Heading>
                <Paragraph>
                    Raw z-index values are a maintenance nightmare. A value like{' '}
                    <CodeText>z-index: 10000</CodeText> appears across the codebase with no context
                    — is it 10000 because it needs to be above the nav, or was it just the first
                    number that worked? Over time, these arbitrary values accumulate, and bumping
                    one layer means bumping everything above it.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2" id="the-solution">
                    The Solution: Semantic Layers
                </Heading>
                <Paragraph>
                    Instead of raw numbers, we define named layers. Each layer represents a UI
                    responsibility, not a numeric value{' '}
                    <InlineReference reference={references[0]} />. The values follow a simple
                    formula: <CodeText>layer(n) = n &times; 10</CodeText>, giving us room to insert
                    new layers between existing ones.
                </Paragraph>
                <Code
                    fileName="Const.ts"
                    language="typescript"
                    content={codeSnippets.layerDefinition}
                />
                <Figure
                    image={uiLayersImg}
                    className="image--med"
                    alt="Z-index layer system diagram showing the hierarchy from Base to Top"
                    zoomAllowed={true}
                />
                <Paragraph>
                    The mental model is a clear hierarchy:{' '}
                    <CodeText>Base &rarr; Sticky &rarr; Dropdown &rarr; Panel &rarr; Top</CodeText>.
                    Within a Panel, the internal order is{' '}
                    <CodeText>Backdrop (39) &lt; Panel (40) &lt; Close (41)</CodeText>.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2" id="usage">
                    Usage
                </Heading>
                <Paragraph>
                    Using the layer system is straightforward — import <CodeText>Const</CodeText>{' '}
                    and reference the semantic name:
                </Paragraph>
                <Code fileName="Component.tsx" language="tsx" content={codeSnippets.usage} />
                <Paragraph>
                    The CSS file no longer contains any raw z-index values — they all come from{' '}
                    <CodeText>ZIndex</CodeText> via inline styles. Every z-index decision is
                    explicit and auditable.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2" id="stacking-context-trap">
                    The Stacking Context Trap
                </Heading>
                <Paragraph>
                    Semantic layer values alone are not enough. There is a second, subtler problem
                    that has likely caused every "my z-index is 9999 but it is still behind" bug you
                    have ever encountered:{' '}
                    <strong>a parent with a lower z-index traps its children</strong>
                    <InlineReference reference={references[0]} />{' '}
                    <InlineReference reference={references[2]} />.
                </Paragraph>
                <Paragraph>
                    When an element has both <CodeText>position: relative</CodeText> (or fixed,
                    absolute, sticky) and <CodeText>z-index</CodeText>, it creates a new stacking
                    context. Any child inside it — regardless of how high its z-index is — is
                    stacked relative to its siblings within that context, not the document.
                </Paragraph>
                <Code
                    fileName="StackingContextTrap.tsx"
                    language="tsx"
                    content={codeSnippets.stackingContextTrap}
                />
                <Paragraph>
                    This is where the layer system's real value becomes clear. By always using{' '}
                    <CodeText>ZIndex</CodeText> values and never nesting different layers as parent
                    and child, the trap is avoided entirely. A Panel (<CodeText>40</CodeText>)
                    should never be a child of a Sticky (<CodeText>20</CodeText>). Layers live
                    alongside each other in the DOM, not inside each other.
                </Paragraph>
                <Paragraph>
                    If a component needs to render above everything else (a modal, a toast, a global
                    overlay), it should be <strong>portalled to the root of the application</strong>{' '}
                    — not nested five levels deep inside a positioned parent with a lower z-index.
                    The layer system makes this expectation explicit: if the component belongs to
                    Panel or Top, it should be rendered as a sibling of the app shell, not a child
                    of the content area.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2" id="layers">
                    Layer Reference
                </Heading>
                <Table
                    data={[
                        {
                            layer: 'ZIndex.base',
                            value: '10',
                            useCase: 'Default content (layouts, cards, forms)',
                        },
                        {
                            layer: 'ZIndex.sticky',
                            value: '20',
                            useCase: 'Persistent in-page UI (headers, sticky nav)',
                        },
                        {
                            layer: 'ZIndex.dropdown',
                            value: '30',
                            useCase: 'Anchored transient UI (menus, selects, popovers)',
                        },
                        {
                            layer: 'ZIndex.backdrop',
                            value: '39',
                            useCase: 'Blocking layer behind panel content',
                        },
                        {
                            layer: 'ZIndex.panel',
                            value: '40',
                            useCase: 'Full-screen UI domain (modals, drawers, dialogs)',
                        },
                        {
                            layer: 'ZIndex.close',
                            value: '41',
                            useCase: 'Panel controls above content',
                        },
                        {
                            layer: 'ZIndex.top',
                            value: '50',
                            useCase: 'Highest-priority global UI (toasts, system alerts)',
                        },
                    ]}
                    columns={[
                        {
                            header: 'Layer',
                            accessor: 'layer',
                            cell: (cell) => <CodeText>{cell}</CodeText>,
                        },
                        {
                            header: 'Value',
                            accessor: 'value',
                            cell: (cell) => {
                                const colorMap: Record<string, PillColor> = {
                                    '10': 'gray',
                                    '20': 'yellow',
                                    '30': 'orange',
                                    '39': 'success',
                                    '40': 'accent',
                                    '41': 'purple',
                                    '50': 'error',
                                }
                                return (
                                    <Pill
                                        label={cell}
                                        color={colorMap[cell] ?? 'gray'}
                                        variant="solid"
                                    />
                                )
                            },
                        },
                        { header: 'Use Case', accessor: 'useCase', breakpoint: 'sm' },
                    ]}
                />
            </Section>
            <Section>
                <Heading as="h2" id="conclusion">
                    Conclusion
                </Heading>
                <Paragraph>
                    Z-index chaos is not a technical problem. It is a communication problem. This
                    system works because it replaces: “what number should I use?” with “what layer
                    does this belong to?”
                </Paragraph>
            </Section>
        </Article>
    )
}

export default ZIndexLayers
