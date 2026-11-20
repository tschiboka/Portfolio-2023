import { DateTime } from '@common-utils'

export const TablesConstants = {
    /** Rows a demo table shows before paging matters. */
    previewRows: 3,
    defaultPageSize: 10,
    customDemoPageSize: 5,
    compactPageSize: 3,
    /** A short fake latency so the loading state is visible. */
    refreshLatencyMs: DateTime.Units.Ms.fromSec(2),
    pageSizes: [5, 10, 15],
    pageSizesWithThirty: [5, 15, 30],
    pageSizesShort: [3, 5],
    pageSizesWide: [5, 10, 25],
}
