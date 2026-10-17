import { Screen } from '@shared-components/Screen/Screen'
import { PageSideMenu } from '@shared-components/PageSideMenu'
import { Main } from '@common-ux'
import { Welcome } from './Welcome/Welcome'
import { Intro } from './Intro/Intro'

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
