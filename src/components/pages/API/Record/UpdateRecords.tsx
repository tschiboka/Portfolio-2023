import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

interface UpdateRecordsProps {
    path: string
}

const UpdateRecords = ({ path }: UpdateRecordsProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page
            title={'Tivadar Debnar | Update Records'}
            path={path}
            recordVisit={false}
            loginRequired={true}
        >
            <Nav
                pageName="Update Records"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Update records"
                />
            )}

            {mobileMenuVisible && <MobileMenu pageName="Update Records" />}
            <main>
                <h1>Update Records</h1>
            </main>
        </Page>
    )
}

export default UpdateRecords
