import Page from '../../../../../common/ux/Page/Page'

interface UpdateRecordsProps {
    path: string
}

const UpdateRecords = ({ path }: UpdateRecordsProps) => {
    return (
        <Page
            title={'Tivadar Debnar | Update Records'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Update Records"
        >
            <main>
                <h1>Update Records</h1>
            </main>
        </Page>
    )
}

export default UpdateRecords
