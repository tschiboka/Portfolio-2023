import Page from '../../../../../common/ux/Page/Page'

interface UserProps {
    path: string
}

const User = ({ path }: UserProps) => {
    return (
        <Page
            title={'Tivadar Debnar | User'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="User"
        >
            <h1>User</h1>
        </Page>
    )
}

export default User
