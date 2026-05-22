import { selectBackground, selectBorderRadius } from './Box.selectors'
import type { BoxProps } from './Box.types'

export const Box = ({
    children,
    ariaLabel,
    className,
    style,
    as: Component = 'div',
    padding,
    paddingX,
    paddingY,
    margin,
    background,
    borderRadius,
    display,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onFocus,
    onBlur,
}: BoxProps) => {
    const p = padding ? `${padding}px` : undefined
    const px = paddingX ? `${paddingX}px` : undefined
    const py = paddingY ? `${paddingY}px` : undefined

    return (
        <Component
            aria-label={ariaLabel}
            className={className}
            style={{
                display,
                paddingTop: py ?? p,
                paddingBottom: py ?? p,
                paddingLeft: px ?? p,
                paddingRight: px ?? p,
                margin: margin ? `${margin}px` : undefined,
                background: selectBackground(background),
                borderRadius: selectBorderRadius(borderRadius),
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
}
