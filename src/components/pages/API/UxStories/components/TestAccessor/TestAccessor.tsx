import { Code } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './TestAccessor.code'
import './TestAccessor.styles.css'

type TestAccessorProps = { path: string }

export const TestAccessor = ({ path }: TestAccessorProps) => {
    const scrollTo = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Screen
            title={'Tivadar Debnar | Test Accessor'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Projects"
            sideMenu={<PageSideMenu />}
        >
            <main className="TestAccessor">
                <StoryNav />
                <h1>Test Accessor Framework</h1>
                <p>
                    Accessors <strong>locate elements</strong>, <strong>expose direct state</strong>
                    , and <strong>perform single user actions</strong>. Nothing more.
                </p>
                <Code language="ts" content={Snippets.Import} />

                <nav>
                    <ul>
                        <li>
                            <a href="#what-it-is" onClick={scrollTo('what-it-is')}>
                                What it is
                            </a>
                        </li>
                        <li>
                            <a href="#what-it-is-not" onClick={scrollTo('what-it-is-not')}>
                                What it is not
                            </a>
                        </li>
                        <li>
                            <a href="#core-problem" onClick={scrollTo('core-problem')}>
                                Core Problem
                            </a>
                        </li>
                        <li>
                            <a href="#public-api" onClick={scrollTo('public-api')}>
                                Public API
                            </a>
                        </li>
                        <li>
                            <a href="#usage-examples" onClick={scrollTo('usage-examples')}>
                                Usage Examples
                            </a>
                        </li>
                        <li>
                            <a href="#design-constraints" onClick={scrollTo('design-constraints')}>
                                Design Constraints
                            </a>
                        </li>
                        <li>
                            <a
                                href="#implementation-internals"
                                onClick={scrollTo('implementation-internals')}
                            >
                                Implementation Internals
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* What it is */}
                <section>
                    <h2 id="what-it-is">What it is</h2>
                    <p>
                        A structured test utility layer built on top of React Testing Library (RTL)
                        and MSW. It doesn&apos;t replace RTL or change how tests run — it&apos;s an
                        abstraction layer that enforces consistent patterns for querying components
                        and simulating user interactions across the entire test suite.
                    </p>
                </section>

                {/* What it is not */}
                <section>
                    <h2 id="what-it-is-not">What it is not</h2>
                    <ul>
                        <li>
                            <strong>Not a replacement for RTL</strong> — It wraps RTL.{' '}
                            <code>screen</code>, <code>render</code>, <code>waitFor</code>,{' '}
                            <code>within</code> are still valid when an accessor doesn&apos;t cover
                            a case.
                        </li>
                        <li>
                            <strong>Not a page-object pattern</strong> — Page objects bundle state +
                            assertions + navigation. Accessors are stateless element wrappers with
                            no assertions and no business logic.
                        </li>
                        <li>
                            <strong>Not a workflow abstraction</strong> — Accessors expose single
                            actions (<code>Do.click</code>, <code>Do.type</code>). Multi-step
                            sequences belong in the test body, not the accessor.
                        </li>
                    </ul>
                    <blockquote>
                        If a test is simpler with raw RTL, use raw RTL. The framework prevents drift
                        on repeated patterns — it doesn&apos;t ban direct DOM access.
                    </blockquote>

                    <h3>Before</h3>
                    <Code language="ts" content={Snippets.Before} />

                    <h3>After</h3>
                    <Code language="ts" content={Snippets.After} />
                </section>

                {/* Core Problem */}
                <section>
                    <h2 id="core-problem">Core Problem</h2>
                    <p>
                        Without this layer, test code drifts into inconsistent patterns. Three query
                        strategies, three user-event lifecycle patterns — multiplied across 100+
                        test files, this becomes unmaintainable.
                    </p>
                    <Code language="ts" content={Snippets.Problem} />
                </section>

                {/* Public API */}
                <section>
                    <h2 id="public-api">Public API</h2>

                    <h3>Namespaces</h3>
                    <p>3 authored + 2 derived:</p>
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
                                    <code>Get</code>
                                </td>
                                <td>Read DOM state</td>
                                <td>Sync</td>
                                <td>Authored</td>
                            </tr>
                            <tr>
                                <td>
                                    <code>Do</code>
                                </td>
                                <td>Simulate user actions</td>
                                <td>Async</td>
                                <td>Authored</td>
                            </tr>
                            <tr>
                                <td>
                                    <code>Set</code>
                                </td>
                                <td>Pre-render setup/mocking</td>
                                <td>Sync</td>
                                <td>Authored</td>
                            </tr>
                            <tr>
                                <td>
                                    <code>Has</code>
                                </td>
                                <td>Check element existence</td>
                                <td>Sync</td>
                                <td>Derived</td>
                            </tr>
                            <tr>
                                <td>
                                    <code>Wait</code>
                                </td>
                                <td>Wait for element</td>
                                <td>Async</td>
                                <td>Derived</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>
                        Base <code>Get</code>
                    </h3>
                    <p>Inherited by all accessors:</p>
                    <Code language="ts" content={Snippets.API.get} />

                    <h3>
                        Base <code>Do</code>
                    </h3>
                    <p>Inherited by all accessors:</p>
                    <Code language="ts" content={Snippets.API.do} />

                    <h3>
                        <code>Has</code> (derived from <code>Get</code>)
                    </h3>
                    <p>
                        Wraps any <code>Get</code> method — returns <code>true</code> if the getter
                        succeeds, <code>false</code> if it throws or returns null:
                    </p>
                    <Code language="ts" content={Snippets.API.has} />
                    <blockquote>
                        <strong>Caveat:</strong> <code>Has</code> should only suppress expected
                        lookup failures (element not found). It is not a general error silencer —
                        runtime bugs like <code>TypeError</code> from broken accessor code should
                        still surface. Keep accessor unit tests healthy to catch these early.
                    </blockquote>

                    <h3>
                        <code>Wait</code> (derived from <code>Get</code>)
                    </h3>
                    <p>
                        Wraps any <code>Get</code> method in RTL&apos;s <code>waitFor</code> —
                        retries until it succeeds. For assertions with <code>expect</code>, use{' '}
                        <code>waitFor</code> directly since <code>Wait</code> doesn&apos;t wrap
                        matchers.
                    </p>
                    <Code language="ts" content={Snippets.API.wait} />

                    <h3>
                        <code>Set</code> (static, pre-render)
                    </h3>
                    <p>
                        <code>Set</code> is <strong>infrastructure</strong> — it belongs to the
                        setup/render phase, not the interaction model. It lives on the static
                        factory, not on accessor instances. <code>Set</code> is a convention, not a
                        contract — simple components expose <code>Set.mock(props)</code>, complex
                        ones define domain-specific methods.
                    </p>
                    <Code language="ts" content={Snippets.API.set} />
                </section>

                {/* Usage Examples */}
                <section>
                    <h2 id="usage-examples">Usage Examples</h2>

                    <h3>Basic interaction</h3>
                    <Code language="ts" content={Snippets.Usage.basic} />

                    <h3>Conditional checks</h3>
                    <Code language="ts" content={Snippets.Usage.conditional} />

                    <h3>Composite accessors</h3>
                    <Code language="ts" content={Snippets.Usage.composite} />

                    <h3>Portaled overlays</h3>
                    <Code language="ts" content={Snippets.Usage.overlay} />

                    <h3>Navigation</h3>
                    <Code language="ts" content={Snippets.Usage.navigation} />

                    <h3>Server mocking</h3>
                    <Code language="ts" content={Snippets.Usage.serverMocking} />

                    <h3>Page render</h3>
                    <Code language="ts" content={Snippets.Usage.pageRender} />
                </section>

                {/* Design Constraints */}
                <section>
                    <h2 id="design-constraints">Design Constraints</h2>

                    <h3>Why only three authored namespaces?</h3>
                    <p>
                        Previous iterations had <code>Get</code>, <code>Query</code>,{' '}
                        <code>Click</code>, <code>Act</code> — five categories with overlapping
                        semantics. More namespaces cause three problems:
                    </p>
                    <ol>
                        <li>
                            <strong>Decision fatigue</strong> — &quot;Does this belong in{' '}
                            <code>Act</code> or <code>Click</code>?&quot;
                        </li>
                        <li>
                            <strong>Fragmented discovery</strong> — Contributors must learn where
                            each method lives across multiple namespaces.
                        </li>
                        <li>
                            <strong>Maintenance drift</strong> — The same concept ends up in
                            different namespaces across different accessors.
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
                                    <code>Get</code>
                                </td>
                            </tr>
                            <tr>
                                <td>Simulating interaction</td>
                                <td>
                                    <code>Do</code>
                                </td>
                            </tr>
                            <tr>
                                <td>Setting up before render</td>
                                <td>
                                    <code>Set</code>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Enforcement</h3>
                    <p>
                        The base <code>Accessor</code> class only defines <code>Get</code>,{' '}
                        <code>Do</code>, <code>Has</code>, and <code>Wait</code> as getters.
                        Subclasses extend via spread. There is no mechanism to add a fourth authored
                        namespace on an instance. <code>Set</code> lives on the static factory,
                        separate from the class. Adding a new namespace requires modifying the base
                        class — that&apos;s the enforcement point.
                    </p>

                    <h3>Principles</h3>

                    <h4>Good</h4>
                    <Code language="ts" content={Snippets.Constraints.namespaceGood} />

                    <h4>Bad</h4>
                    <Code language="ts" content={Snippets.Constraints.namespaceBad} />

                    <ul>
                        <li>
                            <strong>No assertions</strong> — Use <code>expect(...)</code> in the
                            test, never <code>accessor.Expect.*()</code>.
                        </li>
                        <li>
                            <strong>No retries or polling</strong> — The caller decides when to wait
                            via <code>Wait</code> or <code>waitFor</code>.
                        </li>
                        <li>
                            <strong>No business logic</strong> — <code>Do.selectDay(14)</code> (one
                            click) is fine. <code>Do.pickNextAvailableWeekday()</code> (logic +
                            reads) is a test helper.
                        </li>
                        <li>
                            <strong>No multi-step workflows</strong> — <code>Do.click()</code>,{' '}
                            <code>Do.type(text)</code>, <code>Do.toggle()</code> — not{' '}
                            <code>Do.fillFormAndSubmit()</code>.
                        </li>
                        <li>
                            <strong>No hidden waits</strong> — <code>Get</code> is synchronous,{' '}
                            <code>Do</code> is a single async interaction.
                        </li>
                        <li>
                            <strong>
                                <code>Do</code> methods start with a verb
                            </strong>{' '}
                            — <code>Do.click()</code>, <code>Do.toggle()</code>,{' '}
                            <code>Do.selectDay(14)</code>.
                        </li>
                    </ul>

                    <h3>Query Strategy</h3>
                    <blockquote>
                        If the element has a role or label, use an accessible query. If it only has
                        a CSS class, use <code>querySelector</code>.
                    </blockquote>

                    <h4>Good</h4>
                    <Code language="ts" content={Snippets.Constraints.queryGood} />

                    <h4>Bad</h4>
                    <Code language="ts" content={Snippets.Constraints.queryBad} />

                    <h3>Locator Contracts</h3>
                    <p>
                        When labels are repeated across test files, co-locate an{' '}
                        <code>as const</code> object as the single source of truth:
                    </p>
                    <Code language="ts" content={Snippets.Constraints.locatorContract} />
                </section>

                {/* Implementation Internals */}
                <section>
                    <h2 id="implementation-internals">Implementation Internals</h2>
                    <p>
                        <em>
                            This section covers how the framework works under the hood. Consumer
                            code doesn&apos;t need this knowledge — it&apos;s reference for
                            contributors modifying the base class or adding new accessors.
                        </em>
                    </p>

                    <h3>The Accessor Base Class</h3>
                    <Code language="ts" content={Snippets.Internals.baseClass} />

                    <h4>Key decisions</h4>
                    <ul>
                        <li>
                            <strong>
                                <code>static screen</code>
                            </strong>{' '}
                            — Centralises RTL&apos;s <code>screen</code>. Scoped vs. global is
                            explicit: <code>this.scope</code> for children,{' '}
                            <code>Accessor.screen</code> for portaled elements.
                        </li>
                        <li>
                            <strong>
                                <code>within()</code> scoping
                            </strong>{' '}
                            — Every accessor is bound to a specific DOM element. Two forms on one
                            page won&apos;t interfere.
                        </li>
                        <li>
                            <strong>
                                Singleton <code>user</code>
                            </strong>{' '}
                            — One <code>userEvent.setup()</code> instance per test. Prevents
                            desynced keyboard/pointer state.
                        </li>
                        <li>
                            <strong>
                                <code>context</code>
                            </strong>{' '}
                            — Hierarchical caller chain (e.g.{' '}
                            <code>Form(&apos;Login&apos;).Input(&apos;Email&apos;)</code>). Error
                            messages show the full accessor chain.
                        </li>
                        <li>
                            <strong>
                                <code>require()</code>
                            </strong>{' '}
                            — <code>querySelector</code> + throw. Makes must-exist vs.
                            might-be-absent explicit.
                        </li>
                    </ul>

                    <h3>Inheritance Model</h3>
                    <p>
                        Subclasses extend <code>Get</code> and <code>Do</code> via getter override
                        with spread. <code>Has</code> and <code>Wait</code> proxies see the merged
                        result automatically.
                    </p>
                    <Code language="ts" content={Snippets.Constraints.inheritance} />

                    <h3>TestError</h3>
                    <Code language="ts" content={Snippets.Internals.testError} />

                    <h3>MockBuilder</h3>
                    <Code language="ts" content={Snippets.Internals.mockBuilder} />

                    <h3>Page.render</h3>
                    <p>
                        Standard test entry point. Wraps the component in all required providers
                        (React Query, Router, Session, App Context), registers MSW handlers, and
                        resets user state. <code>Page.render()</code> calls{' '}
                        <code>Accessor.resetUser()</code> internally, guaranteeing a clean
                        user-event state per test.
                    </p>
                </section>
            </main>
        </Screen>
    )
}
