import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'

interface ActivitiesProps {
    path: string
}

const Activities = ({ path }: ActivitiesProps) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <Page
            title={'Tivadar Debnar | Activities'}
            path={path}
            recordVisit={false}
        >
            <Nav pageName="Activities" />
            {mobileMenuVisible && <MobileMenu pageName="Activities" />}
            <h1>Activities</h1>
        </Page>
    )
}

export default Activities
