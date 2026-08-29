import type { DifficultyLevel } from '@common/types'
import type { SearchInputOption } from '@common/ux/Form/SearchInput.types'

export const difficultyOptions: SearchInputOption<DifficultyLevel>[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
]
