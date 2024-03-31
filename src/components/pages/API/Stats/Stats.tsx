import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import Nav from '../Nav/Nav'
import MobileMenu from '../MobileMenu/MobileMenu'
import { useState } from 'react'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

interface StatProps {
    path: string
}

const Stats = ({ path }: StatProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page title={'Tivadar Debnar | Index'} path={path} recordVisit={false}>
            <Nav
                pageName="Stats"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {submenuStack.map((sub) => (
                <SubmenuPanel
                    key={sub.parentLabel}
                    submenu={sub}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Stats"
                />
            ))}
            {mobileMenuVisible && <MobileMenu pageName="Stats" />}
            <h1>Stats</h1>
        </Page>
    )
}

export default Stats
