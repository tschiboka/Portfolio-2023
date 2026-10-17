import { AccessGuard } from '@shared-components/AccessGuard'
import { Heading } from '@common-ux'
import { Table } from '@common-ux/Table/Table'
import { MessageWallColumns } from './MessageWall.columns'
import { XmasTransformers } from '../Xmas.transformers'
import type { MessageWallProps } from './MessageWall.types'

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
                data={messages.map(XmasTransformers.toMessageRow)}
                columns={MessageWallColumns}
                rowAriaLabel="Xmas message"
            />
        </AccessGuard>
    ) : null
