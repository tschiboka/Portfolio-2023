import { Typography } from './Typography'
import type { TextProps } from './Typography.types'

export const Text = ({ ...rest }: TextProps) => <Typography as="span" {...rest} />
