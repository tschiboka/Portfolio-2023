import { Region } from './Region'
import type { CardProps } from './Region.types'

export const Card = ({ ...rest }: CardProps) => <Region variant="default" {...rest} />
