import { Stack } from '@common/ux'
import { Link } from 'react-router-dom'

export const AdminIndex = () => (
    <Stack.Vertical gap="12">
        <p>Welcome to admin section</p>
        <Link to="/projects/wda-level-creator">Word Duel Arena Level Creator</Link>
        <Link to="/api/ux-stories">UX Stories</Link>
    </Stack.Vertical>
)
