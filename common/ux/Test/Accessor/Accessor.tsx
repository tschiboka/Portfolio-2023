import { screen, within, waitFor, type BoundFunctions, type queries } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'

type Scope = BoundFunctions<typeof queries>

// Unified error factory — all accessor errors use this format: "Context: not found (detail)"
export const TestError = {
    notFound: (context: string, detail?: string): Error =>
        new Error(`${context}: not found${detail ? ` (${detail})` : ''}`),
    navigation: (expected: string, actual?: string): Error =>
        new Error(
            `Expected navigation to "${expected}", actual: ${actual ? `"${actual}"` : 'none'}`,
        ),
}

export class Accessor {
    static screen = screen // centralised RTL screen — for portaled/global queries
    protected element: HTMLElement // root DOM element this accessor is bound to
    protected scope: Scope // within(element) — scoped queries
    protected context: string // hierarchical caller chain for error messages
    private static _user: UserEvent // singleton user-event instance

    static get user(): UserEvent {
        if (!Accessor._user) Accessor._user = userEvent.setup()
        return Accessor._user
    }

    static resetUser(): void {
        Accessor._user = userEvent.setup()
    }

    constructor(element: HTMLElement | null | undefined, context = 'Accessor') {
        if (!element) throw TestError.notFound(context)
        this.element = element
        this.scope = within(element)
        this.context = context
    }

    // querySelector + throw if null — for elements that must exist
    protected require(selector: string): HTMLElement {
        const el = this.element.querySelector(selector)
        if (!el) throw TestError.notFound(this.context, selector)
        return el as HTMLElement
    }

    // Base getters available on every accessor — subclasses extend via: get Get() { return { ...super.Get, ... } }
    get Get() {
        return {
            attribute: (name: string) => this.element.getAttribute(name),
            byLabel: (label: string) => this.scope.getByLabelText(label),
            byText: (text: string | RegExp) => this.scope.getByText(text),
            className: () => this.element.className,
            style: () => this.element.style,
            tagName: () => this.element.tagName,
            textContent: () => this.element.textContent,
        }
    }

    // Base actions available on every accessor — subclasses extend via: get Do() { return { ...super.Do, ... } }
    get Do() {
        return {
            click: async () => {
                await Accessor.user.click(this.element)
            },
            hover: async () => {
                await Accessor.user.hover(this.element)
            },
            unhover: async () => {
                await Accessor.user.unhover(this.element)
            },
            focus: () => {
                this.element.focus()
            },
            keyboard: async (key: string) => {
                await Accessor.user.keyboard(key)
            },
        }
    }

    // Auto-generated via Proxy over Get — wraps each Get method in try-catch, returns boolean.
    // Usage: dateInput.Has.calendar() → true/false. Never throws.
    get Has(): Record<string, (...args: unknown[]) => boolean> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        const get = (this as any).Get as Record<string, (...args: unknown[]) => unknown>
        return new Proxy(
            {},
            {
                get: (_, prop: string) => {
                    if (typeof get[prop] !== 'function') return undefined
                    return (...args: unknown[]) => {
                        try {
                            return get[prop](...args) != null
                        } catch {
                            return false
                        }
                    }
                },
            },
        )
    }

    // Auto-generated via Proxy over Get — wraps each Get method in waitFor().
    // Usage: await table.Wait.heading('Users'). Retries until Get succeeds.
    // Delegates 100% to RTL's waitFor — no custom retry logic or timeouts.
    get Wait(): Record<string, (...args: unknown[]) => Promise<unknown>> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        const get = (this as any).Get as Record<string, (...args: unknown[]) => unknown>
        return new Proxy(
            {},
            {
                get: (_, prop: string) => {
                    if (typeof get[prop] !== 'function') return undefined
                    return (...args: unknown[]) => waitFor(() => get[prop](...args))
                },
            },
        )
    }
}
