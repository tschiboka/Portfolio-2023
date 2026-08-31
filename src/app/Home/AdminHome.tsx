import { Stack } from '@common-ux'
import { WebsiteStats } from './WebsiteStats'

export const AdminHome = () => {
    return (
        <Stack.Vertical gap="12">
            <WebsiteStats />
        </Stack.Vertical>
    )
}
