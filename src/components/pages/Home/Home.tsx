import Welcome from './Welcome/Welcome'
import Intro from './Intro/Intro'
import Footer from '../../sharedComponents/Footer/Footer'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'

interface Props {
    pageName: string
    path: string
}

const Home = ({ pageName, path }: Props) => {
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
            <Footer pageName={pageName} path={path} />
        </Screen>
    )
}

export default Home
