import type { SearchInputOption } from '../SearchInput'

export const testOptions: SearchInputOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
]

export const iconOptions: SearchInputOption[] = [
    { label: 'Home', value: 'home', icon: <span data-testid="icon-home">H</span> },
    {
        label: 'Settings',
        value: 'settings',
        icon: <span data-testid="icon-settings">S</span>,
        iconColor: 'red',
    },
]
