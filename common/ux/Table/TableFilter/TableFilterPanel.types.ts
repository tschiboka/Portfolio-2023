import type { Dictionary } from '@common-utils'
import type { TableFiltering } from '../Table.types'

export type FilterValues = Dictionary

export type TableFilterPanelProps = {
    id?: string
    filtering: TableFiltering
}
