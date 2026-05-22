import { Typography } from './Typography'
import type { BlockQuoteProps } from './Typography.types'

export const BlockQuote = ({ size = 'md', weight = 'regular', ...rest }: BlockQuoteProps) => (
    <Typography as="blockquote" size={size} weight={weight} {...rest} />
)
