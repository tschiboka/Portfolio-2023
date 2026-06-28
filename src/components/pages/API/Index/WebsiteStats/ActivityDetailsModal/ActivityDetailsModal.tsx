/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { Overlay, Code, Stack, Text, CodeText, Box } from '@common/ux'
import type {
    BreakdownRow,
    ActivityMessageDetails,
    ActivityErrorDetails,
} from '../BreakdownTable/BreakdownTable.types'

type ActivityDetailsModalProps = {
    row: BreakdownRow
    onClose: () => void
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <Stack.Horizontal gap="12" align="start">
        <Box style={{ minWidth: 80, flexShrink: 0 }}>
            <Text weight="semibold" tone="muted" truncate>
                {label}
            </Text>
        </Box>
        <Box style={{ flex: 1 }}>{children}</Box>
    </Stack.Horizontal>
)

const MessageContent = ({ details }: { details: ActivityMessageDetails }) => (
    <Stack.Vertical gap="8">
        <Field label="Name">
            <Text>{details.name}</Text>
        </Field>
        <Field label="Email">
            <CodeText>{details.email}</CodeText>
        </Field>
        <Field label="Phone">
            <Text>{details.phone ?? 'N/A'}</Text>
        </Field>
        <Field label="Read">
            <Text>{details.isRead ? 'Yes' : 'No'}</Text>
        </Field>
        <Field label="Message">
            <Box
                padding="12"
                background="surface"
                borderRadius="md"
                style={{ whiteSpace: 'pre-wrap' }}
            >
                <Text>{details.message}</Text>
            </Box>
        </Field>
    </Stack.Vertical>
)

const ErrorContent = ({ details }: { details: ActivityErrorDetails }) => (
    <Stack.Vertical gap="12">
        <Field label="Error">
            <CodeText>{details.name}</CodeText>
        </Field>
        <Field label="Message">
            <Text>{details.message}</Text>
        </Field>
        {details.stack && (
            <Stack.Vertical gap="4">
                <Text weight="semibold" tone="muted" size="sm">
                    Stack Trace
                </Text>
                <Box
                    background="surface"
                    borderRadius="md"
                    padding="12"
                    style={{ maxHeight: 300, overflow: 'auto' }}
                >
                    <Code language="javascript" content={details.stack} />
                </Box>
            </Stack.Vertical>
        )}
    </Stack.Vertical>
)

export const ActivityDetailsModal = ({ row, onClose }: ActivityDetailsModalProps) => {
    const isMessage = row.type === 'message'
    const isError = row.type === 'error'

    const msgDetails: ActivityMessageDetails | undefined =
        isMessage && row.details ? (JSON.parse(row.details) as ActivityMessageDetails) : undefined
    const errDetails: ActivityErrorDetails | undefined =
        isError && row.details ? (JSON.parse(row.details) as ActivityErrorDetails) : undefined

    return (
        <Overlay.Modal
            title={isMessage ? 'Message Details' : 'Error Details'}
            size="lg"
            mode={isError ? 'danger' : 'info'}
            onClose={onClose}
        >
            {isMessage && msgDetails && <MessageContent details={msgDetails} />}
            {isError && errDetails && <ErrorContent details={errDetails} />}
            {!isMessage && !isError && (
                <Text tone="muted" align="center">
                    No additional details available for this event type.
                </Text>
            )}
        </Overlay.Modal>
    )
}
