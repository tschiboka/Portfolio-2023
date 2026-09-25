import { AccessGuard } from '@shared-components/AccessGuard'
import { XmasMessage } from '@common-types'
import { Heading } from '@common-ux'
import { Table } from '@common-ux/Table/Table'
import { YourMessagesColumns } from './YourMessages.columns'
import { MessageTransformers } from '../Xmas2025.transformers'

export type YourMessagesProps = {
    messages?: XmasMessage[]
}

export const YourMessages = ({ messages }: YourMessagesProps) =>
    messages ? (
        <AccessGuard
            guards={[
                {
                    unless: { type: 'capability', capabilities: ['admin'] },
                    then: { mode: 'hidden' },
                },
            ]}
        >
            <Heading>Your Messages</Heading>
            <Table
                className="message-wall"
                data={messages.map(MessageTransformers.toMessageRow)}
                columns={YourMessagesColumns}
                rowAriaLabel="Your message"
            />
        </AccessGuard>
    ) : null
