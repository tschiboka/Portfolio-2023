import { Screen } from '@shared-components/Screen/Screen'
import { useGetMessages, useGetPagePingData, usePostMessage } from './Xmas2025.queries'
import { useEffect, useState } from 'react'
import { Form, Heading, LoadingIndicator, Main, Paragraph } from '@common-ux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { XmasSchema } from './Xmas2025.schema'
import { XmasFormData } from './Xmas2025.types'
import { XmasTransformers } from './Xmas2025.transformers'
import { LogoutHooks } from '../../app/Logout/Logout.hooks'
import Reindeer from '@projects/assets/xmas/reindeer.png'
import XmasFormCanvas from './components/XmasFormCanvas'
import { MessageWall } from './components/MessageWall'
import { YourMessages } from './components/YourMessages'
import { Session } from '@shared-context'
import { CandlePanel } from './components/CandlePanel'
import './Xmas2025.styles.scss'

export const Xmas2025 = () => {
    const { user } = Session.useContext().session || {}
    const [pagePingStatus, setPagePingStatus] = useState<string>('')

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.userName || '',
            message: '',
        },
        resolver: yupResolver(XmasSchema),
        mode: 'onSubmit',
    })

    useEffect(() => {
        reset({ name: user?.userName || '' })
    }, [user, reset])

    const { data: ping, ...pingResponse } = useGetPagePingData()
    const { mutate: submitMessage, ...submitMessageResponse } = usePostMessage({
        onSuccess: () => reset(),
    })
    const { data: messages } = useGetMessages({ userId: user?.id })

    const logout = LogoutHooks.useLogout()
    const submitHandler = (data: XmasFormData) =>
        user ? submitMessage(XmasTransformers.Post(data, user)) : logout()

    useEffect(() => {
        const loadingMessage = pingResponse.isLoading && 'LOADING...'
        const errorMsg = pingResponse.error && `ERROR: ${pingResponse.error.message}`
        const successMessage = pingResponse.isSuccess && ping?.data?.data?.message
        setPagePingStatus(loadingMessage || errorMsg || successMessage || '')
    }, [ping, pingResponse])

    // Trigger canvas resize when form size changes due to error/success messages
    useEffect(() => {
        // Small delay to ensure DOM has updated before resize
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 100)

        return () => clearTimeout(timer)
    }, [
        errors,
        submitMessageResponse.isError,
        submitMessageResponse.isSuccess,
        submitMessageResponse.error,
    ])

    return (
        <Screen
            title="tschiboka | Xmas 2025"
            path="/xmas2025"
            loginRequired
            className="Xmas"
            variant="app"
            pageName="Xmas"
            footerProps={{
                info: <Paragraph>Page ping message: {pagePingStatus}</Paragraph>,
            }}
        >
            <Main>
                <img className="reindeer-image" src={Reindeer} alt="Reindeer Image" />
                <XmasFormCanvas lightCount={30} lightSize={6}>
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Fieldset>
                            <Form.Label for="name">Name</Form.Label>
                            <Form.Input name="name" control={control} type="text" />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="message">Message</Form.Label>
                            <Form.Input name="message" control={control} type="text" />
                        </Form.Fieldset>
                        <LoadingIndicator show={submitMessageResponse.isPending} />
                        {submitMessageResponse.isError && (
                            <Paragraph className="submit-error-message">
                                {submitMessageResponse.error?.message}
                            </Paragraph>
                        )}
                        {submitMessageResponse.isSuccess && (
                            <Paragraph className="submit-success-message">
                                Successful submission
                            </Paragraph>
                        )}
                        <div className="button-box">
                            <Form.Button type="submit">Submit</Form.Button>
                        </div>
                    </Form>
                </XmasFormCanvas>
                <Heading as="h2">Candles</Heading>
                <CandlePanel />
                <Paragraph>Click on a candle to mess up my candle settings.</Paragraph>
                <MessageWall messages={messages?.data.data} />
                <YourMessages messages={messages?.data.data} />
            </Main>
        </Screen>
    )
}
