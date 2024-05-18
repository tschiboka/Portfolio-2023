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
        <Page
            title={'Tivadar Debnar | Index'}
            path={path}
            recordVisit={false}
            loginRequired={true}
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
                <p>
                    Welcome to tschiboka.co.uk app! This is my own life-style
                    management application that you can use for keeping track of
                    your personal improvement goals, let it be studying,
                    training, keeping track of your daily activities or
                    recording your performance. If you were invited, feel
                    honored.
                </p>
                <h3>Your Upcoming Events</h3>
                <p></p>
            </main>
        </Page>
    )
}

export default Index
