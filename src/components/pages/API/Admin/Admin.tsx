import Page from '../../../../../common/ux/Page/Page'

interface AdminProps {
    path: string
}

const Admin = ({ path }: AdminProps) => {
    return (
        <Page
            title={'Tivadar Debnar | Admin'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Admin"
        >
            <h1>Admin</h1>
        </Page>
    )
}

export default Admin
