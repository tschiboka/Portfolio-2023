import moment from 'moment'
import { AccessGuard } from '../../../../common/AccessGuard/AccessGuard'
import { XmasMessageResponseResource } from '../../API/common/types'
import { DISPLAY_DATE_TIME_FORMAT } from '../../../../common/dateTime'

export type MessageWallProps = {
    messages?: XmasMessageResponseResource[]
}

export const MessageWall = ({ messages }: MessageWallProps) =>
    messages ? (
        <AccessGuard allowedRoles={['admin']}>
            <h2>Messaging wall</h2>
            <table className="message-wall">
                <thead>
                    <tr>
                        <td className="sm">Date</td>
                        <td>Name</td>
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
                            <td>{msg.name}</td>
                            <td>{msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AccessGuard>
    ) : null
