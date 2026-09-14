import { Screen } from '@shared-components/Screen/Screen'

interface ViewRecordProps {
    path: string
}

export const ViewRecord = ({ path }: ViewRecordProps) => {
    return (
        <Screen
            title={'tschiboka | View Records'}
            path={path}
            loginRequired
            variant="app"
            pageName="View Records"
        >
            <main>
                <h1>View Records</h1>
            </main>
        </Screen>
    )
}
