import { type ReactNode } from 'react'
import type { Dictionary } from '@common-utils'
import type { TableAction } from '../Table.types'

export type TableHeaderProps = {
    children?: ReactNode
}

export type TableTitleProps = {
    children?: ReactNode
}

export type TableInfoProps = {
    text: string
}

export type TableLegendProps = {
    children?: ReactNode
}

export type TableActionsProps = {
    actions: TableAction<Dictionary<ReactNode>>[]
}
