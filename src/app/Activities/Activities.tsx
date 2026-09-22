import { Heading } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'

interface ActivitiesProps {
    path: string
}

export const Activities = ({ path }: ActivitiesProps) => {
    return (
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
}
