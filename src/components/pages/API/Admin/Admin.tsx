import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Button, Code, Heading, Main, Paragraph, Section, Spacer } from '@common/ux'
import { ErrorResponse, PostBackfillResponse, PostDailyBreakdownResponse } from '@common/types'
import { Screen } from '../../../sharedComponents/Screen/Screen'
import { useAdminApi } from './Admin.query'
import { BreakdownPreview, MOCK_BREAKDOWN } from './BreakdownPreview'

interface AdminProps {
    path: string
}

const Admin = ({ path }: AdminProps) => {
    const { triggerDailyBreakdown, triggerBackfill } = useAdminApi()
    const [response, setResponse] = useState<PostDailyBreakdownResponse | null>(null)
    const [backfillResult, setBackfillResult] = useState<PostBackfillResponse | null>(null)

    const { mutate: sendDailyBreakdown, isPending } = useMutation<
        PostDailyBreakdownResponse,
        AxiosError<ErrorResponse>
    >({
        mutationFn: async () => {
            const res = await triggerDailyBreakdown()
            return res.data
        },
        onSuccess: (data) => setResponse(data),
        onError: (error) =>
            setResponse({
                success: false,
                error: error.response?.data?.message ?? error.message,
            }),
    })

    const { mutate: runBackfill, isPending: isBackfillPending } = useMutation<
        PostBackfillResponse,
        AxiosError<ErrorResponse>
    >({
        mutationFn: async () => {
            const res = await triggerBackfill()
            return res.data
        },
        onSuccess: (data) => setBackfillResult(data),
    })

    return (
        <Screen
            title={'Tivadar Debnar | Admin'}
            path={path}
            loginRequired
            variant="api"
            pageName="Admin"
        >
            <Main>
                <Heading>Admin</Heading>

                <Section title="Portfolio and API Daily Breakdown" expandable defaultOpen={false}>
                    <Paragraph>
                        You can trigger the daily breakdown manually or let it run automatically on
                        a schedule. It currently summarizes portfolio visits and likes, then emails
                        the report to the configured recipients. In the future, it will also include
                        messages and other user activity.
                    </Paragraph>
                    <Button onClick={() => sendDailyBreakdown()} disabled={isPending}>
                        {isPending ? 'Sending...' : 'Action Daily Breakdown'}
                    </Button>
                    <Spacer size="16" />
                    {response && (
                        <Section title="Response" expandable defaultOpen>
                            <Paragraph>
                                This is an example of the email you would get from the API when
                                triggering the daily breakdown. The actual response may vary based
                                on the current state of the system and the data being processed.
                            </Paragraph>
                            <Code language="json" content={JSON.stringify(response, null, 2)} />
                        </Section>
                    )}
                    <Section title="Email Preview" expandable defaultOpen={false}>
                        <Paragraph>
                            This is a preview of the email that would be sent when triggering the
                        </Paragraph>
                        <BreakdownPreview breakdown={MOCK_BREAKDOWN} />
                    </Section>
                    <Section title="Backfill Breakdowns" expandable defaultOpen={false}>
                        <Paragraph>
                            You can backfill the daily breakdowns from the raw data. This will
                            process all the raw data and generate the daily breakdowns for the past
                            days. This is useful if you have added new data or if you want to
                            regenerate the breakdowns for any reason.
                        </Paragraph>
                        <Button onClick={() => runBackfill()} disabled={isBackfillPending}>
                            {isBackfillPending
                                ? 'Backfilling...'
                                : 'Backfill DailyBreakdown from raw data'}
                        </Button>
                        {backfillResult && (
                            <>
                                <Spacer size="16" />
                                <Code
                                    language="json"
                                    content={JSON.stringify(backfillResult, null, 2)}
                                />
                            </>
                        )}
                    </Section>
                </Section>
            </Main>
        </Screen>
    )
}

export default Admin
