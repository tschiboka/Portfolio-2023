import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'

interface RemoteProps {
    path: string
}

const Remote = ({ path }: RemoteProps) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <Page title={'Tivadar Debnar | Remote'} path={path} recordVisit={false}>
            <Nav pageName="Remote" />
            {mobileMenuVisible && <MobileMenu pageName="Remote" />}
            <h1>Remote</h1>
        </Page>
    )
}

export default Remote
