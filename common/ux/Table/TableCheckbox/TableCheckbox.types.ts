import type { ReactNode } from 'react'
import type { Dictionary } from '@common-utils'
import type { TableSelection } from '../Table.types'

export type SelectionContext<TData extends Dictionary<ReactNode>, TContext> = {
    data: TData[]
    selection: TableSelection<TData, TContext>
    context?: TContext
}
