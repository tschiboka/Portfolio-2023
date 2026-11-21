import { NoDeepImportTestUtils } from './NoDeepImport.spec.utils'
import { Rules } from '../NoDeepImport.rules'
import { ruleTester } from '../../config'

const { caseFor, inRepo, problemFor } = NoDeepImportTestUtils

ruleTester.run('no-deep-import', Rules.Eslint.NoDeepImport9, {
    valid: [
        // A folder, reached through the barrel it declares.
        caseFor('src/app/Probe.ts'),
        {
            name: 'should not throw for a sibling module in the same folder',
            code: "import { UpdateRecords } from './UpdateRecords'",
            filename: inRepo('src/app/Record/components/Probe.ts'),
        },
        {
            name: 'should not throw for a package import',
            code: "import { useState } from 'react'",
            filename: inRepo('src/app/Probe.ts'),
        },
        {
            name: 'should not throw for a file in the same folder',
            code: "import { HomeHarness } from './Home.harness'",
            filename: inRepo('src/app/Home/tests/Home.spec.ts'),
        },
        {
            name: 'should not throw for an aliased path, which names the barrel itself',
            code: "import { Home } from '@app'",
            filename: inRepo('src/app/Probe.ts'),
        },
        {
            name: 'should not throw for a parent folder, named as `..`',
            code: "import { Admin } from '..'",
            filename: inRepo('src/app/Home/Probe.ts'),
        },
        {
            name: 'should not throw for a folder under `tests`, which needs no barrel',
            code: "import { HomeHarness } from '../tests/Home.harness'",
            filename: inRepo('src/app/Home/WebsiteStats/WebsiteStats.tsx'),
        },
    ],
    invalid: [
        problemFor('src/app/Probe.ts', "import { Home } from './Home/Home'", './Home'),
        problemFor('src/app/Probe.ts', "export { Home } from './Home/Home'", './Home'),
        problemFor('src/app/Probe.ts', "export * from './Home/Home'", './Home'),
        problemFor(
            'src/app/Record/Probe.tsx',
            "import { UpdateRecords } from './components/UpdateRecords'",
            './components',
        ),
        problemFor(
            'src/app/Home/tests/Probe.ts',
            "import { WebsiteStats } from '../WebsiteStats/WebsiteStats'",
            '../WebsiteStats',
        ),
    ],
})
