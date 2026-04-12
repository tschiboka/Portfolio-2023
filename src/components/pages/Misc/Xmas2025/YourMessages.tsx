import moment from 'moment'
import { AccessGuard } from '@common/utils/AccessGuard'
import { XmasMessage } from '@common/types'
import { DateTime } from '@common/utils'

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
            <h2>Your Messages</h2>
            <table className="message-wall">
                <thead>
                    <tr>
                        <td className="sm">Date</td>
                        <td>Message</td>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((msg) => (
                        <tr key={msg._id}>
                            <td>
                                {moment(msg.createdAt).format(DateTime.Formats.DisplayDateTime)}
                            </td>
                            <td>{msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AccessGuard>
    ) : null
