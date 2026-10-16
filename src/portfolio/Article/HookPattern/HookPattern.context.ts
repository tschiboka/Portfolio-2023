import { ContextBuilder, Functions } from '@common-utils'
import type { ThemeContextType } from './HookPattern.types'

export const HookPatternContext = ContextBuilder.CreateContext<ThemeContextType>('HookPattern', {
    theme: 'dark',
    setTheme: Functions.noop,
})
