import { Screen } from '@shared-components/Screen/Screen'
import { Heading } from '@common-ux'

type EventsProps = {
    path: string
}

export const Events = ({ path }: EventsProps) => (
    <Screen title={'tschiboka | Events'} path={path} loginRequired variant="app" pageName="Events">
        <Heading as="h1">Events</Heading>
    </Screen>
)
