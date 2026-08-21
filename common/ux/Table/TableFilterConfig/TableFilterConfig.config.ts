import type {
    TextFilterConfig,
    SelectFilterConfig,
    DateFilterConfig,
    NumberFilterConfig,
    SearchFilterConfig,
    CheckboxFilterConfig,
} from './TableFilterConfig.types'

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
