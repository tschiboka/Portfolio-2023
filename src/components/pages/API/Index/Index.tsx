import { Screen } from '../../../sharedComponents/Screen/Screen'
import { AccessGuard } from '@common/utils/AccessGuard'
import { AdminIndex } from './AdminIndex'
import { GuestIndex } from './GuestIndex'
import Footer from '../../../sharedComponents/Footer/Footer'

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
            <Footer pageName={pageName} path={path} info={<p>Xmas edition - 2025</p>} />
        </Screen>
    )
}

export default Index
