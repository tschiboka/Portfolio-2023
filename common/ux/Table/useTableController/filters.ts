import type { DropdownOption } from '../TableInputs/TableDropdown'

type BaseFilterConfig = {
    label: string
    required?: boolean
    span?: 1 | 2 | 3 | 4
}

export type TextFilterConfig = BaseFilterConfig & {
    type: 'text'
    placeholder?: string
}

export type SelectFilterConfig = BaseFilterConfig & {
    type: 'option'
    options: DropdownOption[]
}

export type DateFilterConfig = BaseFilterConfig & {
    type: 'date'
    min?: string
    max?: string
}

export type NumberFilterConfig = BaseFilterConfig & {
    type: 'number'
    min?: number
    max?: number
    placeholder?: string
}

export type SearchFilterConfig = BaseFilterConfig & {
    type: 'search'
    placeholder?: string
}

export type CheckboxFilterConfig = BaseFilterConfig & {
    type: 'checkbox'
}

export type FilterConfig =
    | TextFilterConfig
    | SelectFilterConfig
    | DateFilterConfig
    | NumberFilterConfig
    | SearchFilterConfig
    | CheckboxFilterConfig

type FilterDefinitions<TFilters> = {
    [K in keyof TFilters]: FilterConfig
}

export const text = (config: Omit<TextFilterConfig, 'type'>): TextFilterConfig => ({
    type: 'text',
    ...config,
})

export const select = (config: Omit<SelectFilterConfig, 'type'>): SelectFilterConfig => ({
    type: 'option',
    ...config,
})

export const date = (config: Omit<DateFilterConfig, 'type'>): DateFilterConfig => ({
    type: 'date',
    ...config,
})

export const number = (config: Omit<NumberFilterConfig, 'type'>): NumberFilterConfig => ({
    type: 'number',
    ...config,
})

export const search = (config: Omit<SearchFilterConfig, 'type'>): SearchFilterConfig => ({
    type: 'search',
    ...config,
})

export const checkbox = (config: Omit<CheckboxFilterConfig, 'type'>): CheckboxFilterConfig => ({
    type: 'checkbox',
    ...config,
})

export type { FilterDefinitions }
