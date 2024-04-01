import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

interface TaskProps {
    path: string
}

const Tasks = ({ path }: TaskProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page
            title={'Tivadar Debnar | Tasks'}
            path={path}
            recordVisit={false}
            loginRequired={true}
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
            <h1>Tasks</h1>
        </Page>
    )
}

export default Tasks
