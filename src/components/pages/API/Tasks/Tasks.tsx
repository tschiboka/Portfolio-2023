import { Screen } from '../../../sharedComponents/Screen/Screen'
import './Tasks.scss'
import { useForm } from 'react-hook-form'
import { Form } from '@common/ux'

interface TaskProps {
    path: string
}

const Tasks = ({ path }: TaskProps) => {
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
            title={'Tivadar Debnar | Tasks'}
            path={path}
            loginRequired
            variant="api"
            pageName="Tasks"
        >
            <main className="Tasks">
                <h1>Tasks</h1>
                <p>
                    Your tasks may include work related actions or any other chores that you wish to
                    record. Do bear in mind that tasks are individual actions that may have
                    deadlines or alarms associated, and tasks are suitable for actions that do not
                    repeat. For reoccuring tasks, you may wish to set up an activity instead.
                </p>
                <h2>Set up a new task</h2>
                <div className="form-container">
                    <form>
                        <fieldset>
                            <label htmlFor="taskName">Task name</label>
                            <Form.Input
                                name="taskName"
                                control={control}
                                type="text"
                                placeholder="Important task"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="activityType">Type</label>
                            <Form.Input name="activityType" control={control} type="text" />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="deadline">Deadline</label>
                            <Form.Input name="deadline" control={control} type="text" />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="alarm">Alarm</label>
                            <Form.Input name="alarm" control={control} type="text" />
                        </fieldset>
                        <Form.Button type="submit">Submit</Form.Button>
                    </form>
                </div>
                <h2>See previously set tasks</h2>
            </main>
        </Screen>
    )
}

export default Tasks
