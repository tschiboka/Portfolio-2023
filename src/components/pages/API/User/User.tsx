import { Screen } from '../../../sharedComponents/Screen/Screen'

interface UserProps {
    path: string
}

const User = ({ path }: UserProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | User'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="User"
        >
            <h1>User</h1>
        </Screen>
    )
}

export default User
