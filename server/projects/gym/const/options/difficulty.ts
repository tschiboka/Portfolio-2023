import type { DifficultyLevel } from '@common/types'
import type { SearchInputOption } from '@common/ux'

export const difficultyOptions: SearchInputOption<DifficultyLevel>[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
]
