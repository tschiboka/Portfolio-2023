import { IconConstants } from './Icon.constants'
import type { IconProps } from './Icon.types'

const { viewBox, defaultSize, strokeWidth, fill, paths } = IconConstants

/** Generic inline SVG icon (outline set: chart, eye, heart). */
export const Icon = ({
    name,
    size = defaultSize,
    color = 'currentColor',
    className,
    style,
}: IconProps) => {
    const iconPaths = paths[name]
    return (
        <svg
            className={className}
            role="img"
            aria-label={name}
            data-icon={name}
            width={size}
            height={size}
            viewBox={viewBox}
            fill={fill}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
        >
            {iconPaths.map((d) => (
                <path key={d} d={d} />
            ))}
        </svg>
    )
}
