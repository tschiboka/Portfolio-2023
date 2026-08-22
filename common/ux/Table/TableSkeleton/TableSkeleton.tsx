import { Arrays } from '@common/utils/Arrays/Arrays'
import './TableSkeleton.styles.css'

type TableSkeletonProps = {
    cols: number
    rows?: number
    rowHeight?: number
}

export const TableSkeleton = ({ cols, rows = 5, rowHeight }: TableSkeletonProps) => (
    <>
        {Arrays.times(rows, (i) => i).map((_, rowIdx) => (
            <tr
                key={rowIdx}
                className="table-skeleton-row"
                aria-hidden="true"
                style={rowHeight ? { height: rowHeight } : undefined}
            >
                {Arrays.times(cols, (i) => i).map((_, colIdx) => (
                    <td key={colIdx} className="table-skeleton-cell">
                        <div className="table-skeleton-bar" />
                    </td>
                ))}
            </tr>
        ))}
    </>
)
