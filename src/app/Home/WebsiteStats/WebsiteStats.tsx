import { Stack, Section } from '@common-ux'
import { ClientMessage, errorMessage as getErrorMessage } from '@common-utils'
import { WebsiteStatsQueries } from './WebsiteStats.queries'
import { BreakdownTable, BreakdownTableController } from './BreakdownTable'

export const WebsiteStats = () => {
    const controller = BreakdownTableController.useTable()
    const { data: websiteStats, ...websiteStatsQuery } = WebsiteStatsQueries.ActivityFeed.useGet({
        params: controller.params,
    })

    // TODO: Add toast notification for errors
    const errorMessage = websiteStatsQuery.error
        ? getErrorMessage(websiteStatsQuery.error, ClientMessage.Failure.Fetch('activity feed'))
        : undefined

    return (
        <Section title="Website Stats">
            <Stack.Vertical gap="8">
                {errorMessage && (
                    <div
                        role="alert"
                        style={{
                            padding: '12px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--errora10)',
                            border: '1px solid var(--error)',
                            color: 'var(--error)',
                        }}
                    >
                        {errorMessage}
                    </div>
                )}
                <BreakdownTable
                    data={websiteStats?.data}
                    meta={websiteStats?.meta}
                    controller={controller}
                    context={websiteStats?.context}
                    isLoading={websiteStatsQuery.isLoading}
                    onRefresh={websiteStatsQuery.refetch}
                />
            </Stack.Vertical>
        </Section>
    )
}
