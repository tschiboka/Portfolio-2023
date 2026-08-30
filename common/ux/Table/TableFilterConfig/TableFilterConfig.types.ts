import type { UrlDecode, UrlEncode } from '@utils'
import type { DropdownOption } from '../TableInputs/TableDropdown'

type BaseFilterConfig = {
    label: string
    required?: boolean
    span?: 1 | 2 | 3 | 4
}

type UrlFilterConfig = {
    urlKey?: string
    urlEnabled?: boolean
    encode?: UrlEncode
    decode?: UrlDecode
}

type FilterFieldConfig = BaseFilterConfig & UrlFilterConfig

export type TextFilterConfig = FilterFieldConfig & {
    type: 'text'
    placeholder?: string
}

export type SelectFilterConfig = FilterFieldConfig & {
    type: 'option'
    options: DropdownOption[]
}

export type DateFilterConfig = FilterFieldConfig & {
    type: 'date'
    min?: string
    max?: string
}

export type NumberFilterConfig = FilterFieldConfig & {
    type: 'number'
    min?: number
    max?: number
    placeholder?: string
}

export type SearchFilterConfig = FilterFieldConfig & {
    type: 'search'
    placeholder?: string
}

export type CheckboxFilterConfig = FilterFieldConfig & {
    type: 'checkbox'
}

export type FilterConfig =
    | TextFilterConfig
    | SelectFilterConfig
    | DateFilterConfig
    | NumberFilterConfig
    | SearchFilterConfig
    | CheckboxFilterConfig

export type FilterDefinitions<TFilters> = {
    [K in keyof TFilters]: FilterConfig
}
