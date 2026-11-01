/* eslint-disable standards/no-raw-color -- the API field is `color`, and its values are database names */

import type { GetCategoryResponse, PostCategoryRequest } from '@common-types'
import type { SearchInputOption } from '@common-ux'
import type { CategoryFormData } from '../Categories.types'

export const CategoriesMocks: {
    categories: GetCategoryResponse[]
    postCategory: PostCategoryRequest
    parentOptions: SearchInputOption[]
    formData: CategoryFormData
} = {
    /** Seed categories fetched by GET /api/categories — exercises the parent + table render. */
    categories: [
        {
            _id: 'cat-work',
            name: 'Work',
            description: 'Professional work activities',
            icon: 'circle',
            color: 'blue',
        },
        {
            _id: 'cat-personal',
            name: 'Personal',
            description: 'Personal activities',
            icon: 'heart',
            color: 'red',
        },
    ],
    /** Payload posted by POST /api/categories on submit. */
    postCategory: {
        name: 'Sub',
        description: 'A new sub category',
        icon: 'circle',
        color: 'green',
        parentId: 'cat-work',
    },
    /** Parent choices offered by the parent search field. */
    parentOptions: [
        { label: 'Work', value: 'parent-work' },
        { label: 'Personal', value: 'parent-personal' },
    ],
    /** A filled category form, ready for the submit handler. */
    formData: {
        name: 'Sub',
        description: 'A sub category',
        hasParent: true,
        parent: 'Work',
        icon: 'circle',
        color: 'blue',
    },
}
