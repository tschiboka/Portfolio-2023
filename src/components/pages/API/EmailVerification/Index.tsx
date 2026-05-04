import { Screen } from '../../../sharedComponents/Screen/Screen'

interface IndexProps {
    path: string
}

const Index = ({ path }: IndexProps) => {
    return (
        <Screen title={'Tivadar Debnar | Index'} path={path} recordVisit={false}>
            <button>Admin</button>
            <button>Remote</button>
            <button>Stats</button>
            <button>Task Manager</button>
        </Screen>
    )
}

export default Index
