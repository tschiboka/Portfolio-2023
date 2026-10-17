import { AccessGuard } from '@shared-components/AccessGuard'
import { Heading } from '@common-ux'
import { Table } from '@common-ux/Table/Table'
import { YourMessagesColumns } from './YourMessages.columns'
import { XmasTransformers } from '../Xmas.transformers'
import type { YourMessagesProps } from './YourMessages.types'

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
                data={messages.map(XmasTransformers.toMessageRow)}
                columns={YourMessagesColumns}
                rowAriaLabel="Your message"
            />
        </AccessGuard>
    ) : null
