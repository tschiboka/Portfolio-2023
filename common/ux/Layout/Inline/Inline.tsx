import { selectAlign, selectJustify } from '../Stack/Stack.selectors'
import type { InlineProps } from './Inline.types'

export const Inline = ({
    children,
    ariaLabel,
    className,
    style,
    as: Component = 'div',
    align,
    justify,
    gap,
    wrap,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onFocus,
    onBlur,
}: InlineProps) => (
    <Component
        aria-label={ariaLabel}
        className={className}
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: selectAlign(align),
            justifyContent: selectJustify(justify),
            gap: gap ? `${gap}px` : undefined,
            flexWrap: wrap ? 'wrap' : undefined,
            ...style,
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
    >
        {children}
    </Component>
)
