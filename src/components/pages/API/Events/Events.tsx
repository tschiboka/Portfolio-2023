import { Screen } from '../../../sharedComponents/Screen/Screen'

interface EventsProp {
    path: string
}

const Events = ({ path }: EventsProp) => {
    return (
        <Screen
            title={'Tivadar Debnar | Events'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Events"
        >
            <h1>Events</h1>
        </Screen>
    )
}

export default Events
