import { Screen } from '@shared-components/Screen/Screen'
import './Tasks.scss'
import { useForm } from 'react-hook-form'
import { Form, Heading, Main, Paragraph } from '@common-ux'

interface TaskProps {
    path: string
}

export const Tasks = ({ path }: TaskProps) => {
    const { control } = useForm({
        defaultValues: {
            taskName: '',
            activityType: '',
            deadline: '',
            alarm: '',
        },
        // resolver: yupResolver(loginSchema),
    })

    return (
        <Screen
            title={'tschiboka | Tasks'}
            path={path}
            loginRequired
            variant="app"
            pageName="Tasks"
        >
            <Main className="Tasks">
                <Heading as="h1">Tasks</Heading>
                <Paragraph>
                    Your tasks may include work related actions or any other chores that you wish to
                    record. Do bear in mind that tasks are individual actions that may have
                    deadlines or alarms associated, and tasks are suitable for actions that do not
                    repeat. For reoccuring tasks, you may wish to set up an activity instead.
                </Paragraph>
                <Heading as="h2">Set up a new task</Heading>
                <div className="form-container">
                    <Form>
                        <Form.Fieldset>
                            <Form.Label for="taskName">Task name</Form.Label>
                            <Form.Input
                                name="taskName"
                                control={control}
                                type="text"
                                placeholder="Important task"
                            />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="activityType">Type</Form.Label>
                            <Form.Input name="activityType" control={control} type="text" />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="deadline">Deadline</Form.Label>
                            <Form.Input name="deadline" control={control} type="text" />
                        </Form.Fieldset>
                        <Form.Fieldset>
                            <Form.Label for="alarm">Alarm</Form.Label>
                            <Form.Input name="alarm" control={control} type="text" />
                        </Form.Fieldset>
                        <Form.Button type="submit">Submit</Form.Button>
                    </Form>
                </div>
                <Heading as="h2">See previously set tasks</Heading>
            </Main>
        </Screen>
    )
}
