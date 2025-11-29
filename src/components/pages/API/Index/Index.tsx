import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext/App.context'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'
import { AccessGuard } from '../../../../common/AccessGuard/AccessGuard'
import { AdminIndex } from './AdminIndex'
import { GuestIndex } from './GuestIndex'

interface IndexProps {
    path: string
}

const Index = ({ path }: IndexProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page
            title={'Tivadar Debnar | Index'}
            path={path}
            recordVisit={false}
            loginRequired
        >
            <Nav
                pageName="Home"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Home"
                />
            )}
            {mobileMenuVisible && <MobileMenu pageName="Home" />}
            <main>
                <h1>Home</h1>
                <AccessGuard allowedRoles={['admin']}>
                    <AdminIndex />
                </AccessGuard>
                <AccessGuard allowedFeatures={['xmas2025']}>
                    <GuestIndex />
                </AccessGuard>
            </main>
        </Page>
    )
}

export default Index
