import moment from 'moment'
import { AccessGuard } from '../../../../common/AccessGuard/AccessGuard'
import { XmasMessageResponseResource } from '../../API/common/types'
import { DISPLAY_DATE_TIME_FORMAT } from '../../../../common/dateTime'

export type YourMessagesProps = {
    messages?: XmasMessageResponseResource[]
}

export const YourMessages = ({ messages }: YourMessagesProps) =>
    messages ? (
        <AccessGuard deniedRoles={['admin']}>
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
                                {moment(msg.createdAt).format(
                                    DISPLAY_DATE_TIME_FORMAT,
                                )}
                            </td>
                            <td>{msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AccessGuard>
    ) : null
