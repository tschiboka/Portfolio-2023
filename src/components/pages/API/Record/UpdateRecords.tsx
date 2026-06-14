import { Screen } from '../../../sharedComponents/Screen/Screen'

interface UpdateRecordsProps {
    path: string
}

const UpdateRecords = ({ path }: UpdateRecordsProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Update Records'}
            path={path}
            loginRequired
            variant="api"
            pageName="Update Records"
        >
            <main>
                <h1>Update Records</h1>
            </main>
        </Screen>
    )
}

export default UpdateRecords
