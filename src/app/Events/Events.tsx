import { Screen } from '@shared-components/Screen/Screen'

interface EventsProp {
    path: string
}

export const Events = ({ path }: EventsProp) => {
    return (
        <Screen
            title={'tschiboka | Events'}
            path={path}
            loginRequired
            variant="api"
            pageName="Events"
        >
            <h1>Events</h1>
        </Screen>
    )
}
