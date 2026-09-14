import { useState } from 'react'
import { AxiosError } from 'axios'
import { Button, Code, Heading, Main, Paragraph, Section, Spacer } from '@common-ux'
import { ErrorResponse, PostBackfillResponse, PostDailyBreakdownResponse } from '@common-types'
import { Screen } from '@shared-components/Screen/Screen'
import type { Nullable } from '@common-utils'
import { AdminQueries } from './Admin.queries'
import { BreakdownPreview, MockBreakdown } from './BreakdownPreview'

type AdminProps = {
    path: string
}

export const Admin = ({ path }: AdminProps) => {
    const [response, setResponse] = useState<Nullable<PostDailyBreakdownResponse>>(null)
    const [backfillResult, setBackfillResult] = useState<Nullable<PostBackfillResponse>>(null)

    const { mutate: sendDailyBreakdown, isPending } = AdminQueries.DailyBreakdown.usePost({
        onSuccess: (res) => setResponse(res.data),
        onError: (error: AxiosError<ErrorResponse>) =>
            setResponse({
                success: false,
                error: error.response?.data?.message ?? error.message,
            }),
    })

    const { mutate: runBackfill, isPending: isBackfillPending } = AdminQueries.Backfill.usePost({
        onSuccess: (res) => setBackfillResult(res.data),
    })

    return (
        <Screen
            title={'tschiboka | Admin'}
            path={path}
            loginRequired
            variant="app"
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
                        <BreakdownPreview breakdown={MockBreakdown} />
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
