import { waitFor, within } from '@testing-library/react'
import { isDefined, isFunction } from '@common-utils'
import { HarnessUtils } from './Harness.utils'
import { Accessor, TestError } from '../Accessor/Accessor'
import type { Arrayable, Dictionary, Nullable, Optional, VoidFunction } from '@common-utils'
import type {
    AccessorRecipe,
    ElementEntry,
    ElementMap,
    ElementRecipe,
    HarnessExpect,
    HarnessFind,
    HarnessFindAll,
    HarnessFlow,
    HarnessGet,
    HarnessGetAll,
    HarnessHas,
    HarnessKeys,
    HarnessQuery,
    HarnessQueryAll,
    HarnessWait,
    HarnessWaitFor,
} from './Harness.types'

const isAccessorRecipe = (entry: ElementEntry): entry is AccessorRecipe => 'via' in entry

/**
 * Base for a feature harness: one feature's elements and flows, driven by its spec.
 *
 * An accessor is bound to one component's element. A harness is bound to the rendered document,
 * because a feature is rarely a single element and its spec renders a whole screen. A feature
 * declares its elements in `Elements` and its sequences in `Flow`; both inherit upwards, so a
 * sub-feature's harness reaches the page it sits in instead of repeating it.
 */
export class Harness extends Accessor {
    /** The container the feature's `Render` produced. Testing Library removes it after each test. */
    private rendered: Optional<HTMLElement>
    private withinChecked = false

    constructor(context = 'Harness') {
        super(document.body, context)
    }

    /** Called by the feature's `Render`, so every later call can prove a render happened. */
    protected markRendered(container: HTMLElement): void {
        this.rendered = container
    }

    private assertRendered(): void {
        if (!this.rendered || !document.body.contains(this.rendered))
            throw TestError.notRendered(this.context)
    }

    /** Follows one `within` chain, naming the first key that is unknown or repeats. */
    private findWithinProblem(key: string, path: string[]): Optional<string> {
        const entry = this.Elements[key]
        const target = isAccessorRecipe(entry) ? undefined : entry.within
        if (!target) return undefined
        if (!(target in this.Elements))
            return `"${key}" is searched inside "${target}", which is not an element of this harness`
        if (path.includes(target))
            return `elements are searched inside each other in a circle: ${[...path, target].join(' > ')}`
        return this.findWithinProblem(target, [...path, target])
    }

    /** Every `within` must name a declared key, and no chain may close on itself. */
    private validateWithin(): void {
        if (this.withinChecked) return
        this.withinChecked = true
        const problem = Object.keys(this.Elements)
            .map((key) => this.findWithinProblem(key, [key]))
            .find(isDefined)
        if (problem) throw TestError.conflicting(this.context, problem)
    }

    /**
     * The recipe every entry without a search area is looked up in — a modal, say. Omit to search
     * the document.
     */
    protected get Root(): Optional<ElementRecipe> {
        return undefined
    }

    /**
     * This feature's declarations. A sub-feature overrides it, spreading `super.Elements`.
     *
     * Public rather than protected: the surface types index this member through `this`, and TS
     * refuses to index a protected member on a polymorphic `this` type.
     */
    get Elements(): ElementMap {
        return {}
    }

