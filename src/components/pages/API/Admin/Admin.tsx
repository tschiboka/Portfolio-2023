import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Button, Code, Heading, Main, Section, Spacer } from '@common/ux'
import { ErrorResponse, PostDailyBreakdownResponse } from '@common/types'
import { Screen } from '../../../sharedComponents/Screen/Screen'
import { useAdminApi } from './Admin.query'
import { BreakdownPreview, MOCK_BREAKDOWN } from './BreakdownPreview'

interface AdminProps {
    path: string
}

const Admin = ({ path }: AdminProps) => {
    const { triggerDailyBreakdown } = useAdminApi()
    const [response, setResponse] = useState<PostDailyBreakdownResponse | null>(null)

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

    return (
        <Screen
            title={'Tivadar Debnar | Admin'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Admin"
        >
            <Main>
                <Heading>Admin</Heading>
                <Section title="Daily Breakdown" expandable defaultOpen={false}>
                    <Button onClick={() => sendDailyBreakdown()} disabled={isPending}>
                        {isPending ? 'Sending...' : 'Action Daily Breakdown'}
                    </Button>
                    <Spacer size="16" />
                    {response && (
                        <Section title="Response" expandable defaultOpen>
                            <Code language="json" content={JSON.stringify(response, null, 2)} />
                        </Section>
                    )}
                    <Section title="Email Preview" expandable defaultOpen={false}>
                        <BreakdownPreview breakdown={MOCK_BREAKDOWN} />
                    </Section>
                </Section>
            </Main>
        </Screen>
    )
}

export default Admin
