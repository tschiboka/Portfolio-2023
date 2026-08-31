import Welcome from './Welcome/Welcome'
import Intro from './Intro/Intro'
import { Screen } from '@shared-components/Screen/Screen'
import { PageSideMenu } from '@shared-components/PageSideMenu/PageSideMenu'
import { Main } from '@common-ux'

interface Props {
    pageName: string
}

export const Home = ({ pageName }: Props) => {
    return (
        <Screen
            title="tschiboka | Home"
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
