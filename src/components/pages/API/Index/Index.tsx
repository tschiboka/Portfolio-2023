import { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'
import { Submenu } from '../Nav'
import SubmenuPanel from '../Nav/SubmenuPanel/SubmenuPanel'
import { AccessGuard } from '../../../../common/AccessGuard/AccessGuard'
import { useNavigate } from 'react-router-dom'

interface IndexProps {
    path: string
}

const Index = ({ path }: IndexProps) => {
    const { mobileMenuVisible } = useAppContext()
    const navigate = useNavigate()
    const [submenuStack, setSubmenuStack] = useState<Submenu[]>([])

    const handleXmasClick = () => {
        navigate('/projects/xmas2025')
    }

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
                    <p>
                        Welcome to tschiboka.co.uk app! This is my own
                        life-style management application that you can use for
                        keeping track of your personal improvement goals, let it
                        be studying, training, keeping track of your daily
                        activities or recording your performance. If you were
                        invited, feel honored.
                    </p>
                    <h3>Your Upcoming Events</h3>
                </AccessGuard>
                <AccessGuard allowedFeatures={['xmas2025']}>
                    <p>Press the Xmas button to send Xmas greetings!</p>
                    <button className="button" onClick={handleXmasClick}>
                        Xmas
                    </button>
                </AccessGuard>
            </main>
        </Page>
    )
}

export default Index
