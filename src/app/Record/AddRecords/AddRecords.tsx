import { Screen } from '@shared-components/Screen/Screen'
import { Main, Heading, Paragraph, List, Button } from '@common-ux'
import './AddRecords.scss'

interface AddRecordProps {
    path: string
}

export const AddRecords = ({ path }: AddRecordProps) => {
    return (
        <Screen
            title={'tschiboka | Add Records'}
            path={path}
            loginRequired
            variant="app"
            pageName="Add Records"
        >
            <Main className="AddRecords">
                <Heading as="h1">Add Records</Heading>
                <Paragraph>
                    Record your own personalised activities! You can record an event, a training
                    session, a study class, your vitamin intake or whatever you fancy. Don't forget
                    that you need to create an action before you can record them. If you have not
                    set up any actions yet, please head to the manager menupoint and choose the
                    appropriate category.
                </Paragraph>
                <Paragraph>Please choose from the following categories:</Paragraph>
                <List
                    items={[
                        {
                            key: 'Activity',
                            content: (
                                <>
                                    <Button className="button">Activity</Button>
                                    <Paragraph className="small-text">
                                        All your regular activities must be defined here. You can
                                        use this category to track anything that you plan to record
                                        in the long run.
                                    </Paragraph>
                                </>
                            ),
                        },
                        {
                            key: 'Task',
                            content: (
                                <>
                                    <Button className="button">Task</Button>
                                    <Paragraph className="small-text">
                                        An activity that happens once, and it has a deadline or due
                                        date. You can keep track of individual actions or use it as
                                        a to-do list.
                                    </Paragraph>
                                </>
                            ),
                        },
                        {
                            key: 'Event',
                            content: (
                                <>
                                    <Button className="button">Event</Button>
                                    <Paragraph className="small-text">
                                        Put anything noteworthy here, such as birthdays or special
                                        occasions, or use it as your personal diary and pour your
                                        heart out.
                                    </Paragraph>
                                </>
                            ),
                        },
                    ]}
                />
            </Main>
        </Screen>
    )
}
