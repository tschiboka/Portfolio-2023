/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { Screen } from '@shared-components/Screen/Screen'
import { Heading } from '@common-ux'

type UserProps = {
    path: string
}

export const User = ({ path }: UserProps) => (
    <Screen title={'tschiboka | User'} path={path} loginRequired variant="app" pageName="User">
        <Heading as="h1">User</Heading>
    </Screen>
)
