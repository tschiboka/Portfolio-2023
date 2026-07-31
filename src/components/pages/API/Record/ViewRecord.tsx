import { Screen } from '../../../sharedComponents/Screen/Screen'

interface ViewRecordsProps {
    path: string
}

const ViewRecords = ({ path }: ViewRecordsProps) => {
    return (
        <Screen
            title={'tschiboka | View Records'}
            path={path}
            loginRequired
            variant="api"
            pageName="View Records"
        >
            <main>
                <h1>View Records</h1>
            </main>
        </Screen>
    )
}

export default ViewRecords
