import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

interface IndexProps {
    path: string
}

const Index = ({ path }: IndexProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page title={'Tivadar Debnar | Index'} path={path} recordVisit={false}>
            <Nav
                pageName="Home"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {submenuStack.map((sub) => (
                <SubmenuPanel
                    key={sub.parentLabel}
                    submenu={sub}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Home"
                />
            ))}
            {mobileMenuVisible && <MobileMenu pageName="Home" />}
            <h1>Home</h1>
        </Page>
    )
}

export default Index
