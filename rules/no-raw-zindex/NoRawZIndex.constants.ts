export const ErrorMessage =
    'A z-index must come from a layer: `Const.ZIndex.<layer>` in TS, `var(--z-<layer>)` in CSS and SCSS.'

/** The property name a TS styles object uses. */
export const TsKey = 'zIndex'

/** The property name the style processor gives a stylesheet declaration. */
export const StyleKey = 'z-index'

/** The prefix a stylesheet value must use; the layer after it is checked against the tokens. */
export const StyleTokenPrefix = '--z-'
