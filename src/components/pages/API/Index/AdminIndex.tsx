import { Stack, Link } from '@common/ux'

export const AdminIndex = () => (
    <Stack.Vertical gap="12">
        <p>Welcome to admin section</p>
        <Link to="/projects/wda-level-creator">Word Duel Arena Level Creator</Link>
        <Link to="/api/ux-stories">UX Stories</Link>
    </Stack.Vertical>
)
