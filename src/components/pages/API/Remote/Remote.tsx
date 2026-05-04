import { Screen } from '../../../sharedComponents/Screen/Screen'

interface RemoteProps {
    path: string
}

const Remote = ({ path }: RemoteProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Remote'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Remote"
        >
            <h1>Remote</h1>
        </Screen>
    )
}

export default Remote
