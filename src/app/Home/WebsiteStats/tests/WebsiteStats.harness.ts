import { Test } from '@common-ux/Test'
import { HomeHarness } from '../../tests/Home.harness'
import type { ElementMap } from '@common-ux/Test'

/**
 * Website Stats: the activity breakdown inside Home, reached through Home's harness.
 *
 * The table keeps its own accessor — the harness only says that the feature has one — and the
 * page heading comes from `HomeHarness`, so neither is restated here.
 */
export class WebsiteStatsHarness extends HomeHarness {
    private readonly table = Test.Table('Activity Feed Table')

    constructor() {
        super('WebsiteStats')
    }

    override get Elements() {
        return {
            ...super.Elements,
            section: { role: 'region', name: 'Website Stats' },
            table: { via: () => this.table },
        } satisfies ElementMap
    }

    get Do() {
        return {
            ...super.Do,
            refresh: async () => await this.table.Do.refresh(),
        }
    }
}
