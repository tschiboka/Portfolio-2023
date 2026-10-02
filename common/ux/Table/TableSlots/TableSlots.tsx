import { type ReactNode } from 'react'
import { TableSlotsUtils } from './TableSlots.utils'

export const Header = TableSlotsUtils.createSlot(
    'Table.Header',
    ({ children }: { children?: ReactNode }) => <>{children}</>,
)

export const Info = TableSlotsUtils.createSlot('Table.Info', (_props: { text: string }) => null)

export const Legend = TableSlotsUtils.createSlot(
    'Table.Legend',
    ({ children }: { children?: ReactNode }) => <>{children}</>,
)

export const Filters = TableSlotsUtils.createSlot('Table.Filters', () => null)

export const Download = TableSlotsUtils.createSlot('Table.Download', () => null)

export const Empty = TableSlotsUtils.createSlot(
    'Table.Empty',
    ({ children }: { children?: ReactNode }) => <>{children}</>,
)
