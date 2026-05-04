import { Screen } from '../../../sharedComponents/Screen/Screen'

interface ActivitiesProps {
    path: string
}

const Activities = ({ path }: ActivitiesProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Activities'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Activities"
        >
            <h1>Activities</h1>
        </Screen>
    )
}

export default Activities
