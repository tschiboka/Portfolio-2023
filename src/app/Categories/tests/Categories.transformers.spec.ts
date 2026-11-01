import { describe, expect, it } from 'vitest'
import { CategoriesTestUtils } from './Categories.spec.utils'
import { CategoriesTransformers } from '../Categories.transformers'

describe('CategoriesTransformers.fromApi', () => {
    it('should map each category to a SearchInputOption', () => {
        const result = CategoriesTransformers.fromApi([CategoriesTestUtils.categoryStub()])
        expect(result).toHaveLength(1)
        expect(result[0]).toMatchObject({
            label: 'Work',
            value: 'cat-1',
            iconColor: 'blue',
        })
        expect(result[0].icon).toBeDefined()
    })

    it('should handle multiple categories', () => {
        const result = CategoriesTransformers.fromApi([
            CategoriesTestUtils.categoryStub({ _id: 'a', name: 'Work' }),
            CategoriesTestUtils.categoryStub({
                _id: 'b',
                name: 'Personal',
                icon: 'heart',
                // eslint-disable-next-line standards/no-raw-color -- the API field is `color`, and its values are database names
                color: 'red',
            }),
        ])
        expect(result).toHaveLength(2)
        expect(result[1]).toMatchObject({ label: 'Personal', value: 'b', iconColor: 'red' })
    })

    it('should return an empty array for no categories', () => {
        expect(CategoriesTransformers.fromApi([])).toEqual([])
    })
})
