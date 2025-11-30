import Footer from '../../../sharedComponents/Footer/Footer'
import { useAppContext } from '../../../../context/AppContext/App.context'
import Page from '../../../sharedComponents/Page/Page'
import {
    useGetMessages,
    useGetPagePingData,
    usePostMessage,
} from './Xmas2025.queries'
import { useEffect, useState } from 'react'
import { Submenu } from '../../API/Nav'
import Nav from '../../API/Nav/Nav'
import SubmenuPanel from '../../API/Nav/SubmenuPanel/SubmenuPanel'
import MobileMenu from '../../API/MobileMenu/MobileMenu'
import { WrappedInput } from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import LoadingIndicator from '../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { xmasSchema } from './Xmas2025.schema'
import { XmasFormData } from './Xmas2025.types'
import './Xmas2025.styles.scss'
import { useLogout } from '../../API/Logout/Logout'
import { xmasTransformer } from './Xmas2025.transformers'
import Reindeer from '../../../../assets/images/projects/xmas/reindeer.png'
import XmasFormCanvas from './XmasFormCanvas'
import { MessageWall } from './MessageWall'
import { YourMessages } from './YourMessages'
import { useSessionContext } from '../../../../context/SessionContext/Session.context'
import { CandlePanel } from './CandlePanel'

interface Props {
    pageName: string
    path: string
}

const Xmas2025 = ({ pageName, path }: Props) => {
    const { mobileMenuVisible } = useAppContext()
    const { user } = useSessionContext().session || {}
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])
    const [pagePingStatus, setPagePingStatus] = useState<string>('')

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            message: '',
        },
        resolver: yupResolver(xmasSchema),
        mode: 'onSubmit',
    })

    const { data: ping, ...pingResponse } = useGetPagePingData()
    const { mutate: submitMessage, ...submitMessageResponse } = usePostMessage({
        onSuccess: () => reset(),
    })
    const { data: messages } = useGetMessages({ userId: user?.id })

    const logout = useLogout()
    const submitHandler = (data: XmasFormData) =>
        user ? submitMessage(xmasTransformer.toApi(data, user)) : logout()

    useEffect(() => {
        const loadingMessage = pingResponse.isLoading && 'LOADING...'
        const errorMsg =
            pingResponse.error && `ERROR: ${pingResponse.error.message}`
        const successMessage =
            pingResponse.isSuccess && ping?.data?.data?.message
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
        <Page
            title="Tivadar Debnar | Xmas 2025"
            path="/xmas2025"
            loginRequired
            recordVisit={true}
            className="Xmas"
        >
            {' '}
            <Nav
                pageName="Xmas"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Xmas 2025"
                />
            )}
            {mobileMenuVisible && <MobileMenu pageName="Xmas" />}
            <main>
                <img
                    className="reindeer-image"
                    src={Reindeer}
                    alt="Reindeer Image"
                />
                <XmasFormCanvas lightCount={30} lightSize={6}>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <fieldset>
                            <label htmlFor="name">Name</label>
                            <WrappedInput
                                name="name"
                                control={control}
                                type="text"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="message">Message</label>
                            <WrappedInput
                                name="message"
                                control={control}
                                type="text"
                            />
                        </fieldset>
                        <LoadingIndicator
                            show={submitMessageResponse.isPending}
                        />
                        {submitMessageResponse.isError && (
                            <p className="submit-error-message">
                                {submitMessageResponse.error?.message}
                            </p>
                        )}
                        {submitMessageResponse.isSuccess && (
                            <p className="submit-success-message">
                                Successful submission
                            </p>
                        )}
                        <div className="button-box">
                            <button name="submit">Submit</button>
                        </div>
                    </form>
                </XmasFormCanvas>
                <h2>Candles</h2>
                <CandlePanel />
                <p>Click on a candle to mess up my candle settings.</p>
                <MessageWall messages={messages?.data.data} />
                <YourMessages messages={messages?.data.data} />
            </main>
            <Footer
                pageName={pageName}
                path={path}
                info={<p>Page ping message: {pagePingStatus}</p>}
            />
        </Page>
    )
}

export default Xmas2025
