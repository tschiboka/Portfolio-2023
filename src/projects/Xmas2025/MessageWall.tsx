import { AccessGuard } from '@shared-components/AccessGuard'
import { XmasMessage } from '@common-types'
import { Heading } from '@common-ux'
import { Table } from '@common-ux/Table/Table'
import { MessageWallColumns } from './MessageWall.columns'
import { MessageTransformers } from './Xmas2025.transformers'

export type MessageWallProps = {
    messages?: XmasMessage[]
}

export const MessageWall = ({ messages }: MessageWallProps) =>
    messages ? (
        <AccessGuard
            guards={[
                { when: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'hidden' } },
            ]}
        >
            <Heading>Messaging wall</Heading>
            <Table
                className="message-wall"
                data={messages.map(MessageTransformers.toMessageRow)}
                columns={MessageWallColumns}
                rowAriaLabel="Xmas message"
            />
        </AccessGuard>
    ) : null
