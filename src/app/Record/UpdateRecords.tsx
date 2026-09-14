import { Screen } from '@shared-components/Screen/Screen'

interface UpdateRecordsProps {
    path: string
}

export const UpdateRecords = ({ path }: UpdateRecordsProps) => {
    return (
        <Screen
            title={'tschiboka | Update Records'}
            path={path}
            loginRequired
            variant="app"
            pageName="Update Records"
        >
            <main>
                <h1>Update Records</h1>
            </main>
        </Screen>
    )
}
