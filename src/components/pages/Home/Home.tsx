import Welcome from './Welcome/Welcome'
import Intro from './Intro/Intro'
import Footer from '../../sharedComponents/Footer/Footer'
import Page from '../../../../common/ux/Page/Page'

interface Props {
    pageName: string
    path: string
}

const Home = ({ pageName, path }: Props) => {
    return (
        <Page title="Tivadar Debnar | Home" path="/" variant="portfolio" pageName={pageName}>
            <Welcome />
            <main>
                <Intro />
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    )
}

export default Home
