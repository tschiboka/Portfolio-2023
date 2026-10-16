import { Button, Code, Main, Section } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'
import { GymQueries } from './Gym.queries'
import { ExercisesSection } from './components/ExercisesSection/ExercisesSection'

interface GymProps {
    path: string
}

export const Gym = ({ path }: GymProps) => {
    const { data: routines } = GymQueries.Routines.useGet()
    const { data: exercises } = GymQueries.Exercises.useGet()

    return (
        <Screen title={'tschiboka | Gym'} path={path} loginRequired variant="app" pageName="Gym">
            <Main>
                <ExercisesSection exercises={exercises?.exercises || []} />
                <Section title="Routines" expandable defaultOpen={false}>
                    <Button onClick={() => console.log(routines)}>Create Routine</Button>
                    <Section title="Returned routines" expandable defaultOpen={false}>
                        <Code language="json" content={JSON.stringify(routines, null, 2)}></Code>
                    </Section>
                </Section>
            </Main>
        </Screen>
    )
}
