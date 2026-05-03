import Page from '../../../../../common/ux/Page/Page'

interface StatProps {
    path: string
}

const Stats = ({ path }: StatProps) => {
    return (
        <Page
            title={'Tivadar Debnar | Stats'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Stats"
        >
            <h1>Stats</h1>
        </Page>
    )
}

export default Stats
