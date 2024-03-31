import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

interface RemoteProps {
    path: string
}

const Remote = ({ path }: RemoteProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page title={'Tivadar Debnar | Remote'} path={path} recordVisit={false}>
            <Nav
                pageName="Remote"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {submenuStack.map((sub) => (
                <SubmenuPanel
                    key={sub.parentLabel}
                    submenu={sub}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Remote"
                />
            ))}
            {mobileMenuVisible && <MobileMenu pageName="Remote" />}
            <h1>Remote</h1>
        </Page>
    )
}

export default Remote
