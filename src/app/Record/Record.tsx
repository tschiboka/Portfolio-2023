import { Main, Heading } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'

interface RecordProps {
    path: string
}

export const Record = ({ path }: RecordProps) => {
    return (
        <Screen
            title={'tschiboka | View Records'}
            path={path}
            loginRequired
            variant="app"
            pageName="View Records"
        >
            <Main>
                <Heading as="h1">View Records</Heading>
            </Main>
        </Screen>
    )
}
