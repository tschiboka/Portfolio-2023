import Page from '../../../../../common/ux/Page/Page'

interface ViewRecordsProps {
    path: string
}

const ViewRecords = ({ path }: ViewRecordsProps) => {
    return (
        <Page
            title={'Tivadar Debnar | View Records'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="View Records"
        >
            <main>
                <h1>View Records</h1>
            </main>
        </Page>
    )
}

export default ViewRecords
