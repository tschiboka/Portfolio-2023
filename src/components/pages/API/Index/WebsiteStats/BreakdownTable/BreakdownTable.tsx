/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { Table } from '@common/ux'
import { activityColumns as defaultColumns } from './BreakdownTable.columns'
import { ActivityTypeLegend } from '../ActivityTypePill/ActivityTypePill'
import type { TableControl } from '@common/ux/Table'
import type { ActivityFeedContext, PageMeta } from '@common/types'
import type { BreakdownRow } from './BreakdownTable.types'
import { breakdownActions } from './BreakdownTable.actions'
import { useState } from 'react'
import { ActivityDetailsModal } from '../ActivityDetailsModal/ActivityDetailsModal'

type BreakdownTableProps = {
    controller: TableControl
    data?: BreakdownRow[]
    meta?: PageMeta
    context?: ActivityFeedContext
    isLoading: boolean
    onRefresh: () => void
}

export const BreakdownTable = ({
    controller,
    data,
    meta,
    context,
    isLoading,
    onRefresh,
}: BreakdownTableProps) => {
    const [showDetails, setShowDetails] = useState<BreakdownRow | null>(null)

    return (
        <>
            <Table
                data={data}
                meta={meta}
                columns={defaultColumns}
                controller={controller}
                isLoading={isLoading}
                onRefresh={onRefresh}
                actions={breakdownActions(setShowDetails)}
                enableColumnResize
                enableColumnReorder
                ariaLabel="Activity Feed Table"
                title={`Activity Feed (${meta?.totalItems ?? 0})`}
            >
                <Table.Info text="Shows recent activity across the site: visits, likes, messages, and errors. Use the filters above to narrow results by path, type, or date range." />
                <Table.Legend>
                    <ActivityTypeLegend summary={context} />
                </Table.Legend>
            </Table>
            {showDetails && (
                <ActivityDetailsModal row={showDetails} onClose={() => setShowDetails(null)} />
            )}
        </>
    )
}
