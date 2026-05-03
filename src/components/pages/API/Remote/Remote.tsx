import Page from '../../../../../common/ux/Page/Page'

interface RemoteProps {
    path: string
}

const Remote = ({ path }: RemoteProps) => {
    return (
        <Page
            title={'Tivadar Debnar | Remote'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Remote"
        >
            <h1>Remote</h1>
        </Page>
    )
}

export default Remote
