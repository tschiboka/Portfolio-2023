import Welcome from './Welcome/Welcome'
import Intro from './Intro/Intro'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'

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
            <main>
                <Intro />
            </main>
        </Screen>
    )
}

export default Home
