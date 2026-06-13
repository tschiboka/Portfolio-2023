import { Button, Heading, Main, Section, Stack } from '@common/ux'
import { Screen } from '../../../sharedComponents/Screen/Screen'
import './Remote.styles.scss'

interface RemoteProps {
    path: string
}

export const Remote = ({ path }: RemoteProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Remote'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Remote"
        >
            <Main>
                <Section>
                    <Heading as="h1">Remote</Heading>
                    <Stack.Horizontal className="Remote__buttons" gap="16" align="start" wrap>
                        <Button as="a" href="#/projects/gym">
                            Gym
                        </Button>
                    </Stack.Horizontal>
                </Section>
            </Main>
        </Screen>
    )
}
