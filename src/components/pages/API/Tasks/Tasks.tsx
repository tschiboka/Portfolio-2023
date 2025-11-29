import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext/App.context'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'
import '../common/Form.scss'
import './Tasks.scss'
import { WrappedInput } from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { useForm } from 'react-hook-form'

interface TaskProps {
    path: string
}

const Tasks = ({ path }: TaskProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

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
        <Page
            title={'Tivadar Debnar | Tasks'}
            path={path}
            recordVisit={false}
            loginRequired
        >
            <Nav
                pageName="Tasks"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Tasks"
                />
            )}
            {mobileMenuVisible && <MobileMenu pageName="Tasks" />}
            <main className="Tasks">
                <h1>Tasks</h1>
                <p>
                    Your tasks may include work related actions or any other
                    chores that you wish to record. Do bear in mind that tasks
                    are individual actions that may have deadlines or alarms
                    associated, and tasks are suitable for actions that do not
                    repeat. For reoccuring tasks, you may wish to set up an
                    activity instead.
                </p>
                <h2>Set up a new task</h2>
                <div className="form-container">
                    <form>
                        <fieldset>
                            <label htmlFor="taskName">Task name</label>
                            <WrappedInput
                                name="taskName"
                                control={control}
                                type="text"
                                placeholder="Important task"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="activityType">Type</label>
                            <WrappedInput
                                name="activityType"
                                control={control}
                                type="text"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="deadline">Deadline</label>
                            <WrappedInput
                                name="deadline"
                                control={control}
                                type="text"
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="alarm">Alarm</label>
                            <WrappedInput
                                name="alarm"
                                control={control}
                                type="text"
                            />
                        </fieldset>
                        <button name="submit">Submit</button>
                    </form>
                </div>
                <h2>See previously set tasks</h2>
            </main>
        </Page>
    )
}

export default Tasks
