import type {
    TextFilterConfig,
    SelectFilterConfig,
    DateFilterConfig,
    NumberFilterConfig,
    SearchFilterConfig,
    CheckboxFilterConfig,
} from './TableFilterConfig.types'

const text = (config: Omit<TextFilterConfig, 'type'>): TextFilterConfig => ({
    type: 'text',
    ...config,
})

const select = (config: Omit<SelectFilterConfig, 'type'>): SelectFilterConfig => ({
    type: 'option',
    ...config,
})

const date = (config: Omit<DateFilterConfig, 'type'>): DateFilterConfig => ({
    type: 'date',
    ...config,
})

const number = (config: Omit<NumberFilterConfig, 'type'>): NumberFilterConfig => ({
    type: 'number',
    ...config,
})

const search = (config: Omit<SearchFilterConfig, 'type'>): SearchFilterConfig => ({
    type: 'search',
    ...config,
})

const checkbox = (config: Omit<CheckboxFilterConfig, 'type'>): CheckboxFilterConfig => ({
    type: 'checkbox',
    ...config,
})

export const TableFilterConfig = { text, select, date, number, search, checkbox }
