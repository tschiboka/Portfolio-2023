import { Button, Code, Main, Section } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'
import { useGetGymExercises, useGetGymUserRoutines } from './Gym.queries'
import { ExercisesSection } from './components/ExercisesSection/ExercisesSection'

interface GymProps {
    path: string
}

export const Gym = ({ path }: GymProps) => {
    const { data: routines } = useGetGymUserRoutines()
    const { data: exercises } = useGetGymExercises()

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
