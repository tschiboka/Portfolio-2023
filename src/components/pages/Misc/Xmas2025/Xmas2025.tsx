import Nav from '../../../sharedComponents/Nav/Nav'
import Menu from '../../../sharedComponents/Menu/Menu'
import SubNav from '../../../sharedComponents/SubNav/SubNav'
import Footer from '../../../sharedComponents/Footer/Footer'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import { useGetPagePingData } from './Xmas2025.queries'
import { useEffect, useState } from 'react'

interface Props {
    pageName: string
    path: string
}

const Xmas2025 = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext()
    const [pagePingStatus, setPagePingStatus] = useState<string>('')
    const { data: ping, ...pingResponse } = useGetPagePingData()

    useEffect(() => {
        const loadingMessage = pingResponse.isLoading && 'LOADING...'
        const errorMsg =
            pingResponse.error && `ERROR: ${pingResponse.error.message}`
        const successMessage =
            pingResponse.isSuccess && ping?.data?.data?.message
        setPagePingStatus(loadingMessage || errorMsg || successMessage || '')
    }, [ping, pingResponse])

    return (
        <Page title="Tivadar Debnar | Xmas 2025" path="/xmas2025">
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="Xmas" />}
            {subMenuVisible && <SubNav />}
            <main>
                <p>This page is under construction.</p>
                <p>Page ping message: {pagePingStatus}</p>
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    )
}

export default Xmas2025
