import { Screen } from '../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import MessageAcknowledgement from './MessageAcknowledgement/MessageAcknowledgement'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Form, LoadingIndicator } from '@common/ux'
import { ErrorResponse, PostMessageResponse } from '@common/types'
import { ContactFormData } from './Contact.types'
import { contactSchema, MAX_MESSAGE_CHARACTERS } from './Contact.schema'
import { useContactApi } from './Contact.query'
import './Contact.scss'

type ContactProps = {
    pageName: string
    path: string
}

const Contact = ({ pageName, path }: ContactProps) => {
    const { sendMessageRequest } = useContactApi()

    const [submitErrorMessage, setSubmitErrorMessage] = useState('')
    const [showMessageAck, setShowMessageAck] = useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        resolver: yupResolver(contactSchema),
    })

    const sendMessage = useMutation<
        PostMessageResponse,
        AxiosError<ErrorResponse>,
        ContactFormData
    >({
        mutationFn: async (data: ContactFormData) => {
            const payload = {
                name: data.name,
                email: data.email.toLowerCase(),
                phone: data.phone?.replace(/\D/g, '') || undefined,
                message: data.message,
            }
            const res = await sendMessageRequest(payload)
            return res.data
        },
        onSuccess: () => {
            setSubmitErrorMessage('')
            setShowMessageAck(true)
        },
        onError: (error) => {
            setSubmitErrorMessage(error.response?.data?.message ?? error.message)
        },
    })

    const submitHandler = (data: ContactFormData, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        sendMessage.mutate(data)
    }

    const isLoading = sendMessage.isPending

    return (
        <Screen
            title="Tivadar Debnar | Contact"
            path={path}
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
        >
            {showMessageAck && <MessageAcknowledgement />}

            <main className="contact">
                <h1>Get in Touch!</h1>
                <section>
                    <Form onSubmit={handleSubmit(submitHandler)} ariaLabel="Contact form">
                        <Form.Fieldset>
                            <Form.Label for="name">Full name</Form.Label>
                            <Form.Input
                                name="name"
                                control={control}
                                type="text"
                                autoComplete="name"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="email">Email</Form.Label>
                            <Form.Input
                                name="email"
                                control={control}
                                type="text"
                                autoComplete="email"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="phone">Phone</Form.Label>
                            <Form.Input
                                name="phone"
                                control={control}
                                type="tel"
                                autoComplete="tel"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="message">Message</Form.Label>
                            <Form.TextArea
                                name="message"
                                control={control}
                                maxLength={MAX_MESSAGE_CHARACTERS}
                                rows={5}
                            />
                        </Form.Fieldset>
                        <LoadingIndicator show={isLoading} />
                        {submitErrorMessage && (
                            <p className="submit-error-message">{submitErrorMessage}</p>
                        )}
                        <Form.ButtonGroup>
                            <Form.Button type="submit" disabled={isLoading || showMessageAck}>
                                Send Message
                            </Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                </section>
            </main>
        </Screen>
    )
}

export default Contact
