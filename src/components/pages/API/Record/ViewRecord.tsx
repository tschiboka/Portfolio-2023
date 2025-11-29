import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext/App.context'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

interface ViewRecordsProps {
    path: string
}

const ViewRecords = ({ path }: ViewRecordsProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page
            title={'Tivadar Debnar | View Records'}
            path={path}
            recordVisit={false}
            loginRequired
        >
            <Nav
                pageName="View Records"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="View records"
                />
            )}

            {mobileMenuVisible && <MobileMenu pageName="View Records" />}
            <main>
                <h1>View Records</h1>
            </main>
        </Page>
    )
}

export default ViewRecords
