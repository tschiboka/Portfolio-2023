import type { ReactNode } from 'react'
import type { Option } from '@common/utils/Option'

/** UI flavour of {@link Option}: the shared category shape plus optional icon fields. */
export type SearchInputOption<T extends string = string> = Option<T> & {
    icon?: ReactNode
    iconColor?: string
}
