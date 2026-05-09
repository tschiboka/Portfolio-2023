export const Code = {
    Import: `import { Test } from '@common/ux'`,
    Before: `// Without accessor — scattered patterns, fragile selectors, repeated setup
const user = userEvent.setup()
const dialog = screen.getByRole('dialog', { name: 'Confirm delete' })
const closeBtn = within(dialog).getByRole('button', { name: /close/i })
await user.click(closeBtn)
expect(screen.queryByRole('dialog')).not.toBeInTheDocument()`,
    After: `// With accessor — consistent, scoped, discoverable
const popup = Test.Overlay('Confirm delete')
await popup.Do.close()
expect(popup.Has.dialog()).toBe(false)`,
    Problem: `// Dev A:
const input = screen.getByPlaceholderText('Email')
await userEvent.setup().type(input, 'test@test.com')

// Dev B:
const input = screen.getByRole('textbox', { name: /email/i })
const user = userEvent.setup()
await user.type(input, 'test@test.com')

// Dev C:
const input = container.querySelector('.email-input input')!
fireEvent.change(input, { target: { value: 'test@test.com' } })`,
    API: {
        get: `accessor.Get.attribute(name)   // → string | null
accessor.Get.className()       // → string
accessor.Get.style()           // → CSSStyleDeclaration
accessor.Get.tagName()         // → string
accessor.Get.textContent()     // → string | null
accessor.Get.byText(text)      // → HTMLElement (throws if absent)
accessor.Get.byLabel(label)    // → HTMLElement (throws if absent)`,
        do: `await accessor.Do.click()         // click the element
await accessor.Do.hover()         // hover over the element
await accessor.Do.unhover()       // move pointer away
accessor.Do.focus()               // focus the element
await accessor.Do.keyboard(key)   // press a key (e.g. '{Escape}', '{Tab}')`,
        has: `expect(form.Has.errorMsg()).toBe(true)
expect(form.Has.byText('Welcome')).toBe(true)`,
        wait: `await table.Wait.heading('Users')`,
        set: `Table.Set.mock(props) // static — renders the component
const table = Test.Table('Users') // instance — requires rendered DOM
table.Get.columnHeaders()
await table.Do.sortBy('Name')`,
    },
    Usage: {
        basic: `const form = Test.Form('Login')
const submit = form.Button('Submit')

await submit.Do.click()
expect(submit.Get.isDisabled()).toBe(true)
expect(submit.Get.textContent()).toBe('Submit')
expect(submit.Get.className()).toContain('btn-primary')`,
        conditional: `if (form.Has.errorMsg()) {
    expect(form.Get.errorMsg()).toBe('Invalid credentials')
}`,
        composite: `const form = Test.Form('Registration')
const email = form.Input('Email')
const submit = form.Button('Submit')
const terms = form.Checkbox('Accept terms')

await email.Do.type('user@test.com')
await terms.Do.toggle()
await form.Do.submit()

expect(submit.Get.isDisabled()).toBe(true)`,
        overlay: `const overlay = Test.Overlay('Confirm delete')
overlay.Get.heading() // scoped inside the dialog
await overlay.Do.close()`,
        navigation: `expect(Test.Page.Get.navigatedTo()).toBe('/api/register')
expect(Test.Page.Has.navigated()).toBe(false)
await Test.Page.Wait.navigatedTo('/api/index')`,
        serverMocking: `const getUsers = RequestBuilder({
    path: '/api/users',
    method: HttpMethods.GET,
    response: [{ id: 1, name: 'John' }],
})

const empty = getUsers.updateResponse((mock) => mock.modify({ data: [] }))`,
        pageRender: `Page.render({
    path: LoginRoute,
    handlers: [loginHandler, getUsers],
    session: { isAuthenticated: false },
})`,
    },
    Constraints: {
        namespaceGood: `// Single action
await popup.Do.close()

// Direct state read
expect(button.Get.isDisabled()).toBe(true)

// Semantic verb
await calendar.Do.selectDay(14)`,
        namespaceBad: `// Multi-step workflow — belongs in the test, not the accessor
await form.Do.fillAndSubmit({ email: 'a@b.com', password: 'x' })

// Assertion inside accessor — use expect() in the test
button.Expect.disabled()

// Non-verb Do method
await calendar.Do.day(14)`,
        inheritance: `get Get() {
    return { ...super.Get, isDisabled: () => this.element.hasAttribute('disabled') }
}

get Do() {
    return {
        ...super.Do,
        submit: async () => {
            await Accessor.user.click(this.require('[type="submit"]'))
        },
    }
}`,
        queryGood: `// Factory — accessible query (component boundary)
const form = Test.Form('Login')

// Get/Do internals — CSS selector (implementation detail)
get Get() {
    return { ...super.Get, icon: () => this.require('.nav__icon') }
}`,
        queryBad: `// Factory using CSS selector — fragile at component boundaries
const form = document.querySelector('.login-form')!

// Get/Do using accessible query — over-constrains internals
get Get() {
    return { ...super.Get, icon: () => this.scope.getByRole('img', { name: 'icon' }) }
}`,
        locatorContract: `// login.labels.ts
export const LoginForm = {
    name: 'Login',
    fields: { email: 'Email', password: 'Password' },
    buttons: { submit: 'Log in' },
} as const

// login.spec.ts
import { LoginForm } from './login.labels'

const form = Test.Form(LoginForm.name)
const email = form.Input(LoginForm.fields.email)
const password = form.Input(LoginForm.fields.password)
const submit = form.Button(LoginForm.buttons.submit)

await email.Do.type('user@test.com')
await password.Do.type('secret')
await submit.Do.click()`,
    },
    Internals: {
        baseClass: `export class Accessor {
    static screen = screen
    protected element: HTMLElement
    protected scope: Scope // within(element)
    protected context: string // e.g. 'Form("Login").Input("Email")'

    private static _user: UserEvent // singleton
    static get user(): UserEvent
    static resetUser(): void

    protected require(selector: string): HTMLElement // querySelector + throw
}`,
        testError: `export const TestError = {
    notFound: (context: string, detail?: string) => Error
    navigation: (expected: string, actual?: string) => Error
}

// TestError.notFound('Form("Login").Input("Email")')
// → Form("Login").Input("Email"): not found

// TestError.navigation('/api/index', '/api/login')
// → Expected navigation to "/api/index", actual: "/api/login"`,
        mockBuilder: `const user = MockBuilder({ id: 1, name: 'John', role: 'admin' })
    .modify({ role: 'user' })
    .setValue('name', 'Jane')
    .build()
// → { id: 1, name: 'Jane', role: 'user' }`,
    },
}
