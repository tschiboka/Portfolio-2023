/* eslint-disable standards/no-raw-color -- the API field is `color`, and its values are database names */

import { describe, expect, it, vi } from 'vitest'
import { CategoriesMocks } from './Categories.mocks'
import { CategoriesHandlers } from '../Categories.handlers'

const { formData, parentOptions } = CategoriesMocks

describe('CategoriesHandlers.submit', () => {
    it('should post the form data, mapping the parent label to its id', async () => {
        const postCategory = vi.fn().mockResolvedValue(undefined)
        const handler = CategoriesHandlers.submit({ parentOptions, postCategory })

        await handler(formData)

        expect(postCategory).toHaveBeenCalledWith({
            name: 'Sub',
            description: 'A sub category',
            icon: 'circle',
            color: 'blue',
            parentId: 'parent-work',
        })
    })

    it('should post with an undefined parentId when no parent is selected', async () => {
        const postCategory = vi.fn().mockResolvedValue(undefined)
        const handler = CategoriesHandlers.submit({ parentOptions, postCategory })

        await handler({ ...formData, hasParent: false, parent: '' })

        expect(postCategory).toHaveBeenCalledWith({
            name: 'Sub',
            description: 'A sub category',
            icon: 'circle',
            color: 'blue',
            parentId: undefined,
        })
    })
})
