import { MalformedMessage, MissingMessage, UnresolvedMessage } from '../TodoTicketRef.constants'
import { Rules } from '../TodoTicketRef.rules'
import { ruleTester } from '../../config'

ruleTester.run('todo-ticket-ref', Rules.Eslint.TodoTicketRef9, {
    valid: [
        {
            name: 'should accept a comment that carries no TODO',
            code: 'const limit = 10',
        },
        {
            name: 'should accept a TODO whose core reference resolves',
            code: '// TODO: [0009] - finish the sweep',
        },
        {
            name: 'should accept a TODO whose reference sits in a block comment',
            code: '/* TODO: [0003] - sets and reps to land */',
        },
        {
            name: 'should ignore a word that only opens with TODO',
            code: '// TODOS are tracked in the ticket documents',
        },
    ],
    invalid: [
        {
            name: 'should throw for a TODO that names no ticket',
            code: '// TODO: finish the sweep',
            errors: [{ message: MissingMessage }],
        },
        {
            name: 'should throw for a reference written after the note',
            code: '// TODO: finish the sweep [0009]',
            errors: [{ message: MissingMessage }],
        },
        {
            name: 'should throw for a reference whose acronym is lowercase',
            code: '// TODO: [wda-0009] - wire the lobby',
            errors: [{ message: MalformedMessage }],
        },
        {
            name: 'should throw for an acronym of four letters',
            code: '// TODO: [ABCD-0009] - wire the lobby',
            errors: [{ message: MalformedMessage }],
        },
        {
            name: 'should throw for a reference with no number',
            code: '// TODO: [ABC-] - wire the lobby',
            errors: [{ message: MalformedMessage }],
        },
        {
            name: 'should throw for a core reference with no document',
            code: '// TODO: [9999] - wire the lobby',
            errors: [{ message: UnresolvedMessage }],
        },
        {
            name: 'should throw for a project reference with no document',
            code: '// TODO: [ABC-0009] - wire the lobby',
            errors: [{ message: UnresolvedMessage }],
        },
        {
            name: 'should throw once per TODO',
            code: '// TODO: [0009] - first\n// TODO: - second',
            errors: [{ message: MissingMessage }],
        },
    ],
})
