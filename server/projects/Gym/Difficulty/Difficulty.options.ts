import type { SearchInputOption } from '@common-ux/Form/SearchInput.types'
import type { DifficultyLevel } from '../../../../common/types'

export const DifficultyOptions: SearchInputOption<DifficultyLevel>[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
]
