import { Typography } from './Typography'
import type { HeadingLevel, HeadingProps, TypographySize } from './Typography.types'

const defaultSize: Record<HeadingLevel, TypographySize> = {
    h1: '2xl',
    h2: 'lg',
    h3: 'lg',
    h4: 'md',
    h5: 'md',
    h6: 'sm',
}

export const Heading = ({ as = 'h2', size, weight = 'bold', ...rest }: HeadingProps) => (
    <Typography
        as={as}
        size={size ?? defaultSize[as]}
        weight={weight}
        includeInTableOfContents
        {...rest}
    />
)
