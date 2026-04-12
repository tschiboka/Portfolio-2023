import { selectAlign, selectJustify } from './Stack.selectors'
import { StackDirection, StackProps } from './Stack.types'

const StackBase = ({
    children,
    ariaLabel,
    className,
    style,
    as: Component = 'div',
    align,
    justify,
    gap,
    wrap,
    direction,
}: StackProps & { direction: StackDirection }) => {
    return (
        <Component
            aria-label={ariaLabel}
            className={className}
            style={{
                display: 'flex',
                flexDirection: direction,
                alignItems: selectAlign(align),
                justifyContent: selectJustify(justify),
                gap: gap ? `${gap}px` : undefined,
                flexWrap: wrap ? 'wrap' : undefined,
                ...style,
            }}
        >
            {children}
        </Component>
    )
}

const Vertical = (props: StackProps) => <StackBase {...props} direction="column" />
const Horizontal = (props: StackProps) => <StackBase {...props} direction="row" />

export const Stack = Object.assign(Vertical, {
    Vertical,
    Horizontal,
})
