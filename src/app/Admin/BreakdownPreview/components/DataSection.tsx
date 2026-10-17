import { Heading } from '@common-ux'
import { type Option } from '@common-utils'
import { Table } from '@common-ux/Table/Table'
import { BreakdownPreviewStyles } from '../BreakdownPreview.styles'
import { BreakdownPreviewColumns } from '../BreakdownPreview.columns'
import { BreakdownPreviewTransformers } from '../BreakdownPreview.transformers'
import type { SectionData } from '../BreakdownPreview.types'

type DataSectionProps = {
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
            data={BreakdownPreviewTransformers.toRows(data)}
            columns={BreakdownPreviewColumns}
            emptyState="No data today"
            rowAriaLabel={title}
        />
    </>
)
