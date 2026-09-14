import type { CategoryFormData } from './Categories.types'

/** Default (empty) values for the category form. */
export const CategoriesDefaults: CategoryFormData = {
    name: '',
    description: '',
    parent: '',
    hasParent: false,
    icon: '',
    color: '',
}
