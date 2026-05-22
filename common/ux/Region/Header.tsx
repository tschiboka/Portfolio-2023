import { Region } from './Region'
import type { HeaderProps } from './Region.types'

export const Header = ({ ...rest }: HeaderProps) => <Region variant="header" {...rest} />
