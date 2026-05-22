import Welcome from './Welcome/Welcome'
import Intro from './Intro/Intro'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import { Main } from '@common/ux'

interface Props {
    pageName: string
}

const Home = ({ pageName }: Props) => {
    return (
        <Screen
            title="Tivadar Debnar | Home"
            path="/"
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
        >
            <Welcome />
            <Main>
                <Intro />
            </Main>
        </Screen>
    )
}

export default Home
