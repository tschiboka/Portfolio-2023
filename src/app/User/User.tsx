import { Screen } from '@shared-components/Screen/Screen'

interface UserProps {
    path: string
}

export const User = ({ path }: UserProps) => {
    return (
        <Screen title={'tschiboka | User'} path={path} loginRequired variant="api" pageName="User">
            <h1>User</h1>
        </Screen>
    )
}
