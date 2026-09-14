import { describe, expect, it } from 'vitest'
import { CategoriesTransformers } from '../Categories.transformers'
import type { GetCategoryResponse } from '@common-types'

const categoryStub = (overrides: Partial<GetCategoryResponse> = {}): GetCategoryResponse =>
    ({
        _id: 'cat-1',
        name: 'Work',
        icon: 'circle',
        color: 'blue',
        ...overrides,
    }) as GetCategoryResponse

describe('CategoriesTransformers.fromApi', () => {
    it('maps each category to a SearchInputOption', () => {
        const result = CategoriesTransformers.fromApi([categoryStub()])
        expect(result).toHaveLength(1)
        expect(result[0]).toMatchObject({
            label: 'Work',
            value: 'cat-1',
            iconColor: 'blue',
        })
        expect(result[0].icon).toBeDefined()
    })

    it('handles multiple categories', () => {
        const result = CategoriesTransformers.fromApi([
            categoryStub({ _id: 'a', name: 'Work' }),
            categoryStub({ _id: 'b', name: 'Personal', icon: 'heart', color: 'red' }),
        ])
        expect(result).toHaveLength(2)
        expect(result[1]).toMatchObject({ label: 'Personal', value: 'b', iconColor: 'red' })
    })

    it('returns an empty array for no categories', () => {
        expect(CategoriesTransformers.fromApi([])).toEqual([])
    })
})
