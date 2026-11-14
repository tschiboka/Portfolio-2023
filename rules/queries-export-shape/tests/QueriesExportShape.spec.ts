import { GroupKeyMessage, LeafKeyMessage, NestingMessage } from '../QueriesExportShape.constants'
import { Rules } from '../QueriesExportShape.rules'
import { ruleTester } from '../../config'

ruleTester.run('queries-export-shape', Rules.Eslint.QueriesExportShape9, {
    valid: [
        {
            name: 'should accept a leaf at the top of the object',
            code: 'export const LikeQueries = { useGet }',
        },
        {
            name: 'should accept every verb as a leaf',
            code: 'export const LikeQueries = { useGet, usePost, usePut, usePatch, useDelete }',
        },
        {
            name: 'should accept a group holding one leaf',
            code: 'export const LikeQueries = { Summary: { useGet } }',
        },
        {
            name: 'should accept a leaf beside a group',
            code: 'export const LikeQueries = { usePost, Summary: { useGet } }',
        },
        {
            name: 'should accept a leaf whose key differs from its function',
            code: 'export const LikeQueries = { useGet: useGetActivityFeed }',
        },
        {
            name: 'should accept a group whose leaf differs from its function',
            code: 'export const LikeQueries = { Summary: { useGet: useGetLikeSummary } }',
        },
        {
            name: 'should accept an object that declares nothing',
            code: 'export const LikeQueries = {}',
        },
        {
            name: 'should accept a spread, which declares no key',
            code: 'export const LikeQueries = { ...shared }',
        },
        {
            name: 'should accept a computed key, which cannot be read',
            code: 'export const LikeQueries = { [key]: useGet }',
        },
        {
            name: 'should ignore an export that is not a queries object',
            code: 'export const LikeHelpers = { getVisits: useGetVisits }',
        },
    ],
    invalid: [
        {
            name: 'should throw for a leaf not named use followed by the verb',
            code: 'export const VisitQueries = { getVisits: useGetVisits }',
            errors: [{ message: LeafKeyMessage }],
        },
        {
            name: 'should throw for a group written as a hook',
            code: 'export const LikeQueries = { useSummary: { useGet } }',
            errors: [{ message: GroupKeyMessage }],
        },
        {
            name: 'should throw for a group whose key is not PascalCase',
            code: 'export const LikeQueries = { summary: { useGet } }',
            errors: [{ message: GroupKeyMessage }],
        },
        {
            name: 'should throw for a leaf named after its sub-resource',
            code: 'export const LikeQueries = { Summary: { useGetSummary } }',
            errors: [{ message: LeafKeyMessage }],
        },
        {
            name: 'should throw for a group inside a group',
            code: 'export const LikeQueries = { Summary: { Details: { useGet } } }',
            errors: [{ message: NestingMessage }],
        },
        {
            name: 'should throw for a leaf inside a group that carries no use prefix',
            code: 'export const LikeQueries = { Summary: { get: useGet } }',
            errors: [{ message: LeafKeyMessage }],
        },
        {
            name: 'should throw once per offending key',
            code: 'export const LikeQueries = { getVisits: useGetVisits, summary: { useGet } }',
            errors: [{ message: LeafKeyMessage }, { message: GroupKeyMessage }],
        },
    ],
})
