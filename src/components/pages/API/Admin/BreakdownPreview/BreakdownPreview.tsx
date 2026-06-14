/**
 * BreakdownPreview
 *
 * Renders an exact 1:1 preview of the daily breakdown email template.
 * Used in the Admin panel to visually verify the email HTML before sending.
 *
 * Mirrors the server-side template in:
 *   server/cron/emails/breakdown/breakdown.utils.ts
 *   server/cron/emails/breakdown/breakdown.ts (createMessage)
 *
 * Any changes to the email template must be reflected in BOTH places.
 */

import type { BreakdownPreviewProps, SectionData } from './BreakdownPreview.types'
import {
    shellStyle,
    cardStyle,
    headerStyle,
    headerTitleStyle,
    headerSubStyle,
    bodyStyle,
    sectionTitleStyle,
    statCardStyle,
    statLabelStyle,
    statValueStyle,
    tableStyle,
    thStyle,
    thRightStyle,
    tdStyle,
    tdRightStyle,
    tdTotalStyle,
    emptyStyle,
    dividerStyle,
    responsiveOverrides,
} from './BreakdownPreview.styles'
import Signature from './Signature'

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const Header = () => (
    <div className="bp-header" style={headerStyle}>
        <h2 style={headerTitleStyle}>
            <ChartIcon />
            Daily Breakdown Report
        </h2>
        <p style={headerSubStyle}>Automated analytics summary</p>
    </div>
)

const ChartIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a8a8a8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '8px', verticalAlign: 'middle' }}
    >
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
    </svg>
)

const EyeIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#888"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '6px', verticalAlign: 'middle' }}
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const HeartIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#888"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '6px', verticalAlign: 'middle' }}
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
)

const StatCard = ({ label, value }: { label: string; value: number }) => (
    <div className="bp-stat" style={statCardStyle}>
        <div className="bp-stat-label" style={statLabelStyle}>
            {label}
        </div>
        <div className="bp-stat-value" style={statValueStyle}>
            {value}
        </div>
    </div>
)

type DataSectionProps = {
    title: string
    data: SectionData
    icon: JSX.Element
}

const DataSection = ({ title, data, icon }: DataSectionProps) => (
    <>
        <h3 className="bp-section-title" style={sectionTitleStyle}>
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

        <table className="bp-table" style={tableStyle}>
            <thead>
                <tr>
                    <th className="bp-th" style={thStyle}>
                        Path
                    </th>
                    <th className="bp-th" style={thRightStyle}>
                        Today
                    </th>
                    <th className="bp-th" style={thRightStyle}>
                        Total
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.today.length === 0 ? (
                    <tr>
                        <td className="bp-empty" style={emptyStyle} colSpan={3}>
                            No data today
                        </td>
                    </tr>
                ) : (
                    data.today.map((item) => (
                        <tr key={item.path}>
                            <td className="bp-td" style={tdStyle}>
                                {item.path}
                            </td>
                            <td className="bp-td" style={tdRightStyle}>
                                {item.count}
                            </td>
                            <td className="bp-td-total" style={tdTotalStyle}>
                                {data.total.find((t) => t.path === item.path)?.count ?? 0}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </>
)

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

export const BreakdownPreview = ({ breakdown }: BreakdownPreviewProps) => (
    <div className="bp-shell" style={shellStyle}>
        {/* Responsive overrides via inline style tag */}
        <div dangerouslySetInnerHTML={{ __html: responsiveOverrides }} />

        <div className="bp-card" style={cardStyle}>
            <Header />

            <div className="bp-body" style={bodyStyle}>
                <DataSection title="Visits" data={breakdown.visits} icon={<EyeIcon />} />
                <hr className="bp-divider" style={dividerStyle} />
                <DataSection title="Likes" data={breakdown.likes} icon={<HeartIcon />} />
                <Signature />
            </div>
        </div>
    </div>
)
