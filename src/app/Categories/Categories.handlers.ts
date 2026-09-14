import type { SearchInputOption } from '@common-ux'
import type { PostCategoryRequest } from '@common-types'
import type { CategoryFormData } from './Categories.types'

type SubmitDeps = {
    parentOptions: SearchInputOption[]
    postCategory: (payload: PostCategoryRequest) => Promise<void>
}

export const CategoriesHandlers = {
    submit:
        ({ parentOptions, postCategory }: SubmitDeps) =>
        async (formData: CategoryFormData): Promise<void> => {
            const parentId = parentOptions.find(({ label }) => label === formData.parent)?.value
            try {
                await postCategory({
                    name: formData.name,
                    description: formData.description,
                    icon: formData.icon,
                    color: formData.color,
                    parentId,
                })
            } catch {
                // The error surfaces via the mutation's error state (SubmitErrorMessage).
            }
        },
}
