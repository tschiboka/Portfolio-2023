import { Typography } from './Typography'
import type { CodeTextProps } from './Typography.types'

export const CodeText = ({ size = 'sm', ...rest }: CodeTextProps) => (
    <Typography as="code" size={size} {...rest} />
)
