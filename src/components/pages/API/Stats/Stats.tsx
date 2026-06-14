import { Screen } from '../../../sharedComponents/Screen/Screen'

interface StatProps {
    path: string
}

const Stats = ({ path }: StatProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Stats'}
            path={path}
            loginRequired
            variant="api"
            pageName="Stats"
        >
            <h1>Stats</h1>
        </Screen>
    )
}

export default Stats
