import { parser } from 'typescript-eslint'
import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoMixedImportKind.constants'
import { Rules } from '../NoMixedImportKind.rules'

const fileName = '/a/Feature/Blog.tsx'
const typed = { languageOptions: { parser } }

ruleTester.run('no-mixed-import-kind', Rules.Eslint.NoMixedImportKind9, {
    valid: [
        {
            name: 'should not throw for an import of values only',
            code: "import { hasLength, isNonEmpty } from '@common-utils'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a type-only import',
            code: "import type { Optional } from '@common-utils'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a namespace import',
            code: "import * as Query from './Query'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw while every specifier is an inline type',
            code: "import { type Option } from '@common-utils'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a default import alone',
            code: "import axios from 'axios'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a default beside named imports',
            code: "import express, { Application } from 'express'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a type-only default import',
            code: "import type mongoose from 'mongoose'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a side-effect import',
            code: "import './Blog.styles.css'",
            filename: fileName,
            ...typed,
        },
    ],
    invalid: [
        {
            name: 'should throw when a value and an inline type share one import',
            code: "import { hasLength, type Optional } from '@common-utils'",
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when the inline type comes first',
            code: "import { type Optional, hasLength } from '@common-utils'",
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a default import carries an inline type',
            code: "import axios, { type AxiosError } from 'axios'",
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once for several inline types beside values',
            code: "import { screen, within, waitFor, type BoundFunctions, type queries } from '@testing-library/react'",
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a default import carrying two inline types',
            code: "import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'",
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
    ],
})
