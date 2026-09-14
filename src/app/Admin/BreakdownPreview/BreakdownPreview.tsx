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

import { Icon } from '@common-ux'
import { BreakdownPreviewConstants } from './BreakdownPreview.constants'
import type { BreakdownPreviewProps } from './BreakdownPreview.types'
import { DataSection } from './components/DataSection'
import { Header } from './components/Header'
import { BreakdownPreviewStyles, responsiveOverrides } from './BreakdownPreview.styles'
import { Signature } from './Signature'

export const BreakdownPreview = ({ breakdown }: BreakdownPreviewProps) => (
    <div className="bp-shell" style={BreakdownPreviewStyles.shell}>
        <style>{responsiveOverrides}</style>
        <div style={BreakdownPreviewStyles.card}>
            <Header />
            <div className="bp-body" style={BreakdownPreviewStyles.body}>
                <DataSection
                    title="Visits"
                    data={breakdown.visits}
                    icon={
                        <Icon
                            name="eye"
                            size={BreakdownPreviewConstants.icon.section.size}
                            color={BreakdownPreviewConstants.icon.section.color}
                            style={BreakdownPreviewStyles.section.icon}
                        />
                    }
                />
                <hr style={BreakdownPreviewStyles.divider} />
                <DataSection
                    title="Likes"
                    data={breakdown.likes}
                    icon={
                        <Icon
                            name="heart"
                            size={BreakdownPreviewConstants.icon.section.size}
                            color={BreakdownPreviewConstants.icon.section.color}
                            style={BreakdownPreviewStyles.section.icon}
                        />
                    }
                />
                <Signature />
            </div>
        </div>
    </div>
)
