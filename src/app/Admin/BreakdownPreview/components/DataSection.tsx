import { type Option } from '@common-utils'
import type { SectionData } from '../BreakdownPreview.types'
import { BreakdownPreviewStyles } from '../BreakdownPreview.styles'
import { Heading } from '@common-ux'
import { Table } from '@common-ux/Table/Table'
import { breakdownColumns } from '../BreakdownPreview.columns'
import { BreakdownTransformers } from '../BreakdownPreview.transformers'

export type DataSectionProps = {
    title: string
    data: SectionData
    icon: React.JSX.Element
}

const StatCard = ({ label, value }: Option<number>) => (
    <div style={BreakdownPreviewStyles.stat.card}>
        <div style={BreakdownPreviewStyles.stat.label}>{label}</div>
        <div className="bp-stat-value" style={BreakdownPreviewStyles.stat.value}>
            {value}
        </div>
    </div>
)

export const DataSection = ({ title, data, icon }: DataSectionProps) => (
    <>
        <Heading as="h3" style={BreakdownPreviewStyles.section.title}>
            {icon}
            {title}
        </Heading>
        <div
            style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '16px',
            }}
        >
            <StatCard label="Today" value={data.todayCount} />
            <StatCard label="Total" value={data.totalCount} />
        </div>
        <Table
            style={BreakdownPreviewStyles.table.style}
            data={BreakdownTransformers.toRows(data)}
            columns={breakdownColumns}
            emptyState="No data today"
            rowAriaLabel={title}
        />
    </>
)
