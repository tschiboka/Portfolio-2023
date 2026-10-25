import { ruleTester } from '../../config'
import { Rules, ErrorMessage } from '../NoEmptyRowInObject.rules'

ruleTester.run('no-empty-row-in-object', Rules.Eslint.Min9, {
    valid: [
        {
            name: 'should not throw for an object on a single row',
            code: 'const a = { x: 1, y: 2 }',
        },
        {
            name: 'should not throw for adjacent properties',
            code: 'const a = {\n    x: 1,\n    y: 2,\n}',
        },
        {
            name: 'should not throw for a comment between adjacent properties',
            code: 'const a = {\n    x: 1,\n    // the second one\n    y: 2,\n}',
        },
        {
            name: 'should not throw for a spread between adjacent properties',
            code: 'const a = {\n    x: 1,\n    ...rest,\n    y: 2,\n}',
        },
        {
            name: 'should not throw for an empty row inside a block comment',
            code: 'const a = {\n    x: 1,\n    /*\n\n    */\n    y: 2,\n}',
        },
        {
            name: 'should not throw for an empty row inside a multi row property value',
            code: 'const a = {\n    handler: () => {\n        run()\n\n        return 1\n    },\n    y: 2,\n}',
        },
        {
            name: 'should not throw for an empty object',
            code: 'const a = {}',
        },
    ],
    invalid: [
        {
            name: 'should throw for an empty row between two properties',
            code: 'const a = {\n    x: 1,\n\n    y: 2,\n}',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for an empty row before a spread',
            code: 'const a = {\n    x: 1,\n\n    ...rest,\n}',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for an empty row before a comment that precedes a property',
            code: 'const a = {\n    x: 1,\n\n    // the second one\n    y: 2,\n}',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once per padded pair',
            code: 'const a = {\n    x: 1,\n\n    y: 2,\n\n    z: 3,\n}',
            errors: [{ message: ErrorMessage }, { message: ErrorMessage }],
        },
        {
            name: 'should throw for a nested object padded between its properties',
            code: 'const a = {\n    inner: {\n        x: 1,\n\n        y: 2,\n    },\n}',
            errors: [{ message: ErrorMessage }],
        },
    ],
})
