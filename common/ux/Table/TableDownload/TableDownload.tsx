import { type ReactNode } from 'react'
import { BsDownload } from 'react-icons/bs'
import type { TableDownload } from '../Table.types'
import { TableDropdown } from '../TableInputs/TableDropdown'
import './TableDownload.styles.css'

type TableDownloadProps<TData extends Record<string, ReactNode>> = {
    download: TableDownload<TData>
    data: TData[]
}

const isSingleDownload = <TData extends Record<string, ReactNode>>(
    download: TableDownload<TData>,
): download is { onDownload: (data: TData[]) => void; label?: string } => !('options' in download)

export const TableDownloadButton = <TData extends Record<string, ReactNode>>({
    download,
    data,
}: TableDownloadProps<TData>) => {
    if (isSingleDownload(download)) {
        return (
            <button
                type="button"
                className="table-download-btn"
                aria-label={download.label ?? 'Download'}
                onClick={() => download.onDownload(data)}
            >
                <BsDownload aria-hidden="true" />
                {download.label && <span className="download-label">{download.label}</span>}
            </button>
        )
    }

    return (
        <TableDropdown
            options={download.options}
            onChange={(value) => download.onDownload(value, data)}
            ariaLabel="Download"
            icon={<BsDownload aria-hidden="true" />}
            variant="ghost"
        />
    )
}
