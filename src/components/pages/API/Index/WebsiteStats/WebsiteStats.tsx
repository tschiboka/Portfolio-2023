import { Stack, Section } from '@common/ux'
import { useGetActivityFeed } from './WebsiteStats.queries'
import { AxiosError } from 'axios'
import { BreakdownTable, useBreakdownTableController } from './BreakdownTable'

export const WebsiteStats = () => {
    const controller = useBreakdownTableController()
    const { data, ...activityFeedResponse } = useGetActivityFeed({ params: controller.params })

    // TODO: Add toast notification for errors
    const errorMessage =
        activityFeedResponse.error instanceof AxiosError
            ? String(
                  (activityFeedResponse.error.response?.data as Record<string, unknown>)?.message ??
                      activityFeedResponse.error.message ??
                      'Unknown error',
              )
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
                    data={data?.data}
                    meta={data?.meta}
                    controller={controller}
                    context={data?.context}
                    isLoading={activityFeedResponse.isLoading}
                    onRefresh={activityFeedResponse.refetch}
                />
            </Stack.Vertical>
        </Section>
    )
}
