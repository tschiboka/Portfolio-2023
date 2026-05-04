import { Screen } from '../../../../sharedComponents/Screen/Screen'
import './AddRecords.scss'

interface AddRecordProps {
    path: string
}

const AddRecords = ({ path }: AddRecordProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Add Records'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Add Records"
        >
            <main className="AddRecords">
                <h1>Add Records</h1>
                <p>
                    Record your own personalised activities! You can record an event, a training
                    session, a study class, your vitamin intake or whatever you fancy. Don't forget
                    that you need to create an action before you can record them. If you have not
                    set up any actions yet, please head to the manager menupoint and choose the
                    appropriate category.
                </p>
                <p>Please choose from the following categories:</p>
                <ul>
                    <li>
                        <button className="button">Activity</button>
                        <p className="small-text">
                            All your regular activities must be defined here. You can use this
                            category to track anything that you plan to record in the long run.
                        </p>
                    </li>
                    <li>
                        <button className="button">Task</button>
                        <p className="small-text">
                            An activity that happens once, and it has a deadline or due date. You
                            can keep track of individual actions or use it as a to-do list.
                        </p>
                    </li>
                    <li>
                        <button className="button">Event</button>
                        <p className="small-text">
                            Put anything noteworthy here, such as birthdays or special occasions, or
                            use it as your personal diary and pour your heart out.
                        </p>
                    </li>
                </ul>
            </main>
        </Screen>
    )
}

export default AddRecords
