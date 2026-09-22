import { Screen } from '@shared-components/Screen/Screen'
import { Heading } from '@common-ux'

interface EventsProp {
    path: string
}

export const Events = ({ path }: EventsProp) => {
    return (
        <Screen
            title={'tschiboka | Events'}
            path={path}
            loginRequired
            variant="app"
            pageName="Events"
        >
            <Heading as="h1">Events</Heading>
        </Screen>
    )
}
