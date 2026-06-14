// HTML template helpers for the daily breakdown email.
// Each function acts like a small React component — composing into the full message.

import { PathBreakdownItem, SectionData } from './breakdown.type'

export const renderHeader = () => `
    <div style="background:#111; color:#eee; padding:24px 20px; border-bottom:1px solid #333;">
        <h2 style="margin:0; font-size:1.53rem; font-weight:700; font-variant:small-caps;">
            <img src="https://tschiboka.com/assets/icons/icon-chart.svg" alt="" width="20" height="20" style="vertical-align:middle; margin-right:8px;" />Daily Breakdown Report
        </h2>
        <p style="margin:6px 0 0; opacity:0.7; font-size:0.74rem; color:#bbb;">
            Automated analytics summary
        </p>
    </div>
`

export const renderFooter = () => `
    <p style="margin-top:24px; font-size:0.58rem; color:#888; text-align:center; font-weight:300; font-family:'Fira Code',monospace;">
        tschiboka.com &bull; automated report system
    </p>
`

const renderRows = (today: PathBreakdownItem[], total: PathBreakdownItem[]) => {
    if (!today.length) {
        return `<tr><td colspan="3" style="padding:8px 0; color:#888; font-style:italic; font-weight:300;">No data today</td></tr>`
    }

    return today
        .map(
            (item) => `
            <tr>
                <td style="padding:8px 0; border-bottom:1px solid #222; color:#d8d8d8; font-weight:300;">${item.path}</td>
                <td style="text-align:right; padding:8px 0; border-bottom:1px solid #222; font-weight:700; color:#eee;">${item.count}</td>
                <td style="text-align:right; padding:8px 0; border-bottom:1px solid #222; color:#a8a8a8; font-weight:300;">${(total.find((t) => t.path === item.path) || { count: 0 }).count}</td>
                </td>
            </tr>
        `,
        )
        .join('')
}

export const renderSection = (title: string, data: SectionData) => {
    const iconUrl =
        title === 'Visits'
            ? 'https://tschiboka.com/assets/icons/icon-eye.svg'
            : 'https://tschiboka.com/assets/icons/icon-heart.svg'

    return `
    <h3 style="margin:0 0 12px; font-size:1.2rem; font-weight:700; color:#d8d8d8; font-variant:small-caps;">
        <img src="${iconUrl}" alt="" width="16" height="16" style="vertical-align:middle; margin-right:6px;" />${title}
    </h3>

    <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
        <tr>
            <td style="width:50%; padding:6px;">
                <div style="background:#222; border-radius:8px; border:1px solid #333; padding:12px; text-align:center;">
                    <div style="font-size:0.58rem; color:#a8a8a8; margin-bottom:2px; font-weight:300;">Today</div>
                    <div style="font-size:1.94rem; font-weight:700; line-height:1.1; color:#00ffff;">${data.todayCount}</div>
                </div>
            </td>
            <td style="width:16px; text-align:center;">&nbsp;</td>
            <td style="width:50%; padding:6px;">
                <div style="background:#222; border-radius:8px; border:1px solid #333; padding:12px; text-align:center;">
                    <div style="font-size:0.58rem; color:#a8a8a8; margin-bottom:2px; font-weight:300;">Total</div>
                    <div style="font-size:1.94rem; font-weight:700; line-height:1.1; color:#00ffff;">${data.totalCount}</div>
                </div>
            </td>
        </tr>
    </table>

    <table style="width:100%; font-size:0.74rem; border-collapse:collapse; color:#d8d8d8;">
        <thead>
            <tr style="text-align:left; color:#a8a8a8; font-variant:small-caps;">
                <th style="padding:8px 0; border-bottom:1px solid #333; font-weight:700;">Path</th>
                <th style="text-align:right; padding:8px 0; border-bottom:1px solid #333; font-weight:700;">Today</th>
                <th style="text-align:right; padding:8px 0; border-bottom:1px solid #333; font-weight:700;">Total</th>
            </tr>
        </thead>
        <tbody>
            ${renderRows(data.today, data.total)}
        </tbody>
    </table>
`
}
