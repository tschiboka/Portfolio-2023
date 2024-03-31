import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'

interface EventsProp {
    path: string
}

const Events = ({ path }: EventsProp) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <Page title={'Tivadar Debnar | Events'} path={path} recordVisit={false}>
            <Nav pageName="Events" />
            {mobileMenuVisible && <MobileMenu pageName="Events" />}
            <h1>Events</h1>
        </Page>
    )
}

export default Events
