import { Button, Code, Main, Section } from '@common/ux'
import { Screen } from '../../../sharedComponents/Screen/Screen'
import { useGetGymExercises, useGetGymUserRoutines } from './Gym.queries'
import { ExercisesSection } from './components/ExerciesesSection/ExercisesSection'

interface GymProps {
    path: string
}

export const Gym = ({ path }: GymProps) => {
    const { data: routines } = useGetGymUserRoutines()
    const { data: exercises } = useGetGymExercises()

    return (
        <Screen
            title={'Tivadar Debnar | Gym'}
            path={path}
            loginRequired
            variant="api"
            pageName="Gym"
        >
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
