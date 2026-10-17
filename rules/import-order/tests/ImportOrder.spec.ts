import { parser } from 'typescript-eslint'
import { ruleTester } from '../../config'
import { AssetExtensions, ErrorMessage } from '../ImportOrder.constants'
import { Rules } from '../ImportOrder.rules'

const fileName = '/a/Feature/Blog.tsx'
const typed = { languageOptions: { parser } }
const source = (...lines: string[]) => lines.join('\n')

const assetCases = AssetExtensions.map((extension) => ({
    name: `should throw when the ${extension} asset precedes a same-directory import of one style`,
    code: source(`import logo from './logo${extension}'`, "import button from './Button'"),
    filename: fileName,
    ...typed,
    errors: [{ message: ErrorMessage }],
}))

ruleTester.run('import-order', Rules.Eslint.ImportOrder9, {
    valid: [
        {
            name: 'should not throw when a namespace import precedes a default import',
            code: source("import * as Query from './Query'", "import axios from 'axios'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a default import precedes a mixed import',
            code: source("import axios from 'axios'", "import React, { useState } from 'react'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a mixed import precedes a named import',
            code: source(
                "import React, { useState } from 'react'",
                "import { screen } from '@testing-library/react'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should rank a default beside a namespace as a mixed import',
            code: source(
                "import axios from 'axios'",
                "import React, * as Ns from 'react'",
                "import { screen } from '@testing-library/react'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a value import precedes a type-only import of a deeper path',
            code: source(
                "import { TableUtils } from './Table.utils'",
                "import type { Dictionary } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a type-only import precedes a side-effect import',
            code: source(
                "import type { Dictionary } from '@common-utils'",
                "import './Blog.styles.css'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should treat a type-only default import as type-only',
            code: source("import axios from 'axios'", "import type mongoose from 'mongoose'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should treat a type-only namespace import as type-only',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import type * as Query from './Query'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should treat an inline type specifier as a named import',
            code: source(
                "import axios from 'axios'",
                "import { type Option } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when an unscoped package precedes a scoped package',
            code: source(
                "import axios from 'axios'",
                "import { useQuery } from '@tanstack/react-query'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a scoped package precedes an alias',
            code: source(
                "import { useQuery } from '@tanstack/react-query'",
                "import { isDefined } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when an alias precedes a same-directory import',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import { Button } from './Button'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a same-directory import precedes parent-relative imports',
            code: source(
                "import { TableUtils } from './Table.utils'",
                "import { Overlay } from '../Overlay'",
                "import { Card } from '../../Card'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for two parent-relative imports at the same depth',
            code: source("import { Overlay } from '../Overlay'", "import { Card } from '../Card'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a bare parent import follows an alias',
            code: source("import { isDefined } from '@common-utils'", "import { Table } from '..'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not compare path ranks when the import styles differ',
            code: source(
                "import logo from './logo.png'",
                "import { screen } from '@testing-library/react'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when an asset import follows a package import of one style',
            code: source(
                "import axios from 'axios'",
                "import logo from '@portfolio/assets/logo.png'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should treat a role suffix as part of a name rather than an asset',
            code: source(
                "import { SettingsInput } from './Settings.types'",
                "import { SettingsModel } from './Settings.model'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for two imports of one style and one path in any order',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import { Heading } from '@common-ux'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not compare paths between two side-effect imports',
            code: source("import '@testing-library/jest-dom'", "import './Blog.styles.css'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when two side-effect imports keep a reversed order',
            code: source("import './Blog.styles.css'", "import './About.styles.css'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a stylesheet follows every value import',
            code: source(
                "import userEvent from '@testing-library/user-event'",
                "import { screen, within, waitFor } from '@testing-library/react'",
                "import { isDefined } from '@common-utils'",
                "import type { BoundFunctions, queries } from '@testing-library/react'",
                "import type { UserEvent } from '@testing-library/user-event'",
                "import type { Dictionary, Nullish } from '@common-utils'",
                "import './Accessor.styles.css'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a file with no imports',
            code: 'const value = 1',
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a file with one import',
            code: "import { isDefined } from '@common-utils'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a comment and a blank line sit between two imports',
            code: source(
                "import { isDefined } from '@common-utils'",
                '// a note',
                '',
                "import { Button } from './Button'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a statement sits between two imports',
            code: source(
                "import { isDefined } from '@common-utils'",
                'const value = 1',
                "import { Button } from './Button'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not order a dynamic import',
            code: source(
                "import { Button } from './Button'",
                "const load = () => import('./Modal')",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not order a re-export',
            code: source("import { Button } from './Button'", "export * from './Modal'"),
            filename: fileName,
            ...typed,
        },
    ],
    invalid: [
        {
            name: 'should throw when a namespace import follows a default import',
            code: source("import axios from 'axios'", "import * as Query from './Query'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a default import follows a named import',
            code: source(
                "import { screen } from '@testing-library/react'",
                "import axios from 'axios'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a mixed import follows a named import',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import React, { useState } from 'react'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a value import follows a type-only import',
            code: source(
                "import type { Dictionary } from '@common-utils'",
                "import { isDefined } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a value import follows a side-effect import',
            code: source("import './Blog.styles.css'", "import { isDefined } from '@common-utils'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an inline type import follows a type-only import',
            code: source(
                "import type { Option } from '@common-utils'",
                "import { type Nullish } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a namespace import follows a type-only namespace import',
            code: source(
                "import type * as QueryTypes from './Query'",
                "import * as Query from './Query'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an unscoped package follows a scoped one',
            code: source(
                "import { useQuery } from '@tanstack/react-query'",
                "import axios from 'axios'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a scoped package follows an alias',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import { useQuery } from '@tanstack/react-query'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a scoped package shares a longer prefix with an alias',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import { Router } from '@apple/core'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an alias follows a same-directory import',
            code: source(
                "import { Button } from './Button'",
                "import { isDefined } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a same-directory import follows a parent-relative import',
            code: source(
                "import { Overlay } from '../Overlay'",
                "import { Button } from './Button'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a shallower parent-relative import follows a deeper one',
            code: source(
                "import { Card } from '../../Card'",
                "import { Overlay } from '../Overlay'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a bare parent import precedes a package import',
            code: source("import { Table } from '..'", "import axios from 'axios'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a bare same-directory import precedes a package import',
            code: source("import { Table } from '.'", "import axios from 'axios'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an asset import precedes a package import of one style',
            code: source(
                "import logo from '@portfolio/assets/logo.png'",
                "import axios from 'axios'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once when a later pair breaks the order as well',
            code: source(
                "import { Button } from './Button'",
                "import { isDefined } from '@common-utils'",
                "import axios from 'axios'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        ...assetCases,
    ],
})
