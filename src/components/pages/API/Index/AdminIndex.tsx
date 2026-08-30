import { Stack } from '@ux'
import { WebsiteStats } from './WebsiteStats'

export const AdminIndex = () => {
    return (
        <Stack.Vertical gap="12">
            <WebsiteStats />
        </Stack.Vertical>
    )
}
