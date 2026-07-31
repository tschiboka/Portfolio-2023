import { Screen } from '../../../sharedComponents/Screen/Screen'

interface EventsProp {
    path: string
}

const Events = ({ path }: EventsProp) => {
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

export default Events
