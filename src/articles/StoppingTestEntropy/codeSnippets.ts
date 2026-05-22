const codeSnippets = {
    // ── The Problem: Inconsistent Patterns ───────────────────────────────────
    entropyBefore: `// Developer A — role queries
const dialog = screen.getByRole('dialog', { name: 'Confirm' })
const close = within(dialog).getByRole('button', { name: /close/i })
await userEvent.click(close)
expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

// Developer B — placeholder queries
const input = screen.getByPlaceholderText('Email')
fireEvent.change(input, { target: { value: 'a@b.com' } })

// Developer C — CSS selectors
const el = container.querySelector('.email-input input')!
await userEvent.type(el, 'a@b.com')

// Developer D — custom helper
await customTestUtils.click('submit-btn')
await customTestUtils.type('email-input', 'a@b.com')`,

    // ── The Solution: Accessor Pattern ───────────────────────────────────────
    entropyAfter: `// Popup
const popup = Test.Overlay('Confirm')
await popup.Do.close()
expect(popup.Has.dialog()).toBe(false)

// Form
const form = Test.Form('Login')
await form.Input('Email').Do.type('a@b.com')
await form.Do.submit()`,

    // ── Accessor Base Class ──────────────────────────────────────────────────
    accessorBase: `export class Accessor {
    static screen = screen        // global RTL screen
    protected element: HTMLElement // root DOM node
    protected scope: Scope        // within(element) — scoped queries
    protected context: string     // error chain, e.g. "Form('Login').Input('Email')"
    private static _user: UserEvent

    static get user(): UserEvent {
        if (!Accessor._user) Accessor._user = userEvent.setup()
        return Accessor._user
    }

    constructor(element: HTMLElement | null | undefined, context = 'Accessor') {
        if (!element) throw TestError.notFound(context)
        this.element = element
        this.scope = within(element)
        this.context = context
    }

    protected require(selector: string): HTMLElement {
        const el = this.element.querySelector(selector)
        if (!el) throw TestError.notFound(this.context, selector)
        return el as HTMLElement
    }
}`,

    // ── Get Namespace ────────────────────────────────────────────────────────
    getNamespace: `// Base Get — available on every accessor
get Get() {
    return {
        attribute: (name: string) => this.element.getAttribute(name),
        byLabel:   (label: string) => this.scope.getByLabelText(label),
        byText:    (text: string | RegExp) => this.scope.getByText(text),
        className: () => this.element.className,
        style:     () => this.element.style,
        tagName:   () => this.element.tagName,
        textContent: () => this.element.textContent,
    }
}

// Subclass extends via spread
get Get() {
    return {
        ...super.Get,
        isDisabled: () => (this.element as HTMLButtonElement).disabled,
        href:       () => (this.element as HTMLAnchorElement).href,
    }
}`,

    // ── Do Namespace ─────────────────────────────────────────────────────────
    doNamespace: `// Base Do — available on every accessor
get Do() {
    return {
        click:    async () => { await Accessor.user.click(this.element) },
        hover:    async () => { await Accessor.user.hover(this.element) },
        unhover:  async () => { await Accessor.user.unhover(this.element) },
        focus:    () => { this.element.focus() },
        keyboard: async (key: string) => { await Accessor.user.keyboard(key) },
    }
}

// Subclass extensions
get Do() {
    return {
        ...super.Do,
        toggle: async () => { await Accessor.user.click(this.element) },
        type: async (text: string) => { await Accessor.user.type(this.element, text) },
    }
}`,

    // ── Has & Wait (Derived) ─────────────────────────────────────────────────
    hasWait: `// Has — auto-derived via Proxy over Get. Never throws.
get Has(): Record<string, (...args: unknown[]) => boolean> {
    const get = this.Get
    return new Proxy({}, {
        get: (_, prop: string) => {
            if (typeof get[prop] !== 'function') return undefined
            return (...args: unknown[]) => {
                try { return get[prop](...args) != null }
                catch { return false }
            }
        },
    })
}

// Wait — auto-derived via Proxy over Get. Wraps in waitFor().
get Wait(): Record<string, (...args: unknown[]) => Promise<unknown>> {
    const get = this.Get
    return new Proxy({}, {
        get: (_, prop: string) => {
            if (typeof get[prop] !== 'function') return undefined
            return (...args: unknown[]) => waitFor(() => get[prop](...args))
        },
    })
}`,

    // ── Building a Component Accessor ────────────────────────────────────────
    buttonAccessor: `import { Accessor } from '../Accessor/Accessor'

export class ButtonAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            isDisabled: () => (this.element as HTMLButtonElement).disabled,
            size: () => {
                if (this.element.classList.contains('btn--sm')) return 'sm'
                if (this.element.classList.contains('standalone-btn')) return 'md'
                return null
            },
        }
    }
}

// Factory function — locates the element and returns an accessor
export const Button = (name: string | RegExp): ButtonAccessor => {
    const element = Accessor.screen.getByRole('button', { name })
    return new ButtonAccessor(element, \`Button('\${String(name)}')\`)
}`,

    // ── Composite Accessor: Form ─────────────────────────────────────────────
    formAccessor: `class FormInstance extends Accessor {
    // Sub-accessors — scoped to this form, preventing cross-component leaks
    Input = (label: string): InputAccessor => {
        const element = this.scope.getByLabelText(label)
        return new InputAccessor(element, \`\${this.context}.Input('\${label}')\`)
    }

    Button = (name: string | RegExp): ButtonAccessor => {
        const element = this.scope.getByRole('button', { name })
        return new ButtonAccessor(element, \`\${this.context}.Button('\${String(name)}')\`)
    }

    Checkbox = (name: string | RegExp): CheckboxAccessor => {
        const element = this.scope.getByRole('checkbox', { name })
        return new CheckboxAccessor(element, \`\${this.context}.Checkbox('\${String(name)}')\`)
    }

    get Get() {
        return {
            ...super.Get,
            errorMsg:  () => this.scope.queryByRole('alert'),
            errorMsgs: () => this.scope.getAllByRole('alert'),
            fieldset:  (name: string | RegExp) => this.scope.getByRole('group', { name }),
        }
    }

    get Do() {
        return {
            ...super.Do,
            submit: async () => {
                const buttons = this.scope.getAllByRole('button')
                const submit = buttons.find(b => (b as HTMLButtonElement).type === 'submit')
                if (!submit) throw TestError.notFound(this.context, 'submit button')
                await Accessor.user.click(submit)
            },
        }
    }
}

export const Form = (label: string): FormInstance => {
    const element = Accessor.screen.getByRole('form', { name: label })
    return new FormInstance(element, \`Form('\${label}')\`)
}`,

    // ── Set: Rendering & Mocking ─────────────────────────────────────────────
    setPattern: `// Set lives on the factory function — it belongs to the pre-render phase

// Pattern 1: Static mock on the factory (Table, SideMenu)
export const Table = Object.assign(
    (label: string) => {
        const element = Accessor.screen.getByRole('region', { name: label })
        return new TableAccessor(element, \`Table('\${label}')\`)
    },
    {
        Set: {
            mock: <T,>(props: TableProps<T>) => render(<TableComponent {...props} />),
        },
    },
)

// Pattern 2: Spec utility file (Button, Overlay)
// Button.spec.utils.tsx
const label = 'Test Button'
export const Set = {
    button: (props = {}) => {
        render(<Button {...props}>{label}</Button>)
        return Test.Button(label) // render + locate in one call
    },
    link: (props = {}) => {
        render(<Button as="a" href="/test" {...props}>{label}</Button>)
        return Test.Button.Link(label)
    },
}`,

    // ── Test Examples: Before & After ────────────────────────────────────────
    testBefore: `describe('LoginForm', () => {
    it('shows error on invalid email', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)

        const emailInput = screen.getByPlaceholderText('Email')
        const submitBtn = screen.getByRole('button', { name: /submit/i })

        await user.type(emailInput, 'not-an-email')
        await user.click(submitBtn)

        const error = screen.getByRole('alert')
        expect(error).toHaveTextContent('Invalid email')
    })

    it('submits with valid credentials', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)
        server.use(handlePostLogin)

        const email = screen.getByPlaceholderText('Email')
        const pass  = screen.getByPlaceholderText('Password')
        const btn   = screen.getByRole('button', { name: /submit/i })

        await user.type(email, 'admin@test.com')
        await user.type(pass, 'secret123')
        await user.click(btn)

        await waitFor(() => {
            expect(screen.queryByRole('form')).not.toBeInTheDocument()
        })
    })
})`,

    testAfter: `describe('LoginForm', () => {
    it('shows error on invalid email', async () => {
        Page.Do.render({ path: '/login' })
        const form = Test.Form('Login')

        await form.Input('Email').Do.type('not-an-email')
        await form.Do.submit()

        expect(form.Get.errorMsg()).toHaveTextContent('Invalid email')
    })

    it('submits with valid credentials', async () => {
        Page.Do.render({ path: '/login', handlers: [handlePostLogin] })
        const form = Test.Form('Login')

        await form.Input('Email').Do.type('admin@test.com')
        await form.Input('Password').Do.type('secret123')
        await form.Do.submit()

        await form.Wait.byText('Welcome')
    })
})`,

    // ── Real-World: Table Test ────────────────────────────────────────────────
    tableTest: `describe('Table', () => {
    it('renders heading and column headers', () => {
        Test.Table.Set.mock<User>({
            title: 'Users',
            ariaLabel: 'users-table',
            data: users,
            columns: [
                { key: 'name',  header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role',  header: 'Role' },
            ],
        })
        const table = Test.Table('users-table')

        expect(table.Get.heading('Users')).toBeInTheDocument()
        expect(table.Get.columnHeaders()).toHaveLength(3)
    })

    it('sorts by column', async () => {
        Test.Table.Set.mock<User>({ /* ...props */ })
        const table = Test.Table('users-table')

        await table.Do.sortBy('Name')
        // first row is now alphabetically first
    })

    it('filters data', async () => {
        Test.Table.Set.mock<User>({ /* ...props */ })
        const table = Test.Table('users-table')

        await table.Do.toggleFilters()
        expect(table.Has.filterPanel()).toBe(true)

        await table.Do.applyFilters()
        await table.Do.resetFilters()
    })
})`,

    // ── Real-World: Overlay Test ─────────────────────────────────────────────
    overlayTest: `describe('Popup', () => {
    it('closes via close button', async () => {
        const { onClose, popup } = Set.popup({ title: 'Confirm delete' })

        expect(popup.Get.byText('Confirm delete')).toBeInTheDocument()

        await popup.Do.close()
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('closes via Escape key', async () => {
        const { onClose, popup } = Set.popup({ title: 'Settings' })

        await popup.Do.dismiss()
        expect(onClose).toHaveBeenCalled()
    })

    it('closes via backdrop click', async () => {
        const { onClose, popup } = Set.popup({ title: 'Warning' })

        await popup.Do.clickBackdrop()
        expect(onClose).toHaveBeenCalled()
    })
})`,

    // ── MSW Integration ──────────────────────────────────────────────────────
    mswIntegration: `import { server, MockBuilder, RequestBuilder } from '@common/ux/Test'

// Define a mock API handler
const handleGetUsers = RequestBuilder({
    path: '/api/users',
    method: HttpMethods.GET,
    response: MockBuilder({
        data: [
            { id: 1, name: 'Alice', role: 'admin' },
            { id: 2, name: 'Bob',   role: 'user' },
        ],
    }),
})

// Register handlers before tests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Override mid-test
it('shows empty state when no users', async () => {
    server.use(
        handleGetUsers
            .updateResponse(b => b.setValue('data', []))
            .build()
    )
    // ...
})

// MockBuilder is immutable — chain modifications freely
const adminUser = MockBuilder({ id: 1, name: 'Alice', role: 'admin' })
const regularUser = adminUser.modify({ role: 'user' })   // new builder
const renamedUser = regularUser.setValue('name', 'Carol') // new builder
renamedUser.build() // → { id: 1, name: 'Carol', role: 'user' }`,

    // ── Error Messages ───────────────────────────────────────────────────────
    errorMessages: `// When an element is not found, the error message tells you exactly where
// the failure occurred in the accessor chain:

// Form('Login').Input('Email'): not found
// Table('Users'): not found (submit button)
// Button('Save'): not found

export const TestError = {
    notFound: (context: string, detail?: string): Error =>
        new Error(\`\${context}: not found\${detail ? \` (\${detail})\` : ''}\`),
    navigation: (expected: string, actual?: string): Error =>
        new Error(
            \`Expected navigation to "\${expected}", actual: \${
                actual ? \`"\${actual}"\` : 'none'
            }\`,
        ),
}`,

    // ── Full Component List ──────────────────────────────────────────────────
    testNamespace: `import { Test } from '@common/ux/Test'

// Every component accessor is available under Test.*
Test.Button('Save')             // ButtonAccessor
Test.Button.Link('Download')    // LinkButtonAccessor
Test.Form('Login')              // FormInstance → .Input(), .Checkbox(), .Radio(), .Date()
Test.Table('Users')             // TableAccessor
Test.Overlay('Confirm')         // OverlayAccessor
Test.SideMenu('Navigation')     // SideMenuAccessor
Test.Input('Email')             // InputAccessor
Test.Checkbox('Agree')          // CheckboxAccessor
Test.Radio('Option A')          // RadioAccessor
Test.DateInput('Birthday')      // DateAccessor
Test.Nav('Main')                // NavAccessor
Test.Link('Home')               // LinkAccessor
Test.Pill('Active')             // PillAccessor
Test.Code('snippet')            // CodeAccessor
Test.Figure('chart')            // FigureAccessor
Test.LoadingIndicator           // Static: LoadingIndicator.Has.isLoading()
Test.Page                       // Page-level: Test.Page.Do.render({ ... })`,

    // ── Design Rules ─────────────────────────────────────────────────────────
    designRules: `// ✅ Accessors locate elements, read state, and perform single actions
const button = Test.Button('Save')
expect(button.Get.isDisabled()).toBe(false)
await button.Do.click()

// ✅ Has checks existence without throwing
if (popup.Has.dialog()) {
    await popup.Do.close()
}

// ✅ Wait retries until the element appears
await table.Wait.heading('Users')

// ❌ Never put workflows inside accessors
// ❌ Never put assertions inside accessors
// ❌ Never put business logic inside accessors
// ❌ Never put multi-step sequences inside accessors`,
}

export default codeSnippets
