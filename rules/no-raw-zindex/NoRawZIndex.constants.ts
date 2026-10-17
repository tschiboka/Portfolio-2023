export const ErrorMessage =
    'A z-index must come from a layer: `Const.ZIndex.<layer>` in TS, `var(--z-<layer>)` in CSS and SCSS.'

/** The property name a TS styles object uses. */
export const TsKey = 'zIndex'

/** The property name the style processor gives a stylesheet declaration. */
export const StyleKey = 'z-index'

/** A stylesheet value must be one of the custom properties that mirror `Const.ZIndex`. */
export const StyleTokenPattern = /^var\(\s*--z-[a-z]+\s*\)$/
