import Page from '../../../../../common/ux/Page/Page'

interface ActivitiesProps {
    path: string
}

const Activities = ({ path }: ActivitiesProps) => {
    return (
        <Page
            title={'Tivadar Debnar | Activities'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Activities"
        >
            <h1>Activities</h1>
        </Page>
    )
}

export default Activities
