import { describe, expect, it, vi } from 'vitest'
import { CategoriesHandlers } from '../Categories.handlers'
import type { SearchInputOption } from '@common-ux'
import type { CategoryFormData } from '../Categories.types'

const parentOptions: SearchInputOption[] = [
    { label: 'Work', value: 'parent-work' },
    { label: 'Personal', value: 'parent-personal' },
]

const formData: CategoryFormData = {
    name: 'Sub',
    description: 'A sub category',
    hasParent: true,
    parent: 'Work',
    icon: 'circle',
    color: 'blue',
}

describe('CategoriesHandlers.submit', () => {
    it('posts the form data mapping the parent label to its id', async () => {
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

    it('posts with an undefined parentId when no parent is selected', async () => {
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
