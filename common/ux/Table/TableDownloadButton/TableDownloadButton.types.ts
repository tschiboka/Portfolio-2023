import type { ReactNode } from 'react'
import type { Dictionary } from '@common-utils'
import type { TableDownload } from '../Table.types'

export type TableDownloadButtonProps<TData extends Dictionary<ReactNode>> = {
    download: TableDownload<TData>
    data: TData[]
}
