import { Region } from './Region'
import type { DialogProps } from './Region.types'

export const Dialog = ({ ...rest }: DialogProps) => <Region variant="dialog" {...rest} />
