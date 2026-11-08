import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoLoopStatement.constants'
import { Rules } from '../NoLoopStatement.rules'

ruleTester.run('no-loop-statement', Rules.Eslint.NoLoopStatement9, {
    valid: [
        {
            name: 'should accept a map that returns a new list',
            code: 'const lengths = words.map((word) => word.length)',
        },
        {
            name: 'should accept a filter that keeps a subset',
            code: 'const long = words.filter((word) => word.length > 5)',
        },
        {
            name: 'should accept a reduce that accumulates',
            code: 'const total = words.reduce((sum, word) => sum + word.length, 0)',
        },
        {
            name: 'should accept a forEach that runs a side effect',
            code: 'words.forEach((word) => use(word))',
        },
        {
            name: 'should accept a loop-free recursion over an index',
            code: 'const walk = (items, i) => (i >= items.length ? [] : [items[i], ...walk(items, i + 1)])',
        },
    ],
    invalid: [
        {
            name: 'should throw for a counting for statement',
            code: 'for (let i = 0; i < words.length; i += 1) { use(words[i]) }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a for-of statement',
            code: 'for (const word of words) { use(word) }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a for-in statement',
            code: 'for (const key in record) { use(key) }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a while statement',
            code: 'while (open) { close() }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a do-while statement',
            code: 'do { close() } while (open)',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once per loop, however they nest',
            code: 'for (const word of words) { while (open) { close() } }',
            errors: [{ message: ErrorMessage }, { message: ErrorMessage }],
        },
    ],
})
