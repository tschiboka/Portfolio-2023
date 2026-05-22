import Article from '../../components/sharedComponents/Article/Article'
import { Code, CodeText, Heading, List, Paragraph, Section, Typography } from '@common/ux'
import codeSnippets from './codeSnippets'

interface Props {
    pageName: string
    path: string
}

const StoppingTestEntropy = ({ pageName, path }: Props) => {
    return (
        <Article pageName={pageName} path={path} title="Stopping Test Entropy" hasContentNavigator>
            <Section>
                <Heading as="h1">Stopping Test Entropy</Heading>
                <Paragraph>
                    How inconsistent testing patterns quietly destroy maintainability — and what we
                    can do about it.
                </Paragraph>

                {/* ── The Problem ───────────────────────────────────────── */}
                <Heading as="h2">The Problem</Heading>
                <Paragraph>
                    Frontend teams rarely fail because they lack testing tools. They fail because
                    their testing tools slowly stop meaning the same thing everywhere.
                </Paragraph>
                <Paragraph>
                    Over time, tests drift. Not in obvious ways, but in small, locally rational
                    decisions: one engineer prefers role-based queries, another prefers
                    placeholders, someone wraps RTL in a helper, another introduces custom click
                    utilities. Legacy code keeps old patterns alive while new features introduce
                    newer ones.
                </Paragraph>
                <Paragraph>
                    Nothing is wrong individually. But collectively, the system becomes fragmented.
                    We call this <Typography weight="bold">test entropy</Typography>.
                </Paragraph>
            </Section>

            {/* ── What Test Entropy Looks Like ──────────────────────── */}
            <Section>
                <Heading as="h2">What Test Entropy Looks Like</Heading>
                <Paragraph>
                    A typical mature frontend codebase doesn't have one testing style. It has
                    several layered on top of each other. Four developers writing the same login
                    form test might produce four fundamentally different files:
                </Paragraph>
                <Code
                    fileName="entropy-examples.spec.tsx"
                    language="tsx"
                    content={codeSnippets.entropyBefore}
                />
                <Paragraph>
                    Each approach solves a local problem. But together they create global
                    inconsistency. The cost isn't immediately visible in runtime failures. It shows
                    up in more subtle ways:
                </Paragraph>
                <List
                    items={[
                        'Developers hesitate when writing tests',
                        'Code review becomes style policing instead of logic review',
                        'Refactors become unpredictable',
                        'Debugging requires understanding multiple "eras" of test patterns',
                        'Onboarding feels like learning multiple testing dialects',
                    ]}
                />
                <Paragraph>
                    At scale, the biggest issue is not correctness. It's{' '}
                    <Typography weight="bold">cognitive overhead</Typography>. Every test becomes
                    slightly different, and every developer must continuously translate between
                    patterns.
                </Paragraph>
            </Section>

            {/* ── Why Documentation Doesn't Solve It ───────────────── */}
            <Section>
                <Heading as="h2">Why Documentation Doesn't Solve It</Heading>
                <Paragraph>
                    The usual response is: "We should standardise and document testing best
                    practices." It helps temporarily, but it doesn't solve the underlying issue.
                </Paragraph>
                <Paragraph>
                    Engineers still copy older tests, evolve local helpers, optimise for their
                    immediate file, introduce new abstractions for convenience, and inherit patterns
                    without questioning them. Documentation describes the desired state but does not
                    enforce it. Over time, reality diverges again.
                </Paragraph>
                <Paragraph>
                    We addressed this by enforcing consistency at the structural level rather than
                    through documentation.
                </Paragraph>
            </Section>

            {/* ── The Idea ─────────────────────────────────────────── */}
            <Section>
                <Heading as="h2">The Idea: Reduce Valid Mental Models</Heading>
                <Paragraph>
                    The root cause of entropy is not complexity itself. It is{' '}
                    <Typography weight="bold">too many valid ways to do the same thing</Typography>.
                    So the approach is simple in principle: reduce the surface area of
                    decision-making in tests. Not by removing React Testing Library. Not by banning
                    patterns. But by introducing a constrained abstraction layer that standardises
                    how interaction is expressed.
                </Paragraph>
                <Paragraph>Same two tests, rewritten with our accessor layer:</Paragraph>
                <Code
                    fileName="accessor-examples.spec.tsx"
                    language="tsx"
                    content={codeSnippets.entropyAfter}
                />
                <Paragraph>
                    What changed is not just syntax. Query logic is centralised, scoping logic is
                    encapsulated, and interaction logic is standardised. Tests now express{' '}
                    <Typography weight="bold">intent</Typography> rather than mechanics.
                </Paragraph>
            </Section>

            {/* ── The Accessor Base Class ───────────────────────────── */}
            <Section>
                <Heading as="h2">The Accessor Base Class</Heading>
                <Paragraph>
                    Every component accessor inherits from a single <CodeText>Accessor</CodeText>{' '}
                    base class. It wraps a DOM element, provides scoped queries via RTL's{' '}
                    <CodeText>within()</CodeText>, maintains a hierarchical context string for error
                    messages, and shares a singleton <CodeText>userEvent</CodeText> instance across
                    all accessors.
                </Paragraph>
                <Code fileName="Accessor.tsx" language="tsx" content={codeSnippets.accessorBase} />
                <Paragraph>
                    The <CodeText>context</CodeText> string is one of the most practical features.
                    When a lookup fails, the error tells you exactly where in the accessor chain the
                    failure occurred — not just that "an element was not found":
                </Paragraph>
                <Code fileName="TestError.ts" language="tsx" content={codeSnippets.errorMessages} />
            </Section>

            {/* ── The Five Namespaces ───────────────────────────────── */}
            <Section>
                <Heading as="h2">The Five Namespaces</Heading>
                <Paragraph>
                    To prevent expansion of abstraction layers, we restricted the API surface to
                    five core namespaces. Only three are authored — the other two are automatically
                    derived.
                </Paragraph>

                <Heading as="h3">Get — Read State</Heading>
                <Paragraph>
                    <CodeText>Get</CodeText> contains synchronous queries that read DOM state. The
                    base class provides common getters like <CodeText>textContent</CodeText>,{' '}
                    <CodeText>attribute</CodeText>, and <CodeText>byText</CodeText>. Subclasses
                    extend via spread:
                </Paragraph>
                <Code fileName="Get.ts" language="tsx" content={codeSnippets.getNamespace} />

                <Heading as="h3">Do — User Interactions</Heading>
                <Paragraph>
                    <CodeText>Do</CodeText> contains async user actions. The base class provides{' '}
                    <CodeText>click</CodeText>, <CodeText>hover</CodeText>,{' '}
                    <CodeText>focus</CodeText>, and <CodeText>keyboard</CodeText>. Subclasses add
                    component-specific actions:
                </Paragraph>
                <Code fileName="Do.ts" language="tsx" content={codeSnippets.doNamespace} />

                <Heading as="h3">Has & Wait — Derived Automatically</Heading>
                <Paragraph>
                    <CodeText>Has</CodeText> and <CodeText>Wait</CodeText> are not authored
                    manually. They are auto-generated via JavaScript <CodeText>Proxy</CodeText> over{' '}
                    <CodeText>Get</CodeText>. <CodeText>Has</CodeText> wraps each getter in a
                    try-catch and returns a boolean — it never throws. <CodeText>Wait</CodeText>{' '}
                    wraps each getter in RTL's <CodeText>waitFor()</CodeText> for async retrying.
                </Paragraph>
                <Code fileName="Has-Wait.ts" language="tsx" content={codeSnippets.hasWait} />
                <Paragraph>
                    This means every <CodeText>Get</CodeText> method a subclass adds automatically
                    becomes available on <CodeText>Has</CodeText> and <CodeText>Wait</CodeText> with
                    zero extra code. Add a <CodeText>Get.calendar()</CodeText> to a date accessor
                    and you immediately get <CodeText>Has.calendar()</CodeText> and{' '}
                    <CodeText>Wait.calendar()</CodeText> for free.
                </Paragraph>

                <Heading as="h3">Set — Rendering & Mocking</Heading>
                <Paragraph>
                    <CodeText>Set</CodeText> is different. It lives{' '}
                    <Typography as="strong">on the factory function</Typography>, not on instances.
                    It belongs to the pre-render phase: rendering components, registering MSW
                    handlers, providing context.
                </Paragraph>
                <Code fileName="Set.ts" language="tsx" content={codeSnippets.setPattern} />
            </Section>

            {/* ── Building a Component Accessor ─────────────────────── */}
            <Section>
                <Heading as="h2">Building a Component Accessor</Heading>
                <Paragraph>
                    A component accessor is a class that extends <CodeText>Accessor</CodeText>,
                    overrides <CodeText>Get</CodeText> and <CodeText>Do</CodeText> with
                    component-specific methods, and is instantiated by a factory function that
                    locates the root element:
                </Paragraph>
                <Code fileName="Button.tsx" language="tsx" content={codeSnippets.buttonAccessor} />
                <Paragraph>
                    The factory function is the public API. It uses an RTL role query to find the
                    element and passes a descriptive context string. If the element doesn't exist,
                    the <CodeText>Accessor</CodeText> constructor throws with the context.
                </Paragraph>
            </Section>

            {/* ── Composite Accessors ───────────────────────────────── */}
            <Section>
                <Heading as="h2">Composite Accessors</Heading>
                <Paragraph>
                    Some components contain other components. A form contains inputs, buttons,
                    checkboxes, and date pickers. The <CodeText>Form</CodeText> accessor exposes
                    sub-accessor factory methods that are{' '}
                    <Typography as="strong">scoped to the form element</Typography> — they use{' '}
                    <CodeText>this.scope</CodeText> instead of the global screen, so lookups never
                    leak across component boundaries.
                </Paragraph>
                <Code fileName="Form.tsx" language="tsx" content={codeSnippets.formAccessor} />
                <Paragraph>
                    The context chain builds hierarchically. If you call{' '}
                    <CodeText>form.Input('Email')</CodeText> and the input doesn't exist, the error
                    reads <CodeText>Form('Login').Input('Email'): not found</CodeText> — telling you
                    exactly which component in which parent failed.
                </Paragraph>
            </Section>

            {/* ── Real-World Tests ──────────────────────────────────── */}
            <Section>
                <Heading as="h2">Tests: Before and After</Heading>
                <Paragraph>
                    Here is a typical login form test written the traditional way — raw RTL queries,
                    manual user-event setup, ad-hoc element lookups:
                </Paragraph>
                <Code
                    fileName="LoginForm.spec.tsx (before)"
                    language="tsx"
                    content={codeSnippets.testBefore}
                />
                <Paragraph>And the same tests rewritten with the accessor pattern:</Paragraph>
                <Code
                    fileName="LoginForm.spec.tsx (after)"
                    language="tsx"
                    content={codeSnippets.testAfter}
                />
                <Paragraph>
                    The difference isn't just fewer lines. It's fewer decisions. The developer
                    doesn't choose which query to use, how to scope lookups, or how to trigger
                    interactions. Those decisions are made once, in the accessor, and reused
                    everywhere.
                </Paragraph>
            </Section>

            {/* ── More Examples ─────────────────────────────────────── */}
            <Section>
                <Heading as="h2">More Real-World Examples</Heading>

                <Heading as="h3">Table</Heading>
                <Paragraph>
                    The <CodeText>Table</CodeText> accessor is the most feature-rich, with getters
                    and actions for sorting, filtering, pagination, row selection, expansion, and
                    downloads:
                </Paragraph>
                <Code fileName="Table.spec.tsx" language="tsx" content={codeSnippets.tableTest} />

                <Heading as="h3">Overlay</Heading>
                <Paragraph>
                    The <CodeText>Overlay</CodeText> accessor handles popups, action menus, and
                    portaled elements — components that live outside the normal DOM tree:
                </Paragraph>
                <Code
                    fileName="Overlay.spec.tsx"
                    language="tsx"
                    content={codeSnippets.overlayTest}
                />
            </Section>

            {/* ── The Full Test Namespace ───────────────────────────── */}
            <Section>
                <Heading as="h2">The Full Test Namespace</Heading>
                <Paragraph>
                    Every component accessor is collected under a single <CodeText>Test</CodeText>{' '}
                    namespace. This is the entire vocabulary a developer needs to learn:
                </Paragraph>
                <Code
                    fileName="Test namespace"
                    language="tsx"
                    content={codeSnippets.testNamespace}
                />
            </Section>

            {/* ── Design Rules ──────────────────────────────────────── */}
            <Section>
                <Heading as="h2">Design Rules</Heading>
                <Paragraph>
                    The constraints that keep the layer from becoming its own source of entropy:
                </Paragraph>
                <List
                    items={[
                        'Accessors locate elements, read state, and perform single user actions. Nothing more.',
                        'No workflows — no multi-step actions, no business logic, no hidden sequencing.',
                        'No assertions inside accessors — assertions live in the test.',
                        'Has and Wait are never authored manually — they are derived from Get.',
                        'Set belongs on the factory, not the instance — it is a pre-render concern.',
                        'Raw RTL is still valid when it is clearer — the goal is consistency, not purity.',
                    ]}
                />
                <Code
                    fileName="design-rules.ts"
                    language="tsx"
                    content={codeSnippets.designRules}
                />
            </Section>

            {/* ── What This Is Not ──────────────────────────────────── */}
            <Section>
                <Heading as="h2">What This Is Not</Heading>
                <Paragraph>
                    A critical part of this design is explicit limitation. This is not:
                </Paragraph>
                <List
                    items={[
                        'A test runner — Vitest still runs everything.',
                        'A replacement for RTL — it builds on top of it.',
                        'A page object model — accessors are component-scoped, not page-scoped.',
                        'A workflow engine — accessors perform single actions, not sequences.',
                        'Mandatory everywhere — raw RTL is still valid when it is clearer.',
                    ]}
                />
                <Paragraph>
                    The goal is not to reinvent React Testing Library. It is to stop it from slowly
                    fracturing into incompatible local interpretations of itself.
                </Paragraph>
            </Section>

            {/* ── What Success Looks Like ───────────────────────────── */}
            <Section>
                <Heading as="h2">What Success Looks Like</Heading>
                <Paragraph>
                    Success is not full adoption, elimination of raw RTL, or architectural purity.
                    Success looks like:
                </Paragraph>
                <List
                    items={[
                        'Fewer style debates in pull requests',
                        'Consistent patterns across the codebase',
                        'Easier onboarding for new engineers',
                        'Less duplicated test infrastructure',
                        'Predictable debugging experience',
                        'Lower cognitive overhead when switching between files',
                    ]}
                />
                <Paragraph>In short: tests start feeling like one system again.</Paragraph>
            </Section>

            {/* ── Closing Thought ───────────────────────────────────── */}
            <Section>
                <Heading as="h2">Closing Thought</Heading>
                <Paragraph>
                    Most large-scale engineering problems are not solved by adding complexity. They
                    are solved by removing optionality. This approach is one attempt to apply that
                    principle to testing — not to add a new framework, but to reduce the number of
                    valid ways to express the same thing until consistency becomes the path of least
                    resistance.
                </Paragraph>
            </Section>
        </Article>
    )
}

export default StoppingTestEntropy
