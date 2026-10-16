import { type ReactNode } from 'react'
import { TableSlotsUtils } from './TableSlots.utils'

export const TableSlots = {
    Header: TableSlotsUtils.createSlot('Table.Header', ({ children }: { children?: ReactNode }) => (
        <>{children}</>
    )),
    Info: TableSlotsUtils.createSlot('Table.Info', (_props: { text: string }) => null),
    Legend: TableSlotsUtils.createSlot('Table.Legend', ({ children }: { children?: ReactNode }) => (
        <>{children}</>
    )),
    Filters: TableSlotsUtils.createSlot('Table.Filters', () => null),
    Download: TableSlotsUtils.createSlot('Table.Download', () => null),
    Empty: TableSlotsUtils.createSlot('Table.Empty', ({ children }: { children?: ReactNode }) => (
        <>{children}</>
    )),
}
