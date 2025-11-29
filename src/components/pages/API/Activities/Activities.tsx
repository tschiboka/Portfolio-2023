import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext/App.context'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'

interface ActivitiesProps {
    path: string
}

const Activities = ({ path }: ActivitiesProps) => {
    const { mobileMenuVisible } = useAppContext()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    return (
        <Page
            title={'Tivadar Debnar | Activities'}
            path={path}
            recordVisit={false}
            loginRequired
        >
            <Nav
                pageName="Activities"
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName="Activities"
                />
            )}
            {mobileMenuVisible && <MobileMenu pageName="Activities" />}
            <h1>Activities</h1>
        </Page>
    )
}

export default Activities
