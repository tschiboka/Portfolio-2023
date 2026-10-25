import { ColorSign } from './ColorSign'
import { Breakpoint, Color, Spacing, ZIndex } from './Const.generated'

export { Breakpoint, Color, Spacing, ZIndex }

/** The em scale — no generated map yet, since font sizes are still moving to `var(--font-*)`. */
export const Font = {
    '2xs': '0.7em',
    xs: '0.8em',
    sm: '1em',
    md: '1.2em',
    lg: '1.6em',
    xl: '2.2em',
    '2xl': '3em',
} as const

export const Const = {
    Breakpoint,
    Color,
    ColorSign,
    Font,
    Spacing,
    ZIndex,
}
