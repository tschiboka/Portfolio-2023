import { parser } from 'typescript-eslint'
import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoDuplicateImport.constants'
import { Rules } from '../NoDuplicateImport.rules'

const fileName = '/a/Feature/Blog.tsx'
const typed = { languageOptions: { parser } }
const source = (...lines: string[]) => lines.join('\n')

ruleTester.run('no-duplicate-import', Rules.Eslint.NoDuplicateImport9, {
    valid: [
        {
            name: 'should not throw when one path carries a value and a type import',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import type { Dictionary } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when one path carries a default value and a type import',
            code: source("import axios from 'axios'", "import type axiosTypes from 'axios'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for two imports of different paths',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import { Button } from './Button'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for two type-only imports of different paths',
            code: source(
                "import type { Dictionary } from '@common-utils'",
                "import type { ButtonProps } from './Button'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a path is imported and re-exported',
            code: source("import { Button } from './Button'", "export { Button } from './Button'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for an all-inline-type statement beside another path',
            code: source(
                "import { type Option } from '@common-utils'",
                "import { Button } from './Button'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for two side-effect imports of different paths',
            code: source("import './Blog.styles.css'", "import './About.styles.css'"),
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
            name: 'should not throw for a file with no imports',
            code: 'const value = 1',
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when two specifiers name one module differently',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import { isNonEmpty } from '@common-utils/Predicate/Predicate'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a type-only default shares a path with named bindings',
            code: source(
                "import type mongoose from 'mongoose'",
                "import type { Document } from 'mongoose'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a type-only namespace shares a path with named bindings',
            code: source(
                "import type * as Mongoose from 'mongoose'",
                "import type { Document } from 'mongoose'",
            ),
            filename: fileName,
            ...typed,
        },
    ],
    invalid: [
        {
            name: 'should throw when two value imports share one path',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import { isNonEmpty } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a default and a named import share one path',
            code: source("import React from 'react'", "import { useState } from 'react'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a repeated type-only import',
            code: source(
                "import type { Dictionary } from '@common-utils'",
                "import type { Nullish } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an all-inline-type statement repeats a value import',
            code: source(
                "import { isDefined } from '@common-utils'",
                "import { type Option } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a repeated side-effect import',
            code: source("import './Blog.styles.css'", "import './Blog.styles.css'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for two value imports of one relative path',
            code: source(
                "import { Button } from './Button'",
                "import { ButtonGroup } from './Button'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once per redundant import',
            code: source(
                "import { isEmpty } from '@common-utils'",
                "import { Query } from '@common-utils'",
                "import { QueryKey } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }, { message: ErrorMessage }],
        },
        {
            name: 'should throw when a namespace import shares a path with a named one',
            code: source(
                "import * as Query from './Query'",
                "import { RequestBuilder } from './Query'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when the duplicate follows a non-import statement',
            code: source(
                "import { isDefined } from '@common-utils'",
                'const value = 1',
                "import { isNonEmpty } from '@common-utils'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when two type-only default imports share one path',
            code: source(
                "import type axiosTypes from 'axios'",
                "import type axiosDefaults from 'axios'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
    ],
})
