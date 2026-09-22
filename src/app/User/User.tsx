import { Screen } from '@shared-components/Screen/Screen'
import { Heading } from '@common-ux'

interface UserProps {
    path: string
}

export const User = ({ path }: UserProps) => {
    return (
        <Screen title={'tschiboka | User'} path={path} loginRequired variant="app" pageName="User">
            <Heading as="h1">User</Heading>
        </Screen>
    )
}
