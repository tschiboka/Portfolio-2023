import type { SearchInputOption } from '../SearchInput'

const testOptions: SearchInputOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
]

const iconOptions: SearchInputOption[] = [
    { label: 'Home', value: 'home', icon: <span data-testid="icon-home">H</span> },
    {
        label: 'Settings',
        value: 'settings',
        icon: <span data-testid="icon-settings">S</span>,
        iconColor: 'red',
    },
]

export const FormMocks = { testOptions, iconOptions }
