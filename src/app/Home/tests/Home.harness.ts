import { Harness } from '@common-ux/Test'
import type { ElementMap } from '@common-ux/Test'

/**
 * Home: the page a visitor lands on, with its stats block nested inside it.
 *
 * A sub-feature's harness extends this one, so its spec reaches the page around it without
 * repeating a query the page already owns.
 */
export class HomeHarness extends Harness {
    constructor(context = 'Home') {
        super(context)
    }

    override get Elements() {
        return {
            heading: { role: 'heading', name: 'Home' },
        } satisfies ElementMap
    }
}
