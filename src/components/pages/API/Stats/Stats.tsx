import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import Nav from '../Nav/Nav'
import MobileMenu from '../MobileMenu/MobileMenu'

interface StatProps {
    path: string
}

const Stats = ({ path }: StatProps) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <Page title={'Tivadar Debnar | Index'} path={path} recordVisit={false}>
            <Nav pageName="Stats" />
            {mobileMenuVisible && <MobileMenu pageName="Stats" />}
            <h1>Stats</h1>
        </Page>
    )
}

export default Stats
