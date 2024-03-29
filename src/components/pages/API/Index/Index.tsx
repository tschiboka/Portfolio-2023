import Page from '../../../sharedComponents/Page/Page'

interface IndexProps {
    path: string
}

const Index = ({ path }: IndexProps) => {
    return (
        <Page title={'Tivadar Debnar | Index'} path={path} recordVisit={false}>
            <button>Admin</button>
            <button>Remote</button>
            <button>Stats</button>
            <button>Task Manager</button>
        </Page>
    )
}

export default Index
