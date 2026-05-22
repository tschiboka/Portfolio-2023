import { Typography } from './Typography'
import type { ParagraphProps } from './Typography.types'

export const Paragraph = ({ size = 'md', ...rest }: ParagraphProps) => (
    <Typography as="p" size={size} {...rest} />
)
