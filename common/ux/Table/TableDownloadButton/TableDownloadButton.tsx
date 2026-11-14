import { type ReactNode } from 'react'
import { BsDownload } from 'react-icons/bs'
import { TableDropdown } from '../TableInputs'
import type { Dictionary } from '@common-utils'
import type { TableDownloadButtonProps } from './TableDownloadButton.types'
import type { TableDownload } from '../Table.types'
import './TableDownloadButton.styles.css'

const isSingleDownload = <TData extends Dictionary<ReactNode>>(
    download: TableDownload<TData>,
): download is { onDownload: (data: TData[]) => void; label?: string } => !('options' in download)

export const TableDownloadButton = <TData extends Dictionary<ReactNode>>({
    download,
    data,
}: TableDownloadButtonProps<TData>) => {
    if (isSingleDownload(download))
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
