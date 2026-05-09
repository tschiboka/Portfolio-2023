import { Screen } from '../../../sharedComponents/Screen/Screen'
import { AccessGuard } from '@common/utils/AccessGuard'
import { AdminIndex } from './AdminIndex'
import { GuestIndex } from './GuestIndex'

interface IndexProps {
    path: string
    pageName: string
}

const Index = ({ path, pageName }: IndexProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Index'}
            path={path}
            recordVisit={true}
            loginRequired
            variant="api"
            pageName="Home"
            footerProps={{ info: <p>Xmas edition - 2025</p> }}
        >
            <main>
                <h1>Home</h1>
                <AccessGuard
                    guards={[
                        {
                            when: { type: 'capability', capabilities: ['admin'] },
                            then: { mode: 'hidden' },
                        },
                    ]}
                >
                    <AdminIndex />
                </AccessGuard>
                <AccessGuard
                    guards={[
                        {
                            when: { type: 'feature', features: ['xmas2025'] },
                            then: { mode: 'hidden' },
                        },
                    ]}
                >
                    <GuestIndex />
                </AccessGuard>
            </main>
        </Screen>
    )
}

export default Index
