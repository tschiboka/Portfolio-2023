import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

interface AdminProps {
    path: string
}

const Admin = ({ path }: AdminProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page title={'Tivadar Debnar | Admin'} path={path} recordVisit={false}>
            <Nav
                pageName="Admin"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {submenuStack.map((sub) => (
                <SubmenuPanel
                    key={sub.parentLabel}
                    submenu={sub}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Admin"
                />
            ))}{' '}
            {mobileMenuVisible && <MobileMenu pageName="Admin" />}
            <h1>Admin</h1>
        </Page>
    )
}

export default Admin
