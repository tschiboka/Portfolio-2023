import { BlockQuote, Code, CodeText, Heading, Main, Paragraph, Section, Text } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './TestAccessor.code'
import './TestAccessor.styles.css'

type TestAccessorProps = { path: string }

export const TestAccessor = ({ path }: TestAccessorProps) => (
    <Screen
        title={'Tivadar Debnar | Test Accessor'}
        path={path}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main className="TestAccessor">
            <StoryNav />
            <Heading as="h1">Test Accessor Framework</Heading>
            <Paragraph>
                Accessors <strong>locate elements</strong>, <strong>expose direct state</strong>,
                and <strong>perform single user actions</strong>. Nothing more.
            </Paragraph>
            <Code language="ts" content={Snippets.Import} />

            <Section>
                <Heading as="h2" id="what-it-is">
                    What it is
                </Heading>
                <Paragraph>
                    A structured test utility layer built on top of React Testing Library (RTL) and
                    MSW. It doesn&apos;t replace RTL or change how tests run — it&apos;s an
                    abstraction layer that enforces consistent patterns for querying components and
                    simulating user interactions across the entire test suite.
                </Paragraph>
            </Section>

            {/* What it is not */}
            <Section>
                <Heading as="h2" id="what-it-is-not">
                    What it is not
                </Heading>
                <ul>
                    <li>
                        <Text>
                            <strong>Not a replacement for RTL</strong> — It wraps RTL.{' '}
                            <CodeText>screen</CodeText>, <CodeText>render</CodeText>,{' '}
                            <CodeText>waitFor</CodeText>, <CodeText>within</CodeText> are still
                            valid when an accessor doesn&apos;t cover a case.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>Not a page-object pattern</strong> — Page objects bundle state +
                            assertions + navigation. Accessors are stateless element wrappers with
                            no assertions and no business logic.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>Not a workflow abstraction</strong> — Accessors expose single
                            actions (<CodeText>Do.click</CodeText>, <CodeText>Do.type</CodeText>).
                            Multi-step sequences belong in the test body, not the accessor.
                        </Text>
                    </li>
                </ul>
                <BlockQuote>
                    If a test is simpler with raw RTL, use raw RTL. The framework prevents drift on
                    repeated patterns — it doesn&apos;t ban direct DOM access.
                </BlockQuote>

                <Heading as="h3">Before</Heading>
                <Code language="ts" content={Snippets.Before} />

                <Heading as="h3">After</Heading>
                <Code language="ts" content={Snippets.After} />
            </Section>

            {/* Core Problem */}
            <Section>
                <Heading as="h2" id="core-problem">
                    Core Problem
                </Heading>
                <Paragraph>
                    Without this layer, test code drifts into inconsistent patterns. Three query
                    strategies, three user-event lifecycle patterns — multiplied across 100+ test
                    files, this becomes unmaintainable.
                </Paragraph>
                <Code language="ts" content={Snippets.Problem} />
            </Section>

            {/* Public API */}
            <Section>
                <Heading as="h2" id="public-api">
                    Public API
                </Heading>

                <Heading as="h3">Namespaces</Heading>
                <Paragraph>3 authored + 2 derived:</Paragraph>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Purpose</th>
                            <th>Sync/Async</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <CodeText>Get</CodeText>
                            </td>
                            <td>Read DOM state</td>
                            <td>Sync</td>
                            <td>Authored</td>
                        </tr>
                        <tr>
                            <td>
                                <CodeText>Do</CodeText>
                            </td>
                            <td>Simulate user actions</td>
                            <td>Async</td>
                            <td>Authored</td>
                        </tr>
                        <tr>
                            <td>
                                <CodeText>Set</CodeText>
                            </td>
                            <td>Pre-render setup/mocking</td>
                            <td>Sync</td>
                            <td>Authored</td>
                        </tr>
                        <tr>
                            <td>
                                <CodeText>Has</CodeText>
                            </td>
                            <td>Check element existence</td>
                            <td>Sync</td>
                            <td>Derived</td>
                        </tr>
                        <tr>
                            <td>
                                <CodeText>Wait</CodeText>
                            </td>
                            <td>Wait for element</td>
                            <td>Async</td>
                            <td>Derived</td>
                        </tr>
                    </tbody>
                </table>

                <Heading as="h3">
                    Base <CodeText>Get</CodeText>
                </Heading>
                <Paragraph>Inherited by all accessors:</Paragraph>
                <Code language="ts" content={Snippets.API.get} />

                <Heading as="h3">
                    Base <CodeText>Do</CodeText>
                </Heading>
                <Paragraph>Inherited by all accessors:</Paragraph>
                <Code language="ts" content={Snippets.API.do} />

                <Heading as="h3">
                    <CodeText>Has</CodeText> (derived from <CodeText>Get</CodeText>)
                </Heading>
                <Paragraph>
                    Wraps any <CodeText>Get</CodeText> method — returns <CodeText>true</CodeText> if
                    the getter succeeds, <CodeText>false</CodeText> if it throws or returns null:
                </Paragraph>
                <Code language="ts" content={Snippets.API.has} />
                <BlockQuote>
                    <strong>Caveat:</strong> <CodeText>Has</CodeText> should only suppress expected
                    lookup failures (element not found). It is not a general error silencer —
                    runtime bugs like <CodeText>TypeError</CodeText> from broken accessor code
                    should still surface. Keep accessor unit tests healthy to catch these early.
                </BlockQuote>

                <Heading as="h3">
                    <CodeText>Wait</CodeText> (derived from <CodeText>Get</CodeText>)
                </Heading>
                <Paragraph>
                    Wraps any <CodeText>Get</CodeText> method in RTL&apos;s{' '}
                    <CodeText>waitFor</CodeText> — retries until it succeeds. For assertions with{' '}
                    <CodeText>expect</CodeText>, use <CodeText>waitFor</CodeText> directly since{' '}
                    <CodeText>Wait</CodeText> doesn&apos;t wrap matchers.
                </Paragraph>
                <Code language="ts" content={Snippets.API.wait} />

                <Heading as="h3">
                    <CodeText>Set</CodeText> (static, pre-render)
                </Heading>
                <Paragraph>
                    <CodeText>Set</CodeText> is <strong>infrastructure</strong> — it belongs to the
                    setup/render phase, not the interaction model. It lives on the static factory,
                    not on accessor instances. <CodeText>Set</CodeText> is a convention, not a
                    contract — simple components expose <CodeText>Set.mock(props)</CodeText>,
                    complex ones define domain-specific methods.
                </Paragraph>
                <Code language="ts" content={Snippets.API.set} />
            </Section>

            {/* Usage Examples */}
            <Section>
                <Heading as="h2" id="usage-examples">
                    Usage Examples
                </Heading>

                <Heading as="h3">Basic interaction</Heading>
                <Code language="ts" content={Snippets.Usage.basic} />

                <Heading as="h3">Conditional checks</Heading>
                <Code language="ts" content={Snippets.Usage.conditional} />

                <Heading as="h3">Composite accessors</Heading>
                <Code language="ts" content={Snippets.Usage.composite} />

                <Heading as="h3">Portaled overlays</Heading>
                <Code language="ts" content={Snippets.Usage.overlay} />

                <Heading as="h3">Navigation</Heading>
                <Code language="ts" content={Snippets.Usage.navigation} />

                <Heading as="h3">Server mocking</Heading>
                <Code language="ts" content={Snippets.Usage.serverMocking} />

                <Heading as="h3">Page render</Heading>
                <Code language="ts" content={Snippets.Usage.pageRender} />
            </Section>

            {/* Design Constraints */}
            <Section>
                <Heading as="h2" id="design-constraints">
                    Design Constraints
                </Heading>

                <Heading as="h3">Why only three authored namespaces?</Heading>
                <Paragraph>
                    Previous iterations had <CodeText>Get</CodeText>, <CodeText>Query</CodeText>,{' '}
                    <CodeText>Click</CodeText>, <CodeText>Act</CodeText> — five categories with
                    overlapping semantics. More namespaces cause three problems:
                </Paragraph>
                <ol>
                    <li>
                        <Text>
                            <strong>Decision fatigue</strong> — &quot;Does this belong in{' '}
                            <CodeText>Act</CodeText> or <CodeText>Click</CodeText>?&quot;
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>Fragmented discovery</strong> — Contributors must learn where
                            each method lives across multiple namespaces.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>Maintenance drift</strong> — The same concept ends up in
                            different namespaces across different accessors.
                        </Text>
                    </li>
                </ol>
                <table>
                    <thead>
                        <tr>
                            <th>If you&apos;re...</th>
                            <th>Use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Reading DOM state</td>
                            <td>
                                <CodeText>Get</CodeText>
                            </td>
                        </tr>
                        <tr>
                            <td>Simulating interaction</td>
                            <td>
                                <CodeText>Do</CodeText>
                            </td>
                        </tr>
                        <tr>
                            <td>Setting up before render</td>
                            <td>
                                <CodeText>Set</CodeText>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Heading as="h3">Enforcement</Heading>
                <Paragraph>
                    The base <CodeText>Accessor</CodeText> class only defines{' '}
                    <CodeText>Get</CodeText>, <CodeText>Do</CodeText>, <CodeText>Has</CodeText>, and{' '}
                    <CodeText>Wait</CodeText> as getters. Subclasses extend via spread. There is no
                    mechanism to add a fourth authored namespace on an instance.{' '}
                    <CodeText>Set</CodeText> lives on the static factory, separate from the class.
                    Adding a new namespace requires modifying the base class — that&apos;s the
                    enforcement point.
                </Paragraph>

                <Heading as="h3">Principles</Heading>

                <Heading as="h4">Good</Heading>
                <Code language="ts" content={Snippets.Constraints.namespaceGood} />

                <Heading as="h4">Bad</Heading>
                <Code language="ts" content={Snippets.Constraints.namespaceBad} />

                <ul>
                    <li>
                        <Text>
                            <strong>No assertions</strong> — Use <CodeText>expect(...)</CodeText> in
                            the test, never <CodeText>accessor.Expect.*()</CodeText>.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>No retries or polling</strong> — The caller decides when to wait
                            via <CodeText>Wait</CodeText> or <CodeText>waitFor</CodeText>.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>No business logic</strong> —{' '}
                            <CodeText>Do.selectDay(14)</CodeText> (one click) is fine.{' '}
                            <CodeText>Do.pickNextAvailableWeekday()</CodeText> (logic + reads) is a
                            test helper.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>No multi-step workflows</strong> —{' '}
                            <CodeText>Do.click()</CodeText>, <CodeText>Do.type(text)</CodeText>,{' '}
                            <CodeText>Do.toggle()</CodeText> — not{' '}
                            <CodeText>Do.fillFormAndSubmit()</CodeText>.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>No hidden waits</strong> — <CodeText>Get</CodeText> is
                            synchronous, <CodeText>Do</CodeText> is a single async interaction.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>
                                <CodeText>Do</CodeText> methods start with a verb
                            </strong>{' '}
                            — <CodeText>Do.click()</CodeText>, <CodeText>Do.toggle()</CodeText>,{' '}
                            <CodeText>Do.selectDay(14)</CodeText>.
                        </Text>
                    </li>
                </ul>

                <Heading as="h3">Query Strategy</Heading>
                <BlockQuote>
                    If the element has a role or label, use an accessible query. If it only has a
                    CSS class, use <CodeText>querySelector</CodeText>.
                </BlockQuote>

                <Heading as="h4">Good</Heading>
                <Code language="ts" content={Snippets.Constraints.queryGood} />

                <Heading as="h4">Bad</Heading>
                <Code language="ts" content={Snippets.Constraints.queryBad} />

                <Heading as="h3">Locator Contracts</Heading>
                <Paragraph>
                    When labels are repeated across test files, co-locate an{' '}
                    <CodeText>as const</CodeText> object as the single source of truth:
                </Paragraph>
                <Code language="ts" content={Snippets.Constraints.locatorContract} />
            </Section>

            {/* Implementation Internals */}
            <Section>
                <Heading as="h2" id="implementation-internals">
                    Implementation Internals
                </Heading>
                <Paragraph>
                    <em>
                        This section covers how the framework works under the hood. Consumer code
                        doesn&apos;t need this knowledge — it&apos;s reference for contributors
                        modifying the base class or adding new accessors.
                    </em>
                </Paragraph>

                <Heading as="h3">The Accessor Base Class</Heading>
                <Code language="ts" content={Snippets.Internals.baseClass} />

                <Heading as="h4">Key decisions</Heading>
                <ul>
                    <li>
                        <Text>
                            <strong>
                                <CodeText>static screen</CodeText>
                            </strong>{' '}
                            — Centralises RTL&apos;s <CodeText>screen</CodeText>. Scoped vs. global
                            is explicit: <CodeText>this.scope</CodeText> for children,{' '}
                            <CodeText>Accessor.screen</CodeText> for portaled elements.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>
                                <CodeText>within()</CodeText> scoping
                            </strong>{' '}
                            — Every accessor is bound to a specific DOM element. Two forms on one
                            page won&apos;t interfere.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>
                                Singleton <CodeText>user</CodeText>
                            </strong>{' '}
                            — One <CodeText>userEvent.setup()</CodeText> instance per test. Prevents
                            desynced keyboard/pointer state.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>
                                <CodeText>context</CodeText>
                            </strong>{' '}
                            — Hierarchical caller chain (e.g.{' '}
                            <CodeText>Form(&apos;Login&apos;).Input(&apos;Email&apos;)</CodeText>
                            ). Error messages show the full accessor chain.
                        </Text>
                    </li>
                    <li>
                        <Text>
                            <strong>
                                <CodeText>require()</CodeText>
                            </strong>{' '}
                            — <CodeText>querySelector</CodeText> + throw. Makes must-exist vs.
                            might-be-absent explicit.
                        </Text>
                    </li>
                </ul>

                <Heading as="h3">Inheritance Model</Heading>
                <Paragraph>
                    Subclasses extend <CodeText>Get</CodeText> and <CodeText>Do</CodeText> via
                    getter override with spread. <CodeText>Has</CodeText> and{' '}
                    <CodeText>Wait</CodeText> proxies see the merged result automatically.
                </Paragraph>
                <Code language="ts" content={Snippets.Constraints.inheritance} />

                <Heading as="h3">TestError</Heading>
                <Code language="ts" content={Snippets.Internals.testError} />

                <Heading as="h3">MockBuilder</Heading>
                <Code language="ts" content={Snippets.Internals.mockBuilder} />

                <Heading as="h3">Page.render</Heading>
                <Paragraph>
                    Standard test entry point. Wraps the component in all required providers (React
                    Query, Router, Session, App Context), registers MSW handlers, and resets user
                    state. <CodeText>Page.render()</CodeText> calls{' '}
                    <CodeText>Accessor.resetUser()</CodeText> internally, guaranteeing a clean
                    user-event state per test.
                </Paragraph>
            </Section>
        </Main>
    </Screen>
)
