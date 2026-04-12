import Page from '../../../sharedComponents/Page/Page'
import { AccessGuards } from './components/AccessGuards/AccessGuards'
import { Overlays } from './components/Overlay/Overlays'

interface UxStoriesProps {
    path: string
}

export const UxStories = ({ path }: UxStoriesProps) => {
    return (
        <Page title={'Tivadar Debnar | Ux Stories'} path={path} recordVisit={false} loginRequired>
            <main>
                <h1>UX Stories</h1>
                <AccessGuards />
                <Overlays />
            </main>
        </Page>
    )
}
