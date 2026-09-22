import { Screen } from '@shared-components/Screen/Screen'
import { AccessGuard } from '@shared-components/AccessGuard'
import { AdminHome } from './AdminHome'
import { GuestHome } from './GuestHome'
import { Heading, Main, Paragraph } from '@common-ux'

interface HomeProps {
    path: string
}

export const Home = ({ path }: HomeProps) => {
    return (
        <Screen
            title={'tschiboka | Home'}
            path={path}
            loginRequired
            variant="app"
            pageName="Home"
            footerProps={{ info: <Paragraph>Xmas edition - 2025</Paragraph> }}
        >
            <Main>
                <Heading as="h1">Home</Heading>
                <AccessGuard
                    guards={[
                        {
                            when: { type: 'capability', capabilities: ['admin'] },
                            then: { mode: 'hidden' },
                        },
                    ]}
                >
                    <AdminHome />
                </AccessGuard>
                <AccessGuard
                    guards={[
                        {
                            when: { type: 'feature', features: ['xmas2025'] },
                            then: { mode: 'hidden' },
                        },
                    ]}
                >
                    <GuestHome />
                </AccessGuard>
            </Main>
        </Screen>
    )
}
