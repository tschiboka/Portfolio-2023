import { Heading } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'

interface StatProps {
    path: string
}

export const Stats = ({ path }: StatProps) => {
    return (
        <Screen
            title={'tschiboka | Stats'}
            path={path}
            loginRequired
            variant="app"
            pageName="Stats"
        >
            <Heading as="h1">Stats</Heading>
        </Screen>
    )
}
