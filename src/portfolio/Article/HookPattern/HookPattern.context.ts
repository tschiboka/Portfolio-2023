import { ContextBuilder, Functions } from '@common-utils'
import type { ThemeContextType } from './HookPattern.types'

export const ThemeContext = ContextBuilder.CreateContext<ThemeContextType>('HookPattern', {
    theme: 'dark',
    setTheme: Functions.noop,
})
