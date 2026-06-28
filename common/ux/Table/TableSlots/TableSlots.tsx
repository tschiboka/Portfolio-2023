import { type ReactNode } from 'react'
import { createSlot } from './TableSlots.utils'

export const Header = createSlot('Table.Header', ({ children }: { children?: ReactNode }) => (
    <>{children}</>
))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Info = createSlot('Table.Info', (_props: { text: string }) => null)

export const Legend = createSlot('Table.Legend', ({ children }: { children?: ReactNode }) => (
    <>{children}</>
))

export const Filters = createSlot('Table.Filters', () => null)

export const Download = createSlot('Table.Download', () => null)

export const Empty = createSlot('Table.Empty', ({ children }: { children?: ReactNode }) => (
    <>{children}</>
))
