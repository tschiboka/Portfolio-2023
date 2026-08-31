import { GymExerciseResource } from '@common-types'
import { Code, Form, LoadingIndicator, Section } from '@common-ux'
import { Query } from '@common-utils'
import { useForm } from 'react-hook-form'
import {
    useGetGymDifficultyOptions,
    useGetGymEquipmentOptions,
    useGetGymMuscleGroupOptions,
} from '../../Gym.queries'

type ExercisesSectionProps = {
    exercises: GymExerciseResource[]
}
export const ExercisesSection = ({ exercises }: ExercisesSectionProps) => {
    const { data: difficultyData, ...difficultyResponse } = useGetGymDifficultyOptions()
    const { data: equipmentData, ...equipmentResponse } = useGetGymEquipmentOptions()
    const { data: muscleGroupData, ...muscleGroupResponse } = useGetGymMuscleGroupOptions()
    const difficulties = Query.extractEntities(difficultyData, 'difficulties')
    const equipment = Query.extractEntities(equipmentData, 'equipment')
    const muscleGroups = Query.extractEntities(muscleGroupData, 'muscleGroups')
    const { isLoading } = Query.mergeApiStatuses([
        difficultyResponse,
        equipmentResponse,
        muscleGroupResponse,
    ])

    const { control } = useForm<{
        name: string
        type: string
        difficulty: string
        primaryMuscleGroup1: string
        primaryMuscleGroup2?: string
        secondaryMuscleGroup1?: string
        secondaryMuscleGroup2?: string
        unilateral?: boolean
        description?: string
        equipment?: string
        instructions?: string
        notes?: string
        image?: string
        video?: string
        url?: string
    }>()

    return (
        <Section title="Exercises" expandable defaultOpen={false}>
            <Section title="Add Exercise" expandable defaultOpen={false}>
                <LoadingIndicator show={isLoading} />
                <Form>
                    <Form.Fieldset>
                        <Form.Label for="categoryName">Name</Form.Label>
                        <Form.Input name="name" control={control} type="text" />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="type">Type</Form.Label>
                        <Form.Input name="type" control={control} type="text" />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="difficulty">Difficulty</Form.Label>
                        <Form.SearchInput
                            name="difficulty"
                            control={control}
                            options={difficulties}
                            onSelect={() => {
                                console.log('selected')
                            }}
                        />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="description">Description</Form.Label>
                        <Form.Input name="description" control={control} type="text" />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="primaryMuscleGroup1">Primary Muscle Group 1</Form.Label>
                        <Form.SearchInput
                            name="primaryMuscleGroup1"
                            control={control}
                            options={muscleGroups}
                            onSelect={() => {
                                console.log('selected')
                            }}
                        />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="primaryMuscleGroup2">Primary Muscle Group 2</Form.Label>
                        <Form.SearchInput
                            name="primaryMuscleGroup2"
                            control={control}
                            options={muscleGroups}
                            onSelect={() => {
                                console.log('selected')
                            }}
                        />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="secondaryMuscleGroup1">
                            Secondary Muscle Group 1
                        </Form.Label>
                        <Form.SearchInput
                            name="secondaryMuscleGroup1"
                            control={control}
                            options={muscleGroups}
                            onSelect={() => {
                                console.log('selected')
                            }}
                        />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="secondaryMuscleGroup2">
                            Secondary Muscle Group 2
                        </Form.Label>
                        <Form.SearchInput
                            name="secondaryMuscleGroup2"
                            control={control}
                            options={muscleGroups}
                            onSelect={() => {
                                console.log('selected')
                            }}
                        />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Checkbox name="unilateral" label="Unilateral" control={control} />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="equipment">Equipment</Form.Label>
                        <Form.SearchInput
                            name="equipment"
                            control={control}
                            options={equipment}
                            onSelect={() => {
                                console.log('selected')
                            }}
                        />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="instructions">Instructions</Form.Label>
                        <Form.TextArea name="instructions" control={control} />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="notes">Notes</Form.Label>
                        <Form.TextArea name="notes" control={control} />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="image">Image URL</Form.Label>
                        <Form.Input name="image" control={control} type="text" />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="video">Video URL</Form.Label>
                        <Form.Input name="video" control={control} type="text" />
                    </Form.Fieldset>
                    <Form.Fieldset>
                        <Form.Label for="url">URL</Form.Label>
                        <Form.Input name="url" control={control} type="text" />
                    </Form.Fieldset>
                    <Form.ButtonGroup>
                        <Form.Button type="submit">Add Exercise</Form.Button>
                    </Form.ButtonGroup>
                </Form>
                <Section title="Returned exercises" expandable defaultOpen={false}>
                    <Code language="json" content={JSON.stringify(exercises, null, 2)}></Code>
                </Section>
            </Section>
        </Section>
    )
}
