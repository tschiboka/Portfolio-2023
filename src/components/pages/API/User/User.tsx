import { Screen } from '../../../sharedComponents/Screen/Screen'

interface UserProps {
    path: string
}

const User = ({ path }: UserProps) => {
    return (
        <Screen title={'tschiboka | User'} path={path} loginRequired variant="api" pageName="User">
            <h1>User</h1>
        </Screen>
    )
}

export default User
