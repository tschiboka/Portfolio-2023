import { Link } from 'react-router-dom'
import Page from '../../../sharedComponents/Page/Page'
import { Stack } from '@common/ux'

interface UxStoriesProps {
    path: string
}

export const UxStories = ({ path }: UxStoriesProps) => {
    return (
        <Page title={'Tivadar Debnar | Ux Stories'} path={path} recordVisit={false} loginRequired>
            <main>
                <Stack.Vertical gap="12">
                    <h1>UX Stories</h1>
                    <p>
                        This section showcases various UX components and patterns through
                        interactive stories. Each story demonstrates a specific component or design
                        pattern in action, allowing you to explore their features and behaviors in a
                        real-world context.
                    </p>
                    <h2>Choose component</h2>
                    <Link to="/api/ux-stories/access-guards">Access Guards</Link>
                    <Link to="/api/ux-stories/overlays">Overlays</Link>
                    <Link to="/api/ux-stories/tables">Tables</Link>
                </Stack.Vertical>
            </main>
        </Page>
    )
}
