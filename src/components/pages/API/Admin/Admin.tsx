import { Screen } from '../../../sharedComponents/Screen/Screen'

interface AdminProps {
    path: string
}

const Admin = ({ path }: AdminProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Admin'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Admin"
        >
            <h1>Admin</h1>
        </Screen>
    )
}

export default Admin
