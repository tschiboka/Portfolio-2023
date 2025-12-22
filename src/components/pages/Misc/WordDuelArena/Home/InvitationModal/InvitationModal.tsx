import { useEffect, useState } from 'react'
import { Modal, useModal } from '../../common/components'
import { generateSessionPath } from '../../common/utils'
import './InvitationModal.styles.css'

export const InvitationModal = () => {
    const { setClose } = useModal()
    const [sessionLink, setSessionLink] = useState('')
    const [copied, setCopied] = useState(false)

    const copySessionLink = async () => {
        await navigator.clipboard.writeText(sessionLink)
        setCopied(true)
    }

    const actions: ModalAction[] = [
        {
            label: 'Copy Link',
            onClick: copySessionLink,
        },
        { label: 'Enter Game', onClick: setClose },
    ]

    useEffect(() => setSessionLink(generateSessionPath()), [])

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
