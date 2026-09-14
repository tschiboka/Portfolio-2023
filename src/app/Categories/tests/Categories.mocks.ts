import type { GetCategoryResponse, PostCategoryRequest } from '@common-types'

export const CategoriesMocks: {
    categories: GetCategoryResponse[]
    postCategory: PostCategoryRequest
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
}
