import { selectAlign, selectJustify } from '../Stack/Stack.selectors'
import type { GridProps, ResponsiveColumns } from './Grid.types'
import './Grid.styles.css'

const isResponsive = (columns: GridProps['columns']): columns is ResponsiveColumns =>
    typeof columns === 'object' && 'base' in columns

const buildResponsiveClasses = (columns: ResponsiveColumns): string =>
    Object.entries(columns)
        .map(([bp, cols]) => (bp === 'base' ? `grid-cols-${cols}` : `grid-cols-${bp}-${cols}`))
        .join(' ')

export const Grid = ({
    children,
    ariaLabel,
    className,
    style,
    as: Component = 'div',
    columns,
    gap,
    rowGap,
    columnGap,
    align,
    justify,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onFocus,
    onBlur,
}: GridProps) => {
    const responsive = columns != null && isResponsive(columns)
    const cls = ['grid', responsive ? buildResponsiveClasses(columns) : '', className ?? '']
        .filter(Boolean)
        .join(' ')

    const inlineStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: columns != null && !responsive ? `repeat(${columns}, 1fr)` : undefined,
        alignItems: selectAlign(align),
        justifyItems: selectJustify(justify),
        ...style,
    }
    if (gap != null) inlineStyle.gap = `${gap}px`
    if (rowGap != null) inlineStyle.rowGap = `${rowGap}px`
    if (columnGap != null) inlineStyle.columnGap = `${columnGap}px`

    return (
        <Component
            aria-label={ariaLabel}
            className={cls}
            style={inlineStyle}
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
