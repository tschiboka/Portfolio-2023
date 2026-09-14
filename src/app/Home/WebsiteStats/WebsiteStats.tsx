import { Stack, Section } from '@common-ux'
import { WebsiteStatsQueries } from './WebsiteStats.queries'
import { BreakdownTable, useBreakdownTableController } from './BreakdownTable'
import { ClientMessage, errorMessage as getErrorMessage } from '@common-utils'

export const WebsiteStats = () => {
    const controller = useBreakdownTableController()
    const { data: websiteStats, ...websiteStatsQuery } = WebsiteStatsQueries.useGet({
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
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                            border: '1px solid red',
                            color: 'red',
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
