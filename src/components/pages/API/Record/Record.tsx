import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'

interface RecordProps {
    path: string
}

const Record = ({ path }: RecordProps) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <Page title={'Tivadar Debnar | Record'} path={path} recordVisit={false}>
            <Nav pageName="Record" />
            {mobileMenuVisible && <MobileMenu pageName="Record" />}
            <h1>Record</h1>
        </Page>
    )
}

export default Record
