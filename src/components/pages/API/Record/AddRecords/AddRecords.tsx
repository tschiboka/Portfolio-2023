import { useState } from 'react'
import { useAppContext } from '../../../../../context/AppContext/App.context'
import Page from '../../../../sharedComponents/Page/Page'
import MobileMenu from '../../MobileMenu/MobileMenu'
import Nav from '../../Nav/Nav'
import { Submenu } from '../../Nav'
import SubmenuPanel from '../../Nav/SubmenuPanel/SubmenuPanel'
import './AddRecords.scss'

interface AddRecordProps {
    path: string
}

const AddRecords = ({ path }: AddRecordProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page
            title={'Tivadar Debnar | Add Records'}
            path={path}
            recordVisit={false}
            loginRequired
        >
            <Nav
                pageName="Add Records"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Add records"
                />
            )}

            {mobileMenuVisible && <MobileMenu pageName="Add Records" />}
            <main className="AddRecords">
                <h1>Add Records</h1>
                <p>
                    Record your own personalised activities! You can record an
                    event, a training session, a study class, your vitamin
                    intake or whatever you fancy. Don't forget that you need to
                    create an action before you can record them. If you have not
                    set up any actions yet, please head to the manager menupoint
                    and choose the appropriate category.
                </p>
                <p>Please choose from the following categories:</p>
                <ul>
                    <li>
                        <button className="button">Activity</button>
                        <p className="small-text">
                            All your regular activities must be defined here.
                            You can use this category to track anything that you
                            plan to record in the long run.
                        </p>
                    </li>
                    <li>
                        <button className="button">Task</button>
                        <p className="small-text">
                            An activity that happens once, and it has a deadline
                            or due date. You can keep track of individual
                            actions or use it as a to-do list.
                        </p>
                    </li>
                    <li>
                        <button className="button">Event</button>
                        <p className="small-text">
                            Put anything noteworthy here, such as birthdays or
                            special occasions, or use it as your personal diary
                            and pour your heart out.
                        </p>
                    </li>
                </ul>
            </main>
        </Page>
    )
}

export default AddRecords
