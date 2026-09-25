import { Heading, Main } from '@common-ux'
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
            <Main>
                <Heading as="h1">Update Records</Heading>
            </Main>
        </Screen>
    )
}