    get Get(): HarnessGet<this> {
        return {
            ...super.Get,
            ...this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        this.resolve(entry, key, args),
            ),
        } as unknown as HarnessGet<this>
    }

    get GetAll(): HarnessGetAll<this> {
        return this.buildElements((entry) => (...args: unknown[]) => {
            const recipe = this.toRecipe(entry, args)
            return HarnessUtils.queryAll(this.getScope(recipe), recipe)
        }) as HarnessGetAll<this>
    }

    get Query(): HarnessQuery<this> {
        return this.buildAll((entry, key) => (...args: unknown[]) => {
            if (isAccessorRecipe(entry)) return entry.via()
            const recipe = this.toRecipe(entry, args)
            return HarnessUtils.query(this.getScope(recipe), recipe, 'query', this.getContext(key))
        }) as unknown as HarnessQuery<this>
    }

    get QueryAll(): HarnessQueryAll<this> {
        return this.buildElements((entry) => (...args: unknown[]) => {
            const recipe = this.toRecipe(entry, args)
            return HarnessUtils.queryAll(this.getScope(recipe), recipe)
        }) as HarnessQueryAll<this>
    }

    get Find(): HarnessFind<this> {
        return this.buildAll((entry, key) => async (...args: unknown[]) => {
            if (isAccessorRecipe(entry)) return entry.via()
            const recipe = this.toRecipe(entry, args)
            return await HarnessUtils.find(this.getScope(recipe), recipe, this.getContext(key))
        }) as unknown as HarnessFind<this>
    }

    get FindAll(): HarnessFindAll<this> {
        return this.buildElements((entry) => async (...args: unknown[]) => {
            const recipe = this.toRecipe(entry, args)
            return await HarnessUtils.findAll(this.getScope(recipe), recipe)
        }) as HarnessFindAll<this>
    }

    /** Waits for the element, the way `Find` waits for a recipe — the same shape, a declared key. */
    get Wait(): HarnessWait<this> {
        return super.Wait as unknown as HarnessWait<this>
    }

    /** True when the key resolves, false when it does not — `Has` never throws. */
    get Has(): HarnessHas<this> {
        return super.Has as unknown as HarnessHas<this>
    }

    /** What a spec may assert about a declared element, in jest-dom's vocabulary. */
    get Expect(): HarnessExpect<this> {
        const element = (entry: ElementEntry, key: string, args: unknown[]) => (): HTMLElement =>
            this.getNode(entry, key, args, 'get') as HTMLElement
        const present = (entry: ElementEntry, key: string, args: unknown[]) => () =>
            this.getNode(entry, key, args, 'query')
        const value = (args: unknown[]): string => String(args[args.length - 1])
        const check = (name: string, key: string, expectation: string, attempt: VoidFunction) => {
            try {
                attempt()
            } catch {
                throw new Error(`${this.context}.Expect.${name}.${key}: expected ${expectation}`)
            }
        }

        return {
            visible: this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        check('visible', key, 'the element to be visible', () =>
                            expect(element(entry, key, args)()).toBeVisible(),
                        ),
            ),
            absent: this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        check('absent', key, 'nothing to be in the document', () =>
                            expect(present(entry, key, args)()).not.toBeInTheDocument(),
                        ),
            ),
            enabled: this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        check('enabled', key, 'the element to be enabled', () =>
                            expect(element(entry, key, args)()).toBeEnabled(),
                        ),
            ),
            disabled: this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        check('disabled', key, 'the element to be disabled', () =>
                            expect(element(entry, key, args)()).toBeDisabled(),
                        ),
            ),
            checked: this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        check('checked', key, 'the element to be checked', () =>
                            expect(element(entry, key, args)()).toBeChecked(),
                        ),
            ),
            unchecked: this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        check('unchecked', key, 'the element not to be checked', () =>
                            expect(element(entry, key, args)()).not.toBeChecked(),
                        ),
            ),
            text: this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        check('text', key, `the element to have text ${value(args)}`, () =>
                            expect(element(entry, key, args)()).toHaveTextContent(value(args)),
                        ),
            ),
            inputValue: this.buildAll(
                (entry, key) =>
                    (...args: unknown[]) =>
                        check(
                            'inputValue',
                            key,
                            `the element to have display value ${value(args)}`,
                            () =>
                                expect(element(entry, key, args)()).toHaveDisplayValue(value(args)),
                        ),
            ),
        } as unknown as HarnessExpect<this>
    }

    /** State that settles later; presence is `Wait`. */
    get WaitFor(): HarnessWaitFor<this> {
        const element = (entry: ElementEntry, key: string, args: unknown[]) => (): HTMLElement =>
            this.getNode(entry, key, args, 'get') as HTMLElement
        const present = (entry: ElementEntry, key: string, args: unknown[]) => () =>
            this.getNode(entry, key, args, 'query')
        const value = (args: unknown[]): string => String(args[args.length - 1])
        const wait = async (
            name: string,
            key: string,
            expectation: string,
            attempt: VoidFunction,
        ) => {
            try {
                await waitFor(attempt)
            } catch {
                throw new Error(`${this.context}.WaitFor.${name}.${key}: expected ${expectation}`)
            }
        }

        return {
            enabled: this.buildAll(
                (entry, key) =>
                    async (...args: unknown[]) =>
                        await wait('enabled', key, 'the element to be enabled', () =>
                            expect(element(entry, key, args)()).toBeEnabled(),
                        ),
            ),
            gone: this.buildAll(
                (entry, key) =>
                    async (...args: unknown[]) =>
                        await wait('gone', key, 'nothing to be in the document', () =>
                            expect(present(entry, key, args)()).not.toBeInTheDocument(),
                        ),
            ),
            inputValue: this.buildAll(
                (entry, key) =>
                    async (...args: unknown[]) =>
                        await wait(
                            'inputValue',
                            key,
                            `the element to have display value ${value(args)}`,
                            () =>
                                expect(element(entry, key, args)()).toHaveDisplayValue(value(args)),
                        ),
            ),
        } as unknown as HarnessWaitFor<this>
    }

    get Do() {
        return {
            ...super.Do,
            click: async (key?: HarnessKeys<this>) =>
                key ? await Accessor.user.click(this.getElement(key)) : await super.Do.click(),
            dblClick: async (key: HarnessKeys<this>) =>
                await Accessor.user.dblClick(this.getElement(key)),
            paste: async (key: HarnessKeys<this>, value: string) => {
                const element = this.getElement(key)
                await Accessor.user.click(element)
                await Accessor.user.paste(value)
            },
            upload: async (key: HarnessKeys<this>, files: Arrayable<File>) =>
                await Accessor.user.upload(this.getElement(key), files),
            fill: async (key: HarnessKeys<this>, value: string) => {
                const element = this.getElement(key)
                await Accessor.user.clear(element)
                await Accessor.user.type(element, value)
            },
            pick: async (key: HarnessKeys<this>, value: string) =>
                await Accessor.user.selectOptions(this.getElement(key), value),
            clear: async (key: HarnessKeys<this>) =>
                await Accessor.user.clear(this.getElement(key)),
            check: async (key: HarnessKeys<this>) =>
                await Accessor.user.click(this.getElement(key)),
            uncheck: async (key: HarnessKeys<this>) =>
                await Accessor.user.click(this.getElement(key)),
            hover: async (key?: HarnessKeys<this>) =>
                key ? await Accessor.user.hover(this.getElement(key)) : await super.Do.hover(),
        }
    }

    /**
     * This feature's own sequences, each a whole journey built from `Do` and `Wait`. Empty unless a
     * feature declares one, so `Do` keeps meaning one gesture on one element.
     */
    get Flow(): HarnessFlow {
        return {}
    }

    /** The single element a key names, or the accessor it holds. */
    private resolve(entry: ElementEntry, key: string, args: unknown[]): HTMLElement | Accessor {
        this.assertRendered()
        if (isAccessorRecipe(entry)) return entry.via()
        return this.lookUp(entry, key, args, 'get') as HTMLElement
    }

    /** The element a `within` key names — resolved through the declarations, never as a selector. */
    private resolveWithin(key: string): HTMLElement {
        const entry = this.Elements[key]
        if (!entry || isAccessorRecipe(entry))
            throw TestError.notFound(this.context, `within "${key}"`)
        return this.lookUp(entry, key, [], 'get') as HTMLElement
    }

    /** One lookup against the recipe an entry stands for, built with the call's arguments. */
    private lookUp(
        entry: ElementEntry,
        key: string,
        args: unknown[],
        mode: 'get' | 'query',
    ): Nullable<HTMLElement> {
        const recipe = this.toRecipe(entry, args)
        return HarnessUtils.query(this.getScope(recipe), recipe, mode, this.getContext(key))
    }

    /**
     * The node an entry stands for. An accessor entry answers with the element its accessor is bound
     * to, so a `via` key is asserted on like any other rather than re-queried by hand.
     */
    private getNode(
        entry: ElementEntry,
        key: string,
        args: unknown[],
        mode: 'get' | 'query',
    ): Nullable<HTMLElement> {
        if (!isAccessorRecipe(entry)) return this.lookUp(entry, key, args, mode)
        try {
            return entry.via().node
        } catch (error) {
            if (mode === 'get') throw error
            return null
        }
    }

    /** The recipe an entry stands for — built from the call's arguments when the entry is a factory. */
    private toRecipe(entry: ElementEntry, args: unknown[]): ElementRecipe {
        if (!isFunction(entry)) return entry as ElementRecipe
        return (entry as unknown as (...callArgs: unknown[]) => ElementRecipe)(...args)
    }

    /** The element an action targets — only element keys reach this, checked at build time. */
    private getElement(key: HarnessKeys<this>): HTMLElement {
        const getters = this.Get as unknown as Dictionary<() => HTMLElement>
        return getters[String(key)]()
    }

    /** One getter per declared entry, accessor entries included. */
    private buildAll<TResult>(
        build: (entry: ElementEntry, key: string) => TResult,
    ): Dictionary<TResult> {
        return Object.entries(this.Elements).reduce<Dictionary<TResult>>(
            (built, [key, entry]) => ({ ...built, [key]: build(entry, key) }),
            {},
        )
    } /** One getter per element entry — the plural channels have nothing to say about an accessor. */
    private buildElements<TResult>(
        build: (entry: ElementEntry, key: string) => TResult,
    ): Dictionary<TResult> {
        return Object.entries(this.Elements)
            .filter(([, entry]) => !isAccessorRecipe(entry))
            .reduce<Dictionary<TResult>>(
                (built, [key, entry]) => ({ ...built, [key]: build(entry, key) }),
                {},
            )
    }

    /** Where a recipe is looked up: the page root, the whole document, or inside another key. */
    private getScope(entry: ElementRecipe) {
        this.validateWithin()
        this.assertRendered()
        if (entry.within && entry.scope)
            throw TestError.conflicting(this.context, 'a recipe cannot set both within and scope')
        if (entry.within) return within(this.resolveWithin(entry.within))
        if (entry.scope === 'screen') return Accessor.screen
        const root = this.Root
        return root
            ? within(
                  HarnessUtils.query(
                      this.scope,
                      root,
                      'get',
                      this.getContext('root'),
                  ) as HTMLElement,
              )
            : this.scope
    }

    private getContext(key: string): string {
        return `${this.context}.${key}`
    }
}
