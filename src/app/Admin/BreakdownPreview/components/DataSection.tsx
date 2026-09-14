import { isEmpty, type Option } from '@common-utils'
import type { SectionData } from '../BreakdownPreview.types'
import { BreakdownPreviewStyles } from '../BreakdownPreview.styles'

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
        <h3 style={BreakdownPreviewStyles.section.title}>
            {icon}
            {title}
        </h3>
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
        <table style={BreakdownPreviewStyles.table.style}>
            <thead>
                <tr>
                    <th style={BreakdownPreviewStyles.table.th}>Path</th>
                    <th style={BreakdownPreviewStyles.table.thRight}>Today</th>
                    <th style={BreakdownPreviewStyles.table.thRight}>Total</th>
                </tr>
            </thead>
            <tbody>
                {isEmpty(data.today) ? (
                    <tr>
                        <td style={BreakdownPreviewStyles.table.empty} colSpan={3}>
                            No data today
                        </td>
                    </tr>
                ) : (
                    data.today.map((item) => (
                        <tr key={item.path}>
                            <td style={BreakdownPreviewStyles.table.td}>{item.path}</td>
                            <td style={BreakdownPreviewStyles.table.tdRight}>{item.count}</td>
                            <td style={BreakdownPreviewStyles.table.tdTotal}>
                                {data.total.find((t) => t.path === item.path)?.count ?? 0}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </>
)
