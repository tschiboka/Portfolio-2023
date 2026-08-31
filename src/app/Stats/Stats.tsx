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
            variant="api"
            pageName="Stats"
        >
            <h1>Stats</h1>
        </Screen>
    )
}
