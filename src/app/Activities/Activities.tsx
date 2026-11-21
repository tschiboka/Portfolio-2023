/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { Heading } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'

type ActivitiesProps = {
    path: string
}

export const Activities = ({ path }: ActivitiesProps) => (
    <Screen
        title="tschiboka | Activities"
        path={path}
        loginRequired
        variant="app"
        pageName="Activities"
    >
        <Heading as="h1">Activities</Heading>
    </Screen>
)
