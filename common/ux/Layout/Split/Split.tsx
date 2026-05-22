import { selectRatio } from './Split.selectors'
import type { SplitProps } from './Split.types'

export const Split = ({
    ariaLabel,
    className,
    style,
    as: Component = 'div',
    left,
    right,
    gap,
    ratio,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onFocus,
    onBlur,
}: SplitProps) => (
    <Component
        aria-label={ariaLabel}
        className={className}
        style={{
            display: 'grid',
            gridTemplateColumns: selectRatio(ratio),
            gap: gap ? `${gap}px` : undefined,
            ...style,
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
    >
        {left}
        {right}
    </Component>
)
