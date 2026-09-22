import { Heading, Icon, Paragraph } from '@common-ux'
import { BreakdownPreviewConstants } from '../BreakdownPreview.constants'
import { BreakdownPreviewStyles } from '../BreakdownPreview.styles'

export const Header = () => (
    <div className="bp-header" style={BreakdownPreviewStyles.header.style}>
        <Heading as="h2" style={BreakdownPreviewStyles.header.title}>
            <Icon
                name="chart"
                size={BreakdownPreviewConstants.icon.chart.size}
                color={BreakdownPreviewConstants.icon.chart.color}
                style={BreakdownPreviewStyles.header.icon}
            />
            Daily Breakdown Report
        </Heading>
        <Paragraph style={BreakdownPreviewStyles.header.sub}>Automated analytics summary</Paragraph>
    </div>
)
