import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'

interface UserProps {
    path: string
}

const User = ({ path }: UserProps) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <Page title={'Tivadar Debnar | User'} path={path} recordVisit={false}>
            <Nav pageName="User" />
            {mobileMenuVisible && <MobileMenu pageName="User" />}
            <h1>User</h1>
        </Page>
    )
}

export default User
