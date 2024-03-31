import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'

interface AdminProps {
    path: string
}

const Admin = ({ path }: AdminProps) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <Page title={'Tivadar Debnar | Admin'} path={path} recordVisit={false}>
            <Nav pageName="Admin" />
            {mobileMenuVisible && <MobileMenu pageName="Admin" />}
            <h1>Admin</h1>
        </Page>
    )
}

export default Admin
