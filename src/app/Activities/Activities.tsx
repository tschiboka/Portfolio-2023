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
            <h1>Activities</h1>
        </Screen>
    )
}
