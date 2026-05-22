import { Typography } from './Typography'
import type { CaptionProps } from './Typography.types'

export const Caption = ({ weight = 'regular', as = 'span', ...rest }: CaptionProps) => (
    <Typography as={as} size="xs" tone="muted" weight={weight} {...rest} />
)
