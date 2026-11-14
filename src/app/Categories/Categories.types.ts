import { ReactNode } from 'react'
import type { SearchInputOption } from '@common-ux/Form/SearchInput.types'
import type { PostCategoryRequest } from '@common-types'
import type { Dictionary } from '@common-utils'

/** What a category submit is handed: the parents it may point at and the call it fires. */
export type SubmitDeps = {
    parentOptions: SearchInputOption[]
    postCategory: (payload: PostCategoryRequest) => Promise<void>
}

export type ParentOption = {
    name: string
    value: string
}

export type CategoryFormData = {
    name: string
    hasParent: boolean
    parent?: string
    description: string
    icon: string
    color: string
}
export type Icon = Dictionary<ReactNode>
