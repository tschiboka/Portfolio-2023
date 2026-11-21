import { HarnessMocks } from './Harness.mocks'
import { Harness } from '../Harness'
import { Accessor } from '../../Accessor/Accessor'
import type { ElementMap } from '../Harness.types'

/** A harness over the fixture markup, so a channel spec needs no feature of its own. */
class SpecHarness extends Harness {
    /** Puts the markup in the document and marks this harness as rendered. */
    static mount(html: string = HarnessMocks.html): SpecHarness {
        document.body.innerHTML = `<div id="spec-root">${html}</div>`
        const harness = new SpecHarness()
        harness.markRendered(document.getElementById('spec-root') as HTMLElement)
        return harness
    }

    constructor() {
        super('Spec')
    }

    override get Elements() {
        return HarnessMocks.elements
    }
}

/** A harness over a map of the spec's own, for the guards that reject a declaration. */
const createMapHarness = (elements: ElementMap) => {
    class MapHarness extends Harness {
        static mount(html: string = HarnessMocks.html): MapHarness {
            document.body.innerHTML = `<div id="spec-root">${html}</div>`
            const harness = new MapHarness()
            harness.markRendered(document.getElementById('spec-root') as HTMLElement)
            return harness
        }

        constructor() {
            super('Spec')
        }

        override get Elements() {
            return elements
        }
    }

    return MapHarness
}

/** A harness that composes its own flow, as a feature's `Do` does. */
const createFlowHarness = () => {
    class FlowHarness extends Harness {
        static mount(html: string = HarnessMocks.html): FlowHarness {
            document.body.innerHTML = `<div id="spec-root">${html}</div>`
            const harness = new FlowHarness()
            harness.markRendered(document.getElementById('spec-root') as HTMLElement)
            return harness
        }

        constructor() {
            super('Spec')
        }

        override get Elements() {
            return HarnessMocks.elements
        }

        override get Do() {
            return {
                ...super.Do,
                submit: async () => {
                    const Name = this.Get.name() as HTMLInputElement
                    await Accessor.user.clear(Name)
                    await Accessor.user.type(Name, 'submitted')
                    await Accessor.user.click(this.Get.save())
                },
            }
        }
    }

    return FlowHarness
}

/** A harness whose declarations are looked up inside the fixture panel, unless told otherwise. */
class RootHarness extends Harness {
    static mount(html: string = HarnessMocks.html): RootHarness {
        document.body.innerHTML = `<div id="spec-root">${html}</div>`
        const harness = new RootHarness()
        harness.markRendered(document.getElementById('spec-root') as HTMLElement)
        return harness
    }

    constructor() {
        super('Spec')
    }

    protected override get Root() {
        return { role: 'region', name: 'Panel' } as const
    }

    override get Elements() {
        return {
            inner: { role: 'button' },
            outside: { role: 'button', name: 'Save', scope: 'screen' },
        } satisfies ElementMap
    }
}

/** A harness that holds a component's own accessor rather than declaring a recipe. */
class AccessorHarness extends Harness {
    static mount(html: string = HarnessMocks.html): AccessorHarness {
        document.body.innerHTML = `<div id="spec-root">${html}</div>`
        const harness = new AccessorHarness()
        harness.markRendered(document.getElementById('spec-root') as HTMLElement)
        return harness
    }

    constructor() {
        super('Spec')
    }

    override get Elements() {
        return {
            save: { role: 'button', name: 'Save' },
            panelAccessor: { via: () => new Accessor(document.body, 'Panel') },
            ghostAccessor: {
                via: () => new Accessor(document.querySelector<HTMLElement>('.ghost'), 'Ghost'),
            },
        } satisfies ElementMap
    }
}

/** A harness whose root recipe names a `within` of its own, which a root must ignore. */
class RootWithWithinHarness extends Harness {
    static mount(html: string = HarnessMocks.html): RootWithWithinHarness {
        document.body.innerHTML = `<div id="spec-root">${html}</div>`
        const harness = new RootWithWithinHarness()
        harness.markRendered(document.getElementById('spec-root') as HTMLElement)
        return harness
    }

    constructor() {
        super('Spec')
    }

    protected override get Root() {
        return { role: 'region', name: 'Panel', within: 'ghost' } as const
    }

    override get Elements() {
        return { inner: { role: 'button' } } satisfies ElementMap
    }
}

/** A child harness, adding to what the fixture harness declares. */
class ChildHarness extends SpecHarness {
    static mount(html: string = HarnessMocks.html): ChildHarness {
        document.body.innerHTML = `<div id="spec-root">${html}</div>`
        const harness = new ChildHarness()
        harness.markRendered(document.getElementById('spec-root') as HTMLElement)
        return harness
    }

    override get Elements() {
        return { ...super.Elements, extra: { role: 'button', name: 'Save' } }
    }

    override get Do() {
        return {
            ...super.Do,
            clickTwice: async () => {
                await Accessor.user.click(this.Get.save())
                await Accessor.user.click(this.Get.save())
            },
        }
    }
}

export const HarnessTestUtils = {
    mount: (html?: string) => SpecHarness.mount(html),
    /** A harness carrying a flow of its own. */
    mountFlow: (html?: string) => createFlowHarness().mount(html),
    /** A harness that extends the fixture harness. */
    mountChild: (html?: string) => ChildHarness.mount(html),
    /** A harness that searches inside the fixture panel. */
    mountRooted: (html?: string) => RootHarness.mount(html),
    /** A harness holding a component accessor under one of its keys. */
    mountAccessor: (html?: string) => AccessorHarness.mount(html),
    /** A harness whose root carries a `within` of its own. */
    mountRootWithin: (html?: string) => RootWithWithinHarness.mount(html),
    /** A harness constructed but never rendered, as a spec that forgets `Render()` has. */
    create: () => new SpecHarness(),
    /** A harness over the given declarations, mounted on the fixture markup. */
    mountMap: (elements: ElementMap) => createMapHarness(elements).mount(),
    /** Empties the document, as Testing Library's cleanup does between tests. */
    clear: () => (document.body.innerHTML = ''),
    /** Adds markup inside the rendered root, so a late element does not replace it. */
    append: (html: string) =>
        document.getElementById('spec-root')?.insertAdjacentHTML('beforeend', html),
}
