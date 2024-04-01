import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

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
            loginRequired={true}
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
            <main>
                <h1>Add Records</h1>
            </main>
        </Page>
    )
}

export default AddRecords
