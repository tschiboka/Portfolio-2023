import Page from '../../../../../common/ux/Page/Page'

interface EventsProp {
    path: string
}

const Events = ({ path }: EventsProp) => {
    return (
        <Page
            title={'Tivadar Debnar | Events'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Events"
        >
            <h1>Events</h1>
        </Page>
    )
}

export default Events
