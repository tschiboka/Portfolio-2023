import { Heading } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'

type StatsProps = {
    path: string
}

export const Stats = ({ path }: StatsProps) => (
    <Screen title={'tschiboka | Stats'} path={path} loginRequired variant="app" pageName="Stats">
        <Heading as="h1">Stats</Heading>
    </Screen>
)
