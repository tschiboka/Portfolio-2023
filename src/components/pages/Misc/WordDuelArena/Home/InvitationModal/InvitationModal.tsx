import { useEffect, useState } from 'react'
import { Modal } from '../../common/components'
import './InvitationModal.styles.css'
import { useNavigate } from 'react-router-dom'
import { Navigation } from '../../common/utils'
import { nanoid } from 'nanoid'

export const InvitationModal = () => {
    const navigate = useNavigate()
    const sessionId = nanoid()

    const [sessionLink, setSessionLink] = useState<string>('')
    const [copied, setCopied] = useState(false)

    const copySessionLink = async () => {
        if (!sessionLink) return

        await navigator.clipboard.writeText(sessionLink)
        setCopied(true)
    }

    useEffect(() => {
        const link = Navigation.generateShareableLink({
            path: Navigation.SESSION,
            params: { sessionId },
        })
        setSessionLink(link)
    }, [])

    const navigateToSession = () => {
        if (!sessionId) return
        navigate(
            Navigation.createPath({
                path: Navigation.SESSION,
                params: { sessionId },
            }),
        )
    }

    const actions: ModalAction[] = [
        {
            label: 'Copy Link',
            onClick: copySessionLink,
        },
        { label: 'Enter Game', onClick: navigateToSession },
    ]

    return (
        <div className="modal invitation-modal">
            <Modal.Header title="Invite a Friend" />
            <Modal.Body>
                <p>
                    Copy and share this link with your friend to invite them
                    into the duel. Once they join, the game will start
                    automatically.
                </p>
                <code className="session-link">{sessionLink}</code>
                {copied && <p>Link copied to clipboard!</p>}
                <Modal.Actions actions={actions} />
            </Modal.Body>
        </div>
    )
}
